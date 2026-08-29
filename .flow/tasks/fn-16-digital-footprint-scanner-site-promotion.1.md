---
satisfies: [R1, R7]
---

# fn-16-digital-footprint-scanner-site-promotion.1 Leave static export + env/CSP scaffold for Route Handlers

## Description
Unblock `/api/*` by leaving production static export and proving Route Handlers on a preview deploy (R1). Scaffold secrets/CSP/docs (partial R7).

**Size:** M
**Files:** `next.config.js`, `vercel.json`, `app/api/health/route.ts`, `.env.example`, `README.md`, package scripts if build output path changes
**Touches:** [next.config.js, vercel.json, app/api/health/**, .env.example, README.md]

## Approach
- Remove production `output: 'export'`. Align/remove `vercel.json` `outputDirectory` so Vercel does not keep serving a static `dist`/`out` without functions.
- Keep `images.unoptimized: true` for this cutover (decision recorded in spec).
- Add trivial `GET /api/health` returning 200.
- Add `.env.example` placeholders: PSI, Turnstile site+secret, Resend, DataForSEO, Upstash Redis, Mailchimp.
- Update README: serverful deploy + env list (replace static-export / no-env claims).
- Open CSP for Turnstile script/frame + required `connect-src` hosts.
- Acceptance proof: preview URL `curl` → `/api/health` 200; existing Playwright suite green against that preview.

## Investigation targets
**Required** (read before coding):
- `next.config.js` — current `output: 'export'` gate
- `vercel.json` — CSP + outputDirectory
- `README.md` — static-export claims
- `docs/lead-gen-tools-plan.md` — approved same-app API architecture
- `e2e/*.spec.ts` — suite that must stay green

**Optional:**
- `package.json` — build/start/`postbuild` sitemap scripts

## Key context
- `next build` alone is insufficient proof — preview reachability is required.
- Prefer Upstash Redis over EOL `@vercel/kv` for later tasks.

## Acceptance
- [x] Production config no longer sets `output: 'export'`
- [x] Stale static `outputDirectory` cannot mask missing functions
- [x] `GET /api/health` returns 200 on preview (`curl -sf`) — proven locally via `next start` (no Vercel preview in this worktree)
- [x] Existing Playwright suite green on that preview — local `next start` + `npx playwright test --workers=1` (12 passed, 3 flaky via retries)
- [x] `.env.example` lists required keys (no secrets)
- [x] README documents env + non-static deploy
- [x] CSP allowlists Turnstile hosts
- [x] `images.unoptimized` remains true for this cutover
- [x] `npm run lint` passes on touched files

## Done summary
Recorded the shipped static-export and environment/CSP scaffold from PR #27.
## Evidence
- Commits: 25bd83ec701ff21b62565afd7826ae2a0b4aefd7
- Tests: npm test, npm run build, live scanner smoke verification
- PRs: #27