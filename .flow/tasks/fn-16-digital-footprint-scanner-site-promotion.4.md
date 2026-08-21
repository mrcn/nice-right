---
satisfies: [R3, R4]
---

# fn-16-digital-footprint-scanner-site-promotion.4 Scan page UI: form, free score, email gate, a11y

## Description
Public `/scan` experience (R3 + R4 UI): free snapshot score/headlines, email gate, accessible loading/errors, Turnstile lifecycle across two submits.

**Size:** M
**Files:** `app/scan/page.tsx` (+ components/CSS), SEO via shared helper, Playwright happy-path spec
**Touches:** [app/scan/**, e2e/**]

## Approach
- Form: URL + business name + city; client validation.
- Turnstile: **reset/re-execute widget on every scan and email submit attempt** (tokens single-use, ~300s; long PSI waits make reuse fail).
- Loading UX for 10–60s; map API errors; never gate on-screen score.
- After email success: confirmation + on-page strategy-call CTA hook for analytics (.5).
- `buildSeoMetadata`; v9 tokens; axe labels/`aria-live`.
- Playwright asserts happy path and fresh-token behavior on retry (mocked APIs OK).

## Investigation targets
**Required:**
- `app/_shared/seo.ts` — `buildSeoMetadata`
- `app/_shared/tokens.css` — v9 tokens
- `app/_home/components/ContactSection.tsx` — CTA patterns
- `e2e/conversion-path.spec.ts` — Playwright style

**Optional:**
- `app/systems/layout.tsx` — secondary page chrome

## Key context
- Client island for Turnstile/form to avoid hydration mismatch.

## Acceptance
- [ ] `/scan/` shows free score + 2–3 findings without email
- [ ] Email gate calls `/api/lead` with success/error states
- [ ] Turnstile resets per submit/retry (covered in Playwright or component test)
- [ ] Loading + API error states accessible (`aria-live`)
- [ ] SEO metadata present; page not noindexed
- [ ] Playwright happy path green
- [ ] `npm test`, lint, and relevant Playwright spec pass

## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
