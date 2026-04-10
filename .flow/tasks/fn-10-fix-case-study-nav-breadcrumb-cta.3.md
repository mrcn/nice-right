# fn-10-fix-case-study-nav-breadcrumb-cta.3 Bump case-study visual hierarchy + update docs

## Description
Improve the typographic hierarchy on case study header sections and update documentation to record the new nav variant, breadcrumb, and CTA patterns.

**Size:** M (two S tasks combined)
**Files:**
- `app/work/work.css`
- `docs/brand-guidelines.md`
- `docs/interaction-design-analysis.md`

## Approach

**Visual hierarchy (`work.css`)**
- Increase `.v9-case-header h1` font-size: from current value to `clamp(2.5rem, 5vw, 4rem)` (calibrate against homepage hero which uses Instrument Serif at ~4-5rem)
- Increase `.v9-case-meta` top margin / letter-spacing for breathing room
- Optional (if Q7 = yes): add `.v9-case-header__image` slot for a hero screenshot — 16:9 aspect ratio container, `object-fit: cover`, max-width 100%
- All changes are additive CSS; no JS or component changes

**Docs**
- `docs/brand-guidelines.md`: add "Nav variants" section documenting transparent, `.v9-nav--solid` (light), `.v9-nav--solid-dark`; add "Breadcrumb" component entry; add "CTA card" pattern entry
- `docs/interaction-design-analysis.md`: add a note in the nav behavior section explaining dark/light variant logic driven by layout context

## Key context

- If Q7 (screenshots available?) = yes, include the image slot. If no, skip it and record the gap in brand-guidelines.md as "TODO: add case study screenshots".
- Work.css changes must not affect `.v9-case-meta` grid layout on `healthcare-real-estate/page.tsx:11-33` (complex multi-column grid).
## Acceptance
- [ ] `.v9-case-header h1` is visually larger (matches design intent from analysis)
- [ ] `.v9-case-meta` spacing is improved without breaking grid layout
- [ ] `docs/brand-guidelines.md` documents nav variants, breadcrumb, CTA card
- [ ] `docs/interaction-design-analysis.md` includes dark/light nav note
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: