# fn-3-5gb.2 Demo V2: Trust-First Stacked (bio above calendar)

## Description
Build `public/contact-demo-2.html` — the Trust-First Stacked layout variant.

**Size:** M  
**Files:** `public/contact-demo-2.html` (new)

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
- [ ] File opens correctly via local server
- [ ] Variant label "V2 — Trust-First" visible
- [ ] Bio block with floated photo renders above the cal-stub on desktop
- [ ] Quote styled italic in teal (#06D6A0)
- [ ] Stats (2013, 100+) in accent color
- [ ] Float clearfix works — cal-stub starts below the bio, not beside it
- [ ] Cal-stub (420px) appears as second major element
- [ ] Contact cards appear below cal-stub
- [ ] Responsive: photo unstacks ≤768px, layout is readable
- [ ] Inter wght@400;500;600;700 + preconnect in font link
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
