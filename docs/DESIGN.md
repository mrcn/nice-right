# Nice Right — Design Contract

> Category: local B2B growth services (home-service businesses, Chicago)
> Websites and growth systems that keep good operators booked solid.

## 1. Visual Theme & Atmosphere

**The audience's best day, made visible.** Sunshine, work won, phone ringing,
crew busy, check cashed. Warm register: high color temperature, bright key
light, confident energy.

NEVER: moody-noir, ominous shadows, anonymous hands, dark-thriller grading,
"craft/print" noir, stock handshake clichés.

## 2. Color Palette & Roles — ⚠️ OPEN: EXPLORING BOLD DIRECTION

**Decision logged 2026-08-26: muted era closed.** Amber #F5B841 and teal
gradients (#0B8A6E→#06D6A0) read as subdued/timid — owner wants vivid,
confident color. Candidates to explore ON CODED COMPS (never as hex-in-chat):

- ELECTRIC: high-saturation orange (#FF6B1A) / lime (#B4F000) on deep warm ink
- RACING: signal red-orange (#FF4D00) + warm cream, high contrast
- SUNBURST: saturated yellow-orange (#FFB300) + vivid blue (#2563EB) complement
- KELLY: rich green (#16A34A) family, money/spring connotation
- Role structure survives any pick: action-accent = CTA only; identity-accent
  = brand marks only; base = dark warm ink OR bright cream (test both)

Until decided: comps must show at least 3 vivid candidates side by side.

## 3. Typography

Display: Instrument Serif (character, warmth). Body: Inter. Scale via clamp,
2-line headline guarantee (nowrap spans + cascade ownership — see Hero.tsx
history). Negative tracking on display, generous tracking on eyebrows.

## 4. Layout & Spacing

Full-viewport hero (100dvh, never 100vh), centered-film or bottom-left text
block. Content max-width ~860px. Spacious density. text-wrap: balance on
headlines, pretty on subs.

## 5. Components

CTA: large, rounded-12, action-accent fill, dark ink text, glow halo allowed.
Press state scale(0.97) @ ~140ms. Proof row: hairline divider above, sits near
CTA (not page bottom).

## 6. Motion & Interaction

Custom easings only: --ease-out: cubic-bezier(0.23,1,0.32,1). UI transitions
<300ms; press 100–160ms; entrances can be longer. One entrance animation,
runs once. Scroll fades: long distance (≥140% viewport), scrub ≥0.8 — never
twitchy. Reduced-motion: full fallback to static.

## 7. Iconography & Imagery

Photography = real-feeling, warm, human: faces smiling, work won, golden
light, tools with pride. Video loops: 'a photograph that breathes' (≤3MB,
poster-first, lazy-start). No icons unless ultra-light stroke.

## 8. Voice & Tone

Owner-voice only (VoC-verified): booked solid, booked out, phone ringing,
stay busy, jobs, work coming. BANNED: bookings, calendar (desk-speak),
presence, follow-up (vendor-speak), leads (platform bitterness), callbacks
(warranty redo, not demand). CTA grammar: verb + benefit + qualifier —
"Book My Free Strategy Call."

## 9. Edge Cases & Variations

- Never grade imagery against prompt adjectives — calibrate against named
  references (comradeweb.com energy, not its palette).
- Image-gen translates 'craft/moody/premium' → noir: banned input words.
- Text lives in code, never in generated images.
- Approval only on full-width coded comps.
- Amber/teal muted era: closed 2026-08-26 — do not reintroduce without owner.
