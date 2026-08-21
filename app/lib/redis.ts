/**
 * Shared Upstash Redis client (server-only).
 * Used by scan-cache, rate limits, and lead idempotency.
 */

import { Redis } from '@upstash/redis';

let cached: Redis | null = null;

/**
 * Lazy singleton from UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 * Throws if env is missing — callers should fail closed on lead/scan routes.
 */
export function getRedis(): Redis {
  if (cached) return cached;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      'Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN',
    );
  }

  cached = new Redis({ url, token });
  return cached;
}

/** Test seam — reset singleton between suites. */
export function __resetRedisForTests(): void {
  cached = null;
}

/** Test seam — inject a mock client. */
export function __setRedisForTests(client: Redis | null): void {
  cached = client;
}
