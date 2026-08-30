import { test, expect } from '@playwright/test';

test.describe('Digital Footprint Scanner, paused', () => {
  test('scanner page is unavailable', async ({ page }) => {
    const response = await page.goto('/scan/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/not found/i);
  });

  test('scanner APIs are unavailable', async ({ request }) => {
    const scan = await request.post('/api/scan/', {
      data: {
        websiteUrl: 'https://example.com',
        businessName: 'Example Business',
        city: 'Chicago',
        turnstileToken: 'disabled-test-token',
      },
    });
    expect(scan.status()).toBe(404);
    expect(await scan.json()).toMatchObject({ error: 'not_found' });

    const lead = await request.post('/api/lead/', {
      data: {
        email: 'owner@example.com',
        scanId: 'disabled-test-scan',
        turnstileToken: 'disabled-test-token',
        marketingConsent: false,
      },
    });
    expect(lead.status()).toBe(404);
    expect(await lead.json()).toMatchObject({ error: 'not_found' });
  });
});
