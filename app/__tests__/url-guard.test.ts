import { describe, it, expect } from 'vitest';
import {
  assertSafeHttpUrl,
  isBlockedIp,
  isCanonicalIpLiteral,
  looksLikeNonCanonicalIp,
  normalizeWebsiteUrl,
  UrlGuardError,
} from '@/app/lib/scan/url-guard';

describe('url guard — static validation', () => {
  it('accepts https contractor URLs', () => {
    const url = assertSafeHttpUrl('https://www.example-plumbing.com/services');
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('www.example-plumbing.com');
  });

  it('rejects non-http schemes', () => {
    expect(() => assertSafeHttpUrl('file:///etc/passwd')).toThrow(UrlGuardError);
    expect(() => assertSafeHttpUrl('ftp://example.com')).toThrow(UrlGuardError);
  });

  it('rejects localhost and metadata hosts', () => {
    expect(() => assertSafeHttpUrl('http://localhost/admin')).toThrow(
      /not allowed/i,
    );
    expect(() =>
      assertSafeHttpUrl('http://metadata.google.internal/latest'),
    ).toThrow(/not allowed/i);
  });

  it('rejects private IPv4 literals', () => {
    expect(() => assertSafeHttpUrl('http://127.0.0.1/')).toThrow(UrlGuardError);
    expect(() => assertSafeHttpUrl('http://10.0.0.5/')).toThrow(UrlGuardError);
    expect(() => assertSafeHttpUrl('http://192.168.1.1/')).toThrow(UrlGuardError);
    expect(() => assertSafeHttpUrl('http://169.254.169.254/')).toThrow(
      UrlGuardError,
    );
    expect(() => assertSafeHttpUrl('http://172.16.0.1/')).toThrow(UrlGuardError);
  });

  it('rejects IPv6 loopback, ULA, and link-local', () => {
    expect(isBlockedIp('::1')).toBe(true);
    expect(isBlockedIp('fc00::1')).toBe(true);
    expect(isBlockedIp('fe80::1')).toBe(true);
    expect(() => assertSafeHttpUrl('http://[::1]/')).toThrow(UrlGuardError);
  });

  it('rejects IPv4-mapped loopback forms', () => {
    expect(isBlockedIp('::ffff:127.0.0.1')).toBe(true);
    expect(isBlockedIp('::ffff:10.0.0.1')).toBe(true);
  });

  it('rejects non-canonical IPv4 literals', () => {
    expect(looksLikeNonCanonicalIp('0177.0.0.1')).toBe(true);
    expect(looksLikeNonCanonicalIp('0x7f.0.0.1')).toBe(true);
    expect(isCanonicalIpLiteral('127.0.0.1', 4)).toBe(true);
    expect(isCanonicalIpLiteral('0177.0.0.1', 4)).toBe(false);
    expect(() => assertSafeHttpUrl('http://0177.0.0.1/')).toThrow(UrlGuardError);
  });

  it('rejects URLs with embedded credentials', () => {
    expect(() =>
      assertSafeHttpUrl('https://user:pass@example.com/'),
    ).toThrow(UrlGuardError);
  });

  it('normalizes website URLs for content keys', () => {
    expect(normalizeWebsiteUrl('https://Example.COM/Path/#frag')).toBe(
      'https://example.com/Path',
    );
  });

  it('re-validates redirect hop targets with the same SSRF guard', () => {
    const base = assertSafeHttpUrl('https://example.com/start');
    // Each redirect Location must pass assertSafeHttpUrl before dial (≤3 hops).
    expect(() =>
      assertSafeHttpUrl(new URL('http://169.254.169.254/latest', base).href),
    ).toThrow(UrlGuardError);
    expect(() =>
      assertSafeHttpUrl(new URL('http://127.0.0.1/admin', base).href),
    ).toThrow(UrlGuardError);
    const safeHop = assertSafeHttpUrl(
      new URL('https://cdn.example.com/next', base).href,
    );
    expect(safeHop.hostname).toBe('cdn.example.com');
  });
});

describe('url guard — blocked IP ranges', () => {
  it('allows public unicast IPv4', () => {
    expect(isBlockedIp('8.8.8.8')).toBe(false);
    expect(isBlockedIp('1.1.1.1')).toBe(false);
  });

  it('blocks CGNAT and multicast', () => {
    expect(isBlockedIp('100.64.0.1')).toBe(true);
    expect(isBlockedIp('224.0.0.1')).toBe(true);
  });
});
