# fn-3-5gb.1 Demo V1: Side-by-Side (calendar + bio 2-col)

## Description
Build `public/contact-demo-1.html` — the Side-by-Side layout variant.

**Size:** M  
**Files:** `public/contact-demo-1.html` (new)

## Content blocks (all 4 present)

(a) Heading + sub above grid | (b) Cal-stub in left col | (c) Bio photo + name + quote + stats in right col | (d) Email + LinkedIn as outlined cards below bio in right col

## Approach

- Use `public/bio-contact-demo.html` as structural template
- Follow `public/hero-demo-1.html` for `<head>` (preconnect, meta)
- Font loading: `wght@400;500;600;700` for Inter, both preconnect hints
- Layout: 1120px max-width, `grid-template-columns: 5fr 4fr`, 64px gap
- Above grid: eyebrow "Contact" (teal 11px uppercase) + H2 left-aligned + sub "30 minutes. No pitch."
- Left col: cal-stub **450px tall** with `1px solid rgba(6,214,160,0.14)` border + "Pick a time" 12px teal header row inside
- Right col: flex column, `gap: 24px`, **no** `justify-content: space-between`
  - Photo: 240px × 300px, `object-fit: cover; object-position: center top; border-radius: 12px`
  - Name (Instrument Serif 2.4rem) → quote (italic teal) → body text → stats row (2013 | 100+)
  - `<hr>` (1px, 7% opacity)
  - Two outlined contact cards: `border: 1px solid rgba(255,255,255,0.12)`, `background: transparent`, hover → `border-color: #06D6A0`
- Responsive breakpoint ≤900px: single column, bio col first, cal col second
- Variant label badge: "V1 — Side-by-Side" at top of page

## Key context

- `/images/marcin-lg.jpeg` path requires `npm run dev` or local server (not `file://`)
- Demo is static — no GSAP, no real Cal.com embed
- Left-aligned heading is intentional (signals authority, not generic agency)
## Approach

- Use `public/bio-contact-demo.html` as the structural template (font setup, color atoms, cal-stub pattern)
- Follow `public/hero-demo-1.html` for `<head>` structure (preconnect, meta)
- Layout: 1120px max-width container, CSS grid `grid-template-columns: 5fr 4fr`, 64px gap
- Above the grid: section eyebrow label (`Contact`, teal uppercase 11px) + H2 left-aligned at `clamp(2rem, 4vw, 3.5rem)` + subtext "30 minutes. No pitch."
- Left col: cal-stub (gray bordered box, ~420px tall, label "Calendar embed — Cal.com")  with 1px teal border (`rgba(6,214,160,0.14)`) and header label "Pick a time" (12px teal uppercase)
- Right col (flex column, gap 24px, align top): portrait photo `/images/marcin-lg.jpeg` at 240px wide × 300px tall, `object-fit: cover; object-position: center top; border-radius: 12px`, then name/quote/body/stats, then `<hr>`, then outlined contact cards
- Contact cards: `border: 1px solid rgba(255,255,255,0.12)`, `background: transparent`, hover → `border-color: #06D6A0`
- Responsive: stack at ≤900px (bio col first, cal col second)
- Variant label badge: "V1 — Side-by-Side" visible at top of page

## Key context

- Demo shows static layout only — no GSAP, no real Cal.com embed
- `justify-content: space-between` must NOT be used on the right col — this was the original bug
- Photo must be constrained (240×300) not full-height — this was the original bug
- Heading is left-aligned, not centered — this is intentional per design recommendation
## Acceptance
- [ ] File opens correctly when served via `npm run dev` (open `localhost:3000/contact-demo-1.html`)
- [ ] Variant label "V1 — Side-by-Side" visible at top
- [ ] Heading and sub-text are left-aligned above the 2-col grid
- [ ] Calendar stub (450px tall) and bio visible simultaneously without scrolling
- [ ] Photo is 240×300 constrained — not full height of column
- [ ] Bio text flows with consistent `gap` — no stretched spacing
- [ ] Contact cards have outlined style (transparent bg, border)
- [ ] Contact cards show teal border on hover
- [ ] Both preconnect hints + Inter wght@400;500;600;700 in font link
- [ ] Stacks correctly ≤900px (bio above cal)
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
