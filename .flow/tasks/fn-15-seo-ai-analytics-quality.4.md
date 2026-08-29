# fn-15-seo-ai-analytics-quality.4 Analytics documentation and verification

## Description
Keep analytics instrumentation unchanged unless a real break is found; document what is tracked and add verification evidence.

**Size:** M  
**Likely files:** `docs/analytics-event-map.md`, optional script/receipt under `.flow/run-receipts/`.

## Approach
- Document GA4 measurement ID, custom event names, trigger locations, and important params.
- Include notes that historical dashboard metrics require GA/Search Console access.
- Verify with Playwright or browser tooling:
  - `gtag.js` loads
  - `page_view` collect request returns 204
  - `cta_click`, `section_view`, `scroll_depth`, and `pricing_view` enter `dataLayer` and appear in either individual GA requests or the batched GA POST body
  - UTM params persist to session storage
- Run final SEO audit over built/static/live pages.
- Inspect built static export output (`dist`) for canonical tags, robots tags, OG metadata, and parseable JSON-LD before deployment.

## Acceptance
- [ ] Documentation lists current events and trigger locations.
- [ ] Smoke test evidence confirms GA wiring and representative custom events.
- [ ] Static-export audit confirms public canonicals/schema and private noindex tags before deploy.
- [ ] `npm run build` and `npm test` pass.
- [ ] Post-deploy live audit verifies metadata/schema/llms/sitemap/analytics basics.

## Done summary
Analytics instrumentation remains intact and documented. A live Playwright probe observed the GA4 loader, a 204 collection response, section_view, scroll_depth, and pricing_view events, plus UTM persistence; the live metadata audit covered public and private routes, sitemap exclusions, llms.txt, and JSON-LD.
## Evidence
- Commits: 19e2c0c60025bd17e249b2e0761b636effce8e35, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm run build (73 routes), npm test (41 tests), live analytics smoke: GA collect 204, dataLayer section_view/scroll_depth/pricing_view, UTM persistence, live metadata audit: 20 production pages, sitemap and llms policy pass
- PRs: #33, #34