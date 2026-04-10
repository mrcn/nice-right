# Fix Case-Study Nav + Breadcrumb, CTA, Visual Hierarchy

## Overview

Three interconnected problems on all `/work/*` case study pages:

1. **Navigation contrast failure** — `<Nav defaultSolid />` in `app/work/layout.tsx:8` forces the white `.v9-nav--solid` state on a `#0C1117` dark background. No dark-solid variant exists. Violates WCAG AA (contrast ~1.8:1 for nav text on dark) and breaks the brand pattern set by fn-2-gfq.

2. **No breadcrumb or CTA** — Every case study page ends with a lone `← All Work` link. Visitors have no contextual forward path (contact, next project). CTA click must fire the existing GA4 `cta_click` event taxonomy from `app/lib/analytics.ts`.

3. **Weak visual hierarchy on case study headers** — The `h1` in `.v9-case-header` is undersized relative to the homepage hero. `.v9-case-meta` spacing is tight.

## Scope

- `app/_shared/nav.css` — add `.v9-nav--solid-dark` variant
- `app/_home/components/Nav.tsx` — add `variant?: 'dark' | 'light'` prop
- `app/work/layout.tsx` — pass `variant="dark"` to `<Nav>`
- `app/work/_components/Breadcrumb.tsx` — new (usePathname + label map)
- `app/work/_components/CaseCTA.tsx` — new (dark bg card, teal button, GA4 event)
- `app/work/work.css` — breadcrumb + CTA styles, h1 size bump
- 3 case study pages — remove lone back-link footer, add nothing else (layout handles it)
- `docs/brand-guidelines.md` — document nav variants + breadcrumb + CTA
- `docs/interaction-design-analysis.md` — note dark/light nav behavior

## Approach

- Nav fix pattern mirrors existing `.v9-nav--solid` at `app/_shared/nav.css:18-23` — add a sibling rule for dark background
- Breadcrumb uses `usePathname()` (already imported elsewhere in the app); label map is a plain const
- CaseCTA is a pure presentational component — no server state, no dynamic data
- GA4 call wraps the existing `trackEvent('cta_click', {...})` from `app/lib/analytics.ts`

## Quick commands

```bash
# Dev server
npm run dev

# Build check
npm run build

# Lint
npm run lint

# Smoke test: visit a case study page and confirm:
# 1. Nav bar is dark/teal (not white)
# 2. Breadcrumb shows at top of content
# 3. CTA appears at page bottom
# 4. Accessibility: contrast check on nav
```

## Open questions

- **Q5 (BLOCKING T2)**: What should the CTA say and where does it go?
  - Options: "Let's work together → /#contact" | "Book a call → Calendly embed" | custom
- **Q7 (influences T3 scope)**: Do portal/product screenshots exist for the 3 case studies?
  - If yes: T3 can add an image slot to `.v9-case-header`
  - If no: T3 stays typography-only

## Acceptance

- [ ] Nav on `/work/healthcare-real-estate` shows dark background with teal/white text (not white bar)
- [ ] WCAG AA passes for nav text on dark bg (contrast ≥ 4.5:1)
- [ ] Breadcrumb renders on all 3 case study pages; links resolve correctly
- [ ] CTA renders below last content section on all 3 case studies
- [ ] CTA click fires `cta_click` GA4 event
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] `docs/brand-guidelines.md` updated with nav variants, breadcrumb, CTA

## References

- Nav component: `app/_home/components/Nav.tsx:11,19-22,100`
- Nav CSS: `app/_shared/nav.css:18-23` (existing solid variant)
- Work layout: `app/work/layout.tsx:5-17`
- Work CSS: `app/work/work.css:7-17,174-299`
- Analytics: `app/lib/analytics.ts`
- fn-2-gfq epic (nav a11y precedent)
