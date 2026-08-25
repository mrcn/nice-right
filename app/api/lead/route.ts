/**
 * POST /api/lead — email the Digital Footprint report (R4).
 * Turnstile on POST only; Mailchimp only with explicit consent.
 * Atomic SET NX idempotency before Resend.
 */

import { getScan, isScanExpired } from '@/app/lib/scan-cache';
import { verifyTurnstile } from '@/app/lib/turnstile';
import { getClientIp, limitLead } from '@/app/lib/ratelimit';
import {
  claimLeadSend,
  markLeadSent,
  releaseLeadClaim,
} from '@/app/lib/lead-idempotency';
import { validateLeadBody } from '@/app/lib/lead-validation';
import { sendFootprintReport } from '@/app/lib/send-report';
import { subscribeMailchimp } from '@/app/lib/mailchimp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type JsonBody = Record<string, unknown>;

function json(body: JsonBody, status: number, headers?: HeadersInit): Response {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { error: 'invalid_body', message: 'Request body must be JSON.' },
      400,
    );
  }

  const validated = validateLeadBody(body);
  if ('code' in validated) {
    return json(
      { error: validated.code, message: validated.message },
      validated.status,
    );
  }

  const { email, turnstileToken, scanId, marketingConsent } = validated;
  const ip = getClientIp(request);

  // Rate limit before expensive work
  try {
    const rl = await limitLead(ip);
    if (!rl.success) {
      return json(
        {
          error: 'rate_limited',
          message: 'Too many requests. Try again later.',
        },
        429,
        { 'Retry-After': String(rl.retryAfterSeconds) },
      );
    }
  } catch {
    // Fail open on limiter infra errors would invite abuse; fail closed with 503.
    return json(
      {
        error: 'rate_limit_unavailable',
        message: 'Service temporarily unavailable. Please retry.',
      },
      503,
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

  let scan;
  try {
    scan = await getScan(scanId);
  } catch {
    return json(
      {
        error: 'cache_unavailable',
        message: 'Service temporarily unavailable. Please retry.',
      },
      503,
    );
  }

  if (!scan) {
    return json(
      {
        error: 'scan_not_found',
        message: 'Scan not found. Run a new scan and try again.',
      },
      404,
    );
  }

  if (isScanExpired(scan)) {
    return json(
      {
        error: 'scan_expired',
        message: 'This scan has expired. Run a new scan and try again.',
      },
      410,
    );
  }

  // Atomic claim BEFORE Resend — concurrent duplicates must not double-send
  let claim;
  try {
    claim = await claimLeadSend(email, scanId);
  } catch {
    return json(
      {
        error: 'idempotency_unavailable',
        message: 'Service temporarily unavailable. Please retry.',
      },
      503,
    );
  }

  if (claim.status === 'already_sent') {
    return json(
      {
        ok: true,
        duplicate: true,
        message: 'Report already sent for this email and scan.',
      },
      200,
    );
  }

  if (claim.status === 'in_progress') {
    return json(
      {
        error: 'send_in_progress',
        message: 'A report send is already in progress. Please wait a moment.',
      },
      409,
    );
  }

  const sent = await sendFootprintReport(email, scan);
  if (!sent.ok) {
    await releaseLeadClaim(email, scanId).catch(() => undefined);
    return json(
      {
        error: 'resend_failed',
        message:
          'We could not send the report. Please retry in a minute. Your scan is still saved.',
      },
      502,
    );
  }

  await markLeadSent(email, scanId).catch(() => undefined);

  // Consent-gated list add — must not block report delivery
  let list: 'skipped' | 'subscribed' | 'failed' = 'skipped';
  if (marketingConsent) {
    const mc = await subscribeMailchimp(email);
    list = mc.ok ? 'subscribed' : 'failed';
  }

  return json(
    {
      ok: true,
      emailId: sent.id,
      list,
      message: 'Report sent. Check your inbox.',
    },
    200,
  );
}
