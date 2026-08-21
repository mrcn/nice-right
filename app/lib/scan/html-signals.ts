/**
 * Initial-HTML signals via cheerio (no headless browser).
 * Budget: ~10s including guarded fetch.
 */

import * as cheerio from 'cheerio';
import {
  guardedFetch,
  UrlGuardError,
} from '@/app/lib/scan/url-guard';

export const HTML_TIMEOUT_MS = 10_000;

export type HtmlSignals = {
  title: string | null;
  metaDescription: string | null;
  hasH1: boolean;
  h1Text: string | null;
  hasViewport: boolean;
  hasCanonical: boolean;
  hasOpenGraph: boolean;
  hasJsonLd: boolean;
  hasLocalBusinessSchema: boolean;
  hasTelLink: boolean;
  hasMailto: boolean;
  hasHttps: boolean;
  finalUrl: string;
};

export type HtmlSignalsResult =
  | { ok: true; signals: HtmlSignals; score: number }
  | { ok: false; reason: string; timedOut?: boolean; blocked?: boolean };

function scoreSignals(s: HtmlSignals): number {
  let points = 0;
  const checks: Array<[boolean, number]> = [
    [Boolean(s.title && s.title.length >= 3), 12],
    [Boolean(s.metaDescription && s.metaDescription.length >= 40), 12],
    [s.hasH1, 12],
    [s.hasViewport, 10],
    [s.hasCanonical, 8],
    [s.hasOpenGraph, 10],
    [s.hasJsonLd, 10],
    [s.hasLocalBusinessSchema, 10],
    [s.hasTelLink, 6],
    [s.hasMailto, 5],
    [s.hasHttps, 5],
  ];
  for (const [ok, weight] of checks) {
    if (ok) points += weight;
  }
  return Math.max(0, Math.min(100, points));
}

function extractSignals(html: string, finalUrl: string): HtmlSignals {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr('content')?.trim() || null;
  const h1Text = $('h1').first().text().trim() || null;
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  const hasOpenGraph =
    $('meta[property^="og:"]').length > 0 ||
    $('meta[name^="og:"]').length > 0;

  let hasJsonLd = false;
  let hasLocalBusinessSchema = false;
  $('script[type="application/ld+json"]').each((_, el) => {
    hasJsonLd = true;
    const raw = $(el).text();
    try {
      const parsed = JSON.parse(raw) as unknown;
      const nodes = Array.isArray(parsed)
        ? parsed
        : parsed &&
            typeof parsed === 'object' &&
            '@graph' in (parsed as object)
          ? ((parsed as { '@graph': unknown })['@graph'] as unknown[])
          : [parsed];
      for (const node of nodes) {
        if (!node || typeof node !== 'object') continue;
        const t = (node as { '@type'?: string | string[] })['@type'];
        const types = Array.isArray(t) ? t : t ? [t] : [];
        if (
          types.some((x) =>
            /LocalBusiness|HomeAndConstructionBusiness|Electrician|Plumber|GeneralContractor/i.test(
              String(x),
            ),
          )
        ) {
          hasLocalBusinessSchema = true;
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });

  const hasTelLink = $('a[href^="tel:"]').length > 0;
  const hasMailto = $('a[href^="mailto:"]').length > 0;
  let hasHttps = false;
  try {
    hasHttps = new URL(finalUrl).protocol === 'https:';
  } catch {
    hasHttps = false;
  }

  return {
    title,
    metaDescription,
    hasH1: Boolean(h1Text),
    h1Text,
    hasViewport,
    hasCanonical,
    hasOpenGraph,
    hasJsonLd,
    hasLocalBusinessSchema,
    hasTelLink,
    hasMailto,
    hasHttps,
    finalUrl,
  };
}

export async function fetchHtmlSignals(
  websiteUrl: string,
  options: { timeoutMs?: number } = {},
): Promise<HtmlSignalsResult> {
  const timeoutMs = options.timeoutMs ?? HTML_TIMEOUT_MS;
  try {
    const res = await guardedFetch(websiteUrl, {
      timeoutMs,
      maxBytes: 1_500_000,
      maxRedirects: 3,
      method: 'GET',
    });

    if (res.status >= 400) {
      return { ok: false, reason: `http_${res.status}` };
    }

    const contentType = String(res.headers['content-type'] ?? '');
    if (
      contentType &&
      !/text\/html|application\/xhtml\+xml/i.test(contentType) &&
      !contentType.includes('text/plain')
    ) {
      return { ok: false, reason: 'not_html' };
    }

    const html = res.body.toString('utf8');
    const signals = extractSignals(html, res.finalUrl);
    return { ok: true, signals, score: scoreSignals(signals) };
  } catch (err) {
    if (err instanceof UrlGuardError) {
      return {
        ok: false,
        reason: err.code,
        timedOut: err.code === 'timeout',
        blocked:
          err.code === 'blocked_ip' ||
          err.code === 'blocked_host' ||
          err.code === 'blocked_scheme' ||
          err.code === 'non_canonical_ip',
      };
    }
    return { ok: false, reason: 'fetch_failed' };
  }
}
