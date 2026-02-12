# Commission-Based Lead Generation System

## Overview

Implement a performance-based pricing model for Nice Right that aligns agency compensation with client results. The system centers on "We only win when you win" positioning with a small base fee ($300-400) plus commission on provable outcomes.

## Goals

1. Generate qualified leads through interactive calculators that demonstrate value
2. Communicate performance-based pricing professionally and clearly
3. Build tracking infrastructure to attribute results to our work
4. Create a repeatable sales process for commission-based engagements

## Context

Nice Right is a digital growth agency for small businesses. Current positioning: "Digital Growth Partner for Small Businesses" with three service pillars: Get More Customers, Lower Service Costs, Keep Them Longer.

This epic introduces a new business model layer while maintaining existing brand positioning.

## Scope

### In Scope
- Two interactive lead magnets (Cost of Inaction Calculator, Revenue Opportunity Calculator)
- Pricing page with performance-based model explanation
- Tracking infrastructure (pixel, dashboard, integrations)
- Sales process assets (qualification criteria, proposal template)

### Out of Scope
- Actual commission billing/payments (manual process for now)
- Client onboarding automation
- Advanced attribution modeling

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build
```

## Acceptance

- [ ] Lead magnets capture emails and display personalized results
- [ ] Pricing page clearly explains base fee + commission model
- [ ] Tracking pixel can be installed on client sites
- [ ] Dashboard shows leads → sales → commission calculation
- [ ] Proposal template includes performance terms
- [ ] All copy reflects "performance partnership" positioning

## References

- Current site: app/page.tsx (Next.js 14, React 18)
- Brand voice: Professional, results-focused, small-business friendly
