/**
 * Pure request validation for POST /api/scan.
 */

import {
  assertSafeHttpUrl,
  normalizeWebsiteUrl,
  UrlGuardError,
} from '@/app/lib/scan/url-guard';

export type ValidatedScan = {
  websiteUrl: string;
  businessName: string;
  city: string;
  turnstileToken: string;
};

export type ScanValidationError = {
  status: 400;
  code:
    | 'invalid_body'
    | 'invalid_website_url'
    | 'blocked_url'
    | 'invalid_business_name'
    | 'invalid_city'
    | 'invalid_turnstile_token';
  message: string;
};

export function validateScanBody(
  body: unknown,
): ValidatedScan | ScanValidationError {
  if (!body || typeof body !== 'object') {
    return {
      status: 400,
      code: 'invalid_body',
      message: 'Request body must be a JSON object.',
    };
  }

  const raw = body as Record<string, unknown>;
  const websiteRaw =
    typeof raw.websiteUrl === 'string'
      ? raw.websiteUrl
      : typeof raw.url === 'string'
        ? raw.url
        : '';
  const businessName =
    typeof raw.businessName === 'string' ? raw.businessName.trim() : '';
  const city = typeof raw.city === 'string' ? raw.city.trim() : '';
  const turnstileToken =
    typeof raw.turnstileToken === 'string' ? raw.turnstileToken.trim() : '';

  if (!businessName || businessName.length < 2 || businessName.length > 200) {
    return {
      status: 400,
      code: 'invalid_business_name',
      message: 'Business name is required (2–200 characters).',
    };
  }

  if (!city || city.length < 2 || city.length > 120) {
    return {
      status: 400,
      code: 'invalid_city',
      message: 'City is required (2–120 characters).',
    };
  }

  if (!turnstileToken) {
    return {
      status: 400,
      code: 'invalid_turnstile_token',
      message: 'Turnstile token is required.',
    };
  }

  let websiteUrl: string;
  try {
    const parsed = assertSafeHttpUrl(websiteRaw);
    websiteUrl = normalizeWebsiteUrl(parsed.href);
  } catch (err) {
    if (err instanceof UrlGuardError) {
      if (
        err.code === 'blocked_scheme' ||
        err.code === 'blocked_host' ||
        err.code === 'blocked_ip' ||
        err.code === 'non_canonical_ip'
      ) {
        return {
          status: 400,
          code: 'blocked_url',
          message: err.message,
        };
      }
    }
    return {
      status: 400,
      code: 'invalid_website_url',
      message: 'A valid http(s) website URL is required.',
    };
  }

  return { websiteUrl, businessName, city, turnstileToken };
}
