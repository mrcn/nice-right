# Browser-Based UAT Plan: Nice Right v8.2 Design Audit

## Objective

Verify all design audit fixes are implemented correctly using browser automation with Playwright.

## Test Environment

- URL: http://localhost:3000/v8.2
- Viewports: 320px, 768px, 1440px
- Browser: Chromium

---

## UAT Test Cases

### TC-01: Line-Height Fix

**Priority:** Critical
**Steps:**

1. Navigate to homepage
2. Capture screenshot of hero H1
3. Capture screenshot of H2 headings
4. Inspect computed styles for h1, h2, h3
   **Expected:**

- line-height ≥ 1.1 for all headings
- No text clipping visible
  **Verification:** CSS value check + visual screenshot

### TC-02: Contrast Compliance

**Priority:** Critical
**Steps:**

1. Navigate to homepage
2. Run axe-core accessibility scan
3. Check amber accent color value
4. Test section labels, step numbers, stats
   **Expected:**

- --nr-amber value is #a86e32 or darker
- No contrast violations in axe report
- 4.5:1 ratio against cream background
  **Verification:** axe-core automated scan

### TC-03: Focus Indicators Visible

**Priority:** Critical
**Steps:**

1. Navigate to homepage
2. Press Tab key repeatedly
3. Capture screenshot at each focus stop
4. Verify outline on: nav links, buttons, cards
   **Expected:**

- Visible 3px outline on all interactive elements
- Outline color matches --nr-amber
  **Verification:** Visual inspection of focus screenshots

### TC-04: Skip Link Functionality

**Priority:** Critical
**Steps:**

1. Navigate to homepage
2. Press Tab key once (skip link should appear)
3. Capture screenshot showing skip link
4. Click/Enter skip link
5. Verify page scrolls to main content
   **Expected:**

- Skip link visible on first Tab
- Link reads "Skip to main content"
- Activating link jumps to #main-content
  **Verification:** Functional test + screenshot

### TC-05: Off-Brand Colors Removed

**Priority:** High
**Steps:**

1. Navigate to homepage
2. Inspect hero section for green dot
3. Inspect testimonials hover state
4. Check Services.tsx CTA button
5. Check ContactSection step numbers
   **Expected:**

- No #22c55e (green) in hero
- No rgba(0,0,255,...) in testimonials
- No #FFFFFF on buttons (should be var(--nr-cream))
- No #0A0A0A (pure black)
- No #FF0000 (red) in FAQ or Contact
  **Verification:** CSS inspection + visual check

### TC-06: Spacing Scale Implementation

**Priority:** High
**Steps:**

1. Inspect section padding values
2. Inspect card padding values
3. Inspect heading margins
4. Check at multiple viewports
   **Expected:**

- Section padding: 112px desktop, 80px tablet
- Consistent 8px-based spacing throughout
- H2 margins: 48px top, 32px bottom
  **Verification:** Computed styles inspection

### TC-07: Unified Container Widths

**Priority:** High
**Steps:**

1. Inspect hero container
2. Inspect section containers
3. Inspect FAQ container
4. Verify all use same max-width
   **Expected:**

- All containers max-width: 1200px
- Consistent padding: 0 40px
  **Verification:** CSS measurement

### TC-08: Button Consistency (3 Variants)

**Priority:** High
**Steps:**

1. Identify all buttons on page
2. Categorize by style
3. Verify only 3 variants exist
4. Check padding, border, colors
   **Expected:**

- v82-btn--primary (navy, filled)
- v82-btn--secondary (outline, smaller)
- v82-btn--sm (compact)
- No inline button styles in components
  **Verification:** CSS class inspection + screenshot

### TC-09: Social Proof Bar

**Priority:** Medium
**Steps:**

1. Scroll to hero section bottom
2. Look for trust bar with logos
3. Verify text "Trusted by 100+"
   **Expected:**

