# Nice Right analytics event map

This document records what the website sends from the code side. It does not include GA4 dashboard configuration or historical traffic because that requires Google Analytics/Search Console access.

## Property

- Provider: Google Analytics 4 via `gtag.js`
- Measurement ID: `G-ZX3QC73LKS`
- Loader: `app/layout.tsx`
- Expected network behavior: `https://www.googletagmanager.com/gtag/js?id=G-ZX3QC73LKS` returns `200`; `https://www.google-analytics.com/g/collect` returns `204` for accepted hits.

## Automatic events

| Event | Source | Notes |
| --- | --- | --- |
| `page_view` | GA4 config in `app/layout.tsx` | Sent by `gtag('config', 'G-ZX3QC73LKS')`. |
| `scroll` | GA4 enhanced measurement | May appear separately from custom scroll-depth events. |

## Custom events

| Event | Trigger | Main params |
| --- | --- | --- |
| `cta_click` | CTA clicks in hero, nav, pricing, FAQ, case-study footer | `location`, `section`, `page` |
| `scroll_depth` | Homepage scroll milestones from `useScrollDepth` | `depth`, `page` |
| `section_view` | Homepage section IntersectionObserver/ScrollTrigger points | `section_name`, `page` |
| `faq_open` | FAQ item expanded | `question`, `index`, `page` |
| `pricing_view` | Pricing tier enters viewport | `tier_name`, `page` |
| `booking_complete` | Cal.com postMessage `bookingSuccessful` | `page`, `referrer` |
| `contact_click` | Email/LinkedIn contact clicks | `method`, `page` |
| `nav_click` | Main nav links | `label`, `page` |
| `element_hover` | Debounced CTA/pricing hover events | `element`, optional params, `page` |
| `understand_click` | Understand lab clicks with data attributes | `product`, context params, `page` |
| `understand_audio_play` | Understand lab audio play | `product`, context params, `page` |

## UTM capture

`UTMCapture` reads these URL params and persists them to `sessionStorage` for the session:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Stored keys are prefixed as `nr_utm_*`.

## Verification notes

GA4 can batch custom events into a single POST body. A smoke test should check both:

1. `window.dataLayer` contains the expected event pushes.
2. Observed `g/collect` GET/POST traffic includes `page_view` and representative custom event names/params.

A lack of separate network requests per event is not by itself a tracking failure.
