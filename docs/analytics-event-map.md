# Nice Right analytics event map

**Status:** code map plus live smoke evidence<br>
**Checked:** 29 August 2026<br>
**Scope:** public site, homepage, scanner, booking embed, and Understand surfaces.

This document records what the website sends from the code side. It does not claim that GA4 dashboard settings or historical traffic prove a business outcome.

## Property and load path

- Provider: Google Analytics 4 via `gtag.js`
- Measurement ID: `G-ZX3QC73LKS`
- Loader and `gtag('config')`: `app/layout.tsx`, loaded with Next `afterInteractive`
- Event helper: `app/lib/analytics.ts`
- Every custom hit includes `send_to: G-ZX3QC73LKS` and the current page path.
- `UTMCapture` mounts in `app/layout.tsx` and stores campaign parameters before the page content runs.

## Automatic events

| Event | Source | Notes |
| --- | --- | --- |
| `page_view` | GA4 config in `app/layout.tsx` | Sent by `gtag('config', 'G-ZX3QC73LKS')`. |
| `scroll` | GA4 enhanced measurement | Separate from the site's custom `scroll_depth` milestones. Confirm the GA4 property setting before using it. |

## Custom events

| Event | Trigger location | Main params |
| --- | --- | --- |
| `cta_click` | `Hero.tsx`, `Nav.tsx`, `FAQ.tsx`, `Pricing.tsx`, `work/_components/CaseCTA.tsx` | `location`, `section`, `page` |
| `scroll_depth` | `app/hooks/useScrollDepth.ts`, mounted by `app/_home/page.tsx` | `depth` at 25, 50, 75, and 100; `page` |
| `section_view` | `app/_home/components/Services.tsx` and `Pricing.tsx` | `section_name`, `page`; each tracked section guards repeat firing |
| `faq_open` | `app/_home/components/FAQ.tsx` when an item opens | `question`, `index`, `page` |
| `pricing_view` | `app/_home/components/Pricing.tsx` when the Digital Growth Audit offer enters the viewport | `tier_name`, `page` |
| `booking_complete` | `app/_shared/CalEmbed.tsx` after an accepted Cal.com `bookingSuccessful` message | `page`, `referrer` |
| `contact_click` | `app/_home/components/ContactSection.tsx` email and LinkedIn links | `method`, `page` |
| `nav_click` | `app/_home/components/Nav.tsx` desktop and mobile links | `label`, `page` |
| `element_hover` | `Hero.tsx` and `Pricing.tsx` after a 500ms hover timer | `element`, optional params, `page` |
| Understand events | `labs/understand/_components/UnderstandAnalytics.tsx` on elements with `data-understand-event`, plus audio controls | Dynamic event name, `product`, context params, `page` |
| `tool_scan_submit` | `app/scan/ScanExperience.tsx` after a scan response | `tool`, optional hostname-only `domain`, `cached`, `partial`, `page`; never raw URL, business name, or email |
| `tool_email_capture` | `app/scan/ScanExperience.tsx` after the report-send response | `tool`, optional `marketing_consent`, `duplicate`, `page`; never email |
| `tool_report_cta_click` | `app/scan/ScanExperience.tsx` post-report strategy-call CTA | `tool`, `location`, `page` |

`tool_calculator_use` is not shipped. The Phase 1 `/tools` calculators remain deferred. Scanner events remain documented because the implementation is retained, but they should not fire while the scanner is paused.

## UTM capture and booking handoff

`app/_shared/UTMCapture.tsx` reads these URL params and persists them to `sessionStorage` under `nr_utm_*` keys:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

`app/_shared/CalEmbed.tsx` reads the stored values and merges them into Cal.com prefill parameters. Explicit `prefillParams` win if the same key is supplied by the caller.

## Previous live smoke evidence

Run against `https://niceright.co/?utm_source=smoke&utm_medium=verification&utm_campaign=fn15` on 29 August 2026, before the scanner shutdown. The test did not submit a form, send an email, or create a booking.

- GA loader: HTTP `200`
- GA collection endpoint: HTTP `204`
- `window.dataLayer`: present
- UTM persistence: `smoke`, `verification`, and `fn15` appeared in `sessionStorage`
- Observed event pushes: `cta_click`, `element_hover`, `section_view`, `scroll_depth`, and `pricing_view`
- Live homepage: HTTP `200`
- Live `/scan`: HTTP `200`, with `noindex,nofollow` (before the scanner shutdown)
- Homepage scan-link and free-scan promotion check: zero matches

## Branch acceptance check

The positioning branch changes the expected state to:

- Built `/scan`: HTTP `404`, intentionally unavailable
- Built `POST /api/scan` and `POST /api/lead`: HTTP `404` before provider work
- Built `/labs/understand/`: HTTP `200`, with `noindex,nofollow`
- Built `/systems/*`: HTTP `200`, with `noindex,nofollow`

Rerun the production smoke check after this branch is deployed.

The smoke test did not cover `faq_open`, `contact_click`, `booking_complete`, or the scanner submit/email events. Those require a separate controlled test because they change state or touch third-party services.

## Repository checks

- `npm test`: 41 tests passed
- `npm run build`: passed
- `npm run lint`: passed with existing image-optimization and hook-dependency warnings
- `python3 scripts/research/report_quality_check.py`: passed

A lack of separate network requests per event is not by itself a tracking failure. GA4 may batch custom events into one POST body. The next analytics step is to verify event names and parameters in the GA4 property, then connect a CRM or revenue outcome before calling any metric a business result.
