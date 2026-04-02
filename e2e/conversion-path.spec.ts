import { test, expect } from '@playwright/test';

test('lead gen funnel — CTA click reaches booking section', async ({ page }) => {
  await page.goto('/');

  // Locate the hero CTA ("Book Your Free Strategy Call")
  const heroCTA = page.locator('a.v9-btn-gradient', {
    hasText: 'Book Your Free Strategy Call',
  });
  await expect(heroCTA).toBeVisible();

  // Scroll into view and click
  await heroCTA.scrollIntoViewIfNeeded();
  await heroCTA.click();

  // After clicking the anchor link, the #contact section should be visible in viewport
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeInViewport();

  // The Cal embed wrapper should be present in DOM
  const calWrapper = contactSection.locator('.v1-cal-col');
  await expect(calWrapper).toBeAttached();

  // The booking column has a label indicating the calendar
  await expect(contactSection.locator('.v1-cal-label-row')).toBeVisible();
});

test('nav Book a Call CTA reaches booking section', async ({ page }) => {
  await page.goto('/');

  // Nav desktop CTA
  const navCTA = page.locator('nav a.v9-nav-cta');
  await expect(navCTA).toBeVisible();
  await expect(navCTA).toHaveAttribute('href', '/#contact');

  await navCTA.click();

  // Contact section should scroll into view
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeInViewport({ ratio: 0.1 });
});
