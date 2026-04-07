# Solo voice pass — site-wide

## Overview

Rewrite all customer-facing copy from agency-plural ("we offer", "we deliver") to solo-direct voice (imperative, "I", or collaborative "we" = me+client only). Triggered by: homepage copy overhaul completed in session 2026-04-06 that established the voice direction.

**Voice rules established:**

- Default: imperative statements ("Fix that.", "Automate the repetitive parts.")
- Process steps: passive-assertive ("A lever gets picked.", "Something gets built.")
- Collaborative moments only: "we" = you + client ("Scope and price: we figure that out together.")
- Cut all self-describing honesty pledges ("honest", "real talk", "straight read") — backfire effect documented
- Say less: remove qualifying fluff, trust the structure to communicate
- No "team" — this is one person (Marcin). There is no team.

**What's already done (this session):**

- `app/_home/components/Hero.tsx` — sub-copy simplified, micro-copy cut to "30 minutes."
- `app/_home/components/Pricing.tsx` — tier 1/2/3 descriptions rewritten, interstitial cleaned
- `app/_home/components/Services.tsx` — levers 01 and 04 context strings
- `app/_home/components/ServicesCarousel.tsx` — "What We Do" → "The Work"
- `app/_home/components/ContactSection.tsx` — bio text, CTA micro-copy

**What remains:** /systems pages, /landing pages, SEO meta descriptions, brand-voice.md guide, /new-site decision, CI guard.

## Decisions recorded

- **"I've probably built it"** (Hero.tsx:79) — keep as-is. "Probably" is intentional.
- **Guarantee copy** ("Or We Work For Free", "we pause and fix it") — KEEP. Collaborative skin-in-the-game "we" is the point. Do not rewrite guarantees.
- **Case study "our"** — rewrite to "the" (not "I/my team"). "our client" → "the client", "our approach" → "the approach", "our Technical Product Manager" → "the client's product manager". No team references.

## Scope

**In scope:**

- `app/systems/` — 3 pages (growth-os, get-growing, get-running)
- `app/landing/` — 10 landing pages + their layout.tsx meta descriptions
- `app/_home/components/FAQ.tsx` — 1 instance ("we'd" → "I'd"), component not rendered on homepage
- `content/docs/brand-voice.md` — extend with site copy section
- `/new-site/` decision (live or dead code)
- CI grep guard for forbidden patterns

**Out of scope:**

- Testimonials — third-party quotes, never rewrite
- `/content/extracted-full/` source files — not rendered directly
- Guarantee copy in landing pages ("Or We Work For Free") — intentionally kept

## Approach

All copy is inline in `.tsx` files — no CMS. Changes are string edits in const data arrays and JSX. Static export: every change requires rebuild + redeploy.

Voice test: "Does this make the client the hero, or does it make me the hero?" If me → rewrite.

For case study prose: replace "our X" with "the X" or "the client's X". Do not introduce "my team" or similar — there is no team.

## Quick commands

```bash
# Dev server
npm run dev

# Check for forbidden patterns
grep -rn "\bwe offer\b\|\bwe provide\b\|\bwe deliver\b\|\bour team\b\|\bour agency\b" app/ --include="*.tsx" --include="*.ts" -i

# Build check
npm run build
```

## Acceptance

- [ ] Zero agency-plural "we/our" in `app/systems/` pages
- [ ] All `app/landing/` pages audited; guarantee "we" kept, agency-plural rewritten
- [ ] All `app/landing/*/layout.tsx` meta descriptions free of "our/we"
- [ ] `content/docs/brand-voice.md` includes site copy voice rules
- [ ] `/new-site/` either removed or voice-corrected
- [ ] CI check blocks new agency-plural patterns on commit
- [ ] `npm run build` succeeds

## Risks

| Risk                                                             | Mitigation                                                              |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| fn-1-ac7 requires agency-framing copy — conflicts with this epic | Resolve: close fn-1-ac7 or mark it superseded before starting Tasks 3-4 |
| /new-site is live and indexed                                    | Check next-sitemap output and Vercel routing before removing            |
| Meta description changes affect SEO (fn-8-acc owns SEO)          | Don't change OG title/description if fn-8-acc has locked them           |

## References

- Canonical voice examples: `app/_home/components/Pricing.tsx` tier descriptions
- Brand voice doc: `content/docs/brand-voice.md`
- fn-8-acc spec: `.flow/specs/fn-8-acc.md`

## Open questions

1. **fn-1-ac7**: Should this epic supersede it? Close it or put on hold?
2. **/new-site**: Is `app/new-site/` reachable by users — or dead code to remove?
