---
satisfies: [R5, R6, R7]
---

# fn-16-digital-footprint-scanner-site-promotion.5 Promote /scan + tool analytics + doc updates

## Description
Discovery + measurement (R5/R6) and remaining docs (R7). No `tool_calculator_use`.

**Size:** M
**Files:** `app/lib/analytics.ts`, `docs/analytics-event-map.md`, `Nav.tsx`, `Hero.tsx`, `Services.tsx`, `Footer.tsx`, `public/llms.txt`, `docs/lead-gen-tools-plan.md`, `next-sitemap.config.js` (confirm `/scan` not excluded), e2e as needed
**Touches:** [app/lib/analytics.ts, docs/analytics-event-map.md, app/_home/components/Nav.tsx, app/_home/components/Hero.tsx, app/_home/components/Services.tsx, app/_home/components/Footer.tsx, public/llms.txt, docs/lead-gen-tools-plan.md, next-sitemap.config.js, e2e/**]

## Approach
- Typed track helpers for `tool_scan_submit`, `tool_email_capture`, `tool_report_cta_click`; document in analytics-event-map.
- **Params without PII:** no raw URL, business name, or email — domain-only or omit for scan context.
- Wire events from `/scan` UI hooks.
- Promo entry points: Nav, Hero secondary, Services, Footer — keep primary `#contact` path.
- `public/llms.txt` + lead-gen plan status/phases (scanner-first, calculators deferred, Mailchimp, main-site-only `/scan`).
- Ensure `next-sitemap.config.js` does not exclude `/scan`.
- Extend Playwright so a promo path to `/scan` is covered without breaking `#contact`.

## Investigation targets
**Required:**
- `app/lib/analytics.ts` — helper pattern
- `docs/analytics-event-map.md` — table format
- `Nav.tsx` / `Hero.tsx` / `Footer.tsx` / `Services.tsx` — CTA targets
- `public/llms.txt`, `next-sitemap.config.js`

**Optional:**
- `e2e/conversion-path.spec.ts`

## Key context
- Touch only CTA/analytics lines needed — no drive-by homepage redesign.
- Positioning: owned assets / profit outcomes; no agency-bashing.

## Acceptance
- [ ] Three tool events documented and implemented
- [ ] Events fire on scan submit, email capture, on-page report CTA
- [ ] Event params contain no raw URL/name/email PII
- [ ] Nav, Hero secondary, Services, Footer link to `/scan/`
- [ ] Primary contact path still works
- [ ] `llms.txt` + lead-gen plan updated; `/scan` not sitemap-excluded
- [ ] Playwright/regression checks updated and green
- [ ] `npm test` and `npm run lint` pass

## Done summary
Recorded the shipped scan promotion, analytics, and documentation updates from PR #27.
## Evidence
- Commits: 25bd83ec701ff21b62565afd7826ae2a0b4aefd7
- Tests: npm test, npm run build, live scanner smoke verification
- PRs: #27