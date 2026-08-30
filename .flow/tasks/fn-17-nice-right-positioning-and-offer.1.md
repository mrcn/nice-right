# fn-17-nice-right-positioning-and-offer.1 Consolidate Nice Right around one buyer, job, and audit offer

## Description
Implement the owner-approved Nice Right positioning hypothesis across the live homepage and route boundaries. Keep Understand at /labs/understand/ as a separate noindex lab, disable the unfinished scanner UI and APIs, archive the competing systems pages from search, and update repository context so the next person can tell what is current versus experimental.

## Acceptance
- [ ] Homepage hero names established Chicago home-service owners and the problem of qualified local prospects failing to call or book.
- [ ] Homepage presents one Digital Growth Audit entry offer with one repeated CTA; no three-way self-selection remains in the main investment section.
- [ ] Homepage proof uses attributable founder/portfolio context and does not foreground unsupported 290%, 12x, or 80% outcome claims.
- [ ] Understand remains available at /labs/understand/, separately styled, noindex,nofollow, and linked only as a clearly labeled lab path.
- [ ] /scan/ returns HTTP 404 and does not render scanner UI.
- [ ] POST /api/scan and POST /api/lead return HTTP 404 before provider, email, or list work.
- [ ] /systems/get-running/, /systems/get-growing/, and /systems/growth-os/ remain direct-reference pages but emit noindex,nofollow and are excluded from sitemap generation.
- [ ] No customer-facing source or generated copy links to /scan or describes it as live.
- [ ] Relevant README, scanner plan, analytics note, and decision-register context match the new state.
- [ ] npm test passes.
- [ ] npm run build passes.
- [ ] npm run lint exits 0.
- [ ] Direct route probes verify scanner 404, scanner API 404, and Understand 200 with noindex.
- [ ] git diff --check passes and only owned paths are committed.

## Done summary
Aligned Nice Right around an owner-approved but still testable working hypothesis: established Chicago home-service owners, the job of finding and fixing online leaks that prevent qualified local prospects from calling or booking, and a single $1,500 Digital Growth Audit entry offer. The homepage now carries that message through hero, service path, proof, navigation, investment, contact, and metadata. Understand remains an isolated noindex lab at /labs/understand/. The scanner page and APIs now return 404 before provider work. Competing systems pages remain direct-reference archives with noindex metadata and sitemap exclusion.
## Evidence
- Commits: b9263c8
- Tests: npm test (41 tests passed), npm run build (passed; sitemap generated), npm run lint (exit 0; existing warnings), npx playwright test e2e/homepage.spec.ts e2e/conversion-path.spec.ts e2e/scan.spec.ts --project=chromium (6 passed), built route probes: / 200; /scan/ 404; /labs/understand/ 200 with noindex,nofollow; /systems/get-running/ 200 with noindex,nofollow, built API probes: POST /api/scan/ 404; POST /api/lead/ 404, built sitemap excludes /scan, /systems, and /labs/understand, desktop 1440px and mobile 390px layout probes have no horizontal overflow
- PRs:
