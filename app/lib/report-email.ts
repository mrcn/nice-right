/**
 * HTML Digital Footprint report — four levers + strategy-call CTA.
 * No PDF for v1.
 */

import type { ScanFinding, ScanLever, ScanResult } from '@/app/lib/scan-cache';

export const STRATEGY_CALL_URL = 'https://cal.com/niceright/30min';

const LEVERS: Array<{
  id: ScanLever;
  title: string;
  blurb: string;
}> = [
  {
    id: 'get_more_customers',
    title: 'Get More Customers',
    blurb:
      'Findability, reviews, and local visibility decide whether customers find you or your competitor.',
  },
  {
    id: 'charge_more',
    title: 'Charge More',
    blurb:
      'Proof, positioning, and trust signals on your site support higher close rates and healthier margins.',
  },
  {
    id: 'keep_customers',
    title: 'Keep Customers',
    blurb:
      'Retention and repeat work come from clear offers, useful reminders, and a site that keeps working after the click.',
  },
  {
    id: 'cut_the_waste',
    title: 'Cut the Waste',
    blurb:
      'Slow pages, dead CTAs, and paid referrals burn budget. Owned assets stop the leak.',
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function findingForLever(
  findings: ScanFinding[],
  lever: ScanLever,
): ScanFinding | undefined {
  return findings.find((f) => f.lever === lever);
}

export function buildReportSubject(scan: ScanResult): string {
  const name = scan.businessName?.trim() || 'your business';
  return `Your Digital Footprint Report — ${name} (score ${Math.round(scan.score)}/100)`;
}

export function buildReportHtml(scan: ScanResult): string {
  const score = Math.round(Math.min(100, Math.max(0, scan.score)));
  const business = escapeHtml(scan.businessName || 'Your business');
  const city = escapeHtml(scan.city || '');
  const url = escapeHtml(scan.websiteUrl || '');
  const headlines = (scan.findings || [])
    .slice(0, 3)
    .map(
      (f) =>
        `<li><strong>${escapeHtml(f.title)}</strong> — ${escapeHtml(f.detail)}</li>`,
    )
    .join('');

  const leverSections = LEVERS.map((lever) => {
    const match = findingForLever(scan.findings || [], lever.id);
    const body = match
      ? `<p><strong>${escapeHtml(match.title)}</strong></p><p>${escapeHtml(match.detail)}</p>`
      : `<p>${escapeHtml(lever.blurb)}</p>`;
    return `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #e5e5e5;">
          <h3 style="margin:0 0 8px;font-size:18px;color:#111;">${lever.title}</h3>
          ${body}
        </td>
      </tr>`;
  }).join('');

  const partialNote =
    scan.partial &&
    Object.values(scan.partial).some(Boolean)
      ? `<p style="color:#666;font-size:13px;">Some signals were partial for this run — treat the score as directional, not a final audit.</p>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Digital Footprint Report</title>
</head>
<body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f6f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;padding:32px 28px;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#888;">Nice Right</p>
              <h1 style="margin:0 0 12px;font-size:26px;line-height:1.25;color:#111;">Digital Footprint Report</h1>
              <p style="margin:0 0 8px;font-size:16px;">${business}${city ? ` · ${city}` : ''}</p>
              ${url ? `<p style="margin:0 0 20px;font-size:14px;color:#555;">${url}</p>` : ''}
              <div style="display:inline-block;background:#111;color:#fff;border-radius:999px;padding:10px 18px;font-size:20px;font-weight:700;margin-bottom:20px;">
                Score ${score}/100
              </div>
              ${partialNote}
              ${
                headlines
                  ? `<h2 style="margin:24px 0 8px;font-size:18px;">Headline findings</h2><ul style="padding-left:18px;margin:0 0 16px;line-height:1.5;">${headlines}</ul>`
                  : ''
              }
              <h2 style="margin:28px 0 4px;font-size:18px;">The four levers</h2>
              <p style="margin:0 0 8px;color:#555;font-size:14px;">How owned digital assets move jobs, price, retention, and waste.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${leverSections}
              </table>
              <div style="margin-top:32px;padding:24px;background:#111;border-radius:12px;text-align:center;">
                <h2 style="margin:0 0 10px;font-size:20px;color:#fff;">Book a strategy call</h2>
                <p style="margin:0 0 18px;font-size:14px;color:#ccc;line-height:1.5;">
                  Walk the report with us and leave with a clear next move for ${business}.
                </p>
                <a href="${STRATEGY_CALL_URL}" style="display:inline-block;background:#f5c542;color:#111;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;">
                  Schedule 30 minutes
                </a>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#999;line-height:1.5;">
                This report is a snapshot, not a full technical audit. Cheerio/HTML checks see initial markup only.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