- Bar exists below hero
- Client logos displayed
- Text reads "Trusted by 100+ businesses"
  **Verification:** Visual screenshot

### TC-10: CTA Prominence

**Priority:** Medium
**Steps:**

1. Locate primary CTA button
2. Check for shadow/border treatments
3. Verify it stands out from other buttons
4. Check hover state
   **Expected:**

- CTA has visual weight (shadow or distinct style)
- Positioned prominently in hero
- Clear visual hierarchy
  **Verification:** Visual screenshot + hover test

### TC-11: Mobile Service Card Separation

**Priority:** Medium
**Steps:**

1. Resize viewport to 375px
2. Navigate to services section
3. Verify card separation
   **Expected:**

- Cards have borders or backgrounds
- Clear visual separation between cards
- Adequate padding inside cards
  **Verification:** Mobile screenshot at 375px

### TC-12: Accessibility Landmarks

**Priority:** High
**Steps:**

1. Inspect page structure
2. Verify <main> element exists
3. Verify sections have aria-label
4. Run screen reader landmark test
   **Expected:**

- main landmark present
- Sections have aria-label attributes
- Proper heading hierarchy
  **Verification:** HTML inspection + axe scan

### TC-13: FAQ Accordion ARIA

**Priority:** Medium
**Steps:**

1. Navigate to FAQ section
2. Inspect accordion buttons
3. Verify aria-expanded and aria-controls
4. Test keyboard navigation (Enter/Space to toggle)
5. Verify "+" is aria-hidden
   **Expected:**

- Buttons have aria-controls pointing to content IDs
- aria-expanded toggles correctly
- Keyboard navigation works
- Icons hidden from screen readers
  **Verification:** HTML inspection + functional test

### TC-14: Footer Mobile Layout

**Priority:** Medium
**Steps:**

1. Resize viewport to 375px
2. Scroll to footer
3. Verify column layout
   **Expected:**

- Single column layout on mobile
- No horizontal scrolling
- Adequate spacing between sections
  **Verification:** Mobile screenshot

### TC-15: Version Navigation Hidden on Mobile

**Priority:** Low
**Steps:**

1. Resize viewport to 375px
2. Scroll to check for version bar
3. Verify it's not visible
   **Expected:**

- Version bar (V7, V8, V8.1, etc.) hidden on mobile
- May be visible on desktop
  **Verification:** Mobile screenshot comparison

---

## UAT Execution Plan

### Pre-Test Setup

```bash
# Ensure dev server is running
npm run dev

# Wait for server ready
sleep 5
```

### Automated Test Script Structure

```typescript
// tests/uat/design-audit.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Design Audit UAT', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/v8.2');
  });

  test('TC-01: Line-height fix', async ({ page }) => {
    // Implementation
  });

  test('TC-02: Contrast compliance', async ({ page }) => {
    // Implementation
  });

  // ... more tests
});
```

### Screenshot Capture Points

1. Full page (desktop)
2. Hero section (desktop)
3. Hero section (mobile)
4. Services section (desktop)
5. Services section (mobile)
6. Footer (mobile)
7. Focus states (multiple elements)
8. Skip link visible state

### Pass/Fail Criteria

- **Pass:** All 15 test cases pass
- **Conditional Pass:** 12-14 test cases pass (minor issues acceptable)
- **Fail:** < 12 test cases pass (requires fixes)

### Reporting Format

```
UAT Results Summary
==================
Date: {timestamp}
Total Tests: 15
Passed: {count}
Failed: {count}
Conditional: {count}

Failed Tests:
- TC-{number}: {description} - {reason}

Screenshots: {path}/screenshots/
Full Report: {path}/uat-report.html
```

---

## Success Criteria

✅ All critical tests (TC-01 to TC-05) must pass
✅ At least 12 of 15 total tests must pass
✅ No visual regressions from baseline
✅ axe-core reports 0 violations
✅ All screenshots saved for review
