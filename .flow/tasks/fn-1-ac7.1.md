# fn-1-ac7.1 Lead Magnets: Interactive Calculators

## Description

Build two interactive calculators that serve as lead magnets. Both require email capture before showing results. Calculators should demonstrate the value of UX improvements and drive qualified leads.

**Size:** M  
**Files:**
- app/tools/cost-of-inaction/page.tsx
- app/tools/revenue-opportunity/page.tsx
- app/api/calculator-submit/route.ts (or similar)

### Calculator 1: Cost of Inaction Calculator

Shows monthly revenue loss from poor UX. Inputs:
- Monthly website visitors
- Current conversion rate (%)
- Average transaction value
- Estimated traffic loss from poor UX (%)

Output: Monthly revenue loss, annual loss, 3-year opportunity cost.

### Calculator 2: Revenue Opportunity Calculator

Shows potential upside from UX improvements. Inputs:
- Monthly website visitors
- Current conversion rate (%)
- Average transaction value
- Target conversion rate (%) — or use industry benchmarks

Output: Additional monthly revenue, annual gain, ROI projection.

### Email Capture Flow

1. User fills calculator inputs
2. CTA: "See Your Results" → triggers email modal
3. Email + optional: name, company, website
4. Submit stores lead + reveals results
5. Results include: personalized numbers + soft CTA to book consultation

## Approach

- Build as standalone pages under /tools/ path
- Use existing styling patterns from app/page.tsx
- Store leads in simple JSON file or email service (Mailchimp, Resend)
- Results should be shareable (URL with hashed params optional)

## Key Context

- Site uses Next.js 14 App Router
- Current styling: CSS files (page.css pattern)
- No form handling infrastructure exists yet
- Mobile-first design critical for small business audience

## Acceptance

- [ ] Cost of Inaction Calculator accepts 4 inputs, shows 3 outputs
- [ ] Revenue Opportunity Calculator accepts 4 inputs, shows 3 outputs
- [ ] Email modal blocks results until submitted
- [ ] Lead data stored with calculator type, inputs, timestamp
- [ ] Results page includes consultation CTA
- [ ] Mobile-responsive layout
- [ ] Loading states for calculations
- [ ] Error handling for invalid inputs

## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
