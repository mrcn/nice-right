# fn-2-qeb.1 Nav solid prop + work layout shell
## Description
Extract shared v9 tokens and add the solid navigation and work-layout shell.

## Goal
Extract v9 CSS tokens to shared file; add Nav solid prop with correct anchor links; create work layout shell.

## Files
- `app/_shared/tokens.css` — CREATE (new directory)
- `app/_home/page.css` — EDIT: add @import for tokens.css
- `app/_home/components/Nav.tsx` — EDIT: defaultSolid prop + absolute anchors
- `app/work/layout.tsx` — CREATE
- `app/work/work.css` — CREATE

## Step 1: Extract tokens

From `app/_home/page.css`, extract the `:root { ... }` block (CSS custom properties: `--v9-bg-dark`, `--v9-accent`, `--v9-font-heading`, etc.) and the `.v9 { ... }` base block (background, color, font-family, overflow-x, min-height) into `app/_shared/tokens.css`.

Then add to the top of `app/_home/page.css`:
```css
@import '../_shared/tokens.css';
```
And remove the now-extracted blocks from `_home/page.css`.

**Why**: Importing the full 1,976-line `_home/page.css` in the work layout would inject all homepage component styles globally. Tokens-only is ~30 lines.

## Step 2: Nav.tsx

Add prop: `interface NavProps { defaultSolid?: boolean }`. Accept in function signature.

In `useEffect`: if `defaultSolid` is true, call `setSolid(true)` immediately and `return` (skip all ScrollTrigger setup). This prevents GSAP from seeking `#hero` (which doesn't exist on work pages) and leaking a live ScrollTrigger instance.

Update link hrefs: when `defaultSolid` is true use `/#services`, `/#results`, `/#contact`. Simplest approach: always use `/#...` — homepage handles hash scroll on load anyway.

## Step 3: layout.tsx

Server component (no `'use client'`). Structure:
```
import '@/app/_shared/tokens.css'
import './work.css'
import { Nav } from '@/app/_home/components/Nav'
import { Footer } from '@/app/_home/components/Footer'

export default function WorkLayout({ children }) {
  return (
    <div className="v9-work">
      <Nav defaultSolid />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

Note: no `.v9` class needed on the wrapper — tokens.css is imported directly, `.v9-work` gets its own base styles from work.css.

## Step 4: work.css

```css
@import '../_shared/tokens.css';

.v9-work {
  background: var(--v9-bg-dark, #0C1117);
  color: rgba(255,255,255,0.87);
  font-family: var(--v9-font-body, 'Inter', -apple-system, sans-serif);
  min-height: 100dvh;
}
```

This covers the body background bleed from root `app/layout.tsx` which sets `#fafaf9` inline.

## Acceptance
- [ ] `/work` renders dark background (confirms token chain works)
- [ ] Nav is solid (white bar) on `/work`
- [ ] Nav "Services" link navigates to `/#services`
- [ ] Mobile hamburger renders and opens on `/work` (works with defaultSolid)
- [ ] Footer renders at bottom
- [ ] No warm-white bleed below footer
- [ ] Homepage (`/`) visually unchanged after token extraction
- [ ] No TypeScript errors

## Done summary
Implemented and merged the v9 navigation and work-layout shell in PR #8.
## Evidence
- Commits: 2620730b94c36625438a57e38ecf7e96512429a0, 5d33235e2a1791fb060b2b95be77441d5d4055dd
- Tests: npm test, npm run build
- PRs: #8, #30
