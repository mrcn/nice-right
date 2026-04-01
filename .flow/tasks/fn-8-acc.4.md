# fn-8-acc.4 Add JSON-LD schema markup: LocalBusiness, FAQPage, WebSite

## Description
No structured data exists anywhere in the codebase. For a local service business in Chicago, `LocalBusiness` (or the more specific `ProfessionalService`) schema directly enables rich results in Google Search. The FAQ section is a natural candidate for `FAQPage` schema.

**Size:** M
**Files:**
- `app/_shared/schema.ts` (new — typed schema objects using `schema-dts`)
- `app/layout.tsx` (inject LocalBusiness + WebSite JSON-LD)
- `app/_home/components/FAQ.tsx` (inject FAQPage JSON-LD, line ~13 for FAQ data)

**Approach:**
- Install `schema-dts` (devDep, types only, zero runtime cost)
- `app/_shared/schema.ts`: export typed schema objects for `ProfessionalService` (extends `LocalBusiness`), `WebSite` with `SearchAction`, and a function `buildFAQSchema(faqs)` that takes the FAQ array and returns `FAQPage` JSON-LD
- In `app/layout.tsx` (server component): inject `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />` in `<head>` (or directly in the component body — App Router renders it in the correct position)
- In `FAQ.tsx`: call `buildFAQSchema()` with the existing FAQ data array (line ~13) and inject as script tag
- LocalBusiness data to populate: name "Nice Right", address in Chicago Northwest Side, url "https://niceright.co", priceRange "$$$", areaServed "Chicago", sameAs (LinkedIn, etc.)

**Required schema fields for Google rich results:**
- `@type`: `['LocalBusiness', 'ProfessionalService']`
- `name`, `url`, `telephone` (if public), `address` (PostalAddress), `geo`, `openingHoursSpecification`, `priceRange`
- FAQPage: `mainEntity` array of `Question`/`Answer` pairs

**Reference:** `Ashking717/AutoCityProCloud` `@graph`-based JSON-LD pattern (github-scout)
## Acceptance
- [ ] `app/_shared/schema.ts` exports LocalBusiness and FAQPage schema objects
- [ ] Built `dist/index.html` contains `<script type="application/ld+json">` with LocalBusiness data
- [ ] Built homepage HTML contains FAQPage JSON-LD with all FAQ questions from `FAQ.tsx:13`
- [ ] Google Rich Results Test (search.google.com/test/rich-results) passes for LocalBusiness
- [ ] Google Rich Results Test passes for FAQPage
- [ ] Schema includes required fields: name, url, address (PostalAddress), geo, priceRange
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors (schema-dts types satisfied)
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
