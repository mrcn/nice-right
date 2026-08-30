import { test, expect } from '@playwright/test';

test('lead gen funnel — CTA click reaches booking section', async ({ page }) => {
  await page.goto('/');

  // The single homepage CTA routes to the audit conversation.
  // Multiple gradient CTAs share the copy, so take the first (hero).
  // Do not scrollIntoViewIfNeeded: GSAP entrance animations make the node
  // "unstable"/reattach under WebKit and race the scroll helper.
  const heroCTA = page
    .locator('a.v9-btn-gradient', {
      hasText: 'Book an audit call',
    })
    .first();
  await expect(heroCTA).toBeVisible();
  await heroCTA.click();

  // After clicking the anchor link, the #contact section should be visible
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeInViewport({ ratio: 0.1, timeout: 20000 });

  // The Cal embed wrapper should be present in DOM
  const calWrapper = contactSection.locator('.v1-cal-col');
  await expect(calWrapper).toBeAttached();

  // The booking column has a label indicating the calendar
  await expect(contactSection.locator('.v1-cal-label-row')).toBeVisible();
});

test('nav audit CTA reaches booking section', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts?.ready);

  // Desktop nav CTA only (mobile overlay mounts a second .v9-nav-cta when open)
  const navCTA = page.locator('.v9-nav-links a.v9-nav-cta');
  await expect(navCTA).toBeVisible();
  await expect(navCTA).toHaveAttribute('href', '/#contact');

  await navCTA.click();

  // Contact section should scroll into view (hash scroll can lag under WebKit/GSAP)
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeInViewport({ ratio: 0.1, timeout: 20000 });
});
