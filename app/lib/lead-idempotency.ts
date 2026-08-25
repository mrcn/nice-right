/**
 * Atomic lead idempotency claim (SET NX) before Resend.
 * Concurrent duplicates must not double-send.
 */

import { getRedis } from '@/app/lib/redis';

export type LeadIdempotencyState = 'pending' | 'sent';

export type ClaimResult =
  | { status: 'claimed' }
  | { status: 'already_sent' }
  | { status: 'in_progress' };

/** TTL ≥ 24h per spec. */
export const LEAD_IDEMPOTENCY_TTL_SECONDS = 60 * 60 * 24;

export type LeadIdempotencyStore = {
  /** Atomic set-if-absent. Returns true when this caller won the claim. */
  setNx(
    key: string,
    value: LeadIdempotencyState,
    ttlSeconds: number,
  ): Promise<boolean>;
  get(key: string): Promise<LeadIdempotencyState | null>;
  set(
    key: string,
    value: LeadIdempotencyState,
    ttlSeconds: number,
  ): Promise<void>;
  del(key: string): Promise<void>;
};

export function leadIdempotencyKey(email: string, scanId: string): string {
  const normalized = email.trim().toLowerCase();
  return `lead:idempotency:${normalized}:${scanId}`;
}

/** In-memory store for concurrent unit tests (no Redis required). */
export function createMemoryIdempotencyStore(): LeadIdempotencyStore {
  const map = new Map<string, { value: LeadIdempotencyState; expiresAt: number }>();

  return {
    async setNx(key, value, ttlSeconds) {
      const now = Date.now();
      const existing = map.get(key);
      if (existing && existing.expiresAt > now) {
        return false;
      }
      map.set(key, { value, expiresAt: now + ttlSeconds * 1000 });
      return true;
    },
    async get(key) {
      const now = Date.now();
      const existing = map.get(key);
      if (!existing || existing.expiresAt <= now) {
        map.delete(key);
        return null;
      }
      return existing.value;
    },
    async set(key, value, ttlSeconds) {
      map.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    },
    async del(key) {
      map.delete(key);
    },
  };
}

export function createRedisIdempotencyStore(): LeadIdempotencyStore {
  return {
    async setNx(key, value, ttlSeconds) {
      const redis = getRedis();
      // Upstash returns "OK" when set, null when NX fails
      const result = await redis.set(key, value, {
        nx: true,
        ex: ttlSeconds,
      });
      return result === 'OK';
    },
    async get(key) {
      const redis = getRedis();
      const value = await redis.get<string>(key);
      if (value === 'pending' || value === 'sent') return value;
      return null;
    },
    async set(key, value, ttlSeconds) {
      const redis = getRedis();
      await redis.set(key, value, { ex: ttlSeconds });
    },
    async del(key) {
      const redis = getRedis();
      await redis.del(key);
    },
  };
}

/**
 * Claim the right to send for (email, scanId).
 * Must run BEFORE Resend. Mark sent after success; release on hard failure so retries work.
 */
export async function claimLeadSend(
  email: string,
  scanId: string,
  store: LeadIdempotencyStore = createRedisIdempotencyStore(),
  ttlSeconds: number = LEAD_IDEMPOTENCY_TTL_SECONDS,
): Promise<ClaimResult> {
  const key = leadIdempotencyKey(email, scanId);
  const won = await store.setNx(key, 'pending', ttlSeconds);
  if (won) return { status: 'claimed' };

  const existing = await store.get(key);
  if (existing === 'sent') return { status: 'already_sent' };
  return { status: 'in_progress' };
}

export async function markLeadSent(
  email: string,
  scanId: string,
  store: LeadIdempotencyStore = createRedisIdempotencyStore(),
  ttlSeconds: number = LEAD_IDEMPOTENCY_TTL_SECONDS,
): Promise<void> {
  await store.set(leadIdempotencyKey(email, scanId), 'sent', ttlSeconds);
}

/** Release claim after Resend failure so the client can retry. */
export async function releaseLeadClaim(
  email: string,
  scanId: string,
  store: LeadIdempotencyStore = createRedisIdempotencyStore(),
): Promise<void> {
  await store.del(leadIdempotencyKey(email, scanId));
}
