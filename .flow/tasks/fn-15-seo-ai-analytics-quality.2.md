# fn-15-seo-ai-analytics-quality.2 Apply metadata and schema to public page families

## Description
Apply explicit canonicals, page-specific Open Graph/Twitter metadata, breadcrumbs, and matching structured data to public pages.

**Size:** L  
**Likely files:** `app/notes/page.tsx`, `app/notes/[slug]/page.tsx`, `app/systems/*/page.tsx`, `app/work/*/page.tsx`, `app/work/page.tsx`, all sitemap-eligible `app/blog/*` pages.

## Approach
- `/notes`: canonical `/notes/`, page-specific OG/Twitter, `CollectionPage` or breadcrumb schema.
- `/notes/[slug]`: canonical `/notes/{slug}/`, article-specific OG/Twitter, `Article`/`BlogPosting` JSON-LD, breadcrumbs.
- `/systems/*`: page-specific metadata and `Service` schema for Get Running/Get Growing/Growth OS.
- `/work` and case studies: page-specific metadata, breadcrumbs, and `CreativeWork`/case-study schema.
- `/blog` and all sitemap-eligible static `/blog/*` pages: explicit canonical/OG/Twitter metadata and conservative article schema when title/date/category are visible.
- Add explicit `robots: { index: false, follow: false }` to any `/landing/*` layout missing it, specifically `customer-surge` and `exit-ready` found during plan review.
- Add explicit alias metadata to `/writing/` and `/writing/[slug]/`: both `noindex,nofollow` and canonical URLs pointing to `/notes/` and `/notes/[slug]/` equivalents because static export emits HTML refresh pages.
- Keep noindex pages noindex; do not add them to sitemap.

## Acceptance
- [ ] Representative public pages include `<link rel="canonical">`.
- [ ] Non-home public pages no longer inherit generic homepage OG title.
- [ ] Notes article pages emit valid article schema.
- [ ] System pages emit valid service schema.
- [ ] Work pages emit valid case-study/creative-work schema.
- [ ] Blog index/detail pages emit explicit canonical URLs and page-specific OG metadata.
- [ ] Every landing/lab page excluded from sitemap either emits `noindex,nofollow` or is a legacy redirect alias explicitly documented as excluded.
- [ ] `/writing/` and representative `/writing/[slug]/` built HTML emit both `noindex,nofollow` and `/notes/` canonicals.
- [ ] No noindexed/staging/legacy page is promoted as canonical.

## Done summary
Public page families emit explicit trailing-slash canonicals, page-specific Open Graph/Twitter metadata, and matching JSON-LD. The staging /new-site alias now emits noindex,nofollow; landing, lab, scanner, and legacy writing aliases remain excluded from search.
## Evidence
- Commits: 19e2c0c60025bd17e249b2e0761b636effce8e35, c0bd8b73e759f0e14716013f1d226a7460261edf
- Tests: npm run build (73 routes), npm test (41 tests), static SEO audit (69 built pages, 0 errors, 0 invalid JSON-LD), sitemap audit (28 URLs; private/legacy paths excluded)
- PRs: #33