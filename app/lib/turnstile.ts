/**
 * Cloudflare Turnstile siteverify helper (server-only).
 * Single-use tokens; call on every POST attempt.
 */

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: string };

type SiteverifyResponse = {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
};

const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify a Turnstile response token against Cloudflare.
 * Never log the secret. Site key stays NEXT_PUBLIC_*; secret is TURNSTILE_SECRET_KEY.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerifyResult> {
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return { ok: false, reason: 'missing_token' };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Pair with TurnstileField mock tokens when no site key is configured.
  if (!secret) {
    if (token.trim().startsWith('mock-turnstile-token-')) {
      return { ok: true };
    }
    return { ok: false, reason: 'misconfigured_secret' };
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token.trim());
  if (remoteIp && remoteIp !== 'unknown') {
    body.set('remoteip', remoteIp);
  }

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!res.ok) {
      return { ok: false, reason: `siteverify_http_${res.status}` };
    }

    const data = (await res.json()) as SiteverifyResponse;
    if (data.success) {
      return { ok: true };
    }

    const codes = data['error-codes']?.join(',') || 'verification_failed';
    return { ok: false, reason: codes };
  } catch {
    return { ok: false, reason: 'siteverify_network_error' };
  }
}
