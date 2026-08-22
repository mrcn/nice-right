/**
 * DataForSEO Google My Business Info — live endpoint.
 * Never invent GBP data on failure; return labeled miss instead.
 */

export const DATAFORSEO_TIMEOUT_MS = 20_000;

export type GbpSignals = {
  title: string | null;
  ratingValue: number | null;
  votesCount: number | null;
  isClaimed: boolean | null;
  category: string | null;
  address: string | null;
  phone: string | null;
  domain: string | null;
  totalPhotos: number | null;
  multiMatch: boolean;
};

export type GbpResult =
  | { ok: true; signals: GbpSignals; score: number }
  | {
      ok: false;
      reason: string;
      timedOut?: boolean;
      /** True when provider responded but no usable business row. */
      empty?: boolean;
    };

type DfsItem = {
  type?: string;
  title?: string;
  category?: string;
  address?: string;
  phone?: string;
  domain?: string;
  is_claimed?: boolean;
  total_photos?: number;
  rating?: {
    value?: number;
    votes_count?: number;
  };
};

function scoreGbp(signals: GbpSignals): number {
  let points = 40; // found a listing
  if (signals.isClaimed === true) points += 20;
  if (signals.ratingValue !== null) {
    points += Math.round(Math.min(5, Math.max(0, signals.ratingValue)) * 6);
  }
  if (signals.votesCount !== null) {
    if (signals.votesCount >= 50) points += 15;
    else if (signals.votesCount >= 10) points += 10;
    else if (signals.votesCount >= 1) points += 5;
  }
  if (signals.phone) points += 5;
  if (signals.domain) points += 5;
  if ((signals.totalPhotos ?? 0) >= 5) points += 5;
  return Math.max(0, Math.min(100, points));
}

function authHeader(login: string, password: string): string {
  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
}

/**
 * Live My Business Info lookup by business name + city.
 * location_name uses "<city>" which DataForSEO resolves when possible;
 * we append ",United States" for US contractor default.
 */
export async function fetchGbpLive(
  businessName: string,
  city: string,
  options: {
    timeoutMs?: number;
    login?: string;
    password?: string;
  } = {},
): Promise<GbpResult> {
  const login = options.login ?? process.env.DATAFORSEO_LOGIN;
  const password = options.password ?? process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return { ok: false, reason: 'missing_credentials' };
  }

  const timeoutMs = options.timeoutMs ?? DATAFORSEO_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const locationName = city.includes(',')
    ? city.trim()
    : `${city.trim()},United States`;

  try {
    const res = await fetch(
      'https://api.dataforseo.com/v3/business_data/google/my_business_info/live',
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          authorization: authHeader(login, password),
          'content-type': 'application/json',
        },
        body: JSON.stringify([
          {
            keyword: businessName.trim(),
            location_name: locationName,
            language_code: 'en',
          },
        ]),
      },
    );

    if (!res.ok) {
      return { ok: false, reason: `http_${res.status}` };
    }

    const data = (await res.json()) as {
      status_code?: number;
      tasks?: Array<{
        status_code?: number;
        result?: Array<{
          items_count?: number;
          items?: DfsItem[];
        }>;
      }>;
    };

    if (data.status_code && data.status_code !== 20000) {
      return { ok: false, reason: `dfs_status_${data.status_code}` };
    }

    const task = data.tasks?.[0];
    if (!task || (task.status_code && task.status_code !== 20000)) {
      return {
        ok: false,
        reason: `task_status_${task?.status_code ?? 'missing'}`,
      };
    }

    const items =
      task.result?.flatMap((r) => r.items ?? []).filter(
        (item) => item && item.type === 'google_business_info',
      ) ?? [];

    if (items.length === 0) {
      return { ok: false, reason: 'no_match', empty: true };
    }

    const primary = items[0];
    const signals: GbpSignals = {
      title: primary.title ?? null,
      ratingValue:
        typeof primary.rating?.value === 'number' ? primary.rating.value : null,
      votesCount:
        typeof primary.rating?.votes_count === 'number'
          ? primary.rating.votes_count
          : null,
      isClaimed:
        typeof primary.is_claimed === 'boolean' ? primary.is_claimed : null,
      category: primary.category ?? null,
      address: primary.address ?? null,
      phone: primary.phone ?? null,
      domain: primary.domain ?? null,
      totalPhotos:
        typeof primary.total_photos === 'number' ? primary.total_photos : null,
      multiMatch: items.length > 1,
    };

    return { ok: true, signals, score: scoreGbp(signals) };
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
