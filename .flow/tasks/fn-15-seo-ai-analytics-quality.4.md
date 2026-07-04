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
