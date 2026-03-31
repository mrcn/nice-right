# fn-6-5lg Fix Pricing.tsx: identity left padding and action right padding

## Overview
The active-state `box-shadow: inset 4px 0 0 #0B8A6E` on `.v9-pricing-tier--active` draws a green left border at the tier's left edge. `.v9-pricing-identity` has `padding-left: 0`, so text starts at the same position as the shadow — the border visually overlaps the content. On the right, `.v9-pricing-action` has `padding-right: 0`, so the pull-quote text runs flush to the container edge; the active background (`rgba(11,138,110,0.03)`) makes this obvious.

## Scope
Two CSS property changes, one file: `app/_home/components/Pricing.tsx`. No JS changes.

## Approach
1. `.v9-pricing-identity` (line 309): change `padding: 48px 40px 48px 0` → `padding: 48px 40px 48px 28px`
2. `.v9-pricing-action` (line 401): change `padding: 48px 0 48px 40px` → `padding: 48px 28px 48px 40px`

28px matches the Services column padding pattern and gives comfortable clearance past the 4px shadow.

Breakpoint overrides are safe: both columns get full `padding:` shorthand resets at ≤1024px and ≤768px that set their side values to 0, so mobile layout is unaffected.

## Quick commands
- `npx tsc --noEmit`
- `npm test`

## Acceptance
- [ ] Active tier: green left border does not overlap identity column text
- [ ] Active tier: pull-quote text has visible right breathing room
- [ ] Inactive tiers: layout unchanged
- [ ] Mobile (≤768px): layout unchanged
- [ ] TypeScript: no errors

## References
- `app/_home/components/Pricing.tsx` lines 308-311 (.v9-pricing-identity), 400-404 (.v9-pricing-action), 526-530 (active state box-shadow)
