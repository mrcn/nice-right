# Lead-gen tools plan (approved)

Status: **scanner-first**. This is the product source of truth for Nice Right’s free lead-magnet tools.

## Positioning

Help Northwest Chicago / SMB home-services owners see how their **owned assets** (website, Google Business presence, findability) are leaking jobs, reviews, and profit — then route warmed leads to a strategy call. Language stays outcome-first (jobs, reviews, findability). Do not agency-bash.

## Phases

| Phase | Scope | Status |
| --- | --- | --- |
| **0 / Scanner** | Digital Footprint Scanner at **`/scan/`** on the main site | **In build / shipping** |
| **1** | `/tools` calculators + `tool_calculator_use` analytics | **Deferred** — follow-up epic |
| **2** | Shared email pipeline proof (Resend HTML report + consent-gated list) | Shared with scanner |
| **3** | Review-gap v2, automated welcome sequence, promotion from GitHub #26 landing pages | Out of scope for this epic |

## Scanner (current)

- **Route:** `/scan/` (sitemap-eligible; listed in `public/llms.txt`).
- **Flow:** free on-screen score + 2–3 headlines → optional email for full HTML report → strategy-call CTA.
- **APIs:** `POST /api/scan`, `POST /api/lead` (serverful Next.js Route Handlers).
- **Bot protection:** Cloudflare **Turnstile on both POSTs** (scan + lead). Do **not** hide the email field behind a pre-reveal captcha. Score stays free; email gate stops bots.
- **List storage:** **Mailchimp** (free tier) when marketing consent is checked (unchecked by default). List failures must not block Resend report delivery.
- **Promo surfaces (v1):** homepage Nav, Hero secondary CTA, Services, Footer. Primary `#contact` / strategy-call path stays intact. No `/systems/*` scanner CTAs in v1.
- **Analytics:** `tool_scan_submit`, `tool_email_capture`, `tool_report_cta_click` — **no raw URL, business name, or email** in event params (hostname-only or omit).

## Explicit non-goals (this plan)

- Phase 1 calculators and commission/performance-partnership revival (`fn-1-ac7` stays closed).
- First-party list infrastructure (Mailchimp only).
- Headless Chrome as the scan engine.
- PDF reports (HTML email for v1).
- City/industry pSEO page batches.

## Ops notes

- Secrets: Turnstile secret, Resend, Mailchimp, Upstash, DataForSEO, PSI — never `NEXT_PUBLIC_*` except the Turnstile site key.
- Rate limit + SSRF guards + opaque `scanId` complement Turnstile.
