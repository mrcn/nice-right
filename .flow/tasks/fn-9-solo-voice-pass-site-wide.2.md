# fn-9-solo-voice-pass-site-wide.2 /systems pages voice rewrite

## Description

Rewrite agency-plural "we" in all three /systems pages to match the solo direct voice established on the homepage.

**Size:** M
**Files:**

- `app/systems/growth-os/page.tsx` (~6 instances)
- `app/systems/get-growing/page.tsx` (~4 instances)
- `app/systems/get-running/page.tsx` (~3 instances)

## Approach

- Follow the voice patterns from `app/_home/components/Pricing.tsx` (tier descriptions) as canonical examples
- Imperative/passive-assertive for process steps: "We look at the numbers together" → "Numbers get reviewed together." or "Review the numbers."
- "We build the full system" → "The full system gets built." or "Build the full system."
- "our platform" → either name the platform or cut the possessive
- Do NOT rewrite guarantee/performance-commitment copy without resolving open question #4 in epic

## Key context

13 instances total, all in body copy / process step descriptions. Pages are standard TSX with inline copy — same pattern as \_home components.

Voice test: "Does this make the client the hero, or me?" If me → rewrite.

## Acceptance

- [ ] Zero agency-plural "we/our" in app/systems/growth-os/page.tsx
- [ ] Zero agency-plural "we/our" in app/systems/get-growing/page.tsx
- [ ] Zero agency-plural "we/our" in app/systems/get-running/page.tsx
- [ ] Grep check passes: `grep -n "\bwe offer\b\|\bwe build\b\|\bwe deliver\b\|\bour platform\b" app/systems/ -r -i` returns 0 results
- [ ] npm run build succeeds
- [ ] Spot-check pages render correctly in npm run dev

## Done summary

TBD

## Evidence

- Commits:
- Tests:
- PRs:
