# Nice Right positioning consolidation

## Objective

Make Nice Right's primary public path understandable to one buyer with one job and one entry offer. Keep the Understand product available at `/labs/understand/` as a separate, noindex lab. Make the unfinished scanner unavailable rather than merely unlinked.

## Working direction

This is an owner-approved working hypothesis, not a claim of market validation.

- Buyer: an established owner-operated home-service business in Chicago's Northwest Side, such as HVAC, plumbing, electrical, roofing, or remodeling. The business has an existing website, no dedicated digital team, and too much dependence on referrals or third-party lead sources.
- Job: find and fix the online leaks that keep qualified local prospects from calling or booking, without making the owner become a marketing expert or buy a full rebuild before knowing what is wrong.
- Canonical offer: a paid Digital Growth Audit. It examines the website, Google Business/local visibility, competitors, and inquiry path, then produces a prioritized plan and a clear implementation recommendation. The website should route visitors to one conversation about this offer, not make them choose among unrelated services.
- Working price hypothesis: $1,500 credited toward implementation if Marcin and the client continue together. This price is explicitly a test because the prior research disagrees with a $2,500 standalone version.

## Scope

1. Rewrite the live homepage's hero, growth-lever framing, proof framing, investment section, contact section, metadata, and supporting navigation so the buyer, job, diagnostic offer, and single CTA agree.
2. Remove unsupported outcome numbers from the immediate proof story unless they have an attributable source, while retaining verified founder and portfolio context.
3. Keep `/labs/understand/` as a separate noindex product lab and give it a quiet, clearly labeled path from the Nice Right site without mixing its message into the agency offer.
4. Make `/scan/`, `POST /api/scan`, and `POST /api/lead` return unavailable responses. Preserve the implementation for a later relaunch, but do not advertise or execute it now.
5. Mark the three `/systems/*` pages as archived/noindex direct-reference pages and exclude them from the sitemap. Do not delete them in this pass.
6. Update the relevant README, scanner plan, analytics note, and decision-register context so the repository no longer describes the scanner as current or the positioning as validated.
7. Add focused tests and run the full existing test, build, lint, and route probes.

## Non-goals

- Do not build or improve the scanner.
- Do not redesign Understand.
- Do not delete the existing landing-page experiments.
- Do not claim that the buyer, price, or business outcomes are validated.
- Do not upgrade the framework dependency in this positioning PR.

## Acceptance criteria

- The homepage has one plain-English audience statement, one problem/job, one Digital Growth Audit entry offer, and one repeated primary CTA.
- The homepage does not ask visitors to choose among three unrelated service tiers.
- `/systems/*` has `noindex,nofollow` metadata and is absent from sitemap generation.
- `/scan/` returns HTTP 404; the two scanner POST endpoints return HTTP 404 without invoking providers, email, or list services.
- `/labs/understand/` remains HTTP 200, separately styled, and `noindex,nofollow`.
- No customer-facing source or generated copy links to `/scan` or describes the scanner as live.
- `npm test`, `npm run build`, and `npm run lint` pass. Direct route probes cover the scanner 404 and Understand 200/noindex behavior.
- All changes are reviewed on the feature branch before the PR is merged.

## Files likely to change

- `app/page.tsx`
- `middleware.ts`
- `app/_home/components/{Hero,Services,Pricing,Proof,ContactSection,Nav,Footer}.tsx`
- `app/scan/page.tsx`
- `app/api/{scan,lead}/route.ts`
- `app/systems/layout.tsx`
- `next-sitemap.config.js`
- scanner tests and relevant docs
- `.flow/` task/spec receipts