# fn-8-acc.2 Add security headers + CSP to vercel.json

## Description
`vercel.json` contains only `{ "outputDirectory": "dist" }`. All security headers must go in `vercel.json` because `headers()` in `next.config.js` is unsupported with `output: 'export'`.

**Size:** S (1 file, high-value quick win)
**Files:**
- `vercel.json`

**Approach:**
Add a `headers` array with `source: "/(.*)"` containing:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 0` (disable legacy; CSP handles XSS)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` with these directives:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com` — `'unsafe-inline'` is required because GA4 init is an inline `<Script>` in a static export (no nonce possible); document as accepted tradeoff
  - `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`
  - `img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com`
  - `frame-src https://cal.com https://*.cal.com`
  - `style-src 'self' 'unsafe-inline' https://app.cal.com`
  - `font-src 'self'` — root layout uses `next/font/google` which self-hosts fonts at build time; no runtime request to `fonts.gstatic.com` occurs. NOTE: if `app/new-site/` ever comes into scope, `style-src` will need `https://fonts.googleapis.com` (new-site uses `<link>` tags to CDN)

Reference: `silverthreadlabs/bloggen-seo-starter` CSP pattern (covers GA4 + Cal.com + GTM)
## Acceptance
- [ ] `vercel.json` has `headers` array with `source: "/(.*)"` and all 7 headers
- [ ] After Vercel preview deploy: `curl -I <preview-url>` shows all 7 headers in response
- [ ] GA4 still fires on homepage after headers — no CSP violations in browser console
- [ ] Cal.com embed still loads — no CSP violations blocking `app.cal.com`
- [ ] `font-src` does NOT include `fonts.gstatic.com` (fonts are self-hosted via next/font)
- [ ] securityheaders.com rates the site A (or document specific B-grade items as accepted tradeoffs)
- [ ] `npm run build` succeeds
## Done summary
Added security headers and CSP in PR #12.
## Evidence
- Commits: b2acf7c7ad2fcf57f429234b444a7d83b993b6fb, 363de53931cbb4d3b05367bb7b39e36272bdecaa, f9f3e8d2b1cd469f6c1d3a1764f41ac560aafe7d
- Tests: npm test, npm run build, axe accessibility tests, analytics smoke verification
- PRs: #12, #13, #28