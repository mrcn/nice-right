# fn-3-5gb.2 Demo V2: Trust-First Stacked (bio above calendar)

## Description
Build `public/contact-demo-2.html` — Trust-First Stacked layout (bio panel before calendar).

**Size:** M  
**Files:** `public/contact-demo-2.html` (new)  
**Hypothesis:** seeing who Marcin is before seeing the calendar reduces skepticism and increases booking intent.

## Content blocks

Row 0: H2 centered (section heading) | Row 1: bio panel (photo left, text right) | Row 2: cal-stub full-width | Row 3: contact cards row

## Approach

Head: same font/preconnect setup as V1.

**Section:** `padding: 120px 0; background: #0C1117`  
**Container:** 1120px max-width, `padding: 0 24px`

**Row 0 — section heading** (text-align: center, margin-bottom: 56px):
- `<p class="eyebrow">Ready to start?</p>` — same eyebrow style as V1 but centered
- `<h2>` — Instrument Serif `clamp(2rem, 4vw, 3.5rem)`, centered
- `<p class="sub">30 minutes. No pitch.</p>` — 17px, `rgba(255,255,255,0.55)`, centered

**Row 1 — bio panel** (margin-bottom: 56px):
- `display:grid; grid-template-columns:auto 1fr; gap:40px; align-items:start`
- Left: `<img src="images/marcin-lg.jpeg">` — `width:280px; height:360px; object-fit:cover; object-position:center top; border-radius:12px`
- Right: `display:flex; flex-direction:column; gap:20px`
  - `<h3>` — Instrument Serif 2.4rem, weight 400
  - Quote `<p>` — Instrument Serif italic 1.2rem, `rgba(255,255,255,0.85)`, `<em>` in `#06D6A0`
  - Body `<p>` — Inter 0.95rem, `rgba(255,255,255,0.52)`, line-height 1.78
  - Stats `display:flex; gap:28px` — same structure as V1 (number + label below)
- Responsive ≤768px: grid collapses to 1 col (`grid-template-columns:1fr`), photo becomes `width:100%; height:auto; aspect-ratio:4/3`

**Row 2 — cal-stub** (margin-bottom: 48px):
- Label row: `<p>Book a free 30-min call</p>` 14px, white 70% + `<p>No pitch. We talk through your situation.</p>` 13px, 45% white — padding 20px 24px, border-bottom `rgba(255,255,255,0.06)`
- `border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden`
- Stub box: `width:100%; min-height:500px; background:#111820; display:flex; align-items:center; justify-content:center`
- Stub text: "[ Cal.com embed — month view ]" 12px, 15% white, uppercase

**Row 3 — contact cards** (flex row):
- `<p class="eyebrow">Or reach out directly</p>` — same eyebrow style, margin-bottom:16px
- `display:flex; gap:16px; flex-wrap:wrap`
- Two `<a>` cards: same outlined style as V1 (transparent bg, `rgba(255,255,255,0.12)` border, SVG icons, hover teal border)
- Responsive ≤640px: flex-direction column

## Key context

- Photo path `images/marcin-lg.jpeg` — requires `localhost:3000`, NOT `file://`
- Row 1 uses CSS grid (`auto 1fr`) not float — no clearfix needed
- `auto 1fr` grid: photo column is exactly as wide as the photo (280px), text fills the rest
- V2 differs from V1: bio is a full-width panel row ABOVE the calendar, not in a side column
## Content blocks (all 4 present, reordered)

(c) Bio first → (a) Heading + sub → (b) Full-width cal-stub → (d) Contact cards row

## Approach

- Template: `public/bio-contact-demo.html` font/color setup
- Font loading: `wght@400;500;600;700` + preconnect hints
- Row 0 (section header, full-width 1120px): H2 `clamp(2rem, 4vw, 3.5rem)` centered
- Row 1 (trust block, 1120px): photo floated left (160px wide, `border-radius: 10px`, `margin-right: 28px`), name H3 (Instrument Serif 2.2rem), italic quote (teal `#06D6A0`), body text, stats inline (2013 · 100+), `clearfix` div after float
- Row 2 (cal-stub, 1120px full-width): **420px tall**, label "Book a free 30-min call" + sub "No pitch. We talk through your situation."
- Row 3 (contact, 1120px): flex row `gap: 16px`, "Or reach out directly:" label + Email card + LinkedIn card side by side
- Rows separated by 56px vertical gap
- Responsive ≤768px: float collapses (float: none, photo full-width), rows stack naturally

## Key context

- Purpose: credibility BEFORE the ask — bio/photo appear first
- Float clearfix needed to prevent row 2 from tucking under the photo
- Cal-stub is 420px here (full-width proportions look better at ~420 than 450)
- `/images/marcin-lg.jpeg` requires local server
## Approach

- Template: same font/color setup from `public/bio-contact-demo.html`
- Layout: single 1120px column, vertically stacked
- Row 1 (trust block): photo floated left (160px wide, border-radius 10px), name H3 (Instrument Serif 2.2rem), italic quote in green accent, body text, stats inline (2013 | 100+ in teal), clearfix after float
- Row 2 (cal-stub): full-width cal-stub, ~420px tall, with heading row "Book a free 30-min call" + sub "No pitch. We talk through your situation."
- Row 3 (contact row): 2-col flex row — "Or reach out directly:" label + email card + LinkedIn card side by side
- Section heading above row 1: H2 at full clamp size, centered or left-aligned
- Each row has clear vertical separation (56px gap between rows)

## Key context

- The purpose of this variant is to show "trust before action" — bio floated top of page, then calendar
- The photo float pattern (not grid) distinguishes this from V1 and creates a magazine-editorial feel
- No GSAP, static demo
## Acceptance
- [ ] File opens at `localhost:3000/contact-demo-2.html` with photo visible
- [ ] Variant label "V2 — Trust-First" + hypothesis visible
- [ ] H2 is centered (unlike V1 which is left-aligned)
- [ ] Bio panel (photo + text) appears visually ABOVE the cal-stub
- [ ] Photo is 280×360px — substantially larger than V1's 240×300 (authority register)
- [ ] Bio text column uses flex, consistent gap (no stretched spacing)
- [ ] Stats show number + label below
- [ ] Cal-stub has heading row with "Book a free 30-min call" label
- [ ] Cal-stub is full-width (not in a column beside bio)
- [ ] Contact cards appear below the cal-stub, in a flex row
- [ ] Contact cards use same outlined style as V1
- [ ] Bio panel stacks correctly ≤768px
- [ ] Section has 120px top/bottom padding
## Done summary
Created the V2 Trust-First stacked ContactSection demo. The bio panel appears before the full-width call stub, with a 280x360 photo, centered heading, direct contact cards below, responsive stacking, keyboard focus, and reduced-motion fallback.
## Evidence
- Commits: d457bc1ce5d8ef5ed76d14b55c83da95697bb759
- Tests: served contact-demo-1.html and contact-demo-2.html, V1/V2 photo and noindex checks, V2 structure, responsive, focus, hover, reduced-motion, and sitemap checks, npm run build (73 application routes)
- PRs: #38