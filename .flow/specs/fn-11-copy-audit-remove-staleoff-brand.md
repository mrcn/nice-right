# fn-11-copy-audit-remove-staleoff-brand Copy audit: remove stale/off-brand phrases across all pages

## Overview

Remove obvious placeholder copy and vendor language from customer-facing Nice Right pages. Preserve technical event names, implementation comments, historical source material, and machine-readable analytics/SEO contracts when changing the words would break behavior or erase context.

## Scope

- Replace every visible `Description for ... phase goes here.` placeholder in the noindex landing-page experiments with specific, truthful descriptions.
- Replace stale customer-facing phrases such as `account managers`, `web presence`, `digital presence`, `more leads`, and `no presence` with plain owner language.
- Replace vendor-sounding `follow-up`/`lead` wording in current service-page copy where the customer can read it. Keep internal analytics event names and technical Cal.com/GA identifiers unchanged.
- Improve the scanner report blurbs where the same phrases appear in an email a customer receives.
- Do not rewrite historical articles or raw portfolio source captures as part of this pass.

## Approach

1. Search the app and content surfaces for placeholder and banned phrase matches.
2. Rewrite only the customer-facing strings, using the current design contract: direct, specific, owner-voice language.
3. Run the complete source scan again so no landing placeholder remains.
4. Run `npm test`, `npm run build`, and a focused static copy assertion.

## Quick commands

- `rg -n "Description for .* goes here" app/landing`
- `npm test`
- `npm run build`

## Acceptance

- [ ] No customer-facing app or landing page contains `Description for ... goes here.`.
- [ ] Core app copy no longer uses the targeted stale account-manager/presence/lead/follow-up phrases, except intentional technical identifiers or historical content explicitly outside scope.
- [ ] Rewritten copy names a concrete customer action or outcome and does not add unsupported numeric claims.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.

## References

- `docs/DESIGN.md`, especially voice and tone rules.
- `48bac7a` — prior stale-copy cleanup.
- `74bd961` — prior account-manager copy cleanup.
