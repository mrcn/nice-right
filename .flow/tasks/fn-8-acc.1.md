# fn-8-acc.1 Fix nested HTML structure in landing page layouts

## Description
8 of 10 landing page layouts (`app/landing/*/layout.tsx`) define their own `<html>/<head>/<body>` tags. (Note: `customer-surge/layout.tsx` and `exit-ready/layout.tsx` already return `<>{children}</>` — do NOT modify them.) In Next.js 14 App Router, the nested document roots prevent GA4 from loading and break font variable inheritance.

**Size:** M
**Files:**
- `app/landing/competitor-funeral/layout.tsx`
- `app/landing/contractor-growth/layout.tsx`
- `app/landing/fillthechair/layout.tsx`
- `app/landing/invisible-coo/layout.tsx`
- `app/landing/owner-optional/layout.tsx`
- `app/landing/skin-in-game/layout.tsx`
- `app/landing/tableturn-direct/layout.tsx`
- `app/landing/workweek-system/layout.tsx`

**Approach:**
- Remove `<html>`, `<head>`, `<body>` wrapper tags from each of the 8 layouts; keep only the inner content (nav, main, footer)
- Preserve each layout's `export const metadata` — Next.js App Router merges this with root layout metadata automatically
- Move per-page `<meta>`/`<link>` JSX tags into the `metadata` export object
- Keep per-page stylesheet imports (`import './page.css'`) — they work without explicit `<head>` tags
- Remove any hardcoded `<meta name="viewport">` from JSX — the root layout's `export const viewport` covers all routes
- `app/new-site/layout.tsx` and the 2 already-correct layouts are out of scope
## Acceptance
- [ ] The 8 landing page layouts listed in Files have no `<html>`, `<head>`, or `<body>` tags
- [ ] `customer-surge/layout.tsx` and `exit-ready/layout.tsx` are UNCHANGED
- [ ] `npm run build` succeeds
- [ ] Each of the 8 landing pages renders correctly (visually unchanged)
- [ ] GA4 script fires on at least one fixed landing page (browser devtools → network → `www.googletagmanager.com` request present)
- [ ] Font CSS variables `--font-inter` and `--font-instrument-serif` computed on landing pages
- [ ] HTML validator finds single `<html>` element per page
## Done summary
Removed nested <html>/<head>/<body> tags from 8 landing page layouts, replacing each with a `<>{children}</>` fragment. All metadata and viewport exports preserved for App Router merging.
## Evidence
- Commits: 6bfa00c46450901ea3ff4232a3dea915daa9b112
- Tests: npm run build
- PRs: