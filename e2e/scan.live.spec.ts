/**
 * Live (non-mocked) scan happy path.
 *
 * Run with: LIVE_SCAN=1 npx playwright test e2e/scan.live.spec.ts
 * Requires the Next app on baseURL (default http://127.0.0.1:3000) and
 * local-dev fallbacks (mock Turnstile + memory Redis) OR real env keys.
 *
 * Skips in CI when LIVE_SCAN is unset so mocked e2e/scan.spec.ts stays green.
 */

import { test, expect } from '@playwright/test';

const live = process.env.LIVE_SCAN === '1';

test.describe('Digital Footprint Scanner — live /api/scan', () => {
  test.skip(!live, 'Set LIVE_SCAN=1 to exercise the real /api/scan path');

  test('form submit shows score and findings without route mocks', async ({
    page,
  }) => {
    const apiStatuses: number[] = [];
    page.on('response', (res) => {
      if (res.url().includes('/api/scan') && res.request().method() === 'POST') {
        apiStatuses.push(res.status());
      }
    });

    await page.goto('/scan/');
    await expect(page.getByTestId('scan-form')).toBeVisible();

    await page.getByLabel(/website url/i).fill('https://example.com');
    await page.getByLabel(/business name/i).fill('Example Business');
    await page.getByLabel(/^city$/i).fill('Chicago');

    await expect(page.getByTestId('scan-turnstile-token')).not.toHaveValue('');

    await page.getByTestId('scan-submit').click();

    await expect(page.getByTestId('scan-results')).toBeVisible({
      timeout: 90_000,
    });
    await expect(page.getByTestId('scan-score')).toBeVisible();

    const scoreEl = page.getByTestId('scan-score');
    // aria-label is "Score N out of 100" — avoid parsing "39/100" as 39100
    const label = (await scoreEl.getAttribute('aria-label')) || '';
    const fromLabel = label.match(/Score\s+(\d+)\s+out of\s+100/i);
    const score = fromLabel
      ? Number.parseInt(fromLabel[1], 10)
      : Number.parseInt((await scoreEl.innerText()).split('/')[0], 10);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);

    const findings = page.getByTestId('scan-findings').locator('li');
    await expect(findings).toHaveCount(await findings.count());
    expect(await findings.count()).toBeGreaterThanOrEqual(2);

    expect(apiStatuses.some((s) => s === 200)).toBe(true);
  });
});
