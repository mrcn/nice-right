# fn-8-acc.10 Analytics integrity: validate all events fire across all routes

## Description
Analytics has two known failures: (1) GA4 never fires on any of the 10 landing pages (fixed by Task 1, but needs verification). (2) `trackBookingComplete()` in `app/lib/analytics.ts` is defined but never called (fixed by Task 7, but needs verification). Additionally, UTM parameters from paid ads are not captured or forwarded to Cal.com.

**Depends on:** Task 1 (landing page HTML fix) and Task 7 (Cal.com embed + booking tracking)

**Size:** M
**Files:**
- `app/lib/analytics.ts` (add UTM capture utility)
- `app/layout.tsx` (add UTM persistence to sessionStorage on page load)
- `app/_shared/CalEmbed.tsx` (forward UTMs as Cal.com prefill params — coordinate with Task 7)

**Approach:**
- UTM capture: on page load in root layout (or a `useSearchParams` hook), read `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from URL. Store in `sessionStorage`. Forward to Cal.com embed via `config.prefill` or URL params when `CalEmbed` mounts.
- Add `captureUTMs()` to `app/lib/analytics.ts` that reads from `window.location.search` or `sessionStorage`
- Verify events via GA4 DebugView checklist:
  - `cta_click` fires when any CTA is clicked
  - `scroll_depth` fires at 25/50/75/100% milestones
  - `section_view` fires when sections enter viewport
  - `pricing_view` fires when pricing tiers are viewed
  - `booking_complete` fires when Cal.com booking is confirmed (Task 7)
  - `nav_click` fires on nav link clicks
- Document all events in a checklist comment at top of `analytics.ts`

**Note:** `app/layout.tsx` is a server component — UTM reading needs `'use client'` wrapper or a separate client component. Use `useSearchParams()` from `next/navigation` in a client component imported into root layout.
## Acceptance
- [ ] GA4 pageview fires on at least 3 different landing pages (verify in GA4 Realtime report)
- [ ] `booking_complete` event fires when Cal.com booking is confirmed (Task 7 dependency)
- [ ] UTMs from `?utm_source=test&utm_campaign=test` URL are stored in sessionStorage
- [ ] UTMs are forwarded to Cal.com embed prefill (verify Cal.com booking form pre-fills name/email if passed)
- [ ] GA4 DebugView checklist: all 9 events in `analytics.ts` are firing correctly
- [ ] `analytics.ts` has a comment block documenting all event names and their trigger locations
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
