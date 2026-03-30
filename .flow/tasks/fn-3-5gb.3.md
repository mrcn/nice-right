# fn-3-5gb.3 Demo V3: Minimal/Bold (big type + text links)

## Description
Build `public/contact-demo-3.html` — Minimal/Focused layout (no bio, copy-only, single column).

**Size:** M  
**Files:** `public/contact-demo-3.html` (new)  
**Hypothesis:** removing all trust signals and making the calendar the only focus reduces decision paralysis.

## Content blocks

Row 0: H2 + sub (copy only) | Row 1: cal-stub (full-width, prominent) | Row 2: plain text contact links

**No photo. No bio block. No cards.**

## Approach

Head: same font/preconnect setup as V1. **This file works at `file://`** — no image dependency.

**Section:** `padding: 120px 0; background: #0C1117`  
**Container:** `max-width: 840px; margin: 0 auto; padding: 0 24px; text-align: center`

**Row 0 — heading block** (margin-bottom: 48px):
- `<p class="eyebrow">Let's talk</p>` — same eyebrow style, centered
- `<h2>` — Instrument Serif `clamp(2.2rem, 5vw, 3.5rem)`, centered, `letter-spacing:-0.02em`, `line-height:1.1`
  - Text: "Let's figure out what would work for your business."
- `<p class="sub">30 minutes. No pitch. You keep the notes.</p>` — 17px, `rgba(255,255,255,0.55)`, centered, margin-top: 16px

**Row 1 — cal-stub** (margin-bottom: 40px):
- `border:1px solid rgba(6,214,160,0.12); border-radius:16px; overflow:hidden`
- Label row: `<p>Pick a time</p>` — 11px, teal uppercase, padding 14px 20px, border-bottom `rgba(255,255,255,0.06)`
- Stub box: `width:100%; min-height:500px; background:#111820; display:flex; align-items:center; justify-content:center`
- Stub text: "[ Cal.com embed — month view ]" 12px, 15% white, uppercase

**Row 2 — text contact links**:
- `<p>` — 13px, `rgba(255,255,255,0.35)`, centered
- Text: "Or email me: " + `<a href="mailto:Marcin@uxoxo.xyz">Marcin@uxoxo.xyz</a>` + " · " + `<a href="https://linkedin.com/in/mklaudiusz" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`
- Link style: `color:#06D6A0; text-decoration:none`; hover: `text-decoration:underline`

**No responsive breakpoints needed** — single column, 840px max-width handles all viewports naturally.

## Key context

- No photo dependency — file opens at `file://public/contact-demo-3.html` directly
- The structural distinction from V1 and V2: **no bio panel at all** — copy carries the entire trust burden
- 840px container matches the original `.v9-contact-container` width — shows what the current cal layout looks like with ONLY the heading and sub-text fixed (no bio below)
- Intentionally narrow — the calendar feels focused, not crammed into a column
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
- [ ] File opens at `file://` with no broken assets (no image dependency)
- [ ] Variant label "V3 — Minimal/Focused" + hypothesis visible
- [ ] No photo anywhere in the page
- [ ] No bio text block (no name, no quote, no stats)
- [ ] H2 is centered, Instrument Serif, prominently large
- [ ] Cal-stub is full-width within the 840px container
- [ ] Cal-stub has teal-tinted border (same as V1)
- [ ] Contact links are plain `<a>` text — no card treatment
- [ ] Contact links show teal color, underline on hover
- [ ] Section is visually distinct from V1 (no 2-col) and V2 (no bio panel)
- [ ] 840px max-width feels focused, not wide
- [ ] Section has 120px top/bottom padding
## Done summary
Created `public/contact-demo-3.html` — a Minimal/Focused contact section variant with no photo or bio panel, a centered Instrument Serif heading, a full-width teal-bordered cal-stub (500px tall), and plain text contact links. Works at `file://` with no image dependencies.
## Evidence
- Commits: f17eeec577ee15eeef4cbb18dafd0ebf705950ba
- Tests:
- PRs: