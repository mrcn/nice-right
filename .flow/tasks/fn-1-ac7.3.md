# fn-1-ac7.3 Tracking Infrastructure: Pixel, Dashboard, Integrations

## Description

Build tracking infrastructure to attribute client results to our work. Includes tracking pixel for client sites, internal dashboard for monitoring, and integrations with key conversion sources.

**Size:** L (split into sub-tasks if needed)  
**Files:**
- public/pixel.js (client-installable tracking pixel)
- app/dashboard/page.tsx (internal results dashboard)
- app/api/track/route.ts (event ingestion)
- lib/tracking/types.ts (shared types)

### Tracking Pixel (pixel.js)

Lightweight script clients install on their sites:
- Identify visitor (fingerprint or cookie)
- Track page views, scroll depth, time on site
- Track custom events: form submissions, button clicks
- Track conversions: checkout completions, call clicks
- Send to our tracking endpoint

Configuration:
```javascript
_niceright('init', { clientId: 'CLIENT_ID' });
_niceright('track', 'conversion', { value: 100, type: 'sale' });
```

### Dashboard

Internal view showing:
- Client list with status
- Leads generated per client (last 30 days, 90 days, all time)
- Conversions attributed to our work
- Commission calculations per client
- Monthly rollup of all commissions

Views:
1. Overview: All clients, key metrics
2. Client detail: Individual client performance
3. Commission report: Monthly breakdown for invoicing

### Integration Points

**Form Submissions:**
- Webhook endpoint for form providers (Typeform, JotForm)
- JavaScript API for custom forms

**Call Tracking (CallRail):**
- Webhook for call events
- Attribute calls to traffic source

**Online Checkout:**
- Stripe webhook for purchase events
- Shopify webhook for e-commerce orders
- Generic webhook for custom carts

### Data Model

Events stored with:
- clientId
- visitorId (anonymous)
- eventType (pageview, conversion, etc.)
- timestamp
- value (for conversions)
- attribution (source, campaign if known)

## Approach

- Build pixel as vanilla JS (no dependencies)
- Use simple storage (JSON file or SQLite) for MVP
- Dashboard server-components with data fetching
- Webhooks verify signatures where supported

## Key Context

- No existing backend infrastructure beyond Next.js API routes
- Need to balance tracking granularity with privacy compliance
- Client sites may be various platforms (WordPress, Shopify, custom)

## Acceptance

- [ ] pixel.js loads on client sites without errors
- [ ] pixel tracks pageviews, custom events, conversions
- [ ] Dashboard shows client list with lead/conversion counts
- [ ] Commission calculations update automatically
- [ ] Form webhook receives and stores submissions
- [ ] CallRail webhook integration tested
- [ ] Stripe webhook receives purchase events
- [ ] Data export capability for reporting

## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
