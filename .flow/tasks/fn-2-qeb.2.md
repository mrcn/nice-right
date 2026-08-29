# fn-2-qeb.2 Work index page reskin to v9
## Description
Rewrite the work index page as the v9 full-bleed list layout.

## Goal
Rewrite work index page to v9 — full-bleed vertical list layout. Remove old CSS import atomically.

## Files
- `app/work/page.tsx` — EDIT
- `app/work/work.css` — EDIT (add index styles)

## Changes

1. Remove `import '../page.css'` (resolves to `app/page.css` — the old homepage CSS)
2. Remove inline `<nav>` block (layout provides it)
3. Remove inline `<footer>` block (layout provides it)
4. Keep `export const metadata` unchanged
5. New markup: full-bleed vertical list

```
<main id="main-content">
  <section className="v9-work-header">
    <p className="v9-work-label">Selected Work</p>
    <h1>Projects That Moved the Needle</h1>
    <p className="v9-work-intro">...</p>
  </section>

  <section className="v9-work-list">
    {/* 3 items, full bleed, stacked vertically */}
    <Link href="/work/northern-trust" className="v9-work-item">
      <div className="v9-work-item-image">...</div>
      <div className="v9-work-item-content">
        <span className="v9-work-item-client">Northern Trust</span>
        <h2>...</h2>
        <p>...</p>
        <span className="v9-work-item-link">View case study →</span>
      </div>
    </Link>
    {/* repeat for other 2 */}
  </section>
</main>
```

## CSS additions to work.css

Full-bleed vertical list (not grid). Each item is a wide horizontal strip on desktop, stacked on mobile:

```css
.v9-work-header { padding: 140px 24px 60px; max-width: 800px; margin: 0 auto; }
.v9-work-label { font-size: 0.78rem; color: #06D6A0; letter-spacing: 0.08em; text-transform: uppercase; }
.v9-work-header h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(2rem, 4vw, 3.5rem); }

.v9-work-list { display: flex; flex-direction: column; }
.v9-work-item { display: flex; border-top: 1px solid rgba(255,255,255,0.07); padding: 60px 24px; gap: 48px; max-width: 1100px; margin: 0 auto; width: 100%; text-decoration: none; }
.v9-work-item:hover .v9-work-item-link { color: #06D6A0; }
.v9-work-item-image { width: 400px; flex-shrink: 0; aspect-ratio: 16/9; overflow: hidden; }
.v9-work-item-image img { width: 100%; height: 100%; object-fit: cover; }
.v9-work-item-client { font-size: 0.78rem; color: #06D6A0; text-transform: uppercase; letter-spacing: 0.08em; }
.v9-work-item-content h2 { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.4rem, 2vw, 2rem); color: #fff; margin: 8px 0 12px; }
.v9-work-item-link { font-size: 0.85rem; color: rgba(255,255,255,0.5); }

@media (max-width: 768px) {
  .v9-work-item { flex-direction: column; }
  .v9-work-item-image { width: 100%; }
}
```

## Acceptance
- [ ] `/work` renders with dark bg, no old nav/footer
- [ ] 3 projects listed vertically (not grid)
- [ ] Instrument Serif heading
- [ ] Green client labels (`#06D6A0`)
- [ ] Images render (check src paths unchanged: `/images/bankk.webp` etc.)
- [ ] Links to case study routes work
- [ ] Mobile: items stack vertically
- [ ] `export const metadata` title/description unchanged

## Done summary
Implemented and merged the v9 work index reskin in PR #8.
## Evidence
- Commits: 2620730b94c36625438a57e38ecf7e96512429a0, 5d33235e2a1791fb060b2b95be77441d5d4055dd
- Tests: npm test, npm run build
- PRs: #8, #30
