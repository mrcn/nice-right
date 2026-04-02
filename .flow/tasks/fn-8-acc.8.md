# fn-8-acc.8 Structural pages: not-found, loading, fix error.tsx

## Description
Three structural gaps: (1) No `not-found.tsx` — 404s show Next.js default page with no branding. (2) No `loading.tsx` — GSAP-heavy route transitions may show blank content. (3) `app/error.tsx` exposes `error.message` to users (line ~14) and uses `console.error` in production — potential security leak.

**Size:** S (3 new/edit files)
**Files:**
- `app/not-found.tsx` (new)
- `app/loading.tsx` (new)
- `app/error.tsx` (edit — remove `console.error` and `error.message` display)

**Approach:**
- `app/not-found.tsx`: Simple branded 404 page. Match the v9 design system — use `--nr-navy`, `--nr-cream` tokens from `app/_shared/tokens.css`. Include: large "404", brief message, link to homepage. Import and use existing `Nav` and `Footer` from `app/_home/components/` for consistent chrome.
- `app/loading.tsx`: Minimal loading state. A simple centered spinner or pulse animation using CSS. Keep it lightweight — the goal is to prevent blank flash, not build a complex skeleton.
- `app/error.tsx`: Remove `console.error(error)` call. Remove any rendering of `error.message` or `error.digest` in user-visible HTML. Show only a generic "Something went wrong" message with a retry button. Log to a structured format if needed (or remove entirely for a static site with no server).
## Acceptance
- [ ] Navigating to `/nonexistent-page` shows branded 404 page with site nav/footer
- [ ] `app/not-found.tsx` uses v9 design tokens (not hardcoded hex colors)
- [ ] `app/loading.tsx` exists and shows minimal loading indicator
- [ ] `app/error.tsx` does not render `error.message` in any HTML element
- [ ] `app/error.tsx` does not call `console.error` (no prod log leakage)
- [ ] `npm run build` succeeds
- [ ] All three pages are accessible (keyboard-navigable, correct heading structure)
## Done summary
Fixed error.tsx to remove console.error and error.message exposure; added branded not-found.tsx with Nav/Footer and v9 design tokens; added minimal loading.tsx spinner. Build and tests pass.
## Evidence
- Commits: af725ba7c1381d73e6c1a9cb453fc19c8279bda2
- Tests: npm run build, npm test (vitest)
- PRs: