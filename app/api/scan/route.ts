/**
 * POST /api/scan — Digital Footprint snapshot (R2).
 *
 * Budgets (must fit under maxDuration):
 * - PageSpeed Insights: 45s
 * - DataForSEO GBP live: 20s
 * - HTML fetch + cheerio: 10s
 * Providers run in parallel; route maxDuration = 60s (Pro). If Hobby wall
 * time cannot fit these budgets, escalate to Pro rather than silent 504s.
 *
 * Captcha: Turnstile on this POST (no /scan UI in this task).
 * Cache hits skip the expensive-path rate-limit budget.
 */

import {
  buildScanContentKey,
  buildScanResult,
  createOpaqueScanId,
  getScan,
  getScanIdByContentKey,
  isScanExpired,
  putScan,
  putScanContentKey,
} from '@/app/lib/scan-cache';
import { verifyTurnstile } from '@/app/lib/turnstile';
import { getClientIp, limitScan } from '@/app/lib/ratelimit';
import { validateScanBody } from '@/app/lib/scan/validation';
import {
  resolvePublicAddress,
  UrlGuardError,
} from '@/app/lib/scan/url-guard';
import { fetchPagespeed, PSI_TIMEOUT_MS } from '@/app/lib/scan/psi';
import { fetchHtmlSignals, HTML_TIMEOUT_MS } from '@/app/lib/scan/html-signals';
import {
  fetchGbpLive,
  isGbpLiveEnabled,
  skippedGbpResult,
  DATAFORSEO_TIMEOUT_MS,
} from '@/app/lib/scan/dataforseo';
import { computeFootprintScore } from '@/app/lib/scan/score';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
/** Vercel Pro-class wall clock; per-provider caps above are stricter. */
export const maxDuration = 60;

type JsonBody = Record<string, unknown>;

function json(body: JsonBody, status: number, headers?: HeadersInit): Response {
  return Response.json(body, { status, headers });
}

const scannerEnabled = process.env.NICE_RIGHT_SCANNER_ENABLED === 'true';

export async function POST(request: Request): Promise<Response> {
  if (!scannerEnabled) {
    return json(
      { error: 'not_found', message: 'Not found.' },
      404,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { error: 'invalid_body', message: 'Request body must be JSON.' },
      400,
    );
  }

  const validated = validateScanBody(body);
  if ('code' in validated) {
    return json(
      { error: validated.code, message: validated.message },
      validated.status,
    );
  }

  const { websiteUrl, businessName, city, turnstileToken } = validated;
  const ip = getClientIp(request);

  // Connection-time SSRF check before any upstream or cache write
  try {
    const host = new URL(websiteUrl).hostname;
    await resolvePublicAddress(host);
  } catch (err) {
    if (err instanceof UrlGuardError) {
      return json(
        {
          error: 'blocked_url',
          message: err.message,
        },
        400,
      );
    }
    return json(
      {
        error: 'invalid_website_url',
        message: 'Could not resolve website host.',
      },
      400,
    );
  }

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.ok) {
    return json(
      {
        error: 'turnstile_failed',
        message: 'Bot check failed. Please retry the captcha.',
      },
      403,
    );
  }

  const contentKey = buildScanContentKey(websiteUrl, businessName, city);

  // 24h content dedupe — cache hits skip expensive-path rate limit
  try {
    const existingId = await getScanIdByContentKey(contentKey);
    if (existingId) {
      const cached = await getScan(existingId);
      if (cached && !isScanExpired(cached)) {
        return json(
          {
            ok: true,
            cached: true,
            scanId: cached.scanId,
            score: cached.score,
            findings: cached.findings,
            partial: cached.partial,
            websiteUrl: cached.websiteUrl,
            businessName: cached.businessName,
            city: cached.city,
          },
          200,
        );
      }
    }
  } catch {
    return json(
      {
        error: 'cache_unavailable',
        message: 'Service temporarily unavailable. Please retry.',
      },
      503,
    );
  }

  // Expensive path only — ~3/hr/IP via shared getScanRateLimiter
  try {
    const rl = await limitScan(ip);
    if (!rl.success) {
      return json(
        {
          error: 'rate_limited',
          message: 'Too many scans. Try again later.',
        },
        429,
        { 'Retry-After': String(rl.retryAfterSeconds) },
      );
    }
  } catch {
    return json(
      {
        error: 'rate_limit_unavailable',
        message: 'Service temporarily unavailable. Please retry.',
      },
      503,
    );
  }

  const gbpEnabled = isGbpLiveEnabled();
  const [pagespeed, html, gbp] = await Promise.all([
    fetchPagespeed(websiteUrl, { timeoutMs: PSI_TIMEOUT_MS }),
    fetchHtmlSignals(websiteUrl, { timeoutMs: HTML_TIMEOUT_MS }),
    gbpEnabled
      ? fetchGbpLive(businessName, city, { timeoutMs: DATAFORSEO_TIMEOUT_MS })
      : Promise.resolve(skippedGbpResult()),
  ]);

  // Hard deny if HTML path hit SSRF mid-redirect (should be rare after pre-check)
  if (html.ok === false && html.blocked) {
    return json(
      {
        error: 'blocked_url',
        message: 'This website URL is not allowed.',
      },
      400,
    );
  }

  const scored = computeFootprintScore({ pagespeed, html, gbp });
  const anySignal =
    pagespeed.ok || html.ok || gbp.ok || Object.keys(scored.usedWeights).length > 0;

  if (!anySignal) {
    const timedOut =
      (pagespeed.ok === false && pagespeed.timedOut) ||
      (html.ok === false && html.timedOut) ||
      (gbp.ok === false && gbp.timedOut);
    return json(
      {
        error: timedOut ? 'upstream_timeout' : 'upstream_failed',
        message: timedOut
          ? 'Upstream providers timed out before returning usable signals. Please retry.'
          : 'Upstream providers failed before returning usable signals. Please retry.',
      },
      timedOut ? 504 : 502,
    );
  }

  const scanId = createOpaqueScanId();
  const scan = buildScanResult({
    scanId,
    score: scored.score,
    findings: scored.findings,
    websiteUrl,
    businessName,
    city,
    partial: scored.partial,
  });

  try {
    await putScan(scan);
    await putScanContentKey(contentKey, scanId);
  } catch {
    return json(
      {
        error: 'cache_unavailable',
        message: 'Scan completed but could not be saved. Please retry.',
      },
      503,
    );
  }

  return json(
    {
      ok: true,
      cached: false,
      scanId: scan.scanId,
      score: scan.score,
      findings: scan.findings,
      partial: scan.partial,
      websiteUrl: scan.websiteUrl,
      businessName: scan.businessName,
      city: scan.city,
      budgets: {
        maxDurationSeconds: 60,
        pagespeedMs: PSI_TIMEOUT_MS,
        dataforseoMs: DATAFORSEO_TIMEOUT_MS,
        htmlMs: HTML_TIMEOUT_MS,
      },
    },
    200,
  );
}
