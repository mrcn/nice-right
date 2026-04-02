# fn-8-acc.6 GSAP: shared init module + iOS Safari scroll fixes

## Description
`gsap.registerPlugin(ScrollTrigger)` is repeated in 8 files. GSAP can be registered multiple times without error, but this is unnecessary duplication. More critically, the pinned hero section (`Hero.tsx:28-43`) is known to cause position jumping on iOS Safari when the address bar shows/hides — `ScrollTrigger.config({ ignoreMobileResize: true })` and `normalizeScroll(true)` are the fixes.

**Size:** M
**Files:**
- `app/_shared/gsap-init.ts` (new)
- `app/_home/components/Hero.tsx` (apply iOS fixes at lines ~28-60)
- `app/_home/components/Services.tsx` (apply iOS-safe scrub, line ~129)

**Approach:**
- Create `app/_shared/gsap-init.ts` that exports `initGSAP()`: registers ScrollTrigger once, calls `ScrollTrigger.config({ ignoreMobileResize: true })`, and conditionally calls `ScrollTrigger.normalizeScroll(true)` when `ScrollTrigger.isTouch === 1` (iOS/touch devices)
- Replace `gsap.registerPlugin(ScrollTrigger)` + the `if (typeof window !== 'undefined')` guard in all 8 animated home components with a single `import { initGSAP } from '@/app/_shared/gsap-init'` called once at module level in each component's `useEffect` entry point
- `Hero.tsx`: Add `anticipatePin: 1` to the pinned ScrollTrigger instance (line ~36). Replace inline `prefers-reduced-motion` check with `gsap.matchMedia()` pattern (cleaner, auto-reverts)
- `Services.tsx`: Verify `ScrollTrigger.create` for the pinned section (line ~129) also has `anticipatePin: 1`
- Do NOT touch animation logic in fn-4-mgl / fn-5-qos components (Services pin logic, Pricing per-row triggers) — this task is init-layer only

**References:**
- `ConanMcN/fragments` `useScrollAnimations.ts` hook pattern (github-scout)
- `Scotopia1/the-elites-solutions-website` `gsap-config.ts` (github-scout)
- GSAP docs: `normalizeScroll()`, `ignoreMobileResize`, `anticipatePin`
## Acceptance
- [ ] `app/_shared/gsap-init.ts` exists and exports `initGSAP()`
- [ ] `ScrollTrigger.config({ ignoreMobileResize: true })` is called globally via `initGSAP()`
- [ ] `normalizeScroll(true)` is conditionally called when `ScrollTrigger.isTouch === 1`
- [ ] Hero pinned ScrollTrigger has `anticipatePin: 1`
- [ ] `gsap.registerPlugin(ScrollTrigger)` no longer appears in individual component files
- [ ] All 8 animated home components import from `@/app/_shared/gsap-init`
- [ ] `npm run build` succeeds, no TypeScript errors
- [ ] Hero pin does not jump on iOS Safari (test on real device or BrowserStack)
- [ ] `prefers-reduced-motion: reduce` disables hero scroll animation (no movement)
## Done summary
Created `app/_shared/gsap-init.ts` with `initGSAP()` that registers ScrollTrigger once globally, sets `ignoreMobileResize: true`, and calls `normalizeScroll(true)` on touch devices. Replaced `gsap.registerPlugin(ScrollTrigger)` in all 8 home components with the shared init, and added `anticipatePin: 1` to pinned ScrollTrigger instances in Hero.tsx and Services.tsx.
## Evidence
- Commits: e66bf0cd8dc2d923b98a291401762260f94b0020
- Tests: npm run build, npm test (vitest run — 2 tests passed)
- PRs: