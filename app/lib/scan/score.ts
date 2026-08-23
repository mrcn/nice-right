/**
 * Draft footprint scoring with renormalize-on-missing providers.
 * Never zero-fill absent provider data as a failed score contribution.
 *
 * Draft weights (human-review before launch):
 * - pagespeed (lab avg of 4 categories): 0.40
 * - html signals: 0.25
 * - gbp live: 0.35
 */

import type { ScanFinding, ScanPartialFlags } from '@/app/lib/scan-cache';
import type { PsiResult } from '@/app/lib/scan/psi';
import { averagePsiScore } from '@/app/lib/scan/psi';
import type { HtmlSignalsResult } from '@/app/lib/scan/html-signals';
import type { GbpResult } from '@/app/lib/scan/dataforseo';

export const SCORE_WEIGHTS = {
  pagespeed: 0.4,
  html: 0.25,
  gbp: 0.35,
} as const;

export type ProviderKey = keyof typeof SCORE_WEIGHTS;

export type ScoreInput = {
  pagespeed: PsiResult;
  html: HtmlSignalsResult;
  gbp: GbpResult;
};

export type ScoreOutput = {
  score: number;
  findings: ScanFinding[];
  partial?: ScanPartialFlags;
  /** Which providers contributed after renormalization. */
  usedWeights: Partial<Record<ProviderKey, number>>;
};

/**
 * Renormalize draft weights over the providers that actually returned
 * a usable numeric score. Missing providers are omitted (not zero-filled).
 */
export function renormalizeWeights(
  present: ProviderKey[],
  weights: Record<ProviderKey, number> = SCORE_WEIGHTS,
): Partial<Record<ProviderKey, number>> {
  const total = present.reduce((sum, key) => sum + weights[key], 0);
  if (total <= 0) return {};
  const out: Partial<Record<ProviderKey, number>> = {};
  for (const key of present) {
    out[key] = weights[key] / total;
  }
  return out;
}

function providerScore(input: ScoreInput): {
  values: Partial<Record<ProviderKey, number>>;
  partial: ScanPartialFlags;
} {
  const values: Partial<Record<ProviderKey, number>> = {};
  const partial: ScanPartialFlags = {};

  if (input.pagespeed.ok) {
    const avg = averagePsiScore(input.pagespeed.categories);
    if (avg !== null) {
      values.pagespeed = avg;
    } else {
      partial.pagespeed = true;
    }
  } else {
    partial.pagespeed = true;
  }

  if (input.html.ok) {
    values.html = input.html.score;
  } else {
    partial.html = true;
  }

  if (input.gbp.ok) {
    values.gbp = input.gbp.score;
  } else if (!input.gbp.skipped) {
    // Intentional skip (no DataForSEO yet) is not a partial failure.
    partial.gbp = true;
  }

  return { values, partial };
}

function buildFindings(input: ScoreInput): ScanFinding[] {
  const findings: ScanFinding[] = [];

  if (input.pagespeed.ok) {
    const perf = input.pagespeed.categories.performance;
    if (perf !== null && perf < 50) {
      findings.push({
        title: 'Mobile speed is costing you jobs',
        detail: `Lab performance scored ${perf}/100 on mobile. Slow pages drop form fills and ad ROI.`,
        lever: 'cut_the_waste',
      });
    } else if (perf !== null && perf < 90) {
      findings.push({
        title: 'Page speed has room to grow',
        detail: `Lab performance scored ${perf}/100 (mobile). Field data: ${input.pagespeed.fieldOverall ?? 'unavailable'}.`,
        lever: 'cut_the_waste',
      });
    } else if (input.pagespeed.categories.seo !== null && input.pagespeed.categories.seo < 85) {
      findings.push({
        title: 'SEO basics need tightening',
        detail: `Lighthouse SEO scored ${input.pagespeed.categories.seo}/100 — findability leaks start here.`,
        lever: 'get_more_customers',
      });
    }
  } else {
    findings.push({
      title: 'Speed check incomplete',
      detail:
        'PageSpeed Insights did not return lab scores in time. Other signals still inform this snapshot.',
      lever: 'cut_the_waste',
    });
  }

  if (input.html.ok) {
    const s = input.html.signals;
    if (!s.hasLocalBusinessSchema || !s.metaDescription) {
      findings.push({
        title: 'Your site undersells the business',
        detail: [
          !s.metaDescription ? 'Missing meta description.' : null,
          !s.hasLocalBusinessSchema ? 'No LocalBusiness structured data.' : null,
          !s.hasTelLink ? 'No click-to-call link detected.' : null,
        ]
          .filter(Boolean)
          .join(' '),
        lever: 'charge_more',
      });
    }
  } else if (input.html.ok === false && !input.html.blocked) {
    findings.push({
      title: 'Homepage HTML could not be read',
      detail:
        'We could not fetch initial HTML (timeout or block). Cheerio sees first paint only — no full-browser audit claimed.',
      lever: 'get_more_customers',
    });
  }

  if (input.gbp.ok) {
    const g = input.gbp.signals;
    if (g.isClaimed === false) {
      findings.push({
        title: 'Google Business Profile may be unclaimed',
        detail: 'An unclaimed profile lets competitors and reviews go unmanaged.',
        lever: 'keep_customers',
      });
    } else if ((g.votesCount ?? 0) < 10) {
      findings.push({
        title: 'Thin review footprint on Google',
        detail: `Only ${g.votesCount ?? 0} Google reviews found${g.multiMatch ? ' (multiple listings matched — verify the right one)' : ''}.`,
        lever: 'keep_customers',
      });
    } else if (g.ratingValue !== null && g.ratingValue < 4.3) {
      findings.push({
        title: 'Rating is below the local trust bar',
        detail: `Listing averages ${g.ratingValue}/5 from ${g.votesCount ?? 0} reviews.`,
        lever: 'keep_customers',
      });
    }
  } else if (input.gbp.ok === false && input.gbp.skipped) {
    // DataForSEO intentionally off — no GBP finding.
  } else if (input.gbp.ok === false && input.gbp.empty) {
    findings.push({
      title: 'No clear Google Business match',
      detail:
        'Live GBP lookup returned no confident match for that name + city. We did not invent listing data.',
      lever: 'get_more_customers',
    });
  } else {
    findings.push({
      title: 'Google listing check incomplete',
      detail:
        'DataForSEO GBP live did not return usable data. Score weights were renormalized without inventing reviews.',
      lever: 'get_more_customers',
    });
  }

  // Prefer 2–3 headlines; keep strongest first
  return findings.slice(0, 3);
}

export function computeFootprintScore(input: ScoreInput): ScoreOutput {
  const { values, partial } = providerScore(input);
  const present = (Object.keys(values) as ProviderKey[]).filter(
    (k) => typeof values[k] === 'number',
  );

  if (present.length === 0) {
    return {
      score: 0,
      findings: [
        {
          title: 'Scan could not collect signals',
          detail:
            'Every upstream provider failed. Retry shortly — we never fabricate GBP or speed scores.',
        },
      ],
      partial,
      usedWeights: {},
    };
  }

  const usedWeights = renormalizeWeights(present);
  let weighted = 0;
  for (const key of present) {
    weighted += (values[key] as number) * (usedWeights[key] as number);
  }
  const score = Math.round(Math.max(0, Math.min(100, weighted)));

  const hasPartial = Boolean(partial.pagespeed || partial.html || partial.gbp);

  return {
    score,
    findings: buildFindings(input),
    partial: hasPartial ? partial : undefined,
    usedWeights,
  };
}
