# fn-15-seo-ai-analytics-quality.1 Shared SEO/schema foundation

## Description
Create reusable metadata and JSON-LD helpers for canonical URLs, Open Graph/Twitter metadata, and page-specific schema.

**Size:** M  
**Likely files:** `app/_shared/schema.ts`, new `app/_shared/seo.ts` if helpful, `app/layout.tsx`

## Approach
- Centralize `SITE_URL = 'https://niceright.co'` and `absoluteUrl(path)`.
- Add a metadata helper for canonical + OG + Twitter values.
- Extend schema helpers with stable `@id` values:
  - Organization/ProfessionalService/LocalBusiness
  - founder `Person`
  - `BreadcrumbList`
  - `Article`/`BlogPosting`
  - `Service`
  - `CreativeWork`/case study
- Update root layout only as needed to use the improved site/business graph.
- Preserve existing GA script and FAQ behavior.

## Acceptance
- [ ] Helper functions compile under TypeScript.
- [ ] Root site/business JSON-LD still parses as JSON.
- [ ] Existing LocalBusiness/WebSite facts are preserved or improved without inventing unverifiable claims.
- [ ] No visible UI changes.
