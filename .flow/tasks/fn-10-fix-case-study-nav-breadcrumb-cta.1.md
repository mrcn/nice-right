# fn-10-fix-case-study-nav-breadcrumb-cta.1 Add dark nav variant for work layout

## Description
Add a `.v9-nav--solid-dark` CSS variant and a `variant` prop to `Nav.tsx` so the work layout can render a dark-background nav bar instead of the current white one.

**Size:** M
**Files:**
- `app/_shared/nav.css`
- `app/_home/components/Nav.tsx`
- `app/work/layout.tsx`

## Approach

- Mirror `.v9-nav--solid` at `nav.css:18-23` — add sibling `.v9-nav--solid-dark` rule with `background: rgba(12,17,23,0.95)` (matches `--v9-bg-dark`), white text, teal accent
- Logo, link, and CTA colors inside `.v9-nav--solid-dark` must match the existing transparent nav state (already white/teal)
- Add `variant?: 'dark' | 'light'` prop to `Nav.tsx:11`; branch at `L19-22` to pass the right class at `L100`
- `work/layout.tsx:8` — change `<Nav defaultSolid />` to `<Nav defaultSolid variant="dark" />`

## Key context

- `defaultSolid` still needed — it forces `setSolid(true)` on mount so the nav is immediately opaque (no flash). The new `variant` only controls which solid style is applied.
- WCAG AA target: contrast ≥ 4.5:1 for nav links on dark bg. White (`#fff`) on `#0C1117` = ~19:1 — trivially passes.
- fn-2-gfq set the a11y precedent; do not regress transparent-nav contrast on the homepage.
## Acceptance
- [ ] `.v9-nav--solid-dark` rule exists in `nav.css` and applies dark bg + white/teal text
- [ ] `Nav.tsx` accepts `variant` prop without TS errors
- [ ] `/work/healthcare-real-estate` renders dark nav bar (not white)
- [ ] `/work/northern-trust` and `/work/green-goods` also render dark nav
- [ ] Homepage (`/`) nav behavior unchanged
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: