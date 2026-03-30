# fn-3-5gb.1 Demo V1: Side-by-Side (calendar + bio 2-col)

## Description
Build `public/contact-demo-1.html` — Side-by-Side layout (trust + action simultaneously visible).

**Size:** M  
**Files:** `public/contact-demo-1.html` (new)  
**Hypothesis:** showing bio and calendar at the same time removes the "who is this?" hesitation at the booking moment.

## Content blocks

(a) Eyebrow + H2 + sub [above grid, full-width] | (b) Cal-stub [left col] | (c) Bio [right col] | (d) Contact cards [right col, below bio]

## Approach

Head structure: follow `public/hero-demo-1.html` (preconnect hints, `wght@400;500;600;700` for Inter)

**Section:** `padding: 120px 0; background: #0C1117`

**Above-grid header** (outside grid container, 1120px max-width):
- `<p class="eyebrow">Contact</p>` — 11px, 600 weight, letter-spacing 0.12em, uppercase, color `#0B8A6E`
- `<h2>` — Instrument Serif, `clamp(2rem, 4vw, 3.5rem)`, left-aligned, `letter-spacing: -0.02em`
- `<p class="sub">30 minutes. No pitch.</p>` — 17px, `rgba(255,255,255,0.55)`

**Grid container** (1120px max-width, `display:grid; grid-template-columns:5fr 4fr; gap:64px; align-items:start`):

Left col — cal-stub:
- Wrapper: `border:1px solid rgba(6,214,160,0.14); border-radius:16px; overflow:hidden`
- Label row inside: `<p>Pick a time</p>` — 11px, teal uppercase, 600 weight, 16px padding, border-bottom `rgba(255,255,255,0.06)`
- Placeholder box: `width:100%; min-height:500px; background:#111820; display:flex; align-items:center; justify-content:center`
- Placeholder text: "[ Cal.com embed — month view ]" — 12px, `rgba(255,255,255,0.15)`, uppercase

Right col — bio + contacts:
- `display:flex; flex-direction:column; gap:24px; align-items:flex-start`
- Photo: `<img src="images/marcin-lg.jpeg">` — `width:240px; height:300px; object-fit:cover; object-position:center top; border-radius:12px`
- Name: `<h3>` — Instrument Serif, 2.4rem, weight 400, `letter-spacing:-0.02em`
- Quote: `<p>` — Instrument Serif italic, 1.2rem, `rgba(255,255,255,0.85)` — `<em>` spans colored `#06D6A0`
- Body: `<p>` — Inter, 0.95rem, `rgba(255,255,255,0.52)`, line-height 1.78
- Stats row: `display:flex; gap:28px` — each stat has number `<span>` (Instrument Serif 1.35rem, `#06D6A0`) + label `<span>` (0.68rem, 600, uppercase, letter-spacing 0.08em, `rgba(255,255,255,0.28)`)
  - Stat 1: "2013" / "Started" — Stat 2: "100+" / "Projects"
- `<hr>` — `border:none; border-top:1px solid rgba(255,255,255,0.07); margin:0` (gap handles spacing)
- Two `<a>` contact cards: `border:1px solid rgba(255,255,255,0.12); background:transparent; border-radius:12px; padding:16px 20px; display:flex; align-items:center; gap:14px; text-decoration:none`
  - Icon div: 40×40px, `border-radius:10px; background:linear-gradient(135deg,rgba(11,138,110,0.15),rgba(6,214,160,0.1)); color:#06D6A0` — include SVG icons from ContactSection.tsx
  - Text: `<strong>` (0.9rem, 600, white) + `<span>` (0.82rem, 400, `rgba(255,255,255,0.45)`)
  - Hover: `border-color:#06D6A0; transform:translateY(-2px)`

**Responsive ≤900px:** single column (grid-template-columns: 1fr), right col (bio) first, left col (cal) second

## Key context

- Photo path `images/marcin-lg.jpeg` is relative — works at `localhost:3000`, NOT `file://`
- Cal-stub must be `width:100%; min-height:500px` — NOT a fixed pixel width
- SVG icons in ContactSection.tsx at lines 263-266 (email) and 275-277 (LinkedIn)
- `gap:24px` on flex col handles all spacing — no `justify-content:space-between`
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
- [ ] File opens correctly at `localhost:3000/contact-demo-1.html` with photo visible
- [ ] Variant label "V1 — Side-by-Side" + hypothesis visible at top
- [ ] H2 and sub-text are left-aligned (not centered)
- [ ] Cal-stub and bio panel visible simultaneously without scrolling at 1440px viewport
- [ ] Cal-stub has teal-tinted border (not just grey)
- [ ] Photo is 240×300px — NOT full column height
- [ ] Bio text has consistent gap between items (no stretched spacing)
- [ ] Stats show number + label below (e.g. "2013" / "Started")
- [ ] Contact cards are outlined (transparent bg, visible border)
- [ ] Contact cards include SVG icons
- [ ] Contact cards show teal border on hover + translateY(-2px)
- [ ] Stacks correctly ≤900px with bio above cal-stub
- [ ] Section has 120px top/bottom padding
## Done summary
Created public/contact-demo-2.html — Trust-First Stacked layout with bio panel (280x360px photo + text grid) above a full-width cal-stub, centered H2, and outlined contact cards below. Responsive down to 768px (bio stacks) and 640px (cards stack).
## Evidence
- Commits: d9d55a6ae668cf1b53ec43f52f68185d6282ccc4
- Tests:
- PRs: