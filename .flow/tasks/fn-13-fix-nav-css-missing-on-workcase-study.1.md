# fn-13-fix-nav-css-missing-on-workcase-study.1 Add nav.css import + fix overflow-x on .v9-work

## Description
Two-file fix that gives work/case-study pages a working nav. The Nav component has zero CSS applied — `nav.css` is never loaded in the `/work/*` route.

**Size:** S  
**Files:** `app/work/layout.tsx`, `app/work/work.css`

## Approach

`app/work/layout.tsx` — add one import after the existing `import './work.css'` line:
```
import '@/app/_shared/nav.css';
```
JS import (not CSS @import) — consistent with the file's existing pattern.

`app/work/work.css:16` — change `overflow-x: hidden` to `overflow-x: clip` on `.v9-work`:
- Prevents horizontal scroll identically (same visual effect)
- Does not create a scroll container
- Avoids WebKit fixed-child clipping bug (#160953) as defensive hardening
- Note: the current nav invisibility is due to missing CSS, not clipping; this is a preventive improvement

## Key context

- `nav.css` already has `.v9-nav--solid-dark` — dark variant applies immediately once imported
- `work/layout.tsx:14` already has `<Nav defaultSolid variant="dark" />` — no component changes needed
- `overflow: clip` browser support: 96%+ (MDN); graceful degradation to visible overflow
- Static export (`output: 'export'`): page.css duplicate nav rules are NOT a cascade conflict — each page is a separate HTML document

## References

- `app/_shared/nav.css:1` — canonical nav styles (245 lines)
- `app/work/layout.tsx:14` — Nav component already wired
- `app/work/work.css:16` — `overflow-x: hidden` to change
- WebKit Bug #160953: https://bugs.webkit.org/show_bug.cgi?id=160953
## Approach

`app/work/layout.tsx` — add one import after the existing `import './work.css'` line:
```
import '@/app/_shared/nav.css';
```
Use the JS import (not a CSS `@import` in work.css) — consistent with how the layout already imports work.css, and explicit in the Next.js bundler dependency graph. Tokens.css is already imported inside work.css, so ordering is safe.

`app/work/work.css:16` — change the `overflow-x` value on `.v9-work` from `hidden` to `clip`. `overflow: clip` prevents horizontal overflow identically to `overflow: hidden` visually, but does NOT create a scroll container and does NOT trigger WebKit bug #160953. The existing pattern on the homepage (`app/_home/page.css` line 21) uses the same wrapper pattern — update that too if confirmed affected (out of scope for this task).

## Key context

- `nav.css` already has `.v9-nav--solid-dark` (added in fn-10) — importing it gives the dark variant immediately, no additional CSS needed
- `overflow: clip` browser support: 96%+ as of 2025 (MDN); graceful degradation to visible overflow if unsupported
- WebKit bug #160953 is OPEN as of Jan 2026 — not a fixed browser, an unfixed engine bug

## References

- `app/_shared/nav.css` — canonical nav styles, 245 lines
- `app/work/layout.tsx:14` — `<Nav defaultSolid variant="dark" />` already wired
- `app/work/work.css:1` — current imports (tokens.css only)
- `app/work/work.css:16` — `.v9-work { overflow-x: hidden }`
- WebKit Bug #160953: https://bugs.webkit.org/show_bug.cgi?id=160953
## Acceptance
- [ ] `app/work/layout.tsx` imports `@/app/_shared/nav.css`
- [ ] `app/work/work.css` has `overflow-x: clip` on `.v9-work` (not `hidden`)
- [ ] `npm run build` exits 0
- [ ] Nav is `position: fixed` and visible on `/work/` (work index page)
- [ ] Nav is `position: fixed` and visible on `/work/healthcare-real-estate`
- [ ] Nav is `position: fixed` and visible on `/work/northern-trust` (second case study)
- [ ] Dark nav variant renders correctly: dark bg, white/teal text, teal glow shadow
- [ ] Nav remains solid-dark on scroll (defaultSolid skips ScrollTrigger — no transition)
- [ ] Mobile: hamburger visible; opens dark dropdown; Escape or second tap closes it
- [ ] Breadcrumb and CaseCTA unaffected
- [ ] Homepage nav unaffected — regression check on `/`
- [ ] Tested in Safari: nav visible, fixed, not clipped
- [ ] Changes committed
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
