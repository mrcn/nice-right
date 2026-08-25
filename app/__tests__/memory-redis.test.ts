import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRedis } from '@/app/lib/memory-redis';
import {
  __resetRedisForTests,
  getRedis,
  isMemoryRedisMode,
} from '@/app/lib/redis';
import { verifyTurnstile } from '@/app/lib/turnstile';

describe('MemoryRedis', () => {
  it('stores and returns values with TTL', async () => {
    const redis = new MemoryRedis();
    await redis.set('k', { a: 1 }, { ex: 60 });
    expect(await redis.get<{ a: number }>('k')).toEqual({ a: 1 });
  });

  it('honors nx — second set fails while key lives', async () => {
    const redis = new MemoryRedis();
    expect(await redis.set('nx', 'pending', { nx: true, ex: 60 })).toBe('OK');
    expect(await redis.set('nx', 'other', { nx: true, ex: 60 })).toBeNull();
    expect(await redis.get('nx')).toBe('pending');
  });
});

describe('getRedis fallback', () => {
  beforeEach(() => {
    __resetRedisForTests();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it('uses memory mode when Upstash env is absent', () => {
    const client = getRedis();
    expect(isMemoryRedisMode()).toBe(true);
    expect(client).toBeInstanceOf(MemoryRedis);
  });
});

describe('verifyTurnstile mock tokens', () => {
  beforeEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it('accepts UI mock tokens when secret is not configured', async () => {
    const result = await verifyTurnstile('mock-turnstile-token-1-123');
    expect(result).toEqual({ ok: true });
  });

  it('rejects non-mock tokens when secret is missing', async () => {
    const result = await verifyTurnstile('not-a-mock');
    expect(result.ok).toBe(false);
  });
});
