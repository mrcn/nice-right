# fn-9-solo-voice-pass-site-wide.3 /landing pages voice audit — pages 1-5

## Description

Audit /landing pages 1-5 for fake-agency "we" — where "we" implies a team that doesn't exist. Replace with "I" or imperative. Keep and strengthen "we" that genuinely means me + client together, or performance guarantees that are doing real work.

**Size:** M
**Files:**

- `app/landing/contractor-growth/page.tsx`
- `app/landing/tableturn-direct/page.tsx`
- `app/landing/customer-surge/page.tsx`
- `app/landing/skin-in-game/page.tsx`
- `app/landing/[5th page — enumerate from filesystem]`

## Voice rule for this task

- "We Help Service Contractors" → "I Help Service Contractors" or cut subject ("Built for Service Contractors")
- "Or We Work For Free" → "Or I Work For Free" — stronger, personal
- "Or We Pay YOU $5,000" → "Or I Pay YOU $5,000" — same
- "We Deliver 100 New Paying Customers" → just "100 New Paying Customers" (let the number lead) OR "I Deliver 100..."
- "we pause and fix it" → "I pause and fix it" — keep the guarantee mechanic intact
- "if we're a fit" → "if it's a fit" or "if this fits"
- Don't gut guarantee/performance copy — it's doing real work. Just swap plural agency "we" → "I" where the commitment is personal

## Key context

Guarantee copy is the offer mechanic — do not soften the promise, only change the pronoun if it implies a team.

## Approach

- First: list all landing page directories to confirm the 5 in scope
- For each page: audit for agency "we/our", categorize as (a) agency-plural → rewrite, (b) guarantee/performance "we" → evaluate per open question #4, (c) client-collaborative "we" → evaluate
- Guarantee copy rule (pending decision): if "we" = shared performance commitment with client, acceptable; if "we" = agency capability claim, rewrite
- Follow imperative/passive-assertive patterns from `app/_home/components/Pricing.tsx`

## Key context

Landing pages have more aggressive sales copy than the homepage. The guarantees ("Or We Work For Free") are a core offer mechanic — do not soften without explicit direction.

## Acceptance

- [ ] No agency-plural "we" implying a team in pages 1-5
- [ ] Guarantee copy preserved and strengthened (not softened)
- [ ] "we" kept where it means me + client together
- [ ] npm run build succeeds

## Done summary

TBD

## Evidence

- Commits:
- Tests:
- PRs:
