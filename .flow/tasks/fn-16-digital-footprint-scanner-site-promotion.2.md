---
satisfies: [R4]
---

# fn-16-digital-footprint-scanner-site-promotion.2 Lead API: Turnstile + Resend HTML report + Mailchimp

## Description
Shared email-capture backend (R4) plus **owned** shared modules that task .3 must implement against: scan cache interface, Turnstile verifier, Upstash client/ratelimit.

**Size:** M
**Files:** `app/api/lead/route.ts`, `app/lib/scan-cache.ts` (or equiv), `app/lib/turnstile.ts`, `app/lib/redis.ts` / ratelimit helper, Resend + Mailchimp + HTML report template modules, vitest
**Touches:** [app/api/lead/**, app/lib/**]

## Approach
- Author `putScan` / `getScan(scanId)` contract + types (`ScanResult`) used by lead + scan routes; allow empty/fake put for tests until .3 fills real scans.
- Shared Turnstile siteverify helper (server-only) and Upstash Redis + sliding-window ratelimit helper — single ownership here; .3 reuses, does not duplicate.
- `POST /api/lead`: validate email + Turnstile; `getScan`; **atomic idempotency claim (`SET NX`) before Resend** with pending/sent + TTL ≥ 24h; set Resend `idempotencyKey` when supported.
- HTML email: four-lever sections + strategy-call CTA. No PDF.
- Mailchimp only when consent checked; Resend success must not fail if Mailchimp errors.
- Marketing consent unchecked by default.

## Investigation targets
**Required:**
- `docs/lead-gen-tools-plan.md` — email capture flow
- Turnstile siteverify (single-use, ~300s)
- Resend Node send + idempotencyKey docs
- Upstash Redis `SET NX` / ratelimit patterns

**Optional:**
- `app/_shared/CalEmbed.tsx` — CTA destination patterns

## Key context
- Concurrent double-submit is the failure mode — sequential-only tests are insufficient.
- Secrets server-only except Turnstile site key.

## Acceptance
- [ ] Shared `getScan`/`putScan` + `ScanResult` module exists and is the only lookup shape
- [ ] Shared Turnstile + Upstash/ratelimit helpers exist (no second copy expected in .3)
- [ ] `/api/lead` verifies Turnstile server-side before send
- [ ] Atomic idempotency claim happens before Resend; concurrent duplicate test included
- [ ] Valid request sends HTML four-lever report + call CTA
- [ ] Mailchimp is consent-gated; list failure does not block email
- [ ] Invalid email / Turnstile / rate limit / missing scan match contracted codes
- [ ] Vitest covers validation + concurrent idempotency helper
- [ ] `npm test` and `npm run lint` pass

## Done summary
Implemented Lead API + shared modules: scan-cache getScan/putScan, Turnstile verify, Upstash redis/ratelimit, POST /api/lead with SET NX idempotency before Resend, four-lever HTML report + strategy CTA, consent-gated Mailchimp. Vitest green for validation + concurrent idempotency. Did not implement /api/scan or /scan UI.
## Evidence
- Commits: 939ca1c
- Tests: npm test — 13 passed (validation + concurrent idempotency)
- PRs: