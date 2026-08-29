# fn-4-mgl.2 Fix Pricing.tsx: mutual exclusion, translateY, cleanup, will-change, reduced-motion

## Description
Fix all visual/animation bugs in `app/_home/components/Pricing.tsx`.

**Size:** M
**Files:** `app/_home/components/Pricing.tsx` only
**Blast zone:** Only `app/_home/page.tsx` imports this component. `trackPricingView` (line 115) and `trackCTAClick` (line 203) calls are unchanged — no analytics impact.

### Approach

1. **Mutual exclusion — single-point triggers**: Replace the per-row independent `ScrollTrigger.create` with `toggleClass` (lines 130-137) with a `prevActive` index tracker. Create one ScrollTrigger per row using `start: 'top center'` and `end: 'bottom center'` (explicit symmetric points). Use callbacks — NOT `toggleClass`:

   - `onEnter` (scrolling down, row top crosses center): strip `v9-pricing-tier--active` from ALL rows, add it to THIS row.
   - `onEnterBack` (scrolling up, row bottom crosses center going up): strip ALL, add to THIS row.
   - `onLeaveBack` (scrolling up past first row only): strip ALL rows (no row should be active above the section). Only fire cleanup on first row (`i === 0`).
   - `onLeave` (scrolling down past last row only): strip ALL rows. Only fire on last row (`i === rowsArr.length - 1`).

   **CRITICAL**: Do NOT use `onLeave` on intermediate rows to strip classes — if `onLeave` for row N fires after `onEnter` for row N+1, it will incorrectly deactivate the newly activated row. Only the boundary rows (first/last) need deactivation callbacks.

   `rowsArr` is derived from `querySelectorAll` — if empty, `forEach` skips silently (safe).

2. **Remove translateY**: Remove `transform: translateY(-2px)` from `.v9-pricing-tier--active` (line 519). Also remove `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),` from the `.v9-pricing-tier` transition list (line 507). The `.v9-btn-gradient:hover { transform: translateY(-2px) }` (line 441) is a different element and is unaffected.

3. **Highlight class cleanup (option A)**: `v9-pricing--highlight` is added via `once: true` callback (line 127) and `ctx.revert()` does NOT remove it. Change `return () => ctx.revert()` at line 140 to `return () => { ctx.revert(); section.classList.remove('v9-pricing--highlight'); }`. `section` is non-null at this point (guarded by line 67).

4. **will-change**: Add `will-change: opacity` to `.v9-pricing-tier` CSS rule (lines 289-293). Do NOT add `will-change: transform` — transform is being removed from the active state entirely; promoting a compositor layer for it wastes GPU memory.

5. **Reduced-motion transition fix**: In `@media (prefers-reduced-motion: reduce)` block (lines 526-533), add `transition: none !important` to the existing selector. Also add `.v9-pricing-tier .v9-pricing-name` to the selector — it has `transition: color 0.4s cubic-bezier(...)` at lines 511-513, currently not covered.

### Key context

- **Mutual exclusion callback ordering**: `onLeave` on row N and `onEnter` on row N+1 can fire at the same scroll position (when their trigger points coincide). Stripping from `onLeave` on intermediate rows risks removing the class that `onEnter` just added on the next row. Solution: only strip on boundary rows (first row's `onLeaveBack`, last row's `onLeave`). All other activation uses `onEnter`/`onEnterBack`.
- **`start: 'top center'` / `end: 'bottom center'`**: Row becomes active when its top crosses viewport center going down; deactivates when its bottom crosses viewport center going down. This creates a clean single-row active zone with no overlap.
- **`ctx.revert()` and `toggleClass`**: `ctx.revert()` DOES revert class changes made via GSAP's `toggleClass` option. But it does NOT revert `section.classList.add()` made in raw JS callbacks — hence the explicit `classList.remove` in cleanup.
- `trackPricingView` at line 115 fires on scroll entry of the entrance trigger — unrelated to highlight logic, leave it untouched.
- CSS regression: removing `transform` from transition list is safe — no other transforms are set on `.v9-pricing-tier`. The button hover transform (line 441) is a different selector.
- Refs: lines 122-137 (triggers), 289-293 (tier CSS), 503-525 (highlight CSS), 526-533 (reduced-motion), 511-513 (.v9-pricing-name transition).

## Acceptance

- [ ] Only one Pricing row is active at a time — verified by scrolling slowly down through all three tiers
- [ ] No "dead zone" — as one row exits active state, the next immediately becomes active
- [ ] Scrolling UP through Pricing highlights each row correctly (bidirectional, onEnterBack works)
- [ ] Scrolling back above the Pricing section: `v9-pricing--highlight` is removed from section (verify in DevTools)
- [ ] No row shifts upward — borders stay aligned, no translateY bleed
- [ ] TypeScript: no errors (`npx tsc --noEmit`)
- [ ] Reduced-motion: all highlight transitions are instant — no smooth fade on opacity or color for `.v9-pricing-tier` or `.v9-pricing-name`

## Done summary
Implemented the Pricing scroll-highlight mutual-exclusion and cleanup fixes in PR #11.
## Evidence
- Commits: 81c3006bffa7dc3db3416e6ea34239db74d5539e, c184c1ee0209269ddb14212ea2c670599e59fc0d
- Tests: npm test, npm run build
- PRs: #11