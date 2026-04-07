# fn-10-unify-scroll-highlight-active-state.1 Add scroll-highlight tokens + unify Services.tsx active state

## Description
Add unified scroll-highlight CSS custom properties to the shared token file, then apply them to Services.tsx to bring its active state in line with Pricing.

**Size:** M
**Files:** `app/_shared/tokens.css`, `app/_home/components/Services.tsx`

## Approach

**`tokens.css`** — add to the `:root` block, following the `--v9-*` naming convention:
```
--v9-highlight-dim: 0.65
--v9-highlight-inset-w: 4px
--v9-highlight-bg: color-mix(in srgb, var(--v9-accent) 3%, transparent)
--v9-highlight-duration: 0.4s
--v9-highlight-easing: cubic-bezier(0.16, 1, 0.3, 1)
```
Note: `color-mix()` derives bg from the existing `--v9-accent` token. Do not hardcode `rgba(11,138,110,...)`.

**`Services.tsx` inline `<style>` block (lines 447-474):**

`.v9-services--highlight .v9-lever-col` (dimmed state):
- `opacity: var(--v9-highlight-dim)`
- Transition: use `var(--v9-highlight-duration)` and `var(--v9-highlight-easing)` for opacity and box-shadow; use `0.2s ease-out` for background (Services is a pinned scrub — the spring easing at 0.4s causes flicker during rapid scrubbing)

`.v9-services--highlight .v9-lever-col--active` (active state):
- `box-shadow: inset var(--v9-highlight-inset-w) 0 0 #0B8A6E` (keep hex for now — full accent token sweep is out of scope)
- `background: var(--v9-highlight-bg)`

`.v9-services--highlight .v9-lever-col--active .v9-lever-title` (active title):
- `color: var(--v9-accent)` (replace hardcoded `#0B8A6E`)
- Transition: use `var(--v9-highlight-duration) var(--v9-highlight-easing)`

`@media (prefers-reduced-motion: reduce)` block (lines 466-474):
- Leave the existing `opacity: 1 !important`, `transition: none !important` intact
- Do NOT add `background: none !important` — the static bg tint is intentional under reduced-motion (it's a color cue, not a motion effect)
- Add a CSS comment above this block: `/* bg tint intentionally preserved under reduced-motion — color cue, not animation */`

## Key context

- `tokens.css` uses `:root` scope — add tokens at end of the existing `:root` block
- Services inline `<style>` block runs lines 243-475; scroll-highlight section starts at line 447
- Services uses `scrub: 0.6` + `onUpdate` index cycling — the active class toggles every time the user scrolls across a column threshold. Background transition MUST be short (`0.2s ease-out`) to avoid flicker and desync with the existing `0.35s linear` opacity transition
- Do NOT change `will-change: opacity` on `.v9-lever-col` (line 303) — it's correct
- This task makes CSS-only changes; no GSAP JS changes needed

## Acceptance
- [ ] `tokens.css` `:root` block contains all 5 `--v9-highlight-*` tokens
- [ ] `--v9-highlight-bg` uses `color-mix(in srgb, var(--v9-accent) 3%, transparent)` — not a hardcoded rgba value
- [ ] Services.tsx `.v9-lever-col--active` has `background: var(--v9-highlight-bg)`
- [ ] Services.tsx background transition is `0.2s ease-out` (not `var(--v9-highlight-duration/easing)`)
- [ ] Services.tsx opacity/box-shadow transitions use `var(--v9-highlight-duration)` and `var(--v9-highlight-easing)`
- [ ] Services.tsx inset border uses `var(--v9-highlight-inset-w)` (renders as 4px)
- [ ] Services.tsx active title uses `var(--v9-accent)` (not hardcoded `#0B8A6E`)
- [ ] Reduced-motion block has CSS comment noting bg tint is intentionally preserved
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds
- [ ] Visually: active Services column shows green bg tint; easing feels snappy (not spring)
## Done summary
Added 5 --v9-highlight-* tokens to tokens.css :root block and updated Services.tsx scroll-highlight CSS to use them, replacing hardcoded opacity, pixel values, and hex colors with token references; background transition kept at 0.2s ease-out to prevent scrub flicker.
## Evidence
- Commits: 168d4e7cd6c2d59dc20c771cdfd236bef508b09d
- Tests: npx tsc --noEmit, npm test (vitest run — 4 tests passed)
- PRs: