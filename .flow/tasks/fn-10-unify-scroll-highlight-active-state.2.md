# fn-10-unify-scroll-highlight-active-state.2 Fix Pricing.tsx class leak + adopt tokens in both components + update docs

## Description
Fix the Pricing.tsx highlight class leak (section-level trigger uses `once: true` — callbacks added to it never fire), adopt tokens in Pricing.tsx, and update two docs.

**Size:** M
**Files:** `app/_home/components/Pricing.tsx`, `docs/brand-guidelines.md`, `docs/interaction-design-analysis.md`

## Approach

### Pricing.tsx — class leak fix

The section-level `ScrollTrigger.create` at line 134 uses `once: true`. GSAP self-destroys this trigger after `onEnter` fires, so any `onLeave`/`onLeaveBack` callbacks would never execute. The fix requires replacing `once: true` entirely.

**Remove** `once: true` from the trigger at line 134.
**Replace** with explicit callbacks:

```
onEnter: () => {
  section.classList.add('v9-pricing--highlight');
  trackSectionView('pricing');
},
onLeave: () => {
  section.classList.remove('v9-pricing--highlight');
  rowsArr.forEach(r => r.classList.remove('v9-pricing-tier--active'));
},
onLeaveBack: () => {
  section.classList.remove('v9-pricing--highlight');
  rowsArr.forEach(r => r.classList.remove('v9-pricing-tier--active'));
},
```

Note: `rowsArr` is already defined at line 111. `trackSectionView` import is already present. Do NOT reference `prevActive` — that variable does not exist in Pricing (it's Services-specific).

Verify the `useEffect` cleanup at line 179 already calls `section.classList.remove('v9-pricing--highlight')` — it does; no change needed there.

### Pricing.tsx — token adoption in highlight CSS (lines 572-605)

Same pattern as task .1 but for Pricing selectors:
- `.v9-pricing-tier` dimmed opacity: `var(--v9-highlight-dim)`
- `.v9-pricing-tier--active` box-shadow: use `var(--v9-highlight-inset-w)` (keep `#0B8A6E` hex for now)
- `.v9-pricing-tier--active` background: `var(--v9-highlight-bg)` — Pricing may use `var(--v9-highlight-duration) var(--v9-highlight-easing)` for background transition (unlike Services, Pricing is not scrubbed, so the spring at 0.4s is fine)
- `.v9-pricing-tier--active .v9-pricing-name` color: `var(--v9-accent)` (not hardcoded `#0B8A6E`)
- All transitions: `var(--v9-highlight-duration)` and `var(--v9-highlight-easing)`
- Reduced-motion block (lines 593-604): add comment `/* bg tint intentionally preserved under reduced-motion */`, do NOT suppress background

### docs/brand-guidelines.md (lines 155-183, Visual Elements section)

Add a "Scroll-active state" entry documenting:
- Pattern: left inset border (`--v9-highlight-inset-w`) + subtle bg tint (`--v9-highlight-bg`) + title color (`--v9-accent`)
- Transition tokens: `--v9-highlight-duration`, `--v9-highlight-easing`
- Note: Services uses `0.2s ease-out` for background (scrub context)

### docs/interaction-design-analysis.md (lines 203-228)

Update the Active State Indicators and ScrollSpy sections from "NONE" to implemented. Brief description of what was built is sufficient.

## Key context

- This task assumes `.1` has run — tokens are already in `tokens.css`
- The `once: true` removal is the only GSAP JS change; all other Pricing changes are CSS-only
- Pricing background at 0.4s spring is fine — no scrub, per-row triggers fire once per crossing
## Approach

**Pricing.tsx — class leak fix (lines 134-174):**
- In the `ScrollTrigger.create` for `rows[0]` (the section-level trigger at line 134), add `onLeave` and `onLeaveBack` callbacks that call `section.classList.remove('v9-pricing--highlight')` and strip all `v9-pricing-tier--active` classes from rows
- The pattern mirrors Services.tsx lines 165-176 exactly
- Also add cleanup in the `useEffect` return (line 179) — already present for `v9-pricing--highlight`, verify it's there

**Pricing.tsx — adopt tokens in highlight CSS (lines 572-605):**
- Same changes as Services.tsx task .1 but for the Pricing selectors
- `0.65` → `var(--v9-highlight-dim)`, `0.4s` → `var(--v9-highlight-duration)`, easing → `var(--v9-highlight-easing)`, `4px` → `var(--v9-highlight-inset-w)`, `rgba(11,138,110,0.03)` → `var(--v9-highlight-bg)`

**docs/brand-guidelines.md — Visual Elements section (lines 155-183):**
- Add a "Scroll-active state" subsection documenting the unified pattern: inset border + bg tint, token names, transition spec

**docs/interaction-design-analysis.md — Active State + ScrollSpy sections (lines 203-228):**
- Update "Active State Indicators: NONE" → "IMPLEMENTED" with brief description
- Update "ScrollSpy Functionality: NONE" → "IMPLEMENTED (Services pinned scrub, Pricing per-row center trigger)"

## Key context

- The class leak: `ScrollTrigger.create` at line 134 uses `once: true` with no `onLeave` — it adds `.v9-pricing--highlight` once and never removes it. Compare with Services lines 165-176 for the correct pattern.
- Token values are defined in task .1 — this task assumes .1 has run first (dependency)
- `docs/brand-guidelines.md` uses `--nr-*` naming in some places and `--v9-*` in others — use `--v9-*` for new token references (that's what `tokens.css` uses)
## Acceptance
- [ ] Pricing.tsx section-level trigger at line 134 has `once: true` removed
- [ ] Pricing.tsx section-level trigger has `onEnter`, `onLeave`, and `onLeaveBack` all defined
- [ ] Pricing: `v9-pricing--highlight` removed when scrolling DOWN past section bottom (`onLeave`)
- [ ] Pricing: `v9-pricing--highlight` removed when scrolling UP back above section top (`onLeaveBack`)
- [ ] Pricing: all active tiers cleared when section highlight is removed
- [ ] Pricing.tsx highlight CSS uses `var(--v9-highlight-*)` tokens (not hardcoded values)
- [ ] Pricing.tsx active tier name uses `var(--v9-accent)` (not hardcoded `#0B8A6E`)
- [ ] Both docs updated — no section says "NONE" for active state
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds
- [ ] Visually: dimmed tiers return to full opacity after scrolling fully past the Pricing section in both directions
## Done summary
Fixed Pricing class leakage and adopted shared tokens in PR #14.
## Evidence
- Commits: a37bd96c1cd1bc8cabf0bcb86bafb52027961bad
- Tests: npm test, npm run build
- PRs: #14