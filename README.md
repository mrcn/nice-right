# Nice Right

A Next.js 14 website with GSAP animations, deployed serverfully on Vercel
(Route Handlers under `app/api/*` power the Digital Footprint Scanner).

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run formatter
npm run format

# Run tests
npm test
```

## Project Structure

```
├── app/              # Next.js app directory
│   └── api/          # Route Handlers (e.g. GET /api/health)
├── components/       # React components
├── docs/             # Documentation and marketing content
├── lib/              # Utility functions
├── public/           # Static assets (sitemap/robots generated at build)
└── .next/            # Build output (generated)
```

## Tech Stack

- **Framework**: Next.js 14.1.0 (App Router, Route Handlers)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **Animation**: GSAP 3.14.2
- **Testing**: Vitest + Playwright
- **Deploy**: Serverful on Vercel (not a static export)

## Environment Setup

This project uses Node.js 20.

The Digital Footprint Scanner APIs require environment variables. Copy
`.env.example` to `.env.local` and fill in values (never commit real
secrets):

- `PAGESPEED_API_KEY` — Google PageSpeed Insights
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile
- `RESEND_API_KEY` — report delivery email
- `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` — GBP live lookup
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — cache + rate limiting
- `MAILCHIMP_API_KEY` / `MAILCHIMP_SERVER_PREFIX` / `MAILCHIMP_LIST_ID` — marketing list

On Vercel, set the same keys under **Project Settings → Environment
Variables**. The site itself (`npm run dev`, `npm run build`) works without
any of them; only the scanner API routes need them at request time.

## Deploy

Deployed to Vercel as a standard serverful Next.js app (zero-config; no
`output: 'export'`). `vercel.json` carries only redirects, security
headers (including the CSP, which allowlists Turnstile hosts), and image
settings — no `outputDirectory`, so Vercel never serves a stale static
directory in place of the functions.

Smoke check after any deploy:

```bash
curl -sfL "$DEPLOY_URL/api/health"   # → {"status":"ok",...}
```

Note: the site uses `trailingSlash: true`, so a bare `/api/health` gets a
308 redirect to `/api/health/` — use `-L` (or the trailing slash) when
curling.

`images.unoptimized` is intentionally kept for this cutover (fn-16 spec,
R1 decision); revisit the image pipeline separately.

## License

Private
