# fn-2-gfq.4 Responsive layout: Pricing grid, Proof images, ServicesCarousel motion

## Description
Three concerns in ServicesCarousel.tsx and one in Pricing.tsx. Proof.tsx images confirmed already responsive — no change needed.

**Size:** M  
**Files:** `app/_home/components/Pricing.tsx`, `app/_home/components/ServicesCarousel.tsx`

## Fix 1 — Pricing grid fluid columns (Pricing.tsx ~line 271)

Current: `grid-template-columns: 240px 1fr 260px` (3-column, above 1024px). The 860–1024px range may overflow.

Replace:
```
minmax(min(200px, 100%), 240px) 1fr minmax(min(200px, 100%), 260px)
```
Also verify 1024px breakpoint `200px 1fr` doesn't overflow at 860px.
Do NOT change font size rules — those are handled by Task 1.

## Fix 2 — ServicesCarousel: prefers-reduced-motion via CSS (ServicesCarousel.tsx)

The animation is CSS keyframes (`animation: scroll 40s linear infinite`, ~line 123). The file uses `<style jsx>`.

Add inside the existing `<style jsx>` block:
```css
@media (prefers-reduced-motion: reduce) {
  .[track-class-name] {
    animation: none;
    transform: none;
  }
}
```
Do NOT use JS `matchMedia` — it will not pause CSS keyframe animations.

## Fix 3 — ServicesCarousel: keyboard accessibility + pause button (WCAG 2.1.1 + 2.2.2)

The carousel has no keyboard controls and no pause mechanism, violating:
- WCAG 2.1 SC 2.1.1 (Keyboard): content must be operable by keyboard
- WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide): auto-moving content must be pausable

Required changes:
1. Add a pause/play toggle button to the carousel UI. It must be keyboard-focusable and have a visible label (e.g., "Pause carousel" / "Play carousel")
2. Button toggles `animationPlayState` between `paused` and `running` — the hover JS pattern already does this (line ~31-36), extend it to a button
3. Add `aria-pressed` to the pause button to communicate state to screen readers
4. Add `role="region"` and `aria-label="Services carousel"` to the carousel container
5. Keyboard users pressing Tab should reach the pause button

Note: This carousel is infinite/decorative (logo parade), not a content carousel — so arrow key navigation through individual items is NOT required. A single pause button satisfies 2.2.2.

## Fix 4 — ServicesCarousel: decorative dots need aria-hidden (ServicesCarousel.tsx ~line 60)

Each `.services-carousel-dot` (the `·` separators between items) is rendered to screen readers.
- Add `aria-hidden="true"` to each decorative dot span
## Fix 1 — Pricing grid (Pricing.tsx ~line 271)

Current: `grid-template-columns: 240px 1fr 260px` (3-column, above 1024px)

The 1024px breakpoint collapses to `200px 1fr` (2-column). The 768px breakpoint collapses to `1fr` (single column). The potential overflow is in the **768px–1024px range** where `200px 1fr` may cause issues on 800–860px tablets.

Fix the 3-column rule only:
```
grid-template-columns: minmax(min(200px, 100%), 240px) 1fr minmax(min(200px, 100%), 260px)
```
The `min(200px, 100%)` prevents a column from being wider than the viewport at any size. Also verify the 1024px breakpoint doesn't overflow at 860px.

Do NOT change the font size rules in this file — those are handled by Task 1.

## Fix 2 — ServicesCarousel prefers-reduced-motion (ServicesCarousel.tsx)

The animation is a CSS keyframe (`animation: scroll 40s linear infinite` defined around line 123) with JS controlling `animationPlayState` on hover. The file uses `<style jsx>` (different from other components which use template literals).

**Critical**: JS `matchMedia` check will NOT pause CSS keyframe animations. The correct fix is a CSS `@media` rule inside the `<style jsx>` block:

```css
@media (prefers-reduced-motion: reduce) {
  .carousel-track-class {
    animation: none;
    transform: none;
  }
}
```

- Find the exact class name for the animated track element (grep for `animation: scroll`)
- Add the `@media (prefers-reduced-motion: reduce)` block INSIDE the existing `<style jsx>` block
- Setting `animation: none` stops it cleanly from start — no freeze mid-scroll
- Do NOT add a JS matchMedia check — it won't work for this pattern
- Follow the pattern used in Hero.tsx and other components for consistency of intent, but use CSS here since the animation is CSS-driven

## Note
Proof.tsx images confirmed fine: `.v9-case-img` has `width:100%; height:100%; object-fit:cover` with `aspect-ratio:16/10` container. No changes needed.
## Fix 1 — Pricing grid fluid columns (Pricing.tsx ~line 271)

Current: `grid-template-columns: 240px 1fr 260px`

Problem: At ~860px viewport the fixed 500px of columns leaves only ~360px for the `1fr` center column; at 768px the grid switches to single column (correct), but the range 768–1024px may still overflow depending on padding.

Fix: Replace fixed column widths with fluid equivalents:
```
grid-template-columns: minmax(min(200px, 100%), 240px) 1fr minmax(min(200px, 100%), 260px)
```
The `min(200px, 100%)` prevents overflow on narrow viewports.

Also verify the 1024px breakpoint (line ~428) — check if it collapses correctly to 2-column.

## Fix 2 — ServicesCarousel reduced-motion (ServicesCarousel.tsx ~lines 120-134)

The infinite scroll animation has no `prefers-reduced-motion` guard. Pattern used elsewhere (Hero.tsx:150, ContactSection.tsx):

```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

Add this check:
- If the animation is GSAP: add the matchMedia check before creating the gsap.context or animation
- If CSS keyframes: add `@media (prefers-reduced-motion: reduce) { .carousel { animation: none; } }` to the style block
- If `requestAnimationFrame`: skip the RAF setup when reduced-motion is true
- Do NOT just stop mid-animation — if reduced motion is detected, keep the carousel static from the start (no freeze/jerk)

## Note on Proof.tsx images

Repo-scout confirmed `.v9-case-img img` already has `width: 100%; height: 100%; object-fit: cover` with a `aspect-ratio: 16/10` container. No changes needed.
## Approach

### Pricing grid
- Current: `grid-template-columns: 240px 1fr 260px`
- Replace fixed widths with: `grid-template-columns: minmax(200px, 240px) 1fr minmax(200px, 260px)` or collapse to 1fr on tablet
- At ≤768px: single column or 2-column layout
- Do NOT change the visual design — only the breakpoint behavior

### Proof images
- Find `<img>` elements in case study cards
- Add to their CSS: `max-width: 100%; width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover`
- If using `next/image`, ensure `fill` or explicit responsive props are set

### ServicesCarousel
- Find the `useEffect` or CSS animation that drives the infinite scroll
- Add `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check
- If true: do not start the animation (static display), consistent with how other components handle this in the codebase (e.g., Hero.tsx:150, ContactSection.tsx)
## Acceptance
- [ ] Pricing 3-column layout uses fluid `minmax(min(...), ...)` columns
- [ ] No horizontal overflow in Pricing at 860px viewport
- [ ] ServicesCarousel has `@media (prefers-reduced-motion: reduce) { animation: none }` in style block
- [ ] ServicesCarousel has a keyboard-focusable pause/play button
- [ ] Pause button has `aria-pressed` reflecting current state
- [ ] Carousel container has `role="region"` and `aria-label`
- [ ] Decorative dot spans have `aria-hidden="true"`
- [ ] ServicesCarousel still animates normally without reduced-motion or pause
- [ ] `npm run build` passes
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
