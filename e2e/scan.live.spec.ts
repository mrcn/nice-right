import { test, expect } from '@playwright/test';

test('paused scanner route stays unavailable without feature flags', async ({ page }) => {
  const response = await page.goto('/scan/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('body')).toContainText(/not found/i);
});
