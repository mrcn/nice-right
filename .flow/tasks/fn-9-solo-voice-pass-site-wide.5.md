# fn-9-solo-voice-pass-site-wide.5 SEO meta, /new-site decision, FAQ slip

## Description

Three small clean-ups that don't warrant separate tasks:

1. **SEO meta descriptions**: Audit all `app/landing/*/layout.tsx` for "our/we" in OG descriptions and page titles. Fix any found.
2. **/new-site decision**: Determine if `app/new-site/` is reachable (check `next-sitemap` output, Vercel routing config, whether it appears in `dist/` after build). If live → voice-correct it. If dead code → remove it.
3. **FAQ "we'd" slip**: `app/_home/components/FAQ.tsx:15` — "how we'd do it differently" → "how I'd do it differently". Note: FAQ component is NOT currently rendered on homepage (not imported in `app/_home/page.tsx`), so this is low-urgency but worth fixing for correctness.

**Size:** M (combined)
**Files:**

- `app/landing/*/layout.tsx` (10 files, descriptions only)
- `app/new-site/` (decision + action)
- `app/_home/components/FAQ.tsx:15` (1 line)

## Approach

- For meta: grep `app/landing` for "our\|we" in layout.tsx files only
- For /new-site: `ls dist/ | grep new-site` after a build, check vercel.json routes
- For FAQ: single string replace; confirm FAQ is still not rendered before/after

## Acceptance

- [ ] All landing layout.tsx files checked; no "our/we" in meta descriptions
- [ ] /new-site status determined and documented in epic
- [ ] /new-site either removed (if dead) or voice-corrected (if live)
- [ ] FAQ.tsx:15 "we'd" → "I'd"
- [ ] npm run build succeeds

## Done summary

TBD

## Evidence

- Commits:
- Tests:
- PRs:
