import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  validateLeadBody,
} from '@/app/lib/lead-validation';
import {
  buildReportHtml,
  buildReportSubject,
  STRATEGY_CALL_URL,
} from '@/app/lib/report-email';
import { buildScanResult } from '@/app/lib/scan-cache';

describe('lead validation', () => {
  it('accepts a well-formed lead body with consent defaulting false', () => {
    const result = validateLeadBody({
      email: ' Owner@Example.COM ',
      turnstileToken: 'tok_abc',
      scanId: 'scan_opaque_123456',
    });

    expect(result).toEqual({
      email: 'owner@example.com',
      turnstileToken: 'tok_abc',
      scanId: 'scan_opaque_123456',
      marketingConsent: false,
    });
  });

  it('rejects invalid email with 400 invalid_email', () => {
    const result = validateLeadBody({
      email: 'not-an-email',
      turnstileToken: 'tok',
      scanId: 'scan_opaque_123456',
    });

    expect(result).toMatchObject({
      status: 400,
      code: 'invalid_email',
    });
  });

  it('rejects missing turnstile token', () => {
    const result = validateLeadBody({
      email: 'a@b.co',
      turnstileToken: '   ',
      scanId: 'scan_opaque_123456',
    });

    expect(result).toMatchObject({
      status: 400,
      code: 'invalid_turnstile_token',
    });
  });

  it('rejects short scanId', () => {
    const result = validateLeadBody({
      email: 'a@b.co',
      turnstileToken: 'tok',
      scanId: 'short',
    });

    expect(result).toMatchObject({
      status: 400,
      code: 'invalid_scan_id',
    });
  });

  it('only treats explicit true as marketing consent', () => {
    expect(isValidEmail('ok@nice-right.com')).toBe(true);
    expect(
      validateLeadBody({
        email: 'ok@nice-right.com',
        turnstileToken: 'tok',
        scanId: 'scan_opaque_123456',
        marketingConsent: 'yes',
      }),
    ).toMatchObject({ marketingConsent: false });

    expect(
      validateLeadBody({
        email: 'ok@nice-right.com',
        turnstileToken: 'tok',
        scanId: 'scan_opaque_123456',
        marketingConsent: true,
      }),
    ).toMatchObject({ marketingConsent: true });
  });
});

describe('report HTML (four levers + CTA)', () => {
  it('includes all four levers and the strategy-call CTA', () => {
    const scan = buildScanResult({
      scanId: 'scan_test_report_1',
      score: 62,
      websiteUrl: 'https://example-hvac.com',
      businessName: 'Example HVAC',
      city: 'Chicago',
      findings: [
        {
          title: 'Reviews are thin',
          detail: 'Fewer public reviews than nearby competitors.',
          lever: 'get_more_customers',
        },
        {
          title: 'Slow mobile LCP',
          detail: 'Largest contentful paint hurts paid traffic.',
          lever: 'cut_the_waste',
        },
      ],
    });

    const html = buildReportHtml(scan);
    const subject = buildReportSubject(scan);

    expect(subject).toContain('Example HVAC');
    expect(subject).toContain('62');
    expect(html).toContain('Get More Customers');
    expect(html).toContain('Charge More');
    expect(html).toContain('Keep Customers');
    expect(html).toContain('Cut the Waste');
    expect(html).toContain(STRATEGY_CALL_URL);
    expect(html).toContain('Schedule 30 minutes');
    expect(html).toContain('Score 62/100');
    expect(html).toContain('Reviews are thin');
  });
});
