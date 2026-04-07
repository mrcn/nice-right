# Unify scroll-highlight active-state design system

## Overview

Two homepage sections — Services (4-column pinned grid) and Pricing (3-row scroll-through) — both implement a scroll-driven "active item" highlight pattern with divergent CSS values. The pattern is conceptually identical: dim inactive items to 0.65 opacity, highlight the active item with a left inset border + background tint. The inconsistency is:

| Property | Services | Pricing |
|---|---|---|
| Inset border width | 3px | **4px** (canonical) |
| Background tint | **missing** | `rgba(11,138,110,0.03)` |
| Transition easing | `linear` | **cubic-bezier(0.16,1,0.3,1)** (canonical) |
| Transition duration | 0.35s | **0.4s** (canonical) |
| Token usage | hardcoded | hardcoded |
| Section class leak | clean | **bug: `v9-pricing--highlight` never removed on scroll-past** |

This epic:
1. Extracts the pattern into shared design tokens in `app/_shared/tokens.css`
2. Unifies Services.tsx active state (bg tint, spring easing, 4px border, token refs)
3. Fixes the Pricing highlight class leak (section-level trigger uses `once: true` — must be replaced)
4. Updates docs to reflect "Active State: implemented"

## Scope

**In scope:**
- `app/_shared/tokens.css` — add 5 scroll-highlight tokens
- `app/_home/components/Services.tsx` — CSS-only: bg tint, easing/duration tokens, 4px border
- `app/_home/components/Pricing.tsx` — CSS token refs + section-level trigger class-leak fix
- `docs/brand-guidelines.md` — document active-state pattern
- `docs/interaction-design-analysis.md` — update "Active State: NONE" entries

**Explicitly out of scope:**
- FAQ, Testimonials, Proof, Nav active states
- Mobile highlight for Pricing
- Full `#0B8A6E` → `var(--v9-accent)` sweep across all components
- `useScrollHighlight` hook extraction
- `clearProps` race condition audit

## Design decisions (canonical values)

| Token | Value | Rationale |
|---|---|---|
| `--v9-highlight-dim` | `0.65` | Same in both — confirmed canonical |
| `--v9-highlight-inset-w` | `4px` | Pricing value; more visible |
| `--v9-highlight-bg` | `color-mix(in srgb, var(--v9-accent) 3%, transparent)` | Derived from accent; survives rebrand. Baseline 2023, all modern browsers. |
| `--v9-highlight-duration` | `0.4s` | For opacity/box-shadow/title-color transitions |
| `--v9-highlight-easing` | `cubic-bezier(0.16, 1, 0.3, 1)` | Spring-like; used by Pricing (normal scroll). Services uses separate value below. |

### Services background transition: separate value, not the shared token

Services uses a **pinned scrub** (`scrub: 0.6`) where the active class can toggle multiple times during fast scrolling. A 0.4s spring easing on background during scrubbing creates visible flicker and temporal desync with the 0.35s linear opacity transition already in place.

**Services background transition must be `0.2s ease-out`** — explicit, not via `--v9-highlight-duration/easing` tokens. Document this in the CSS as intentional:

```css
/* background: shorter, linear — scrub context; see fn-10 epic */
transition: opacity var(--v9-highlight-duration) var(--v9-highlight-easing),
            box-shadow var(--v9-highlight-duration) var(--v9-highlight-easing),
            background 0.2s ease-out;
```

Pricing (normal per-row scroll) has no rapid-fire issue and may use the full `var(--v9-highlight-duration) var(--v9-highlight-easing)` for background.

### Active title color

Both components hardcode `color: #0B8A6E` on active titles. Replace with `color: var(--v9-accent)`. No new token needed — `--v9-accent` IS this color.

### `prefers-reduced-motion` behavior

The existing `prefers-reduced-motion` blocks disable `transition` and reset `opacity` with `!important`. After this epic:
- The **bg tint** (`background: var(--v9-highlight-bg)`) will still render statically under reduced-motion — this is **intentional and correct**. A subtle color tint is not a motion effect; only animation should be suppressed.
- Do **NOT** add `background: none !important` to the reduced-motion block.
- Document this in a CSS comment above the reduced-motion block.

### Pricing class leak: `once: true` must be removed

The section-level `ScrollTrigger.create` at `Pricing.tsx:134` uses `once: true`. This causes GSAP to self-destroy the trigger after the first `onEnter` fires — any `onLeave`/`onLeaveBack` callbacks added to this trigger will **never execute**.

The fix: **remove `once: true`** and replace with explicit `onEnter`, `onLeave`, and `onLeaveBack` on the same trigger. Example shape:

```
ScrollTrigger.create({
  trigger: rows[0],
  start: 'top 80%',
  // once: true  ← REMOVE
  onEnter: () => { section.classList.add('v9-pricing--highlight'); trackSectionView('pricing'); },
  onLeave: () => { section.classList.remove('v9-pricing--highlight'); rowsArr.forEach(r => r.classList.remove('v9-pricing-tier--active')); },
  onLeaveBack: () => { section.classList.remove('v9-pricing--highlight'); rowsArr.forEach(r => r.classList.remove('v9-pricing-tier--active')); },
})
```

Note: this is the shape only — not the exact implementation (that belongs in the task). The key constraint: `rowsArr` is the `Array.from(rows)` already defined at line 111; `trackSectionView` import is already present.

## Performance note

`background-color` transitions trigger paint (not compositor). For Pricing (class toggle on threshold crossing, fires once per row): acceptable. For Services (scrub + 0.2s ease-out on background only): acceptable — the short duration means the transition finishes before the next threshold is typically crossed during normal scroll.

## Quick commands

```bash
npm run dev          # visual verification — scroll both sections
npx tsc --noEmit     # type check
npm run build        # full build must pass
```

## Acceptance

- [ ] `app/_shared/tokens.css` defines all 5 `--v9-highlight-*` tokens with `color-mix()` for bg
- [ ] Services active column shows bg tint (matches Pricing)
- [ ] Services background transition is `0.2s ease-out` (NOT the spring token)
- [ ] Services box-shadow/opacity/title transitions use `var(--v9-highlight-duration/easing)` tokens
- [ ] Both sections use `4px` inset border (via `var(--v9-highlight-inset-w)`)
- [ ] Both sections use `var(--v9-accent)` for active title color (not hardcoded hex)
- [ ] Pricing: section-level trigger has `once: true` removed, explicit `onEnter`/`onLeave`/`onLeaveBack`
- [ ] Pricing: `v9-pricing--highlight` is removed when scrolling past section bottom (`onLeave`)
- [ ] Pricing: `v9-pricing--highlight` is removed when scrolling back above section top (`onLeaveBack`)
- [ ] `prefers-reduced-motion`: transitions disabled, bg tint renders statically — documented in CSS comment
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds

## References

- `app/_home/components/Services.tsx:447-474` — highlight CSS block
- `app/_home/components/Services.tsx:115-192` — GSAP logic
- `app/_home/components/Pricing.tsx:572-605` — highlight CSS block
- `app/_home/components/Pricing.tsx:134-142` — section-level trigger with `once: true` (the bug)
- `app/_home/components/Pricing.tsx:144-174` — per-row GSAP triggers
- `app/_shared/tokens.css` — existing token file (`:root` scope, `--v9-*` namespace)
- `docs/brand-guidelines.md:155-183` — Visual Elements section to update
- `docs/interaction-design-analysis.md:203-228` — Active State gaps to resolve
