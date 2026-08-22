---
satisfies: [R2]
---

# fn-16-digital-footprint-scanner-site-promotion.3 Scan API: PSI + cheerio + DataForSEO + score/cache/RL

## Description
Implement `POST /api/scan` (R2) against the cache/Turnstile/Redis contracts from task .2. No headless Chrome.

**Size:** M
**Files:** `app/api/scan/route.ts`, `app/lib/` scan modules (url-guard, psi, html-signals, dataforseo, score), vitest for scoring + URL guard
**Touches:** [app/api/scan/**, app/lib/**]

## Approach
- Reuse task .2 helpers only — do not fork: `verifyTurnstile`, `limitScan` / `getClientIp`, `getRedis`, `putScan` / `getScan` / `buildScanResult` / `ScanResult` (`app/lib/scan-cache.ts`, `turnstile.ts`, `ratelimit.ts`, `redis.ts`). <!-- Updated by plan-sync: fn-16-digital-footprint-scanner-site-promotion.2 used verifyTurnstile/limitScan/getRedis not generic helpers -->
- Parallelize PSI (all four categories), HTML fetch+cheerio, DataForSEO My Business Info **live**.
- SSRF: http(s) only; deny localhost, RFC1918, link-local, metadata, IPv6 loopback/ULA/link-local, IPv4-mapped forms, non-canonical IP literals; **pin DNS at dial time**; ≤3 redirects with re-validation each hop; body/time caps.
- Cache via `putScan` with **opaque random `scanId`** (not hash of inputs); fill `ScanResult` fields (`score`, `findings`, `websiteUrl`, `businessName`, `city`, optional `partial`/`ScanPartialFlags`, `createdAt`/`expiresAt` via `buildScanResult`); content key = normalized URL+name+city for 24h dedupe (separate from opaque id).
- Expensive-path rate limit via **`limitScan` (3/hr/IP)** **before** upstreams; **cache hits skip that budget**; 429 `Retry-After` from `RateLimitResult.retryAfterSeconds`. <!-- Updated by plan-sync: fn-16-digital-footprint-scanner-site-promotion.2 used limitScan 3/hr not ~5/hr -->
- Per-provider timeouts under route `maxDuration` (e.g. PSI 45s, DFS 20s, HTML 10s); timeout → labeled partial if any signal survived.
- Scoring: draft weights; missing provider → **renormalize** remaining weights + `partial` flag — never zero-fill absent data as failure; label lab vs field; tolerate missing CrUX.

## Investigation targets
**Required:**
- `docs/lead-gen-tools-plan.md` — checks + cache
- Shared modules from task .2: `app/lib/scan-cache.ts` (`getScan`/`putScan`/`buildScanResult`/`ScanResult`), `app/lib/turnstile.ts` (`verifyTurnstile`), `app/lib/ratelimit.ts` (`limitScan`/`getClientIp`), `app/lib/redis.ts` (`getRedis`)
- PSI category quirk; DataForSEO my_business_info live

**Optional:**
- cheerio 1.x `load` (nodejs runtime)

## Key context
- `runtime = 'nodejs'` for cheerio.
- If Hobby `maxDuration` cannot fit budgets, escalate to Pro (parked risk) rather than silently 504 everything.

## Acceptance
- [ ] Implements task .2 `putScan`/`getScan`/`ScanResult` contract (no competing cache shape)
- [ ] Returns score 0–100 + 2–3 headlines + opaque random scanId
- [ ] PSI all four categories; cheerio + GBP without Puppeteer
- [ ] Connection-time SSRF checks + redirect hop re-validation covered by tests
- [ ] Uses `limitScan` (3/hr/IP); cache hits skip that budget; 429 returns `Retry-After` from `retryAfterSeconds`
- [ ] Provider timeouts yield labeled partial or safe 5xx — never silent fake GBP
- [ ] Missing provider signals renormalize weights (documented)
- [ ] `maxDuration` + per-provider budgets documented in route
- [ ] Vitest covers URL guard + scoring renormalization
- [ ] `npm test` and `npm run lint` pass

## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
