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
Removed nested <html>/<head>/<body> tags from 8 landing page layouts, replacing each with a `<>{children}</>` fragment. All metadata and viewport exports preserved for App Router merging.
## Evidence
- Commits: b666064c0cbc2c95ba7834adb0121bbff290a0d8
- Tests: npm run build, npm test
- PRs: