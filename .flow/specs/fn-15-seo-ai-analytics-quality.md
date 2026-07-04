# SEO, AI readiness, and analytics quality pass

## Overview

Improve Nice Right's search, social, AI-crawler, and analytics instrumentation quality without changing the visible design. The prior audit showed crawlability is healthy and GA4 is firing, but quality gaps remain: missing explicit canonicals, generic Open Graph metadata on non-home pages, minimal page-specific structured data, and an `llms.txt` file oriented around the noindexed Understand lab rather than the public Nice Right business.

This epic keeps production-safe boundaries: no dashboard/API credentials, no changes to GA4 property settings, no page redesign, and no reintroducing noindexed/staging routes to the sitemap.

## Goals

1. Make public canonical pages self-describing for Google, social crawlers, and AI answer engines.
2. Add page-specific schema where it matches visible content.
3. Keep analytics collection intact and document/verify what fires.
4. Align `llms.txt` with the public Nice Right site while preserving optional Understand context as noindex/lab context only.
5. Verify with static checks, live-like build output, and a production crawl audit after deployment.

## Non-goals

- Do not change visual page layout, copy strategy, pricing, or offer positioning beyond machine-readable metadata.
- Do not request or use Google Analytics/Search Console credentials.
- Do not create fake traffic reports; only verify instrumentation and emitted requests.
- Do not index `/landing/*`, `/labs/understand/*`, `/writing/*`, or `/new-site`.
- Do not restart any Flow-Next review bombardment; exactly three plan reviews only.

## Current findings to address

### Analytics

- GA4 measurement ID `G-ZX3QC73LKS` is loaded in `app/layout.tsx`.
- Live `page_view` requests return `204` from `google-analytics.com/g/collect`.
- Custom events fire and batch correctly: `cta_click`, `scroll_depth`, `section_view`, `pricing_view`, etc.
- UTM capture persists `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term` into session storage.
- Gap: analytics event map exists only in code comments; future audits should have a canonical repo artifact and automated smoke check.

### SEO metadata

- Titles/descriptions exist on core pages.
- Public pages do not emit explicit canonical tags.
- Non-home Open Graph metadata inherits generic site title/description on pages like notes and case studies.
- Sitemap is clean after excluding noindex/staging/legacy aliases.
- Route inventory must distinguish canonical public/search pages (`/`, `/notes/`, `/notes/[slug]/`, `/systems/*`, `/work/`, `/work/*`, `/blog/`, `/blog/*`), intentional noindex pages (`/landing/*`, `/labs/understand/*`), and legacy/staging aliases excluded from sitemap (`/writing/*`, `/new-site/`). Because this app is statically exported, `/writing/*` aliases are real HTML refresh pages, not server redirects; they need explicit `noindex,nofollow` and/or canonical-to-`/notes/*` metadata plus static/live verification.
- Two landing layouts need explicit robots cleanup: `/landing/customer-surge/` and `/landing/exit-ready/` are excluded from the sitemap but must also emit `noindex,nofollow`.

### Structured data

- Site-wide JSON-LD exists: `LocalBusiness`/`ProfessionalService` and `WebSite`.
- Homepage FAQ JSON-LD is already emitted by `FAQ.tsx`.
- Gaps: no page-specific `Article`/`BlogPosting` for notes, no `BreadcrumbList`, no `Service` schema for system pages, no `CreativeWork`/case-study schema for work pages, no richer `Organization`/`Person` graph with `sameAs`/founder.

### AI readiness

- Public content is server-rendered and heading-rich.
- `llms.txt` exists but is centered on Understand lab pages that are intentionally `noindex,nofollow`; this is confusing for the public Nice Right business.
- Gap: AI orientation should describe Nice Right, canonical public pages, services, notes, work, contact, and indexing policy.

## Implementation approach

### Task 1 — Shared SEO/schema foundation

Create or extend shared helpers so page-specific metadata/schema can be added consistently without duplicating strings:

- `absoluteUrl(path: string): string`
- canonical metadata helper for `alternates.canonical`
- Open Graph/Twitter helper for page titles/descriptions/URLs
- JSON-LD helpers for:
  - `Organization`/`ProfessionalService`/`LocalBusiness` graph
  - `Person` founder schema
  - `BreadcrumbList`
  - `Article`/`BlogPosting`
  - `Service`
  - `CreativeWork` or `Article`-style case-study objects
- Keep schema values aligned with visible content.
- Avoid inventing claims not present on the site.

### Task 2 — Apply canonical/OG/schema to public page families

Apply helpers to:

- Root layout/home:
  - explicit canonical `/`
  - improved Organization/Person/sameAs data
  - preserve existing FAQ schema
- `/notes`:
  - canonical `/notes/`
  - page-specific OG/Twitter metadata
  - `CollectionPage` and/or breadcrumb schema
- `/notes/[slug]`:
  - canonical `/notes/{slug}/`
  - article-specific OG/Twitter metadata
  - `Article` or `BlogPosting` schema using frontmatter title/description/date/type
  - breadcrumb schema
- `/systems/get-running`, `/systems/get-growing`, `/systems/growth-os`:
  - canonical URLs
  - page-specific title/description/OG
  - `Service` schema matching visible offers
  - breadcrumb schema
- `/work` and `/work/[case]`:
  - canonical URLs
  - page-specific OG
  - `CreativeWork`/case-study schema and breadcrumbs
- `/blog` and static `/blog/*` pages:
  - explicit canonical URLs
  - page-specific OG/Twitter metadata
  - conservative `Article`/`BlogPosting` schema where date/title/description are visible in page content
- Noindex cleanup:
  - add/verify `robots: { index: false, follow: false }` for every `/landing/*` layout, including `customer-surge` and `exit-ready`
  - add/verify both `robots: { index: false, follow: false }` and canonical targets for `/writing/` and `/writing/[slug]/` legacy static-export alias pages

### Task 3 — AI orientation and crawler artifacts

Rewrite `public/llms.txt` or equivalent generated/static file to be Nice Right-first:

- Summarize Nice Right in plain terms.
- List canonical public pages: home, systems, notes, work, selected articles/case studies.
- Explain intentional exclusions: Understand lab and landing pages are experiments/private/noindex and should not be treated as canonical business pages.
- Include contact/action guidance.
- Keep sitemap/robots behavior unchanged except if verification reveals a regression.

### Task 4 — Analytics and verification harness

Do not change GA4 property settings. Add repo-level verification artifacts/scripts if useful:

- Document event map and triggers in `docs/analytics-event-map.md` or update an existing doc.
- Add a lightweight script or test receipt that verifies live/static:
  - `gtag.js` present with `G-ZX3QC73LKS`
  - `page_view` collect request can be observed
  - known custom events enter `dataLayer` and batch to GA
  - UTM params are persisted
- Audit SEO output after build:
  - no public page has `noindex`
  - every intentional private/experimental landing/lab page has `noindex,nofollow`
  - `/writing/` and representative `/writing/[slug]/` alias pages are not indexable and point crawlers at `/notes/` canonical URLs
  - sitemap excludes noindex/staging/legacy aliases
  - public pages include canonical tags
  - page-specific OG titles exist
  - JSON-LD parses as valid JSON
  - notes include `Article`/`BlogPosting`
  - systems include `Service`
  - work pages include case-study schema
  - `llms.txt` is Nice Right-first
- Serve or inspect static export output, not only source files. Verify built `dist/**/*.html` and representative live URLs after deploy.
- GA4 batches custom events. Verification must inspect both `dataLayer` and the `g/collect` GET/POST payload so a batched POST is not misread as missing events.

## Acceptance criteria

- [ ] `npm run build` passes.
- [ ] `npm test` passes.
- [ ] Sitemap still excludes `/landing/*`, `/labs/understand*`, `/writing*`, and `/new-site`.
- [ ] Every `/landing/*` and `/labs/understand*` page intentionally emits `noindex,nofollow`.
- [ ] `/writing/` and `/writing/[slug]/` static alias pages emit both `noindex,nofollow` and canonical URLs to `/notes/` equivalents.
- [ ] Public pages emit explicit canonical links.
- [ ] Notes article pages emit article-specific OG/Twitter metadata.
- [ ] Notes article pages emit valid `Article`/`BlogPosting` JSON-LD.
- [ ] System pages emit valid `Service` JSON-LD.
- [ ] Work/case pages emit valid case-study/creative-work JSON-LD.
- [ ] Homepage still emits FAQ JSON-LD and site/business schema.
- [ ] `llms.txt` starts with Nice Right, not Understand, and links canonical public pages.
- [ ] Analytics smoke verification confirms `page_view`, at least one CTA event, scroll depth, section view, and UTM persistence.
- [ ] Production deployment succeeds.
- [ ] Live post-deploy audit confirms the same items on `https://niceright.co`.

## Risks and mitigations

- **Schema drift:** Search engines may penalize misleading schema. Mitigation: only encode visible facts and simple business/contact details already present on the site.
- **Canonical mistakes:** Wrong canonical URLs can hide pages. Mitigation: derive from a single `siteUrl` helper and verify representative URLs.
- **Trailing-slash drift:** The project uses `trailingSlash: true`; canonical helpers must output slash-normalized absolute URLs.
- **Duplicate schema:** Root layout schema appears on all pages. Mitigation: keep site/business graph global but add page-specific schema with distinct `@id`s.
- **Static export metadata quirks:** Next static export may output generated metadata differently. Mitigation: verify built `dist` and live HTML, not just source.
- **Analytics false negatives:** GA batches custom events. Mitigation: inspect both dataLayer and network POST body.
- **Human-readable dates in schema:** Article frontmatter uses month strings such as `July 2026`. Mitigation: convert to valid ISO dates for JSON-LD while preserving display strings in the UI.
