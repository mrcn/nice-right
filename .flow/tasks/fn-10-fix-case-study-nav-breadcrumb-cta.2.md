# fn-10-fix-case-study-nav-breadcrumb-cta.2 Add Breadcrumb + CaseCTA components to work layout

## Description
Create two new shared components (`Breadcrumb` and `CaseCTA`) and wire them into the work layout so every case study page gets a breadcrumb at the top and a CTA section at the bottom — without touching each individual page.

**Size:** M  
**Files:**
- `app/work/_components/Breadcrumb.tsx` (new)
- `app/work/_components/CaseCTA.tsx` (new)
- `app/work/layout.tsx`
- `app/work/work.css`
- `app/work/healthcare-real-estate/page.tsx` (remove lone back-link footer)
- `app/work/northern-trust/page.tsx` (remove lone back-link footer)
- `app/work/green-goods/page.tsx` (remove lone back-link footer)

## Approach

**Breadcrumb**
- `usePathname()` to get current route; split on `/` to derive segments
- Static label map: `{ 'work': 'Work', 'healthcare-real-estate': 'Healthcare Real Estate', 'northern-trust': 'Northern Trust', 'green-goods': 'Green Goods' }`
- Render as `<nav aria-label="breadcrumb">` with `Work > [Page Title]`
- Style in `work.css` using existing V9 token colors (`--v9-text-muted`, `--v9-accent`)

**CaseCTA**
- Dark background card (`--v9-bg-dark`), centered text, teal primary button
- Copy and destination TBD (see open question Q5 — placeholder text for now; worker must not ship without confirmed copy)
- On click: `trackEvent('cta_click', { location: 'case_study_footer', label: '<cta-text>' })` from `app/lib/analytics.ts`
- Teal button style follows `.v9-btn-primary` pattern (check existing classes in homepage components)

**Layout wiring** (`work/layout.tsx`)
- Render `<Breadcrumb />` inside `<main>` above `{children}`
- Render `<CaseCTA />` inside `<main>` below `{children}`

**Case study pages**
- Remove the `<Link href="/work">← All Work</Link>` footer section from all 3 files
- Do NOT add anything else to the individual pages — layout handles it

## Key context

- CTA copy/destination is an open question (Q5). Block T2 work on this answer; use placeholder until confirmed.
- GA4 `trackEvent` signature: `trackEvent(eventName: string, params?: Record<string, string>)` — see `app/lib/analytics.ts`
- Do not add `'use client'` to layout.tsx — Breadcrumb and CaseCTA must be client components themselves if they use hooks/events
## Acceptance
- [ ] `Breadcrumb.tsx` renders correct label on all 3 case study pages
- [ ] `CaseCTA.tsx` renders below page content on all 3 case study pages
- [ ] CTA button click fires `cta_click` GA4 event
- [ ] Lone `← All Work` back-link removed from all 3 case study pages
- [ ] No TS errors (`npm run build`)
- [ ] `npm run lint` passes
- [ ] CTA copy confirmed by user (Q5 resolved) before merging
## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: