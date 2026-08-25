import { describe, it, expect } from 'vitest';
import {
  computeFootprintScore,
  renormalizeWeights,
  SCORE_WEIGHTS,
} from '@/app/lib/scan/score';
import type { PsiResult } from '@/app/lib/scan/psi';
import type { HtmlSignalsResult } from '@/app/lib/scan/html-signals';
import type { GbpResult } from '@/app/lib/scan/dataforseo';

const psiOk = (perf = 80): PsiResult => ({
  ok: true,
  strategy: 'mobile',
  categories: {
    performance: perf,
    accessibility: perf,
    bestPractices: perf,
    seo: perf,
  },
  fieldOverall: null,
  source: 'lab',
});

const htmlOk = (score = 70): HtmlSignalsResult => ({
  ok: true,
  score,
  signals: {
    title: 'Acme Plumbing',
    metaDescription: 'Northwest Chicago plumbing for homes and businesses since 1998.',
    hasH1: true,
    h1Text: 'Acme Plumbing',
    hasViewport: true,
    hasCanonical: true,
    hasOpenGraph: true,
    hasJsonLd: true,
    hasLocalBusinessSchema: true,
    hasTelLink: true,
    hasMailto: false,
    hasHttps: true,
    finalUrl: 'https://acme.example/',
  },
});

const gbpOk = (score = 75): GbpResult => ({
  ok: true,
  score,
  signals: {
    title: 'Acme Plumbing',
    ratingValue: 4.6,
    votesCount: 40,
    isClaimed: true,
    category: 'Plumber',
    address: 'Chicago, IL',
    phone: '+1 312 555 0100',
    domain: 'acme.example',
    totalPhotos: 12,
    multiMatch: false,
  },
});

describe('renormalizeWeights', () => {
  it('returns full draft weights when all providers present', () => {
    const weights = renormalizeWeights(['pagespeed', 'html', 'gbp']);
    expect(weights.pagespeed).toBeCloseTo(SCORE_WEIGHTS.pagespeed);
    expect(weights.html).toBeCloseTo(SCORE_WEIGHTS.html);
    expect(weights.gbp).toBeCloseTo(SCORE_WEIGHTS.gbp);
    const sum =
      (weights.pagespeed ?? 0) + (weights.html ?? 0) + (weights.gbp ?? 0);
    expect(sum).toBeCloseTo(1);
  });

  it('renormalizes remaining weights when a provider is missing', () => {
    const weights = renormalizeWeights(['pagespeed', 'html']);
    expect(weights.gbp).toBeUndefined();
    const sum = (weights.pagespeed ?? 0) + (weights.html ?? 0);
    expect(sum).toBeCloseTo(1);
    expect(weights.pagespeed).toBeCloseTo(
      SCORE_WEIGHTS.pagespeed / (SCORE_WEIGHTS.pagespeed + SCORE_WEIGHTS.html),
    );
  });

  it('does not invent weight for an empty provider set', () => {
    expect(renormalizeWeights([])).toEqual({});
  });
});

describe('computeFootprintScore', () => {
  it('scores 0–100 with all providers and returns 2–3 findings', () => {
    const weakHtml: HtmlSignalsResult = {
      ok: true,
      score: 40,
      signals: {
        title: 'Home',
        metaDescription: null,
        hasH1: false,
        h1Text: null,
        hasViewport: false,
        hasCanonical: false,
        hasOpenGraph: false,
        hasJsonLd: false,
        hasLocalBusinessSchema: false,
        hasTelLink: false,
        hasMailto: false,
        hasHttps: true,
        finalUrl: 'https://acme.example/',
      },
    };
    const weakGbp: GbpResult = {
      ok: true,
      score: 45,
      signals: {
        title: 'Acme',
        ratingValue: 3.8,
        votesCount: 4,
        isClaimed: false,
        category: 'Plumber',
        address: null,
        phone: null,
        domain: null,
        totalPhotos: 0,
        multiMatch: true,
      },
    };
    const result = computeFootprintScore({
      pagespeed: psiOk(40),
      html: weakHtml,
      gbp: weakGbp,
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.findings.length).toBeGreaterThanOrEqual(2);
    expect(result.findings.length).toBeLessThanOrEqual(3);
    expect(result.partial).toBeUndefined();
  });

  it('never zero-fills a missing provider — renormalizes instead', () => {
    const full = computeFootprintScore({
      pagespeed: psiOk(100),
      html: htmlOk(100),
      gbp: gbpOk(100),
    });
    const missingGbp = computeFootprintScore({
      pagespeed: psiOk(100),
      html: htmlOk(100),
      gbp: { ok: false, reason: 'timeout', timedOut: true },
    });

    // With perfect remaining signals, missing GBP must not drag toward 0
    expect(missingGbp.score).toBeGreaterThanOrEqual(95);
    expect(missingGbp.partial?.gbp).toBe(true);
    expect(missingGbp.usedWeights.gbp).toBeUndefined();
    expect(full.score).toBe(100);
  });

  it('labels partial when PSI fails but other signals survive', () => {
    const result = computeFootprintScore({
      pagespeed: { ok: false, reason: 'timeout', timedOut: true },
      html: htmlOk(80),
      gbp: gbpOk(80),
    });
    expect(result.score).toBeGreaterThan(0);
    expect(result.partial?.pagespeed).toBe(true);
    expect(result.usedWeights.pagespeed).toBeUndefined();
  });

  it('skips GBP without partial flag or incomplete finding when intentionally disabled', () => {
    const result = computeFootprintScore({
      pagespeed: psiOk(80),
      html: htmlOk(80),
      gbp: { ok: false, reason: 'skipped', skipped: true },
    });
    expect(result.partial?.gbp).toBeUndefined();
    expect(result.usedWeights.gbp).toBeUndefined();
    expect(result.findings.some((f) => /google listing|gbp|dataforseo/i.test(f.title + f.detail))).toBe(
      false,
    );
    // PSI + HTML only — renormalized perfect-ish scores stay high
    expect(result.score).toBeGreaterThanOrEqual(75);
  });

  it('returns score 0 with clear finding when every provider fails', () => {
    const result = computeFootprintScore({
      pagespeed: { ok: false, reason: 'network_error' },
      html: { ok: false, reason: 'timeout', timedOut: true },
      gbp: { ok: false, reason: 'no_match', empty: true },
    });
    expect(result.score).toBe(0);
    expect(result.partial?.pagespeed).toBe(true);
    expect(result.partial?.html).toBe(true);
    expect(result.partial?.gbp).toBe(true);
    expect(result.findings[0]?.title).toMatch(/could not collect/i);
  });
});
