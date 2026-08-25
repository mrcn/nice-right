/**
 * PageSpeed Insights v5 — all four Lighthouse categories (lab).
 * Budget: keep under route maxDuration (default 45s).
 */

export const PSI_TIMEOUT_MS = 45_000;

export type PsiCategoryScores = {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
};

export type PsiResult =
  | {
      ok: true;
      strategy: 'mobile';
      categories: PsiCategoryScores;
      /** Field CrUX overall category when present (ORIGIN/URL); null if missing. */
      fieldOverall: string | null;
      source: 'lab';
    }
  | {
      ok: false;
      reason: string;
      timedOut?: boolean;
    };

const CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
] as const;

function scoreFromCategory(cat: unknown): number | null {
  if (!cat || typeof cat !== 'object') return null;
  const score = (cat as { score?: unknown }).score;
  if (typeof score !== 'number' || Number.isNaN(score)) return null;
  return Math.round(Math.max(0, Math.min(1, score)) * 100);
}

/**
 * Run PSI for mobile strategy with all four categories.
 * Missing CrUX is tolerated — lab scores still count.
 */
export async function fetchPagespeed(
  websiteUrl: string,
  options: { timeoutMs?: number; apiKey?: string } = {},
): Promise<PsiResult> {
  const apiKey = options.apiKey ?? process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: 'missing_api_key' };
  }

  const timeoutMs = options.timeoutMs ?? PSI_TIMEOUT_MS;
  const endpoint = new URL(
    'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  );
  endpoint.searchParams.set('url', websiteUrl);
  endpoint.searchParams.set('strategy', 'mobile');
  endpoint.searchParams.set('key', apiKey);
  for (const category of CATEGORIES) {
    endpoint.searchParams.append('category', category);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint.href, {
      method: 'GET',
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });

    if (!res.ok) {
      return { ok: false, reason: `http_${res.status}` };
    }

    const data = (await res.json()) as {
      lighthouseResult?: {
        categories?: Record<string, { score?: number | null }>;
      };
      loadingExperience?: { overall_category?: string };
      originLoadingExperience?: { overall_category?: string };
    };

    const cats = data.lighthouseResult?.categories ?? {};
    const categories: PsiCategoryScores = {
      performance: scoreFromCategory(cats.performance),
      accessibility: scoreFromCategory(cats.accessibility),
      bestPractices: scoreFromCategory(cats['best-practices']),
      seo: scoreFromCategory(cats.seo),
    };

    const anyLab = Object.values(categories).some((v) => v !== null);
    if (!anyLab) {
      return { ok: false, reason: 'empty_categories' };
    }

    const fieldOverall =
      data.loadingExperience?.overall_category ??
      data.originLoadingExperience?.overall_category ??
      null;

    return {
      ok: true,
      strategy: 'mobile',
      categories,
      fieldOverall,
      source: 'lab',
    };
  } catch (err) {
    const timedOut =
      err instanceof Error &&
      (err.name === 'AbortError' || /aborted/i.test(err.message));
    return {
      ok: false,
      reason: timedOut ? 'timeout' : 'network_error',
      timedOut,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Average available lab category scores (0–100). */
export function averagePsiScore(categories: PsiCategoryScores): number | null {
  const values = Object.values(categories).filter(
    (v): v is number => typeof v === 'number',
  );
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
