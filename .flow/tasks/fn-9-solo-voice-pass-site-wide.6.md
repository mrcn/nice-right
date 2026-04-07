# fn-9-solo-voice-pass-site-wide.6 brand-voice.md + CI grep guard

## Description

Two codification tasks:

1. **Extend `content/docs/brand-voice.md`** with a "Site Copy Voice" section covering:
   - "I" as default; "we" = me + client (acceptable), never = a team
   - Imperative for actions, passive-assertive for process steps
   - Don't soften guarantees — swap pronoun, keep the commitment
   - Cut honesty pledges ("honest", "real talk", "straight read")

2. **CI grep guard**: Add to `.husky/pre-commit` a grep for agency-plural patterns in `app/` TSX files. Flag `\bour team\b`, `\bour agency\b`, `\bwe offer\b`, `\bwe provide\b`. Do NOT flag "we" generically — only specific agency-implying phrases.

**Size:** M
**Files:** `content/docs/brand-voice.md`, `.husky/pre-commit` (append only — don't replace `npx lint-staged`)

## Approach

- Brand-voice.md: extend, don't replace — existing article voice section should remain untouched
- CI guard: grep-based is simplest; no new dependencies needed. Add to existing pre-commit hook (currently calls `npx lint-staged` after this session's fix)
- The guard should NOT flag: testimonials (third-party quotes), case studies, content/ source files — scope to `app/` only

## Key context

Pre-commit hook was fixed in a prior session (2026-04-06) to call `npx lint-staged` instead of `npm test`. Any additions to pre-commit should append, not replace.

## Acceptance

- [ ] brand-voice.md has site copy voice section with the "I vs we" rule and examples
- [ ] Pre-commit grep guard targets specific forbidden phrases, not generic "we"
- [ ] Guard does not flag collaborative "we" or guarantee copy
- [ ] npm run build succeeds

## Done summary

TBD

## Evidence

- Commits:
- Tests:
- PRs:
