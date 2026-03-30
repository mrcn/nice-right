# fn-2-qeb — Migrate /work pages to v9 design system

## Overview

The `/work` route (index + 3 case study pages) uses a standalone old CSS system with legacy class names and its own inline nav/footer. The homepage uses the v9 design system. This creates a jarring visual discontinuity. This epic migrates all work pages to v9: dark background, Instrument Serif, `#06D6A0` accent, shared Nav+Footer.

## Scope

4 routes affected:
- `app/work/page.tsx` — work index (3 project cards)
- `app/work/northern-trust/page.tsx` — case study (includes YouTube iframes)
- `app/work/healthcare-real-estate/page.tsx` — case study
- `app/work/green-goods/page.tsx` — case study

## Architecture

```
app/
  _shared/
    tokens.css          ← NEW: v9 CSS custom properties only (~30 lines)
  work/
    layout.tsx          ← NEW: v9 shell (Nav solid + Footer + wrapper)
    work.css            ← NEW: work-specific v9 styles (imports tokens.css)
    page.tsx            ← EDIT: remove old nav/footer/css, add v9 markup
    page.css            ← DELETE in T4
    northern-trust/
      page.tsx          ← EDIT
    healthcare-real-estate/
      page.tsx          ← EDIT
    green-goods/
      page.tsx          ← EDIT
  _home/
    page.css            ← EDIT: add @import for tokens.css
    components/
      Nav.tsx           ← EDIT: add defaultSolid prop + absolute anchor links
```

## Key Decisions

**Token extraction (swarm-identified critical issue)**: Do NOT import full `_home/page.css` from the work layout — it's 1,976 lines of homepage component styles. Instead extract just the `:root`/`.v9` CSS custom properties block to `app/_shared/tokens.css`. Work layout imports tokens.css only. `_home/page.css` also imports tokens.css. This avoids `.v9 h1`, `.v9 a` type selectors bleeding into work pages.

**Nav solid on work pages**: Add `defaultSolid?: boolean` to Nav. If true, call `setSolid(true)` on mount and skip ScrollTrigger setup (prevents null-trigger GSAP leak). Nav links must use absolute anchors (`/#services`, `/#results`, `/#contact`) when `defaultSolid` is true — hash-only links break on non-home pages.

**Atomic CSS removal**: Remove old CSS imports from each page in the same task that rewrites that page's markup (T2 removes work/page.tsx import, T3 removes case study imports). Do NOT defer all CSS removal to T4.

**Body background bleed**: Root `app/layout.tsx` sets `style={{ backgroundColor: '#fafaf9' }}` on `<body>`. Work shell `div` must have `min-height: 100dvh` and `background: #0C1117` to prevent warm-white bleed at page bottom.

**No new animations**: Static reskin only. No GSAP on work pages.

## Quick commands

```bash
npm run dev
npm run build
npm run lint
```

## Phases

### Phase 1 — Token extraction + Nav solid prop + work layout
- Extract CSS custom properties from `_home/page.css` to `app/_shared/tokens.css`
- Add `@import '../_shared/tokens.css'` to `_home/page.css`
- Add `defaultSolid?: boolean` to Nav.tsx; absolute anchor links when defaultSolid
- Create `app/work/layout.tsx`: imports tokens.css + work.css, renders Nav(defaultSolid)+Footer
- Create `app/work/work.css`: imports tokens.css, sets `.v9-work { min-height: 100dvh; background: #0C1117 }`

### Phase 2 — Work index reskin
- Remove `import '../page.css'` from work/page.tsx (atomic with markup rewrite)
- Remove inline nav/footer
- Full-bleed vertical list of 3 projects (NOT card grid)
- Instrument Serif h1, green labels, dark bg

### Phase 3 — Case study pages reskin
- Remove `import '../page.css'` from all 3 case study pages (atomic with markup rewrite)
- Remove inline nav/footer from each
- Preserve all content: headings, paragraphs, meta items, YouTube iframes, images
- Replace class names with `.v9-case-*`

### Phase 4 — CSS cleanup
- Verify all imports removed (grep check)
- Delete `app/work/page.css`
- Verify `app/page.css` has no remaining consumers (likely dead too)
- `npm run build` must pass

## Acceptance

- [ ] All 4 `/work` routes render with dark `#0C1117` background
- [ ] Nav is solid on all work pages (not transparent)
- [ ] Nav links resolve correctly from /work: `/#services`, `/#results`, `/#contact`
- [ ] Mobile hamburger opens/closes on work pages
- [ ] Instrument Serif headings on work index and case study pages
- [ ] Accent color `#06D6A0` (not `#00d4aa`) on labels/links
- [ ] All images present after reskin (no broken src paths)
- [ ] YouTube iframes intact on northern-trust case study
- [ ] `export const metadata` titles/descriptions unchanged on all 4 pages
- [ ] Old CSS classes (`nav`, `container`, `btn`, `work-header`, `case-study`) absent from work/ markup
- [ ] `app/work/page.css` deleted, no references remain
- [ ] No `#fafaf9` background visible (body bleed covered)
- [ ] `npm run build` exits 0
- [ ] No TypeScript errors

## References

- v9 tokens to extract: `app/_home/page.css` lines 9-50 (`:root` + `.v9` base)
- Nav: `app/_home/components/Nav.tsx:12`
- Footer: `app/_home/components/Footer.tsx`
- Root layout body bg: `app/layout.tsx` (inline style `#fafaf9`)
- Old work CSS: `app/work/page.css` (delete in T4), `app/page.css` (verify orphaned)
