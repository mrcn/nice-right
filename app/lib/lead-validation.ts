/**
 * Pure request validation for POST /api/lead — easy to unit test.
 */

export type LeadRequestBody = {
  email?: unknown;
  turnstileToken?: unknown;
  scanId?: unknown;
  marketingConsent?: unknown;
};

export type ValidatedLead = {
  email: string;
  turnstileToken: string;
  scanId: string;
  marketingConsent: boolean;
};

export type LeadValidationError = {
  status: 400;
  code: 'invalid_email' | 'invalid_scan_id' | 'invalid_turnstile_token' | 'invalid_body';
  message: string;
};

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_RE.test(email);
}

export function validateLeadBody(
  body: unknown,
): ValidatedLead | LeadValidationError {
  if (!body || typeof body !== 'object') {
    return {
      status: 400,
      code: 'invalid_body',
      message: 'Request body must be a JSON object.',
    };
  }

  const raw = body as LeadRequestBody;
  const email =
    typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  const turnstileToken =
    typeof raw.turnstileToken === 'string' ? raw.turnstileToken.trim() : '';
  const scanId = typeof raw.scanId === 'string' ? raw.scanId.trim() : '';
  const marketingConsent = raw.marketingConsent === true;

  if (!isValidEmail(email)) {
    return {
      status: 400,
      code: 'invalid_email',
      message: 'A valid email address is required.',
    };
  }

  if (!scanId || scanId.length < 8 || scanId.length > 128) {
    return {
      status: 400,
      code: 'invalid_scan_id',
      message: 'A valid scanId is required.',
    };
  }

  if (!turnstileToken) {
    return {
      status: 400,
      code: 'invalid_turnstile_token',
      message: 'Turnstile token is required.',
    };
  }

  return { email, turnstileToken, scanId, marketingConsent };
}
