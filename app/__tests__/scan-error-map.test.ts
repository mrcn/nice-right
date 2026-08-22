import { describe, expect, it } from 'vitest';
import { mapLeadError, mapScanError } from '@/app/scan/error-map';

describe('mapScanError', () => {
  it('maps contracted scan codes', () => {
    expect(mapScanError(403, { error: 'turnstile_failed' })).toMatch(/Bot check/);
    expect(mapScanError(429, { error: 'rate_limited' })).toMatch(/Too many scans/);
    expect(mapScanError(504, { error: 'upstream_timeout' })).toMatch(/too long/);
    expect(mapScanError(400, { error: 'blocked_url' })).toMatch(/cannot be scanned/);
  });

  it('falls back by status', () => {
    expect(mapScanError(429, {})).toMatch(/Too many scans/);
    expect(mapScanError(504, {})).toMatch(/too long/);
  });
});

describe('mapLeadError', () => {
  it('maps contracted lead codes', () => {
    expect(mapLeadError(400, { error: 'invalid_email' })).toMatch(/valid email/);
    expect(mapLeadError(403, { error: 'turnstile_failed' })).toMatch(/Bot check/);
    expect(mapLeadError(404, { error: 'scan_not_found' })).toMatch(/not found/i);
    expect(mapLeadError(410, { error: 'scan_expired' })).toMatch(/expired/);
    expect(mapLeadError(409, { error: 'send_in_progress' })).toMatch(/in progress/);
    expect(mapLeadError(502, { error: 'resend_failed' })).toMatch(/could not send/i);
    expect(mapLeadError(429, { error: 'rate_limited' })).toMatch(/Too many requests/);
  });
});
