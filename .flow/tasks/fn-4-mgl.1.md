# fn-4-mgl.1 Fix Services.tsx: padding, animateBullets, onLeave, pin end, will-change, reduced-motion

## Description
Fix all visual/animation bugs in `app/_home/components/Services.tsx`.

**Size:** M
**Files:** `app/_home/components/Services.tsx` only
**Blast zone:** Only `app/_home/page.tsx` imports this component. No shared CSS targets v9-lever-col outside the component's own `<style>` tag.

### Approach

1. **Padding fix**: Change `.v9-lever-col` base rule from `padding: 40px 28px 40px 0` to `padding: 40px 28px 40px 28px`. Remove the `:not(:first-child) { padding-left: 28px }` rule (lines 266-268) — it becomes redundant. Also update the 1024px breakpoint: change `padding-left: 0` to `padding-left: 28px` inside `.v9-lever-col:nth-child(3)` (line 368). The other rules in that block (border-right, padding-top, border-top) stay unchanged. Padding does not affect CSS grid column placement.

2. **animateBullets — killTweensOf + initial call**: `animateBullets` is defined at lines 119-125 as a `const` inside the desktop `else` block, BEFORE `ScrollTrigger.create` at line 127 — it IS in scope for `onEnter`. Two changes needed:
   - Add `gsap.killTweensOf(bullets)` immediately before `gsap.fromTo` inside `animateBullets`. Add `overwrite: 'auto'` to the tween config. This prevents stacked tweens on fast scrub.
   - Call `animateBullets(cols[0])` at the END of the `onEnter` callback (after class toggles). Col 01 bullets are currently never animated on initial enter — only when `onUpdate` fires. Note: `animateBullets` targets `.v9-lever-bullets li` elements, NOT the cols themselves, so no conflict with the entrance stagger animation (which animates the col elements for opacity/y).

3. **onLeave handler**: Desktop `ScrollTrigger.create` (line 127) has `onEnter` and `onLeaveBack` but no `onLeave`. Add `onLeave` that: removes `v9-services--highlight` from section, removes `v9-lever-col--active` from all cols, resets `prevActive = -1`. This is symmetric with `onLeaveBack` and cleans up forward-scroll exit.

4. **Mobile highlight class leak**: Mobile path at line 106 calls `section.classList.add('v9-services--highlight')` with no removal path. `ctx.revert()` removes the per-col `toggleClass` classes but NOT manual `classList.add` calls. Fix: change `return () => ctx.revert()` at line 155 to `return () => { ctx.revert(); section.classList.remove('v9-services--highlight'); }`. `section` is guaranteed non-null at this point (guarded by line 71).

5. **Pin end**: Change `end: '+=150%'` to `end: '+=120%'` at line 130.

6. **Remove translateY from active state**: `.v9-services--highlight .v9-lever-col--active { transform: translateY(-2px) }` at line 419 causes the active column to shift into the grid's `border-top`. Remove `transform: translateY(-2px)` from the active rule. Also remove `transform 0.35s linear` from the `.v9-services--highlight .v9-lever-col` transition list (line 409) since transform no longer changes.

7. **will-change**: Add `will-change: opacity, transform` to `.v9-lever-col` CSS rule (after the `border-right` line, before breakpoints). Omit `box-shadow` — expensive to composite.

8. **Reduced-motion transition fix**: In `@media (prefers-reduced-motion: reduce)` block (lines 426-432), add `transition: none !important`. Also add `.v9-lever-col .v9-lever-title` to the selector list — it has `transition: color 0.35s linear` at lines 412-413 which is currently not covered.

### Key context

- `animateBullets` at line 119 is a `const` scoped to the desktop `else` block (line 115), defined before `ScrollTrigger.create` at line 127 — calling it from `onEnter` is valid without any hoisting.
- `ctx.revert()` reverts GSAP ScrollTriggers and `toggleClass`-added classes but NOT manual `section.classList.add()` — `onLeave`/`onLeaveBack` handle desktop cleanup, explicit `classList.remove` in useEffect cleanup handles mobile and unmount.
- Entrance stagger (lines 90-102) animates col elements (`opacity`, `y`). `animateBullets` animates bullet `li` elements (`opacity`, `x`). Different targets — no conflict.
- `clearProps: 'opacity,transform'` at line 100 must not be removed.
- CSS regression: all padding changes are non-conflicting. Mobile `padding: 32px 0 !important` (line 395) still overrides at ≤640px.
- Refs: lines 90-102 (entrance), 104-155 (desktop pin + mobile), 254-268 (padding CSS), 356-404 (breakpoints), 406-432 (highlight + reduced-motion).

## Acceptance

- [ ] Col 01 green bar is visually inset at desktop (not flush with section left edge)
- [ ] Col 03 green bar at 1024px (2-col layout) is also visually inset
- [ ] All four columns have equal left padding (28px) at desktop
- [ ] On initial scroll-enter, col 01 bullets animate in (not static)
- [ ] Fast back/forth scrub — bullets do not flash or appear stuck at opacity 0
- [ ] After scrolling forward past pin zone, no column stays highlighted (`onLeave` fires, classes removed)
- [ ] After scrolling back above section, no column stays highlighted (`onLeaveBack` fires, classes removed)
- [ ] On mobile: `v9-services--highlight` is removed from section element after component unmount
- [ ] Active column does not shift upward — no border bleed
- [ ] Pin zone scrolls through all 4 columns in ~120% viewport height
- [ ] TypeScript: no errors (`npx tsc --noEmit`)
- [ ] Reduced-motion: opacity and color changes are instant — no transition on `.v9-lever-col` or `.v9-lever-title`

## Done summary
Implemented the Services scroll-highlight lifecycle and reduced-motion fixes in PR #11.
## Evidence
- Commits: 81c3006bffa7dc3db3416e6ea34239db74d5539e, c184c1ee0209269ddb14212ea2c670599e59fc0d
- Tests: npm test, npm run build
- PRs: #11