# ContactSection 3-Variant Demos

## Overview

Three standalone HTML demo files testing genuinely distinct layout hypotheses for a redesigned ContactSection. Each variant tests a different answer to: **where do trust signals belong relative to the booking widget?**

Root problems from hive swarm analysis:
- Bio/trust material appears *after* the calendar (inverted trust order)
- Two mismatched container widths (800px cal, 1120px bio)
- Full-height photo forces `justify-content: space-between`, scattering bio content

## Scope

- **In:** 3 new files `public/contact-demo-1.html`, `contact-demo-2.html`, `contact-demo-3.html`
- **Out:** Changes to `ContactSection.tsx`, Cal.com scroll-trap fix
- **V1/V2 note:** Photo requires `npm run dev` (image served at `localhost:3000`)
- **V3 note:** No photo — works at `file://`

## The 3 Distinct Hypotheses

**V1 — Side-by-Side** (`contact-demo-1.html`)
- Hypothesis: trust + action visible simultaneously
- 1120px container, CSS grid `5fr 4fr`, 64px gap
- Heading (H2) + sub left-aligned ABOVE the grid (full-width row)
- Left col: cal-stub (`width:100%`, `min-height:500px`), teal border frame
- Right col: portrait (240×300px constrained) → name H3 → quote → bio → stats → hr → outlined contact cards
- Responsive ≤900px: single col, bio first then cal

**V2 — Trust-First Stacked** (`contact-demo-2.html`)
- Hypothesis: seeing the person before the calendar increases trust enough to book
- 1120px single column
- Row 0: H2 centered above everything (section heading)
- Row 1 (bio panel): mini 2-col grid `auto 1fr`, gap 40px — photo (280×360px, constrained left) + bio text right (name H3, quote, body, stats)
- Row 2: full-width cal-stub (`width:100%`, `min-height:500px`), with label row
- Row 3: contact cards flex row
- Responsive ≤768px: bio panel stacks (photo full-width above text)

**V3 — Minimal/Focused** (`contact-demo-3.html`)
- Hypothesis: removing all trust signals and relying on copy alone reduces friction
- 840px max-width, centered, single column
- No photo, no bio block
- Row 0: H2 centered, 3rem, "Let's figure out what would work for your business"
- Row 1: sub "30 minutes. No pitch. You keep the notes." centered, muted
- Row 2: cal-stub (`width:100%`, `min-height:500px`), subtle teal border
- Row 3: plain text links — "Or email me: Marcin@uxoxo.xyz · LinkedIn ↗" — centered, small, teal

## Shared style constants

- `section { padding: 120px 0; }` — matches production component
- Image path: `images/marcin-lg.jpeg` (relative, works when served)
- Eyebrow element: `<p class="eyebrow">` — `font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#0B8A6E`
- Cal-stub label: `<p>` 11px teal uppercase inside stub
- Teal accent: `#06D6A0` (hover states) / `#0B8A6E` (labels, eyebrows)
- Contact cards (V1, V2): `border:1px solid rgba(255,255,255,0.12); background:transparent`; hover `border-color:#06D6A0`
- Stats block: number (`<span>` Instrument Serif, teal) + label below (`<span>` 0.68rem, uppercase, 28% white opacity, e.g. "Started", "Projects")
- V2 photo: `width:280px; height:360px; object-fit:cover; object-position:center top; border-radius:12px`

## Quick commands

```bash
# Serve and open demos
npm run dev
open http://localhost:3000/contact-demo-1.html
open http://localhost:3000/contact-demo-2.html
# V3 also works directly:
open public/contact-demo-3.html
```

## Acceptance

- [ ] V1 and V2 open correctly via `localhost:3000` with photo visible
- [ ] V3 opens at `file://` with no broken assets
- [ ] Each demo is visually distinct — tests a different structural hypothesis
- [ ] No variant uses `justify-content: space-between` on bio column
- [ ] Cal-stub `min-height: 500px` in all variants (not fixed height)
- [ ] Bio/credibility visible on load without scrolling in V1 and V2
- [ ] Contact links/cards have visible hover states in all variants
- [ ] Each file has a visible variant label (V1/V2/V3 + one-line hypothesis description)
- [ ] Section padding is 120px top/bottom in all variants

## References

- Template: `public/bio-contact-demo.html` (atoms, color tokens, font setup)
- Pattern: `public/hero-demo-1.html` (preconnect, head structure)
- Component: `app/_home/components/ContactSection.tsx` (heading levels, stat structure, card markup)
- Design tokens: `#0C1117` bg, `#06D6A0`/`#0B8A6E` accent, Inter + Instrument Serif
