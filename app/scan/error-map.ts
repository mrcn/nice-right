/**
 * Map contracted /api/scan and /api/lead error codes to user-facing copy.
 */

export type ApiErrorBody = {
  error?: string;
  message?: string;
};

const SCAN_ERRORS: Record<string, string> = {
  invalid_body: 'Check the form and try again.',
  invalid_website_url: 'Enter a valid website URL (https://…).',
  blocked_url: 'That website URL cannot be scanned.',
  invalid_business_name: 'Enter a business name (2–200 characters).',
  invalid_city: 'Enter a city (2–120 characters).',
  invalid_turnstile_token: 'Complete the bot check, then try again.',
  turnstile_failed: 'Bot check failed. Complete the captcha and retry.',
  rate_limited: 'Too many scans. Wait a bit, then try again.',
  rate_limit_unavailable: 'Service temporarily unavailable. Please retry.',
  cache_unavailable: 'Service temporarily unavailable. Please retry.',
  upstream_timeout:
    'The scan took too long. Please retry — your inputs are still filled.',
  upstream_failed: 'We could not gather enough signals. Please retry.',
};

const LEAD_ERRORS: Record<string, string> = {
  invalid_body: 'Check the email form and try again.',
  invalid_email: 'Enter a valid email address.',
  invalid_scan_id: 'Run a new scan, then request the report again.',
  invalid_turnstile_token: 'Complete the bot check, then try again.',
  turnstile_failed: 'Bot check failed. Complete the captcha and retry.',
  rate_limited: 'Too many requests. Wait a bit, then try again.',
  rate_limit_unavailable: 'Service temporarily unavailable. Please retry.',
  cache_unavailable: 'Service temporarily unavailable. Please retry.',
  scan_not_found: 'Scan not found. Run a new scan and try again.',
  scan_expired: 'This scan has expired. Run a new scan and try again.',
  send_in_progress: 'A report send is already in progress. Please wait.',
  resend_failed:
    'We could not send the report. Please retry in a minute — your scan is still saved.',
  idempotency_unavailable: 'Service temporarily unavailable. Please retry.',
};

export function mapScanError(
  status: number,
  body: ApiErrorBody | null,
): string {
  const code = body?.error;
  if (code && SCAN_ERRORS[code]) return SCAN_ERRORS[code];
  if (body?.message) return body.message;
  if (status === 429) return SCAN_ERRORS.rate_limited;
  if (status === 403) return SCAN_ERRORS.turnstile_failed;
  if (status === 504) return SCAN_ERRORS.upstream_timeout;
  if (status >= 500) return 'Something went wrong on our side. Please retry.';
  return 'Scan failed. Please check your inputs and try again.';
}

export function mapLeadError(
  status: number,
  body: ApiErrorBody | null,
): string {
  const code = body?.error;
  if (code && LEAD_ERRORS[code]) return LEAD_ERRORS[code];
  if (body?.message) return body.message;
  if (status === 429) return LEAD_ERRORS.rate_limited;
  if (status === 403) return LEAD_ERRORS.turnstile_failed;
  if (status === 404) return LEAD_ERRORS.scan_not_found;
  if (status === 410) return LEAD_ERRORS.scan_expired;
  if (status === 409) return LEAD_ERRORS.send_in_progress;
  if (status === 502) return LEAD_ERRORS.resend_failed;
  if (status >= 500) return 'Something went wrong on our side. Please retry.';
  return 'Could not send the report. Please try again.';
}
