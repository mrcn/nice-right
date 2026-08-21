/**
 * Resend delivery for the Digital Footprint HTML report.
 */

import { Resend } from 'resend';
import type { ScanResult } from '@/app/lib/scan-cache';
import { buildReportHtml, buildReportSubject } from '@/app/lib/report-email';

export type SendReportResult =
  | { ok: true; id: string }
  | { ok: false; reason: string };

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function leadResendIdempotencyKey(
  email: string,
  scanId: string,
): string {
  return `lead-report/${email.trim().toLowerCase()}/${scanId}`.slice(0, 256);
}

export async function sendFootprintReport(
  email: string,
  scan: ScanResult,
): Promise<SendReportResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, reason: 'misconfigured_resend' };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || 'Nice Right <reports@niceright.com>';

  try {
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [email.trim()],
        subject: buildReportSubject(scan),
        html: buildReportHtml(scan),
      },
      {
        idempotencyKey: leadResendIdempotencyKey(email, scan.scanId),
      },
    );

    if (error) {
      return { ok: false, reason: error.message || 'resend_error' };
    }

    return { ok: true, id: data?.id || 'unknown' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'resend_throw';
    return { ok: false, reason: message };
  }
}
