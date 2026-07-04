# fn-15-seo-ai-analytics-quality.3 AI orientation and crawler artifacts

## Description
Make the AI/crawler orientation files match the public Nice Right business and canonical pages.

**Size:** S  
**Likely files:** `public/llms.txt`, possibly `next-sitemap.config.js` only if audit reveals a regression.

## Approach
- Rewrite `llms.txt` so it starts with `# Nice Right`.
- Include short business description, audience, services/systems, notes, work/case studies, and contact/action guidance.
- List canonical public pages from the sitemap.
- Explicitly state that Understand lab, landing pages, writing aliases, and new-site staging alias are not canonical public search targets.
- Do not create new crawl surfaces unless requested.

## Acceptance
- [ ] Live/static `llms.txt` is Nice Right-first.
- [ ] `llms.txt` links canonical public pages, not noindexed lab pages as primary canonical targets.
- [ ] Sitemap still excludes noindex/staging/legacy aliases.
