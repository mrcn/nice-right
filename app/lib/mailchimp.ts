/**
 * Consent-gated Mailchimp subscribe. Failures must never block Resend success.
 */

import { createHash } from 'crypto';

export type MailchimpSubscribeResult =
  | { ok: true }
  | { ok: false; reason: string };

function md5Hex(input: string): string {
  // Mailchimp subscriber hash is MD5 of lowercase email.
  return createHash('md5').update(input).digest('hex');
}

/**
 * Add or update a list member. Only call when marketingConsent === true.
 * Swallows upstream errors into { ok: false } — never throw into the lead path.
 */
export async function subscribeMailchimp(
  email: string,
): Promise<MailchimpSubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !server || !listId) {
    return { ok: false, reason: 'misconfigured' };
  }

  const normalized = email.trim().toLowerCase();
  const hash = md5Hex(normalized);
  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email_address: normalized,
        status_if_new: 'subscribed',
        status: 'subscribed',
        tags: ['digital-footprint-scanner'],
      }),
    });

    if (!res.ok) {
      return { ok: false, reason: `mailchimp_http_${res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'mailchimp_network_error' };
  }
}
