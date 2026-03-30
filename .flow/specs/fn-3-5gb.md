# ContactSection 3-Variant Demos

## Overview

Three standalone HTML demo files for a redesigned ContactSection, addressing the root UX/CRO problems identified by a hive swarm analysis:
- Bio/trust material appears *after* the calendar (inverted trust order)
- Two mismatched container widths (800px calendar, 1120px bio) create a disconnected feel
- Full-height photo forces `justify-content: space-between`, scattering bio content

Each demo is a self-contained HTML file in `/public/` using a cal-stub placeholder, matching the established `hero-demo-1/2/3.html` pattern. No changes to `ContactSection.tsx` in this epic — demos are for design review only.

## Scope

- **In:** 3 new files `public/contact-demo-1.html`, `contact-demo-2.html`, `contact-demo-3.html`
- **Out:** Changes to `ContactSection.tsx`, Cal.com scroll-trap fix, mobile-specific fixes

## Variant Specs

**V1 — Side-by-Side** (`contact-demo-1.html`)
- 1120px container, 2-col CSS grid: calendar left (5fr) | identity right (4fr)
- Heading + subtext left-aligned above the grid (full width)
- Right col: constrained portrait (240×300px), bio text, stats, rule, outlined contact cards
- Cal-stub in left col with subtle teal border frame
- Responsive: stacks at ≤900px (bio first, then cal)

**V2 — Trust-First Stacked** (`contact-demo-2.html`)
- Single column, 1120px max-width
- Row 1: bio block — photo (160px inline left float), name, quote, body, stats
- Row 2: full-width cal-stub
- Row 3: contact cards in a 2-col row
- Establishes credibility before the booking widget appears

**V3 — Minimal/Bold** (`contact-demo-3.html`)
- 1200px container, 2 equal columns
- Left: large Instrument Serif heading (3.5rem+), stats as big numbers, single sentence bio, text-link contacts
- Right: cal-stub, borderless, blends into bg
- No photo, no cards — maximum reduction of visual noise
- Confident, direct aesthetic

## Quick commands

```bash
# Open demos in browser
open public/contact-demo-1.html
open public/contact-demo-2.html
open public/contact-demo-3.html
```

## Acceptance

- [ ] All 3 HTML files open without errors in a browser (no dev server needed)
- [ ] Each demo is visually distinct — clear different layout strategy
- [ ] Google Fonts load correctly (Inter + Instrument Serif visible)
- [ ] Cal-stub placeholder is clearly labeled and sized realistically (~400px tall)
- [ ] Bio/credibility content visible on load without scrolling past the cal-stub
- [ ] Contact cards/links are clearly interactive (hover states present)
- [ ] Each file has a visible variant label (V1/V2/V3 + brief description)
- [ ] No broken image references (use `/images/marcin-lg.jpeg` path)

## References

- Template: `public/bio-contact-demo.html` (atoms, color tokens, font setup)
- Pattern: `public/hero-demo-1.html` (preconnect, file structure)
- Component: `app/_home/components/ContactSection.tsx` (existing markup/CSS)
- Design tokens: `#0C1117` bg, `#06D6A0`/`#0B8A6E` accent, Inter + Instrument Serif
- Practice: trust signals before booking widget, constrained photo, outlined secondary CTAs
