# fn-8-acc.9 Accessibility: ARIA sweep + focus trap + axe automated tests

## Description
Four homepage components lack ARIA: `Pricing.tsx`, `Services.tsx`, `Proof.tsx`, `Footer.tsx`. Nav mobile menu has no focus trap. No automated a11y tests exist.

**Coordinate with fn-2-gfq** which covers Hero, ServicesCarousel, Testimonials, FAQ. This task covers the 4 components fn-2-gfq does NOT touch plus Nav focus trap.

**Footer.tsx ARIA** is explicitly assigned here — fn-2-gfq does not cover Footer ARIA (confirmed from fn-2-gfq spec).

**Size:** M
**Files:**
- `app/_home/components/Pricing.tsx`
- `app/_home/components/Services.tsx`
- `app/_home/components/Proof.tsx`
- `app/_home/components/Footer.tsx`
- `app/_home/components/Nav.tsx` (focus trap for mobile menu)
- `app/__tests__/a11y.test.tsx` (new)
- `app/__tests__/vitest-setup.ts` (new)
- `vitest.config.ts` (add setupFiles)

**Approach:**
- Install `vitest-axe` (devDep). Create `app/__tests__/vitest-setup.ts` with `import 'vitest-axe/extend-expect'`. Add `setupFiles: ['./app/__tests__/vitest-setup.ts']` to `vitest.config.ts`. Environment is already `jsdom` — do NOT change to happy-dom (vitest-axe incompatible).
- `Pricing.tsx`: `aria-label` on each tier CTA button. `role="region"` + `aria-label` on each pricing tier card.
- `Services.tsx`: `aria-label` on interactive service elements (if any are links/buttons).
- `Proof.tsx`: descriptive `alt` text on all `<img>` elements. `aria-label` on stat containers if they lack text labels.
- `Footer.tsx`: ensure `<nav>` has `aria-label="Footer navigation"`. Links have descriptive text (not generic "click here").
- `Nav.tsx` focus trap: when `menuOpen === true`, `keydown` listener constrains Tab/Shift+Tab to cycle within `querySelectorAll('a[href], button')` inside the nav overlay. Escape key closes menu and returns focus to the hamburger button.
- `a11y.test.tsx`: render homepage component with React Testing Library, run axe, assert `toHaveNoViolations()`.
## Acceptance
- [ ] `Pricing.tsx` CTA buttons have descriptive `aria-label` attributes
- [ ] `Services.tsx` interactive elements have accessible labels
- [ ] `Proof.tsx` all `<img>` elements have descriptive non-empty `alt` text
- [ ] `Footer.tsx` nav has `aria-label="Footer navigation"`
- [ ] `Nav.tsx` mobile menu traps focus when open (Tab cycles within menu, Escape closes and returns focus to hamburger)
- [ ] `vitest-axe` installed, configured with `jsdom` environment (NOT happy-dom)
- [ ] `npm test` runs axe test with zero violations
- [ ] Touch targets ≥ 24×24px on Pricing CTAs and Nav items (WCAG 2.5.8)
- [ ] `npm run build` succeeds
- [ ] Does NOT touch: Hero.tsx, ServicesCarousel.tsx, Testimonials.tsx, FAQ.tsx (fn-2-gfq territory)
## Done summary
Implemented the homepage accessibility sweep and automated axe coverage in PR #12.
## Evidence
- Commits: b2acf7c7ad2fcf57f429234b444a7d83b993b6fb, 363de53931cbb4d3b05367bb7b39e36272bdecaa, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm test, npm run build, axe accessibility tests, analytics smoke verification
- PRs: #12, #13, #28