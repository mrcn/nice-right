/**
 * SSRF-safe URL validation + fetch with connection-time IP pinning.
 * http(s) only; deny private/link-local/metadata/IPv6 ULA; ≤3 redirects
 * with re-validation each hop.
 */

import dns from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import { URL } from 'node:url';

export type UrlGuardErrorCode =
  | 'invalid_url'
  | 'blocked_scheme'
  | 'blocked_host'
  | 'blocked_ip'
  | 'non_canonical_ip'
  | 'dns_failed'
  | 'redirect_limit'
  | 'timeout'
  | 'body_too_large'
  | 'fetch_failed';

export class UrlGuardError extends Error {
  readonly code: UrlGuardErrorCode;

  constructor(code: UrlGuardErrorCode, message: string) {
    super(message);
    this.name = 'UrlGuardError';
    this.code = code;
  }
}

export type ResolvedTarget = {
  url: URL;
  address: string;
  family: 4 | 6;
};

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'metadata.google.internal',
  'metadata.google',
  'metadata',
]);

const MAX_REDIRECTS = 3;
const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_BYTES = 1_500_000;

/** Normalize website URL for cache keys (lowercase host, strip hash/trailing slash). */
export function normalizeWebsiteUrl(input: string): string {
  const url = new URL(input.trim());
  url.hash = '';
  url.hostname = url.hostname.toLowerCase();
  if (
    (url.protocol === 'http:' && url.port === '80') ||
    (url.protocol === 'https:' && url.port === '443')
  ) {
    url.port = '';
  }
  let href = url.href;
  if (href.endsWith('/') && url.pathname === '/') {
    // keep origin slash for roots only via href already
  } else if (href.endsWith('/') && url.pathname.length > 1) {
    href = href.slice(0, -1);
  }
  return href;
}

/**
 * Parse + static-validate a user-supplied URL (no DNS yet).
 * Rejects non-http(s), credentials, blocked hostnames, and bad IP literals.
 */
export function assertSafeHttpUrl(raw: string): URL {
  if (!raw || typeof raw !== 'string' || raw.trim().length === 0) {
    throw new UrlGuardError('invalid_url', 'Website URL is required.');
  }

  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new UrlGuardError('invalid_url', 'Website URL is not valid.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new UrlGuardError(
      'blocked_scheme',
      'Only http and https URLs are allowed.',
    );
  }

  if (url.username || url.password) {
    throw new UrlGuardError('invalid_url', 'URLs with credentials are not allowed.');
  }

  // Node may keep brackets on IPv6 hostnames (e.g. "[::1]").
  const host = stripIpv6Brackets(url.hostname.toLowerCase());
  if (!host) {
    throw new UrlGuardError('invalid_url', 'Website URL is missing a host.');
  }

  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith('.localhost')) {
    throw new UrlGuardError('blocked_host', 'This host is not allowed.');
  }

  // Hostname that looks like an IP must be canonical + public
  const ipVersion = net.isIP(host);
  if (ipVersion) {
    if (!isCanonicalIpLiteral(host, ipVersion as 4 | 6)) {
      throw new UrlGuardError(
        'non_canonical_ip',
        'Non-canonical IP literals are not allowed.',
      );
    }
    if (isBlockedIp(host)) {
      throw new UrlGuardError('blocked_ip', 'Private or link-local IPs are not allowed.');
    }
  } else if (looksLikeNonCanonicalIp(host)) {
    throw new UrlGuardError(
      'non_canonical_ip',
      'Non-canonical IP literals are not allowed.',
    );
  }

  return url;
}

export function stripIpv6Brackets(host: string): string {
  if (host.startsWith('[') && host.endsWith(']')) {
    return host.slice(1, -1);
  }
  return host;
}

/** Reject octal/hex/partial IP forms Node might still parse oddly. */
export function looksLikeNonCanonicalIp(host: string): boolean {
  // IPv4-ish with leading zeros (0177.0.0.1) or hex (0x7f.0.0.1)
  if (/^0x[0-9a-f.]+$/i.test(host)) return true;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return host.split('.').some((octet) => octet.length > 1 && octet.startsWith('0'));
  }
  // Decimal / dotted forms that aren't valid IPs but look numeric
  if (/^\d+$/.test(host)) return true;
  return false;
}

