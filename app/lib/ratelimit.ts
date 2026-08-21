/**
 * Shared Upstash sliding-window rate-limit helpers (server-only).
 * Owned here so /api/scan (task .3) reuses the same client + shapes.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { getRedis } from '@/app/lib/redis';

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Unix epoch ms when the window resets */
  reset: number;
  /** Seconds until reset — for Retry-After header */
  retryAfterSeconds: number;
};

const leadLimiterCache = new Map<string, Ratelimit>();
const scanLimiterCache = new Map<string, Ratelimit>();

function createSlidingWindow(
  prefix: string,
  requests: number,
  window: `${number} ${'s' | 'm' | 'h' | 'd'}`,
): Ratelimit {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix,
    analytics: false,
  });
}

/** Lead capture: 5 requests / hour / identifier (typically client IP). */
export function getLeadRateLimiter(): Ratelimit {
  const key = 'lead';
  let limiter = leadLimiterCache.get(key);
  if (!limiter) {
    limiter = createSlidingWindow('ratelimit:lead', 5, '1 h');
    leadLimiterCache.set(key, limiter);
  }
  return limiter;
}

/**
 * Expensive scan path: 3 requests / hour / IP.
 * Cache hits on /api/scan must NOT call this (task .3).
 */
export function getScanRateLimiter(): Ratelimit {
  const key = 'scan';
  let limiter = scanLimiterCache.get(key);
  if (!limiter) {
    limiter = createSlidingWindow('ratelimit:scan', 3, '1 h');
    scanLimiterCache.set(key, limiter);
  }
  return limiter;
}

export async function limitLead(
  identifier: string,
): Promise<RateLimitResult> {
  return normalize(await getLeadRateLimiter().limit(identifier));
}

export async function limitScan(
  identifier: string,
): Promise<RateLimitResult> {
  return normalize(await getScanRateLimiter().limit(identifier));
}

function normalize(result: {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}): RateLimitResult {
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((result.reset - Date.now()) / 1000),
  );
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
    retryAfterSeconds,
  };
}

/** Best-effort client IP from common proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}
