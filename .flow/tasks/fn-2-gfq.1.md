# fn-2-gfq.1 Font floors: Services + Pricing

## Description
Raise all font sizes below `0.75rem` in Services.tsx, Pricing.tsx, and Proof.tsx to the 12px floor. Pure CSS value changes only.

**Size:** M
**Files:** `app/_home/components/Services.tsx`, `app/_home/components/Pricing.tsx`, `app/_home/components/Proof.tsx`

## Violations to fix

### Services.tsx
- Line ~171: `.v9-section-label` at `0.7rem` → `0.75rem`
- Line ~221: `.v9-lever-num` at `0.68rem` → `0.75rem`
- Line ~285: `.v9-lever-tag` at `0.65rem` → `0.75rem`

### Pricing.tsx
- Line ~212: `.v9-pricing-label` at `0.7rem` → `0.75rem`
- Line ~283: `.v9-pricing-num` at `0.65rem` → `0.75rem`
- Line ~311: `.v9-pricing-timeline` at `0.72rem` → `0.75rem`
- Line ~333: `.v9-pricing-sublabel` at `0.6rem` → `0.75rem` (worst: 9.6px)
- Line ~392: `.v9-pricing-micro` at `0.72rem` → `0.75rem`

### Proof.tsx
- Line ~402: `.v9-case-client` at `0.7rem` → `0.75rem`

## Approach

- Search for all `font-size` declarations in each file below `0.75rem`
- Raise values to `0.75rem` — do not change letter-spacing, weight, or text-transform
- WCAG note: uppercase labels are NOT exempt from the 12px floor unless they are 18.66px bold or 24px regular (none of these qualify)
- `.v9-section-label` is defined in three files (Services.tsx, Proof.tsx, and page.css) — fix all three instances independently; do not consolidate
- Verify with grep that no remaining sub-`0.75rem` values exist in these three files after the pass
## Violations to fix

### Services.tsx
- Line ~171: section eyebrow label at `0.7rem` (~11.2px) → `0.75rem`
- Line ~221: lever/feature number tags at `0.68rem` (~10.9px) → `0.75rem`

### Pricing.tsx
- Line ~212: "Investment" section label at `0.7rem` → `0.75rem`
- Line ~283: tier number badges at `0.65rem` (~10.4px) → `0.75rem`
- Line ~333: "What you get" sublabel at `0.6rem` (~9.6px) → `0.75rem`

## Approach

- Search for all `font-size` declarations in each file below `0.75rem`
- Raise values to `0.75rem` minimum — do not change letter-spacing, weight, or text-transform
- WCAG exception: uppercase labels with `letter-spacing` qualify as "large scale text" at ≥18.66px bold or ≥24px. These are NOT large-scale, so the 12px floor applies.
- Verify no other sub-12px values remain after the pass
## Acceptance
- [ ] All `font-size` values in Services.tsx ≥ `0.75rem` (grep check)
- [ ] All `font-size` values in Pricing.tsx ≥ `0.75rem` (grep check)
- [ ] All `font-size` values in Proof.tsx ≥ `0.75rem` (grep check)
- [ ] Visual appearance unchanged (labels still uppercase, same weight/tracking)
- [ ] `npm run build` passes
## Done summary
Implemented the Services/Pricing font-floor fixes in the merged homepage accessibility pass, PR #9.
## Evidence
- Commits: 2c37916f2820f80e801f5d7c0bfec25b767a9d2e, 2012fc0cb9be75b4f6deedb58c76585edc6c307d
- Tests: npm test, npm run build, axe accessibility tests
- PRs: #9, #10