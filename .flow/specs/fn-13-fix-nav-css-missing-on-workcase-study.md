# fix: nav CSS missing on work/case-study pages

## Overview

The Nav component on `/work/*` pages has zero CSS applied. Nav styles live inline in `app/_home/page.css` (scoped to homepage only). `app/_shared/nav.css` is the canonical source but is never imported in the work route — the component renders but is invisible/unstyled.

## Root cause (confirmed by 6-scout swarm)

1. `app/work/layout.tsx` imports `./work.css` — which only imports `tokens.css`
2. `nav.css` is never imported anywhere in the work route tree
3. Nav renders with `v9-nav` classes but no CSS → no `position: fixed`, no height, no background; links styled amber by globals `a` reset
4. `app/_home/page.css` has 48 nav rules inline — homepage works because page.css loads for `/`; this is scoped to the homepage route only (static export: each page is a full HTML document)

## Scope

**In scope:**
- `app/work/layout.tsx` — add `import '@/app/_shared/nav.css'` (JS import)
- `app/work/work.css:16` — change `overflow-x: hidden` to `overflow-x: clip` on `.v9-work`

**Out of scope:**
- Cleaning up duplicate nav rules in `page.css` — two conflicting blocks exist (lines 105–323 using `v9-nav--solid`, and lines 681–787 using `v9-nav-scrolled`/`v9-nav-toggle` which Nav.tsx doesn't even emit). Safe to defer because static export means page.css never loads on `/work/*`. Follow-up: create a separate tech-debt epic.
- Changing nav variant (`dark` vs `light`) — design decision, not a bug

## Approach

**Primary fix:** Add `import '@/app/_shared/nav.css'` to `work/layout.tsx` — after the existing `import './work.css'` line. JS import (not CSS `@import`) is consistent with the existing pattern in this file and gives Next.js explicit visibility into the dependency graph.

**Secondary improvement:** Change `overflow-x: hidden` → `overflow-x: clip` on `.v9-work` (work.css:16). `overflow: clip` prevents horizontal scroll identically, but does not create a scroll container and avoids the WebKit fixed-child clipping bug (#160953) which affects `position: fixed` elements when ancestors have `overflow: hidden` combined with other stacking context triggers. The nav on work pages uses `position: fixed` — this is defensive hardening. Note: the nav was invisible due to missing CSS, not due to clipping; this change is a preventive improvement, not a bug fix for the current issue.

**Why not @import in work.css?** Both work. JS import preferred: (a) matches existing pattern, (b) explicit at component boundary, (c) avoids Lightning CSS/Tailwind v4 ordering questions.

**Static export note:** Because `output: 'export'` is set in `next.config.js`, each route is a self-contained HTML document. The duplicate nav rules in `page.css` will never load alongside `nav.css` on work pages. If SSR/hybrid is ever adopted, the page.css duplicates become a cascade conflict and must be cleaned up first.

## Quick commands

```bash
npm run build
# Navigate to /work/ (work index) — nav should be dark, fixed
# Navigate to /work/healthcare-real-estate — nav dark, fixed, Breadcrumb + CaseCTA visible
# Mobile: tap hamburger — dark dropdown should open
# Scroll down — nav should remain solid-dark (defaultSolid skips ScrollTrigger)
# Safari: nav should be visible and fixed, not clipped
```

## Risks

- Low: `overflow-x: clip` has 96%+ support (caniuse 2026); graceful degradation to visible overflow
- None: Adding nav.css (~245 lines) to work layout bundle — negligible
- None: No component logic changes

## Acceptance

- [ ] `app/work/layout.tsx` imports `@/app/_shared/nav.css`
- [ ] `.v9-work { overflow-x: clip }` in work.css (not `hidden`)
- [ ] `npm run build` exits 0
- [ ] Nav is `position: fixed` and visible on `/work/` (work index page)
- [ ] Nav is `position: fixed` and visible on `/work/healthcare-real-estate`
- [ ] Dark nav variant (`.v9-nav--solid-dark`) renders: dark bg, white/teal text, teal glow shadow
- [ ] Nav remains solid-dark on scroll (does not transition — `defaultSolid` skips ScrollTrigger)
- [ ] Mobile: hamburger visible; tapping opens dark dropdown; tapping again or pressing Escape closes it
- [ ] Breadcrumb and CaseCTA render correctly (styles already in work.css — unaffected)
- [ ] Tested in Safari: nav visible, not clipped or hidden
- [ ] Changes committed

## References

- `app/_shared/nav.css` — canonical nav styles, 245 lines, includes `.v9-nav--solid-dark`
- `app/work/layout.tsx:14` — `<Nav defaultSolid variant="dark" />` already wired
- `app/work/work.css:1` — current imports (tokens.css only)
- `app/work/work.css:16` — `.v9-work { overflow-x: hidden }` → change to `clip`
- WebKit Bug #160953: https://bugs.webkit.org/show_bug.cgi?id=160953
- Next.js CSS docs: https://nextjs.org/docs/app/getting-started/css
