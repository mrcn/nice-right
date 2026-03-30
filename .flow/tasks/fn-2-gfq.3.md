# fn-2-gfq.3 Nav, Hero, Footer: touch target + contrast fixes

## Description
Fixes across `app/_home/page.css`, `Hero.tsx`, and `Footer.tsx`. Hero.tsx has pre-existing broken CSS (unclosed `}`) that MUST be fixed first.

**Size:** M
**Files:** `app/_home/page.css` (NOT `app/page.css`), `app/_home/components/Hero.tsx`, `app/_home/components/Footer.tsx`

## Fix 0 — FIRST: Repair Hero.tsx broken CSS (~lines 214-240)
Pre-existing defect. `.v9-hero-sub` and `.v9-hero-trust` rules are missing closing `}` braces. Browsers parse this unpredictably.
- Add closing `}` to `.v9-hero-sub` block before `.v9-hero-trust` starts
- Add closing `}` to `.v9-hero-trust` block before `.v9-hero-dot` starts
- Validate entire Hero style block structure after fix

## Fix 1 — Hero glow: fix mobile horizontal scroll (`Hero.tsx` ~line 167)
The `.v9-hero::before` (or `.v9-hero > *::before`) pseudo-element has `width: 800px; height: 800px` with no responsive constraint. On a 375px mobile viewport this element overflows, causing horizontal scroll.
- Change to: `width: clamp(300px, 80vw, 800px); height: clamp(300px, 80vw, 800px);`
- Or: `width: min(800px, 100vw); height: min(800px, 100vw);`
- Verify the hero no longer overflows horizontally on a 375px viewport after fix
- Also verify `overflow: auto` on `.v9-hero` (line ~157) is intentional — if not, change to `overflow: hidden`

## Fix 2 — Hero font size clamp floor (`Hero.tsx` ~lines 229, 351)
- Line ~229: `.v9-hero-trust` at `clamp(0.7rem, 1.2vh, 0.8rem)` → `clamp(0.75rem, 1.2vh, 0.8rem)`
- Line ~351 (640px media query): `.v9-hero-trust` hardcoded at `0.7rem` → `0.75rem`

## Fix 3 — Hamburger touch target (`app/_home/page.css` ~lines 228-241)
- `.v9-nav-hamburger` is 36×36px → raise to 44×44px
- Use padding so visual icon stays same size if needed

## Fix 4 — Nav CTA button height (`app/_home/page.css` ~line 203)
- `.v9-nav-cta` has `padding: 8px vertical` giving ~24px total hit area
- Raise to `padding: 12px vertical` minimum (total ~40px) or `14px` for 44px
- Do not change visual appearance beyond padding

## Fix 5 — Footer contrast (`Footer.tsx` ~line 37)
- `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.55)`

## Fix 6 — Hero dot separator (`Hero.tsx` ~line 239)
- `.v9-hero-dot` at `rgba(255,255,255,0.25)` — check for `aria-hidden="true"` on the element
- If aria-hidden present: no contrast fix needed (decorative)
- If not: add `aria-hidden="true"` or raise opacity to 0.35
## Fix 0 — FIRST: Repair Hero.tsx broken CSS (Hero.tsx ~lines 214-240)
Pre-existing defect. The `.v9-hero-sub` rule (line ~214) and `.v9-hero-trust` rule (line ~224) are both missing closing `}` braces. Template literals don't fail at build time but browsers parse this unpredictably.
- Fix `.v9-hero-sub` block: add closing `}` before `.v9-hero-trust` starts
- Fix `.v9-hero-trust` block: add closing `}` before `.v9-hero-dot` starts
- Verify CSS structure is correct by inspecting the full style block

## Fix 1 — Hero font size clamp floor (Hero.tsx ~lines 229, 351)
- Line ~229: `.v9-hero-trust` at `clamp(0.7rem, 1.2vh, 0.8rem)` — minimum is 0.7rem (11.2px)
  → Change minimum to `clamp(0.75rem, 1.2vh, 0.8rem)`
- Line ~351 (640px media query): `.v9-hero-trust` hardcoded at `0.7rem`
  → Change to `0.75rem`

## Fix 2 — Hamburger touch target (`app/_home/page.css` ~lines 228-241)
IMPORTANT: The file is `app/_home/page.css`, NOT `app/page.css` (different files).
- `.v9-nav-hamburger` is 36×36px; raise to 44×44px
- If the visual icon should stay smaller, use padding so total is 44px and keep icon visually the same
- WCAG 2.2 AA = 24×24px minimum; 44px is the Apple HIG / AAA target — use 44px for quality

## Fix 3 — Footer contrast (Footer.tsx ~line 37)
- Secondary footer text at `rgba(255,255,255,0.4)` → ~3.8:1, fails AA
- Raise to `rgba(255,255,255,0.55)` (→ ~5.9:1)

## Fix 4 — Hero dot separator (Hero.tsx ~line 239)
- `.v9-hero-dot` at `rgba(255,255,255,0.25)` — this is decorative (separates trust items)
- Check if `aria-hidden="true"` is present on the element — if yes, contrast rule does not apply
- If NOT aria-hidden, raise to 0.35 or add `aria-hidden="true"`
## Fix 1 — Hamburger touch target (page.css ~line 228-241)
- Current: `.v9-nav-hamburger` is 36×36px
- WCAG 2.2 AA (SC 2.5.8) requires minimum 24×24px. 36px passes AA but misses AAA (44px) and Apple HIG
- Target: 44×44px minimum
- Approach: if visual icon should stay smaller, add padding so total is 44px; or just raise width/height to 44px if it won't break layout
- Do not change the visual icon design

## Fix 2 — Hero font size clamp() floor (Hero.tsx ~line 229, 351)
- Line ~229: `.v9-hero-trust` at `clamp(0.7rem, 1.2vh, 0.8rem)` — minimum is 0.7rem (11.2px), fails
  → Change to `clamp(0.75rem, 1.2vh, 0.8rem)`
- Line ~351 (640px media query): `.v9-hero-trust` overridden at `0.7rem` → `0.75rem`
- Line ~281: `.v9-hero-micro` at `clamp(0.75rem, 1.2vh, 0.82rem)` — OK, min is exactly 0.75rem, leave if passing

## Fix 3 — Hero malformed CSS (Hero.tsx)
- Repo-scout flagged potential missing closing `}` braces around lines 223 and 236
- Inspect the style block in that area; if there are missing closers, add them
- This is a correctness fix that may affect other nearby styles

## Fix 4 — Footer contrast (Footer.tsx ~line 37)
- Secondary footer text at `rgba(255,255,255,0.4)` → ~3.8:1 contrast, fails AA for normal-size text
- Raise to `rgba(255,255,255,0.55)` (→ ~5.9:1, comfortable AA pass)

## Fix 5 — Hero dot separator (Hero.tsx ~line 239)
- `.v9-hero-dot` at `rgba(255,255,255,0.25)` is purely decorative (separator between trust items)
- Check if it has `aria-hidden="true"` — if yes, no contrast fix needed (decorative)
- If it lacks aria-hidden, either add `aria-hidden="true"` or raise opacity to 0.35
## Approach

### Hamburger (page.css)
- Find the hamburger/menu toggle button style
- If it has explicit `width`/`height` at 36px, raise to 44px
- If the visual icon should stay smaller, use padding to extend the hit area: keep icon 36px but add padding so total is 44px
- Do not change the visual icon size

### Hero dot separator
- Dot separators between trust items (e.g., "100+ projects · Since 2013")
- If purely decorative (no semantic meaning), raising to 0.3–0.35 is sufficient
- If it separates meaningful text, raise to 0.55

### Footer
- Raise version text / secondary footer text from 0.4 → 0.55 opacity
## Acceptance
- [ ] Hero.tsx CSS has no unclosed `}` syntax errors
- [ ] Hero no longer causes horizontal scroll at 375px viewport width
- [ ] Hero `.v9-hero-trust` clamp minimum ≥ `0.75rem`
- [ ] Hero `.v9-hero-trust` 640px override ≥ `0.75rem`
- [ ] Hamburger hit area ≥ 44×44px (in `app/_home/page.css`)
- [ ] Nav CTA hit area ≥ 40px height
- [ ] Footer secondary text ≥ `rgba(255,255,255,0.55)`
- [ ] Hero dot separator aria-hidden or opacity ≥ 0.35
- [ ] `npm run build` passes
## Done summary
Raised all sub-0.75rem font-size values to 0.75rem in Services.tsx, Pricing.tsx, and Proof.tsx. Pure CSS value changes only — 9 violations fixed across 3 files.
## Evidence
- Commits: a7191e545eeba2287d2bc47585f1a7852ceb46ab
- Tests: npm run build
- PRs: