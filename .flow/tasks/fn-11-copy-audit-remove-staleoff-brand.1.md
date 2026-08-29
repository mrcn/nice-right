# fn-11-copy-audit-remove-staleoff-brand.1 Replace placeholder and off-brand copy

## Description
Rewrite placeholder landing-page descriptions and stale customer-facing terminology without changing technical identifiers or historical source material.

## Acceptance
- [ ] No visible landing placeholder remains
- [ ] Targeted stale terms are removed from customer-facing app copy
- [ ] npm test and npm run build pass

## Done summary
Replaced all visible landing-page placeholder descriptions with specific outcomes and removed targeted account-manager, presence, lead, follow-up, and calendar phrasing from customer-facing site copy. Technical event names, Cal.com identifiers, and historical source material remain unchanged.
## Evidence
- Commits: 0fbfb3fc7b8ac91bd1d4b738bb944042cdfd5b0f
- Tests: copy placeholder scan: zero matches, targeted stale-term scan: only technical identifiers remain, npm test (41 tests), npm run build (73 application routes), npm run lint (exit 0; existing warnings)
- PRs: