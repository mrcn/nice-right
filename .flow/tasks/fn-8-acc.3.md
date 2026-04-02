# fn-8-acc.3 SEO foundations: robots, sitemap, canonical URLs, OG metadata

## Description
No `robots.txt`, no `sitemap.xml`, no `metadataBase`, no canonical URLs, root layout metadata missing `openGraph` and `twitter`. Landing pages (`/landing/*`) need `noindex` (hidden from search but accessible via direct link). Systems pages (`/systems/*`) stay indexed — they are active offer pages.

**Size:** M
**Files:**
- `next-sitemap.config.js` (new)
- `package.json` (add `"postbuild": "next-sitemap"`)
- `app/layout.tsx` (add metadataBase, openGraph, twitter, remove duplicate viewport meta JSX at line ~46)
- `app/landing/layout.tsx` (shared landing layout, if exists) OR individual landing `layout.tsx` files

**Approach:**

**Sitemap** — Use `next-sitemap` (NOT `app/sitemap.ts` — has known issues with output:'export' in Next.js 14.x):
- `next-sitemap.config.js`: `siteUrl: 'https://niceright.co'`, `outDir: './dist'` (must match `distDir: 'dist'` in next.config.js), `trailingSlash: true`, `generateRobotsTxt: true`, `generateIndexSitemap: false`
- Add `"postbuild": "next-sitemap"` to package.json scripts
- Exclude `/landing/*` from sitemap via `exclude` array or per-page `noindex`

**noindex for landing pages** — Add to each of the 8 landing page layouts' metadata export:
```ts
export const metadata: Metadata = {
  // existing metadata...
  robots: { index: false, follow: false }
}
```

**Root layout** (`app/layout.tsx`):
- Add `metadataBase: new URL('https://niceright.co')`
- Add `openGraph: { type: 'website', url: '/', title, description, images }`
- Add `twitter: { card: 'summary_large_image' }`
- Remove duplicate `<meta name="viewport">` JSX at line ~46 (already exported via `export const viewport`)
## Acceptance
- [ ] `dist/robots.txt` present after `npm run build`
- [ ] `dist/sitemap.xml` present, contains homepage, /work/, /blog/, /systems/get-running/ with trailing slashes
- [ ] `dist/sitemap.xml` does NOT contain any `/landing/*` URLs
- [ ] Each of the 8 landing page layouts has `robots: { index: false, follow: false }` in metadata
- [ ] Root layout has `metadataBase`, `openGraph`, `twitter` metadata
- [ ] Homepage `dist/index.html` has `og:title`, `og:description`, `og:url`
- [ ] Duplicate `<meta name="viewport">` JSX removed from `app/layout.tsx`
- [ ] `npm run build` succeeds (postbuild completes without error)
## Done summary
Added SEO foundations: next-sitemap generates robots.txt and sitemap.xml on build, root layout gains metadataBase/openGraph/twitter metadata, and all 8 landing page layouts get robots noindex/nofollow to keep them out of search.
## Evidence
- Commits: c070147d9b181db473d2e0167d8c0a370d8e1dd8
- Tests: npm run build (54 static pages, postbuild next-sitemap generated dist/robots.txt + dist/sitemap.xml), vitest run (2/2 passed)
- PRs: