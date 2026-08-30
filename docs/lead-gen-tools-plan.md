# Lead-gen tools plan

Status: **paused and hidden**. This document describes the retained scanner
implementation without presenting it as a current Nice Right product.

## Positioning hypothesis

The future tool may help Northwest Chicago and other local home-service owners
see where their owned assets, such as their website, Google Business presence,
and inquiry path, lose qualified prospects. This is a hypothesis for a later
relaunch, not current public positioning.

## Current state

| Surface | State |
| --- | --- |
| `/scan/` | Disabled and returns HTTP 404 |
| `POST /api/scan` | Disabled and returns HTTP 404 before provider work |
| `POST /api/lead` | Disabled and returns HTTP 404 before email or list work |
| Sitemap and internal links | Excluded; no customer-facing links |
| Scanner implementation | Retained for a future, separately approved relaunch |

## Retained implementation

If the scanner is relaunched, the existing design supports:

- Free on-screen score and headline findings, with no email required for the score.
- An optional HTML report through Resend and consent-gated Mailchimp subscription.
- Cloudflare Turnstile on both POST endpoints.
- Upstash rate limiting, SSRF guards, timeouts, and opaque scan IDs.
- Analytics events with no raw URL, business name, or email in parameters.

None of these capabilities are currently available to visitors.

## Relaunch gates

Before making the scanner public again, create a separate approved task that
covers product readiness, provider reliability, report quality, privacy review,
copy, accessibility, abuse controls, and a controlled observation period.
Do not add a homepage, lab, footer, sitemap, or `llms.txt` link before that gate
passes.

## Deferred phases

- Calculators and other tools remain deferred.
- Review-gap improvements and automated welcome sequences remain deferred.
- City and industry page batches remain out of scope.
- Scanner promotion from GitHub issue #26 remains deferred.

Secrets remain server-only. Never commit real provider credentials.
