import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage loads and key sections render', async ({ page }) => {
  await page.goto('/');

  // Title includes brand name
  await expect(page).toHaveTitle(/Nice Right/);

  // Nav is visible
  await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();

  // Hero makes the buyer and job legible
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('.v9-hero-h1')).toBeVisible();
  await expect(page.locator('.v9-hero-kicker')).toContainText(/Chicago home-service/i);
  await expect(page.locator('.v9-hero-sub')).toContainText(/website|Google profile|prospects/i);

  // Hero CTA button is present and links to #contact
  const heroCTA = page.locator('a.v9-btn-gradient').first();
  await expect(heroCTA).toBeVisible();
  await expect(heroCTA).toHaveAttribute('href', '#contact');

  // The page presents one audit offer, not a product menu
  await expect(page.locator('#pricing')).toBeVisible();
  await expect(page.locator('#pricing')).toContainText(/Digital Growth Audit/);
  await expect(page.locator('a[href="/scan/"]')).toHaveCount(0);

  // Contact / booking section renders
  await expect(page.locator('#contact')).toBeVisible();

  // Skip link exists for accessibility
  await expect(page.locator('a.skip-link')).toBeAttached();
});

test('homepage has no critical a11y violations', async ({ page }) => {
  await page.goto('/');
  // Wait for main content to be visible before scanning
  await page.locator('#main-content').waitFor({ state: 'visible' });

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === 'critical');
  expect(critical).toHaveLength(0);
});
