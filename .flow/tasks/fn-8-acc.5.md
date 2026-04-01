# fn-8-acc.5 Image optimization: Vercel config + next/image for LCP images

## Description
All images use raw `<img>` tags with no explicit `width`/`height`, causing CLS. `images: { unoptimized: true }` means `next/image` with this config will render a plain `<img>` tag with no srcset or format conversion. The Vercel CDN image config in `vercel.json` handles edge-level optimization separately.

**Size:** M  
**Files:**
- `vercel.json` (add Vercel CDN image optimization config)
- `app/_home/components/ContactSection.tsx` (bio photo at line ~228 — add explicit dimensions, fix CLS)
- `app/_home/components/Proof.tsx` (case study images at line ~209 — add explicit dimensions)
- `app/_home/components/Hero.tsx` (verify Hero has no `<img>` LCP candidates)

**Approach:**

**Part A — Vercel CDN image optimization (format conversion, responsive):**
Add to `vercel.json`:
```json
"images": {
  "sizes": [640, 750, 828, 1080, 1200, 1920],
  "formats": ["image/avif", "image/webp"],
  "minimumCacheTTL": 2592000
}
```
This enables Vercel's edge image optimization for the static site at CDN level. This is a separate layer from Next.js `next/image` — it optimizes images on demand without requiring the Next.js image optimizer.

**Part B — Fix CLS by adding explicit dimensions (keep `<img>` tags, do NOT switch to `next/image`):**
With `images: { unoptimized: true }`, converting `<img>` to `<Image>` from `next/image` provides zero additional optimization benefit but adds complexity. Instead, add explicit `width` and `height` attributes directly to the existing `<img>` tags:
- `ContactSection.tsx` bio photo: verify dimensions of `marcin-lg.jpeg` (480×637 post-compression) and add `width="480" height="637"`
- `Proof.tsx` case study images: add explicit dimensions based on actual rendered size
- Add/verify `alt` text is descriptive on all modified images

**Part C — LCP audit:**
Verify Hero section has no above-fold `<img>` tag that would be the LCP element. If Hero uses CSS backgrounds or canvas only, no change needed. If an `<img>` exists, add `fetchpriority="high" loading="eager"`.
## Acceptance
- [ ] `vercel.json` has `images` block with sizes, formats (avif/webp), minimumCacheTTL
- [ ] `ContactSection.tsx` bio photo has explicit `width` and `height` attributes matching actual image dimensions
- [ ] `Proof.tsx` case study images have explicit `width` and `height` attributes
- [ ] All modified `<img>` elements have descriptive, non-empty `alt` text
- [ ] After Vercel deploy: image requests return `Content-Type: image/avif` or `image/webp` for supporting browsers
- [ ] Lighthouse CLS score ≤ 0.1 on homepage (measure before/after)
- [ ] `npm run build` succeeds
- [ ] NOTE: `images: { unoptimized: true }` stays in next.config.js — this task does NOT change it
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