export function isCanonicalIpLiteral(host: string, family: 4 | 6): boolean {
  if (family === 4) {
    if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return false;
    const parts = host.split('.').map(Number);
    if (parts.some((n) => n > 255)) return false;
    // No leading zeros
    return host.split('.').every((octet) => String(Number(octet)) === octet);
  }
  // IPv6: require lowercase-ish expanded forms without IPv4-tail weirdness we already map
  const normalized = host.toLowerCase();
  return net.isIP(normalized) === 6 && normalized === host.toLowerCase();
}

export function isBlockedIp(ip: string): boolean {
  const version = net.isIP(ip);
  if (!version) return true;

  if (version === 4) {
    return isBlockedIpv4(ip);
  }

  const lower = ip.toLowerCase();
  // IPv4-mapped IPv6
  const mapped = lower.match(/^:ffff:(\d+\.\d+\.\d+\.\d+)$/i) ||
    lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) {
    return isBlockedIpv4(mapped[1]);
  }
  // Also ::ffff:aabb:ccdd form
  const hexMapped = lower.match(/^:?ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (hexMapped || lower.startsWith('::ffff:') || lower.startsWith(':ffff:')) {
    try {
      const full = expandIpv6(lower);
      if (full.startsWith('0000:0000:0000:0000:0000:ffff:')) {
        const hi = parseInt(full.split(':')[6], 16);
        const lo = parseInt(full.split(':')[7], 16);
        const v4 = `${(hi >> 8) & 255}.${hi & 255}.${(lo >> 8) & 255}.${lo & 255}`;
        return isBlockedIpv4(v4);
      }
    } catch {
      return true;
    }
  }

  return isBlockedIpv6(lower);
}

function isBlockedIpv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    return true;
  }
  const [a, b] = parts;

  // 0.0.0.0/8, 127.0.0.0/8
  if (a === 0 || a === 127) return true;
  // 10.0.0.0/8
  if (a === 10) return true;
  // 172.16.0.0/12
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.168.0.0/16
  if (a === 192 && b === 168) return true;
  // 169.254.0.0/16 link-local + cloud metadata
  if (a === 169 && b === 254) return true;
  // 100.64.0.0/10 CGNAT
  if (a === 100 && b >= 64 && b <= 127) return true;
  // 192.0.0.0/24, 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 docs
  if (a === 192 && b === 0) return true;
  if (a === 198 && (b === 51 || b === 18)) return true;
  if (a === 203 && b === 0) return true;
  // 224.0.0.0/4 multicast, 240.0.0.0/4 reserved
  if (a >= 224) return true;

  return false;
}

function isBlockedIpv6(ip: string): boolean {
  const full = expandIpv6(ip);
  const first = parseInt(full.split(':')[0], 16);

  // :: / unspecified and ::1 loopback
  if (full === '0000:0000:0000:0000:0000:0000:0000:0000') return true;
  if (full === '0000:0000:0000:0000:0000:0000:0000:0001') return true;
  // fe80::/10 link-local
  if ((first & 0xffc0) === 0xfe80) return true;
  // fc00::/7 unique local
  if ((first & 0xfe00) === 0xfc00) return true;
  // ff00::/8 multicast
  if ((first & 0xff00) === 0xff00) return true;
  // 2001:db8::/32 documentation
  if (full.startsWith('2001:0db8:')) return true;

  return false;
}

function expandIpv6(ip: string): string {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, '');
  if (lower.includes('.')) {
    // mixed — expand IPv4 tail first
    const lastColon = lower.lastIndexOf(':');
    const v4 = lower.slice(lastColon + 1);
    const v6 = lower.slice(0, lastColon);
    const [a, b, c, d] = v4.split('.').map(Number);
    const mixed = `${v6}:${((a << 8) | b).toString(16)}:${((c << 8) | d).toString(16)}`;
    return expandIpv6(mixed);
  }
  const parts = lower.split('::');
  let head = parts[0] ? parts[0].split(':') : [];
  let tail = parts[1] ? parts[1].split(':') : [];
  if (parts.length > 2) throw new Error('bad ipv6');
  const missing = 8 - (head.length + tail.length);
  const filled = [
    ...head,
    ...Array(Math.max(0, missing)).fill('0'),
    ...tail,
  ];
  return filled.map((p) => p.padStart(4, '0')).join(':');
}

/**
 * Resolve hostname and assert the dialed IP is public.
 * Pins a single A/AAAA result for the subsequent connect.
 */
export async function resolvePublicAddress(hostname: string): Promise<{
  address: string;
  family: 4 | 6;
}> {
  const host = stripIpv6Brackets(hostname.toLowerCase());
  const ipVersion = net.isIP(host);
  if (ipVersion) {
    if (isBlockedIp(host)) {
      throw new UrlGuardError('blocked_ip', 'Private or link-local IPs are not allowed.');
    }
    return { address: host, family: ipVersion as 4 | 6 };
  }

  let result: { address: string; family: number };
  try {
    result = await dns.lookup(host, { all: false });
  } catch {
    throw new UrlGuardError('dns_failed', 'Could not resolve website hostname.');
  }

  if (isBlockedIp(result.address)) {
    throw new UrlGuardError('blocked_ip', 'Resolved IP is private or link-local.');
  }

  return { address: result.address, family: result.family as 4 | 6 };
}

export async function resolveSafeTarget(rawUrl: string): Promise<ResolvedTarget> {
  const url = assertSafeHttpUrl(rawUrl);
  const resolved = await resolvePublicAddress(url.hostname);
  return { url, address: resolved.address, family: resolved.family };
}

export type GuardedFetchResult = {
  finalUrl: string;
  status: number;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
};

/**
 * Fetch with DNS pin at dial time and redirect hop re-validation (max 3).
 */
export async function guardedFetch(
  rawUrl: string,
  options: {
    timeoutMs?: number;
    maxBytes?: number;
    maxRedirects?: number;
    method?: 'GET' | 'HEAD';
    headers?: Record<string, string>;
  } = {},
): Promise<GuardedFetchResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;
  const maxRedirects = options.maxRedirects ?? MAX_REDIRECTS;
  let current = rawUrl;

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const target = await resolveSafeTarget(current);
    const response = await fetchPinned(target, {
      timeoutMs,
      maxBytes,
      method: options.method ?? 'GET',
      headers: options.headers,
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.location;
      if (!location || typeof location !== 'string') {
        throw new UrlGuardError('fetch_failed', 'Redirect without Location header.');
      }
      if (hop === maxRedirects) {
        throw new UrlGuardError(
          'redirect_limit',
          `Exceeded maximum of ${maxRedirects} redirects.`,
        );
      }
      current = new URL(location, target.url).href;
      continue;
    }

    return {
      finalUrl: target.url.href,
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  }

  throw new UrlGuardError('redirect_limit', `Exceeded maximum of ${maxRedirects} redirects.`);
}

function fetchPinned(
  target: ResolvedTarget,
  opts: {
    timeoutMs: number;
    maxBytes: number;
    method: 'GET' | 'HEAD';
    headers?: Record<string, string>;
  },
): Promise<GuardedFetchResult> {
  const { url, address, family } = target;
  const lib = url.protocol === 'https:' ? https : http;
  const port =
    url.port !== ''
      ? Number(url.port)
      : url.protocol === 'https:'
        ? 443
        : 80;

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: address,
        port,
        path: `${url.pathname}${url.search}`,
        method: opts.method,
        servername: url.hostname,
        headers: {
          host: url.host,
          'user-agent': 'NiceRightFootprintScanner/1.0',
          accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
          ...opts.headers,
        },
        lookup: (_hostname, lookupOpts, cb) => {
          // Pin to the validated address — ignore any later DNS change.
          const all = typeof lookupOpts === 'object' && lookupOpts?.all;
          if (all) {
            (
              cb as (
                err: Error | null,
                addresses: Array<{ address: string; family: number }>,
              ) => void
            )(null, [{ address, family }]);
            return;
          }
          (cb as (err: Error | null, address: string, family: number) => void)(
            null,
            address,
            family,
          );
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        res.on('data', (chunk: Buffer) => {
          size += chunk.length;
          if (size > opts.maxBytes) {
            req.destroy();
            reject(
              new UrlGuardError('body_too_large', 'Response body exceeded size limit.'),
            );
            return;
          }
          chunks.push(chunk);
        });
        res.on('end', () => {
          resolve({
            finalUrl: url.href,
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      },
    );

    req.setTimeout(opts.timeoutMs, () => {
      req.destroy();
      reject(new UrlGuardError('timeout', 'Request timed out.'));
    });

    req.on('error', (err) => {
      reject(
        new UrlGuardError(
          'fetch_failed',
          err instanceof Error ? err.message : 'Fetch failed.',
        ),
      );
    });

    req.end();
  });
}
