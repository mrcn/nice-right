/**
 * Shared Redis client (server-only).
 * Prefers Upstash when env is set; otherwise an in-memory store so local
 * /api/scan and /api/lead can run without cloud Redis (dev / live checks).
 */

import { Redis } from '@upstash/redis';
import { MemoryRedis } from '@/app/lib/memory-redis';

export type AppRedis = Redis | MemoryRedis;

let cached: AppRedis | null = null;
let memoryMode = false;

export function isMemoryRedisMode(): boolean {
  return memoryMode;
}

/**
 * Lazy singleton from UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 * Falls back to MemoryRedis when env is absent (local/dev).
 */
export function getRedis(): AppRedis {
  if (cached) return cached;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    memoryMode = true;
    cached = new MemoryRedis();
    return cached;
  }

  memoryMode = false;
  cached = new Redis({ url, token });
  return cached;
}

/** Test seam — reset singleton between suites. */
export function __resetRedisForTests(): void {
  cached = null;
  memoryMode = false;
}

/** Test seam — inject a mock client. */
export function __setRedisForTests(client: AppRedis | null): void {
  cached = client;
  memoryMode = client instanceof MemoryRedis;
}
