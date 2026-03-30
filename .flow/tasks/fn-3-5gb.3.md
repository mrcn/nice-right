# fn-3-5gb.3 Demo V3: Minimal/Bold (big type + text links)

## Description
Build `public/contact-demo-3.html` — the Minimal/Bold layout variant.

**Size:** M  
**Files:** `public/contact-demo-3.html` (new)

## Content blocks (reduced set — no photo)

(a) Heading (as giant type, left col) | (b) Cal-stub (right col) | modified (c) stats + one-line bio (left col) | modified (d) Email + LinkedIn as plain text links (left col, no cards)

## Approach

- Template: same font/color setup
- Font loading: `wght@400;500;600;700` + preconnect
- Layout: 1200px, `grid-template-columns: 1fr 1fr`, 80px gap, `align-items: start`
- Left col (flex column, `gap: 32px`):
  - Instrument Serif heading `3.8rem` / `line-height: 1.0` / `letter-spacing: -0.03em` — multi-line, e.g. "Let's figure out what works for your business."
  - Stats row: two items, each with a big teal number (`4rem` serif) + small uppercase label below
  - One-sentence bio: `font-size: 0.95rem`, `color: rgba(255,255,255,0.55)` — "Since 2013. 100+ projects. You deal directly with me."
  - Plain text links: `<a href="mailto:...">Marcin@uxoxo.xyz</a>` and `<a href="...">LinkedIn ↗</a>` — teal, underlined on hover, no card treatment
- Right col: cal-stub, **450px tall**, background `#111820` (slightly lighter than page), no border, just label
- **No photo** in this variant
- Responsive ≤768px: single column, heading+left content above cal

## Key context

- Hypothesis: heading + numbers alone can carry credibility without a photo
- Text links (not cards) = zero visual weight on contacts → calendar remains the only action focal point
- The large heading IS the personality — it speaks louder than a photo
- No image dependency — file:// protocol works for this variant
## Approach

- Template: same font/color setup
- Layout: 1200px, 2 equal columns (`1fr 1fr`), 80px gap
- Left col: large Instrument Serif heading (3.5-4rem, multi-line), stats as BIG numbers (4rem teal serif, small label below), one-line bio sentence ("Since 2013. 100+ projects. You deal directly with me."), then plain text links for Email + LinkedIn (no cards, no icons — just underlined `<a>` tags in teal)
- Right col: cal-stub, no border, background slightly lighter than page (`#111720`), just the "Pick a time" label and date grid skeleton boxes
- No photo in this variant
- Responsive: stack at ≤768px (heading col above, cal col below)
- Typography is the hero — heading should command the space

## Key context

- This variant deliberately removes the photo — tests whether credibility can be communicated through copy and numbers alone
- Text-link contacts (not cards) test whether reducing visual weight on secondary CTAs helps the cal-stub dominate
- The contrast between large typography (left) and the calm calendar grid (right) is the design hypothesis
- No GSAP, static demo
## Acceptance
- [ ] File opens in browser (works at file:// — no image dependency)
- [ ] Variant label "V3 — Minimal/Bold" visible
- [ ] Instrument Serif heading at ~3.8rem fills the left column dominantly
- [ ] Stats shown as large numbers (4rem teal) with labels
- [ ] No photo present
- [ ] Contact methods are plain `<a>` tags — no card treatment
- [ ] Cal-stub in right column, visible alongside heading on load
- [ ] Layout distinct from V1 (no portrait) and V2 (not stacked)
- [ ] Stacks ≤768px with heading above cal
- [ ] Inter wght@400;500;600;700 + preconnect in font link
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
