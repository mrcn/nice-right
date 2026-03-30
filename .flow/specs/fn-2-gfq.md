# WCAG AA Accessibility Pass — Homepage

## Overview

Fix accessibility violations on the Nice Right homepage identified in a mobile a11y audit (2026-03-30), validated by a 4-agent hive swarm review. Issues span font sizes below 12px, contrast failures, undersized touch targets, Hero mobile horizontal scroll, non-fluid Pricing grid, and missing ServicesCarousel keyboard/pause controls.

No new features. Each task is a surgical fix to existing components.

## Scope

In scope:
- Font sizes: raise all values below `0.75rem` in Services, Pricing, Proof, Testimonials, Hero
- Color contrast: increase `rgba(255,255,255,X)` opacity to WCAG AA minimums on text
- Touch targets: hamburger (36px→44px), nav CTA (~24px→40px+)
- Hero horizontal scroll root cause: `::before` pseudo-element fixed at 800×800px
- Hero broken CSS: unclosed `}` braces
- Pricing grid: fluid columns to fix 860px tablet overflow
- ServicesCarousel: prefers-reduced-motion, keyboard pause button (WCAG 2.2.2), aria-hidden on decorative dots

Out of scope:
- Testimonial dots — already 44×44px via padding (confirmed)
- Proof.tsx images — already responsive with aspect-ratio container (confirmed)
- ServicesCarousel arrow-key item navigation — carousel is decorative/infinite, pause button satisfies 2.2.2
- Redesigning any component

## Quick commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build + type check
npm run lint       # ESLint
```

## Acceptance

- [ ] No font size below `0.75rem` anywhere on the homepage (grep verified)
- [ ] All text `rgba` opacity ≥ 0.50 on dark backgrounds
- [ ] Hamburger hit area ≥ 44×44px
- [ ] Nav CTA hit area ≥ 40px height
- [ ] Hero does not cause horizontal scroll at 375px viewport
- [ ] Pricing has no horizontal overflow at 860px viewport
- [ ] ServicesCarousel has keyboard-focusable pause button with `aria-pressed`
- [ ] ServicesCarousel is static when `prefers-reduced-motion: reduce`
- [ ] `npm run build` passes with zero new errors

## File ownership

| Task | Files | Parallel? |
|------|-------|-----------|
| fn-2-gfq.1 | Services.tsx, Pricing.tsx, Proof.tsx | Yes (with T2, T3) |
| fn-2-gfq.2 | Testimonials.tsx | Yes (with T1, T3) |
| fn-2-gfq.3 | `app/_home/page.css`, Hero.tsx, Footer.tsx | Yes (with T1, T2) |
| fn-2-gfq.4 | Pricing.tsx, ServicesCarousel.tsx | After T1 (Pricing overlap) |

## References

- WCAG 2.1 AA: https://www.w3.org/TR/WCAG21/
- SC 2.1.1 Keyboard, SC 2.2.2 Pause/Stop/Hide, SC 1.4.3 Contrast, SC 2.5.8 Touch Target
- Contrast on #0C1117: opacity 0.50 = ~5.32:1 (safe AA), 0.45 = ~4.5:1 (threshold)
- Touch target AA = 24×24px (SC 2.5.8 WCAG 2.2); 44×44px = AAA + Apple HIG target
