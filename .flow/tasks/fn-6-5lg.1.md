# fn-6-5lg.1 Add padding-left to .v9-pricing-identity and padding-right to .v9-pricing-action

## Description
Two CSS line changes in `app/_home/components/Pricing.tsx`.

**Size:** S (1 file, 2 property changes)
**Files:** `app/_home/components/Pricing.tsx` only
**Blast zone:** None — pure CSS spacing, no JS, no other components affected.

### Approach

**Change 1** — line 309: `.v9-pricing-identity` padding shorthand
- From: `padding: 48px 40px 48px 0`
- To: `padding: 48px 40px 48px 40px`

**Change 2** — line 401: `.v9-pricing-action` padding shorthand
- From: `padding: 48px 0 48px 40px`
- To: `padding: 48px 40px 48px 40px`

### Key context

- `box-shadow: inset 4px 0 0 #0B8A6E` on `.v9-pricing-tier--active` (line 528) draws at the tier's inner-left edge. With `padding-left: 0` on `.v9-pricing-identity`, text starts at x=0 — same position as the shadow — causing visual overlap.
- `.v9-pricing-action { padding-right: 0 }`: the active background (`rgba(11,138,110,0.03)`) spans the full tier width, making the zero right padding obvious as text hits the container edge.
- 40px chosen to match the middle column's `padding: 48px 40px` — all three columns now use 40px horizontal padding, creating a unified internal grid rhythm. The outer container already provides 48px from the viewport edge.
- **Breakpoint overrides are safe**: at ≤1024px, `.v9-pricing-action` gets `padding: 0 0 40px 0` (full shorthand reset). At ≤768px, `.v9-pricing-identity` gets `padding: 40px 0 24px 0` and `.v9-pricing-action` gets `padding: 0 0 40px 0`. Both explicitly override all four sides, so the base 28px values do not bleed into mobile.
- Padding on a grid column item uses `box-sizing: border-box` (Next.js default). Content box shrinks but grid track widths are unaffected — no layout shift to adjacent columns.

## Acceptance

- [ ] Active tier: green left border does not overlap identity column text at desktop
- [ ] Active tier: pull-quote text has visible right breathing room at desktop
- [ ] Inactive tiers: no visual change
- [ ] 768px and below: mobile layout unchanged
- [ ] TypeScript: no errors (`npx tsc --noEmit`)

## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: