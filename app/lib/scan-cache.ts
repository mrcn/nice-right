/**
 * Shared scan-result cache contract for /api/lead and /api/scan.
 * Task .2 owns the interface; task .3 fills real scan payloads.
 * Content-key index (URL+name+city → opaque scanId) lives here so .3
 * does not invent a competing ScanResult shape.
 */

import { createHash, randomBytes } from 'node:crypto';
import { getRedis } from '@/app/lib/redis';

/** Opaque random token — never derive from URL/name/city. */
export type ScanId = string;

export type ScanLever =
  | 'get_more_customers'
  | 'charge_more'
  | 'keep_customers'
  | 'cut_the_waste';

export type ScanFinding = {
  title: string;
  detail: string;
  lever?: ScanLever;
};

/** Provider signals that were missing/failed; score weights should renormalize. */
export type ScanPartialFlags = {
  pagespeed?: boolean;
  html?: boolean;
  gbp?: boolean;
};

export type ScanResult = {
  scanId: ScanId;
  score: number;
  findings: ScanFinding[];
  websiteUrl: string;
  businessName: string;
  city: string;
  partial?: ScanPartialFlags;
  /** ISO timestamp when the entry was written */
  createdAt: string;
  /** ISO timestamp when the entry is logically expired (TTL ≥ 24h) */
  expiresAt: string;
};

const SCAN_KEY_PREFIX = 'scan:result:';
const SCAN_CONTENT_KEY_PREFIX = 'scan:content:';
/** Redis TTL slightly longer than logical 24h expiry so we can return 410 vs 404. */
export const SCAN_REDIS_TTL_SECONDS = 60 * 60 * 26;
export const SCAN_LOGICAL_TTL_MS = 60 * 60 * 24 * 1000;

function scanKey(scanId: string): string {
  return `${SCAN_KEY_PREFIX}${scanId}`;
}

function contentKeyRedis(contentKey: string): string {
  return `${SCAN_CONTENT_KEY_PREFIX}${contentKey}`;
}

/** Opaque random scanId — never derive from URL/name/city. */
export function createOpaqueScanId(): string {
  return `scan_${randomBytes(18).toString('hex')}`;
}

/**
 * Content dedupe key: normalized URL + business name + city.
 * Maps to an opaque scanId; the ScanResult itself stays under scan:result:.
 */
export function buildScanContentKey(
  websiteUrl: string,
  businessName: string,
  city: string,
): string {
  const material = [
    websiteUrl.trim().toLowerCase(),
    businessName.trim().toLowerCase(),
    city.trim().toLowerCase(),
  ].join('|');
  return createHash('sha256').update(material).digest('hex');
}

/** Lookup opaque scanId for a content key (24h dedupe). */
export async function getScanIdByContentKey(
  contentKey: string,
): Promise<string | null> {
  if (!contentKey) return null;
  const redis = getRedis();
  const value = await redis.get<string>(contentKeyRedis(contentKey));
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/** Persist content-key → scanId with the same TTL as scan results. */
export async function putScanContentKey(
  contentKey: string,
  scanId: string,
): Promise<void> {
  if (!contentKey || !scanId) {
    throw new Error('putScanContentKey requires contentKey and scanId');
  }
  const redis = getRedis();
  await redis.set(contentKeyRedis(contentKey), scanId, {
    ex: SCAN_REDIS_TTL_SECONDS,
  });
}

export function isScanExpired(scan: ScanResult, nowMs: number = Date.now()): boolean {
  const expires = Date.parse(scan.expiresAt);
  return Number.isFinite(expires) && expires <= nowMs;
}

/**
 * Lookup a cached scan by opaque scanId.
 * Returns null when the key is absent (caller maps to 404).
 * Callers should treat isScanExpired(scan) as 410 Gone.
 */
export async function getScan(scanId: string): Promise<ScanResult | null> {
  if (!scanId || typeof scanId !== 'string') return null;
  const redis = getRedis();
  const value = await redis.get<ScanResult>(scanKey(scanId));
  if (!value || typeof value !== 'object') return null;
  if (typeof value.scanId !== 'string' || typeof value.score !== 'number') {
    return null;
  }
  return value;
}

/**
 * Persist a scan result. Task .3 writes real scans; tests may put fakes.
 * Always stores under the opaque scanId on the payload (never a content hash).
 */
export async function putScan(scan: ScanResult): Promise<void> {
  if (!scan?.scanId) {
    throw new Error('putScan requires scan.scanId');
  }
  const redis = getRedis();
  await redis.set(scanKey(scan.scanId), scan, { ex: SCAN_REDIS_TTL_SECONDS });
}

/** Helper for tests / scaffolding until /api/scan exists. */
export function buildScanResult(
  partial: Omit<ScanResult, 'createdAt' | 'expiresAt'> & {
    createdAt?: string;
    expiresAt?: string;
  },
): ScanResult {
  const createdAt = partial.createdAt ?? new Date().toISOString();
  const expiresAt =
    partial.expiresAt ??
    new Date(Date.parse(createdAt) + SCAN_LOGICAL_TTL_MS).toISOString();
  return {
    ...partial,
    createdAt,
    expiresAt,
  };
}
