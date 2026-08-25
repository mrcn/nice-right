import { test, expect, type Page, type Route } from '@playwright/test';

const MOCK_SCAN = {
  ok: true,
  cached: false,
  scanId: 'scan_e2e_test_opaque_id_001',
  score: 72,
  findings: [
    {
      title: 'Mobile speed is costing you jobs',
      detail: 'Lab performance scored 41/100 on mobile.',
      lever: 'cut_the_waste',
    },
    {
      title: 'Google Business Profile gaps',
      detail: 'Missing hours and photos reduce local pack visibility.',
      lever: 'get_more_customers',
    },
    {
      title: 'Thin on-page trust signals',
      detail: 'No clear CTA or review proof above the fold.',
      lever: 'charge_more',
    },
  ],
  websiteUrl: 'https://acme-plumbing.example/',
  businessName: 'Acme Plumbing',
  city: 'Austin',
};

const MOCK_LEAD = {
  ok: true,
  emailId: 're_e2e',
  list: 'skipped',
  message: 'Report sent. Check your inbox.',
};

async function mockScanApis(page: Page) {
  await page.route('**/api/scan/**', async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    const body = route.request().postDataJSON() as {
      turnstileToken?: string;
      websiteUrl?: string;
      businessName?: string;
      city?: string;
    };
    expect(body.turnstileToken).toBeTruthy();
    expect(body.websiteUrl).toBeTruthy();
    expect(body.businessName).toBeTruthy();
    expect(body.city).toBeTruthy();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_SCAN),
    });
  });

  await page.route('**/api/lead/**', async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    const body = route.request().postDataJSON() as {
      email?: string;
      turnstileToken?: string;
      scanId?: string;
      marketingConsent?: boolean;
    };
    expect(body.email).toMatch(/@/);
    expect(body.turnstileToken).toBeTruthy();
    expect(body.scanId).toBe(MOCK_SCAN.scanId);
    expect(body.marketingConsent).toBe(false);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_LEAD),
    });
  });
}

test.describe('Digital Footprint /scan', () => {
  test('happy path: free score without email, then lead with fresh Turnstile', async ({
    page,
  }) => {
    await mockScanApis(page);

    const scanTokens: string[] = [];
    const leadTokens: string[] = [];

    page.on('request', (req) => {
      if (req.method() !== 'POST') return;
      const url = req.url();
      let body: { turnstileToken?: string } | null = null;
      try {
        body = req.postDataJSON() as { turnstileToken?: string };
      } catch {
        body = null;
      }
      if (!body?.turnstileToken) return;
      if (url.includes('/api/scan')) scanTokens.push(body.turnstileToken);
      if (url.includes('/api/lead')) leadTokens.push(body.turnstileToken);
    });

    await page.goto('/scan/');

    await expect(page.locator('h1')).toContainText(/digital footprint|shows up/i);
    // Email gate must not appear before scan (captcha does not gate field reveal —
    // field appears with results, not behind a pre-reveal captcha).
    await expect(page.getByTestId('scan-email-gate')).toHaveCount(0);

    await page.getByLabel('Website URL').fill('https://acme-plumbing.example');
    await page.getByLabel('Business name').fill('Acme Plumbing');
    await page.getByLabel('City').fill('Austin');

    // Mock Turnstile (no site key in e2e) auto-issues a token
    await expect(page.getByTestId('scan-turnstile-token')).not.toHaveValue('');

    const tokenBeforeScan = await page
      .getByTestId('scan-turnstile-token')
      .inputValue();

    await page.getByTestId('scan-submit').click();

    await expect(page.getByTestId('scan-results')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByTestId('scan-score')).toContainText('72');
    await expect(page.getByTestId('scan-findings').locator('li')).toHaveCount(3);

    // Free score visible; email gate now present (not captcha-gated reveal)
    const emailGate = page.getByTestId('scan-email-gate');
    await expect(emailGate).toBeVisible();
    await expect(emailGate.getByLabel('Email')).toBeVisible();

    // Turnstile reset after scan → fresh token for email submit
    await expect
      .poll(async () => page.getByTestId('scan-turnstile-token').inputValue())
      .not.toBe(tokenBeforeScan);

    const tokenBeforeLead = await page
      .getByTestId('scan-turnstile-token')
      .inputValue();
    expect(tokenBeforeLead).not.toBe(tokenBeforeScan);

    await emailGate.getByLabel('Email').fill('owner@acme-plumbing.example');
    await expect(page.getByTestId('marketing-consent')).not.toBeChecked();

    await page.getByTestId('lead-submit').click();

    await expect(page.getByTestId('scan-post-email')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByTestId('scan-status')).toContainText(/Report sent/i);

    // Fresh token on lead vs scan
    expect(scanTokens.length).toBeGreaterThanOrEqual(1);
    expect(leadTokens.length).toBeGreaterThanOrEqual(1);
    expect(leadTokens[0]).not.toBe(scanTokens[0]);
  });

  test('Turnstile resets on scan retry after API error', async ({ page }) => {
    let scanCalls = 0;
    await page.route('**/api/scan/**', async (route: Route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      scanCalls += 1;
      const body = route.request().postDataJSON() as {
        turnstileToken?: string;
      };
      expect(body.turnstileToken).toBeTruthy();

      if (scanCalls === 1) {
        await route.fulfill({
          status: 403,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'turnstile_failed',
            message: 'Bot check failed.',
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_SCAN),
      });
    });

    await page.goto('/scan/');
    await page.getByLabel('Website URL').fill('https://acme-plumbing.example');
    await page.getByLabel('Business name').fill('Acme Plumbing');
    await page.getByLabel('City').fill('Austin');
    await expect(page.getByLabel('Website URL')).toHaveValue(
      'https://acme-plumbing.example',
    );
    await expect(page.getByTestId('scan-submit')).toBeEnabled();

    const firstToken = await page.getByTestId('scan-turnstile-token').inputValue();
    expect(firstToken).toBeTruthy();
    await page.getByTestId('scan-submit').click();

    await expect(page.getByTestId('scan-alerts')).toContainText(/Bot check/i);

    await expect
      .poll(async () => page.getByTestId('scan-turnstile-token').inputValue())
      .not.toBe(firstToken);

    const retryToken = await page.getByTestId('scan-turnstile-token').inputValue();
    expect(retryToken).not.toBe(firstToken);

    await page.getByTestId('scan-submit').click();
    await expect(page.getByTestId('scan-results')).toBeVisible({
      timeout: 15000,
    });
    expect(scanCalls).toBe(2);
  });

  test('SEO metadata present and not noindexed', async ({ page }) => {
    await page.goto('/scan/');
    const title = await page.title();
    expect(title.toLowerCase()).toContain('footprint');

    // buildSeoMetadata omits robots unless set — absence means indexable.
    // If a robots tag exists, it must not noindex.
    const robotsCount = await page.locator('meta[name="robots"]').count();
    if (robotsCount > 0) {
      const robots = await page
        .locator('meta[name="robots"]')
        .first()
        .getAttribute('content');
      expect((robots || '').toLowerCase()).not.toContain('noindex');
    }

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/scan\/?$/);
  });
});

