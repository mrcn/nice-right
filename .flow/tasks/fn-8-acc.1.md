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
Removed nested HTML structure from landing layouts in PR #12.
## Evidence
- Commits: b2acf7c7ad2fcf57f429234b444a7d83b993b6fb, 363de53931cbb4d3b05367bb7b39e36272bdecaa, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm test, npm run build, axe accessibility tests, analytics smoke verification
- PRs: #12, #13, #28