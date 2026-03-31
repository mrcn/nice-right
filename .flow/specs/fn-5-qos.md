# fn-5-qos Fix Services.tsx missing onEnterBack — green highlight lost on reverse scroll

## Overview
The desktop ScrollTrigger in `Services.tsx` is missing an `onEnterBack` callback. When the user scrolls forward past the pin zone end, `onLeave` removes `v9-services--highlight` from the section. If they then scroll back up into the pin zone from below, no callback restores `v9-services--highlight`, so the green left-border active indicator and opacity dimming never reappear.

## Scope
Single file: `app/_home/components/Services.tsx`. No CSS changes, no other files affected. `v9-services--highlight` is not referenced anywhere outside this component.

## Approach
Add `onEnterBack` to the desktop `ScrollTrigger.create` (after `onLeave`, before `onLeaveBack`, around line 144). Two lines:

```
onEnterBack: () => {
  section.classList.add('v9-services--highlight');
  prevActive = -1;
},
```

**Why only these two lines?** `onEnterBack` must restore `v9-services--highlight` — `onUpdate` cannot do this because it only manages column classes, not the section-level class. Setting `prevActive = -1` forces the `if (active !== prevActive)` guard in `onUpdate` to pass, so `onUpdate` activates the correct column from `self.progress` and calls `animateBullets` on its first tick.

**Why NOT activate a column or call `animateBullets` in `onEnterBack`?** If `onEnterBack` calls `animateBullets(cols[last])` and `onUpdate` fires in the same tick with a different progress-derived index, two stagger animations start on different columns simultaneously. `killTweensOf` inside `animateBullets` only kills the new column's in-flight tweens, not the already-started previous ones. Two overlapping animations flicker. Omitting `animateBullets` from `onEnterBack` avoids this entirely — `onUpdate` drives the animation correctly.

## Quick commands
- `npx tsc --noEmit`
- `npm test`
- `npm run build`

## Acceptance
- [ ] Scroll down through Services pin zone — green line advances col 01→04 as before
- [ ] Scroll past pin zone end — all highlights removed (onLeave, unchanged)
- [ ] Scroll back UP into pin zone from below — green line reappears immediately on col 04
- [ ] Continue scrolling up through pin zone — green line retreats col 04→01 correctly
- [ ] Scroll back above section start — all highlights removed (onLeaveBack, unchanged)
- [ ] TypeScript: no errors (`npx tsc --noEmit`)

## References
- GSAP ScrollTrigger source: `node_modules/gsap/src/ScrollTrigger.js` lines 1144, 1162 — `onUpdate` fires before positional callbacks
- `v9-services--highlight` CSS cascade: `Services.tsx` lines 410-437
- `animateBullets` function: `Services.tsx` lines 119-126
- `prevActive` state variable: `Services.tsx` line 117
