# fn-8-acc.7 Cal.com embed: dedup into shared component + lazy load + wire booking analytics

## Description
Cal.com embed init code is duplicated in two files. The key difference: `ContactSection.tsx` already has a working postMessage listener that captures `bookingSuccessful` and calls `trackBookingComplete()` (lines 81-82). `BookingSection.tsx` has NO postMessage listener — bookings from the systems pages are untracked. Both files lack lazy loading.

**Size:** M
**Files:**
- `app/_shared/CalEmbed.tsx` (new — shared component)
- `app/_home/components/ContactSection.tsx` (replace inline init with shared component)
- `app/systems/_components/BookingSection.tsx` (replace inline init with shared component — gains postMessage tracking)
- `app/lib/analytics.ts` (no changes — `trackBookingComplete` already implemented correctly)

**Approach:**
Extract into `app/_shared/CalEmbed.tsx`:
- Props: `calLink: string`, `namespace?: string`, `config?: object`, `prefillParams?: Record<string, string>` (needed by Task 10 for UTM forwarding — add now to avoid later interface change)
- Load `https://app.cal.com/embed/embed.js` lazily via `useEffect` on mount (or IntersectionObserver for the inline variant)
- Use `initializedRef` to prevent double-init
- Attach postMessage listener for `bookingSuccessful` / `cal:bookingSuccessful` events — call `trackBookingComplete()` from `@/app/lib/analytics` (mirrors existing ContactSection logic at lines 78-84)
- Cleanup: remove postMessage listener on unmount

Replace init blocks in both `ContactSection.tsx` and `BookingSection.tsx` with `<CalEmbed calLink="..." />`.

ContactSection and BookingSection use different calLink values — preserve these as props.

References: `calcom/cal.com` embed-react `Cal.tsx` init pattern; `kathan1509/my-portfolio` dynamic import approach (github-scout)
## Acceptance
- [ ] `app/_shared/CalEmbed.tsx` exists with `calLink`, `namespace`, `config`, `prefillParams` props
- [ ] Cal.com script loads lazily (not in initial JS bundle — verify in Lighthouse network waterfall)
- [ ] postMessage listener for `bookingSuccessful` present in CalEmbed
- [ ] `ContactSection.tsx` and `BookingSection.tsx` both use `<CalEmbed />` (no inline Cal.com init code)
- [ ] Booking on homepage contact section still works (visual/functional parity)
- [ ] Booking on systems pages still works (visual/functional parity)
- [ ] postMessage listener cleaned up on unmount (no memory leak)
- [ ] `trackBookingComplete()` would fire for bookings from BOTH homepage and systems pages
- [ ] `npm run build` succeeds
## Done summary
Implemented the shared lazy Cal.com embed and booking analytics in PR #12.
## Evidence
- Commits: b2acf7c7ad2fcf57f429234b444a7d83b993b6fb, 363de53931cbb4d3b05367bb7b39e36272bdecaa, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm test, npm run build, axe accessibility tests, analytics smoke verification
- PRs: #12, #13, #28