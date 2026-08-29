# fn-2-qeb.3 Case study pages reskin to v9
## Description
Reskin all three case-study pages to the v9 shell while preserving content.

## Goal
Reskin all 3 case study pages to v9. Remove old CSS import atomically with markup rewrite. Preserve all content: text, images, YouTube iframes.

## Files
- `app/work/northern-trust/page.tsx` — EDIT
- `app/work/healthcare-real-estate/page.tsx` — EDIT
- `app/work/green-goods/page.tsx` — EDIT
- `app/work/work.css` — EDIT (add case study styles)

## Per-page changes (same pattern for all 3)

1. Remove `import '../page.css'` (resolves to `app/work/page.css`)
2. Remove inline `<nav>` block
3. Remove inline `<footer>` block if present
4. **Preserve all content unchanged**: all `<p>`, `<h2>`, meta items, img tags (check src paths), iframe tags — DO NOT change content, only markup structure/classnames
5. Replace old class names with v9:
   - `case-study` → `v9-case`
   - `case-header` → `v9-case-header`
   - `case-meta` / `meta-item` / `meta-label` / `meta-value` → `v9-case-meta` / `v9-meta-item` / `v9-meta-label` / `v9-meta-value`
   - `case-section` → `v9-case-section`
   - `case-content` → `v9-case-content`
   - `case-subtitle` → `v9-case-subtitle`
   - `case-client` → `v9-case-client`
   - `back-link` → `v9-case-back`
   - `video-grid` / `video-item` → `v9-video-grid` / `v9-video-item`

## CSS additions to work.css

```css
/* Case study shell */
.v9-case { max-width: 720px; margin: 0 auto; padding: 120px 24px 80px; }
.v9-case-back { display: inline-block; font-size: 0.85rem; color: rgba(255,255,255,0.5); text-decoration: none; margin-bottom: 40px; }
.v9-case-back:hover { color: #06D6A0; }

/* Header */
.v9-case-client { font-size: 0.78rem; color: #06D6A0; letter-spacing: 0.08em; text-transform: uppercase; }
.v9-case-header h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 400; color: #fff; margin: 12px 0 16px; line-height: 1.15; }
.v9-case-subtitle { font-size: 1.05rem; color: rgba(255,255,255,0.65); line-height: 1.6; }

/* Meta grid */
.v9-case-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; border-top: 1px solid rgba(255,255,255,0.07); border-bottom: 1px solid rgba(255,255,255,0.07); padding: 24px 0; margin: 32px 0; }
.v9-meta-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; }
.v9-meta-value { font-size: 0.9rem; color: rgba(255,255,255,0.87); margin-top: 4px; }

/* Content sections */
.v9-case-section { margin-bottom: 48px; }
.v9-case-section h2 { font-family: 'Instrument Serif', Georgia, serif; font-size: 1.6rem; font-weight: 400; color: #fff; margin-bottom: 16px; }
.v9-case-section p { color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 16px; }

/* Video embeds */
.v9-video-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
.v9-video-item { aspect-ratio: 16/9; }
.v9-video-item iframe { width: 100%; height: 100%; border: none; }

@media (max-width: 640px) {
  .v9-case-meta { grid-template-columns: 1fr 1fr; }
  .v9-video-grid { grid-template-columns: 1fr; }
}
```

## Critical: Preserve content
- Northern Trust: has 9 YouTube iframes + 1 `<img>` — keep all, just update class names
- All pages: keep exact `export const metadata` objects unchanged

## Acceptance
- [ ] All 3 case study pages render with dark bg, solid nav, footer
- [ ] Client labels green (`#06D6A0`)
- [ ] H1 uses Instrument Serif
- [ ] Meta grid (3 cols) renders correctly
- [ ] Northern Trust: all YouTube iframes present and loading
- [ ] All inline images present (check src paths)
- [ ] Back link to `/work` works
- [ ] `export const metadata` titles/descriptions unchanged on all 3 pages
- [ ] No TypeScript errors

## Done summary
Implemented and merged the v9 case-study reskin in PR #8.
## Evidence
- Commits: 2620730b94c36625438a57e38ecf7e96512429a0, 5d33235e2a1791fb060b2b95be77441d5d4055dd
- Tests: npm test, npm run build
- PRs: #8, #30
