# Fix scroll highlight visual bugs: Services + Pricing

## Overview

Two GSAP ScrollTrigger components — Services (4-column pin+scrub) and Pricing (per-row) — have visual bugs identified by code review and screenshot analysis, plus additional gaps found in plan review:

**Services.tsx (fn-4-mgl.1):**
1. Col 01: zero left padding → `inset box-shadow` flush at grid edge
2. Col 03 at 1024px: also has zero left padding → same flush box-shadow in 2-col layout
3. `animateBullets`: missing `gsap.killTweensOf` → overlapping tweens on fast scroll
4. `animateBullets`: never called in `onEnter` → col 01 bullets static on initial enter
5. Missing `onLeave` handler → last col stays highlighted after forward scroll exit
6. Mobile path: `v9-services--highlight` class never removed on unmount
7. Active column: `translateY(-2px)` bleeds into grid `border-top`
8. Pin end `+=150%` too long
9. `will-change` missing on animated elements
10. `prefers-reduced-motion`: missing `transition: none` on both `.v9-lever-col` and `.v9-lever-title`

**Pricing.tsx (fn-4-mgl.2):**
1. Per-row `toggleClass` has no mutual exclusion → 2 rows active simultaneously
2. Trigger range `top 60%/bottom 40%` creates dead zone → all rows at 0.65 opacity with none highlighted
3. `translateY(-2px)` bleeds into row `border-bottom` above
4. `v9-pricing--highlight` added via `once: true` but never removed by `ctx.revert()`
5. `will-change: opacity, transform` planned but `transform` is being removed → use `will-change: opacity` only
6. `prefers-reduced-motion`: missing `transition: none` on both `.v9-pricing-tier` and `.v9-pricing-name`

## Scope

- **Files**: `app/_home/components/Services.tsx`, `app/_home/components/Pricing.tsx`
- **Not in scope**: ServicesCarousel, Hero, other components

## Approach

Two parallel tasks, fully independent (no shared files).

**Task 1 — Services.tsx**: padding fix (base + 1024px breakpoint), animateBullets (killTweensOf + initial call), onLeave handler, mobile highlight cleanup, pin end 120%, remove translateY, will-change, reduced-motion (lever-col + lever-title).

**Task 2 — Pricing.tsx**: mutual exclusion with single-point triggers (start: 'top 50%'), highlight cleanup (option A: classList.remove in cleanup), remove translateY, will-change: opacity only, reduced-motion (pricing-tier + pricing-name).

## Quick commands

```bash
npm run dev
# Visual checks:
# 1. Services col 01 + col 03 (1024px): green bar inset, not flush
# 2. Fast scrub: no bullet flicker
# 3. Scroll past Services pin: no column stays highlighted
# 4. Pricing: only 1 row active at a time, no dead zone
# 5. Scroll above Pricing: highlight dimming clears
# 6. Active cols/rows: no upward shift at border
# 7. prefers-reduced-motion: instant highlight changes

npx tsc --noEmit
```

## Acceptance

- [ ] Services col 01 box-shadow visually inset at desktop
- [ ] Services col 03 box-shadow visually inset at 1024px (2-col layout)
- [ ] Col 01 bullets animate on initial enter (not static)
- [ ] Fast scrub — no bullet flicker
- [ ] Forward scroll past pin zone: no column stays highlighted
- [ ] Mobile unmount: `v9-services--highlight` removed from DOM
- [ ] Active column/row: no upward shift relative to borders
- [ ] Services pin takes ~120% viewport height
- [ ] Only one Pricing row active at a time
- [ ] No dead zone between Pricing rows
- [ ] Pricing highlight dimming clears when scrolling above section
- [ ] TypeScript: no errors
- [ ] Reduced-motion: all highlight transitions instant

## Dependencies

- fn-2-gfq.4 (Responsive layout: Pricing grid) also touches Pricing.tsx — coordinate to avoid conflicts

## References

- Services.tsx desktop pin: lines 127-151
- Services.tsx mobile path: lines 104-114
- Services.tsx animateBullets: lines 119-125
- Services.tsx CSS active/reduced-motion: lines 406-432
- Pricing.tsx per-row triggers: lines 130-137
- Pricing.tsx CSS active/reduced-motion: lines 502-533
