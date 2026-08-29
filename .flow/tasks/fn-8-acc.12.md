# fn-8-acc.12 Test coverage: E2E critical conversion path + CWV measurement

## Description
The only E2E test is `e2e/homepage.spec.ts` which checks `expect(page).toHaveTitle(/./)`  — a regex that matches literally any title. Zero real assertions. The project has `playwright.config.ts` configured for 3 browsers (chromium, firefox, webkit) on port 3000, and `vitest.config.ts` for unit tests. CWV measurement is not set up.

**Size:** M
**Files:**
- `e2e/homepage.spec.ts` (rewrite — replace placeholder with real tests)
- `e2e/conversion-path.spec.ts` (new — critical conversion funnel E2E)
- `app/__tests__/web-vitals.test.ts` (new — CWV smoke test using web-vitals library)
- `package.json` (add `web-vitals` dependency)

**Approach:**
- `e2e/homepage.spec.ts`: Replace placeholder with: page loads successfully (200), hero section visible, nav has expected links, pricing section renders 3 tiers, CTA button visible and clickable, contact section renders
- `e2e/conversion-path.spec.ts`: Test critical lead gen funnel: (1) Land on homepage → (2) scroll to pricing → (3) click "Book a Call" CTA → (4) verify Cal.com embed loads (wait for iframe with src containing `cal.com`) → (5) verify `booking_complete` analytics event would fire (can mock `window.gtag` and assert it was called)
- `app/__tests__/web-vitals.test.ts`: Not a real CWV measurement (those require real browser + real network). Instead: (1) Verify the web-vitals package is importable, (2) document the Lighthouse CI command for CI/CD as a comment, (3) Add a TODO for connecting `onLCP/onINP/onCLS` to analytics reporting
- `web-vitals` v5 (replaces v3 — note: `onFID` is removed, use `onINP`)
- Add `@axe-core/playwright` for accessibility scanning in E2E: run axe on homepage in the E2E suite, assert zero violations

**Note:** These tests run against `npm run dev` (port 3000) per existing `playwright.config.ts`. No CI/CD changes needed in this task.
## Acceptance
- [ ] `npm run test:e2e` passes on chromium (with dev server running)
- [ ] `e2e/homepage.spec.ts` has ≥ 5 meaningful assertions (not just title check)
- [ ] `e2e/conversion-path.spec.ts` verifies Cal.com embed loads
- [ ] `@axe-core/playwright` scans homepage and reports zero critical violations in E2E run
- [ ] `web-vitals` package is installed
- [ ] Lighthouse CI command documented (in README or as npm script) for future CI integration
- [ ] `npm test` (unit tests) still passes
- [ ] `npm run build` succeeds
## Done summary
Added conversion-path tests and CWV measurement coverage in PR #12; current test/build gates pass.
## Evidence
- Commits: b2acf7c7ad2fcf57f429234b444a7d83b993b6fb, 363de53931cbb4d3b05367bb7b39e36272bdecaa, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm test, npm run build, axe accessibility tests, analytics smoke verification
- PRs: #12, #13, #28