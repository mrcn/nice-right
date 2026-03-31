# fn-5-qos.1 Add onEnterBack to Services.tsx desktop ScrollTrigger

## Description
Add `onEnterBack` callback to the desktop `ScrollTrigger.create` in `Services.tsx`. This is the only change needed.

**Size:** S (single file, single insertion)
**Files:** `app/_home/components/Services.tsx` only
**Blast zone:** Only `app/_home/page.tsx` imports Services. No shared CSS. No other files reference `v9-services--highlight`.

### Approach

Insert the following callback after the `onLeave` block (after line 143, before `onLeaveBack` at line 145):

```
onEnterBack: () => {
  section.classList.add('v9-services--highlight');
  prevActive = -1;
},
```

That's the entire change. Do NOT activate a column or call `animateBullets` in `onEnterBack` — let `onUpdate` handle it.

### Key context

- `onLeave` (line 140) removes `v9-services--highlight` and sets `prevActive = -1`. Without `onEnterBack`, this class is never restored on reverse scroll.
- `onEnterBack` only needs to restore `v9-services--highlight`. `onUpdate` fires on the same tick (either before or after — order is immaterial), computes the correct active column from `self.progress`, and handles `classList.toggle` + `animateBullets`.
- Resetting `prevActive = -1` in `onEnterBack` guarantees `onUpdate`'s `if (active !== prevActive)` guard passes and it re-activates the correct column and re-animates bullets on the first `onUpdate` tick.
- **Do NOT call `animateBullets` in `onEnterBack`**: if `onEnterBack` calls `animateBullets(cols[last])` and `onUpdate` fires with a different progress-derived index, two simultaneous stagger animations start on different columns. `killTweensOf` inside `animateBullets` only kills the new column's tweens, not the already-started col 3 tweens. Omitting `animateBullets` from `onEnterBack` avoids this entirely.
- `clearProps: 'opacity,transform'` at lines 90-102 runs only once (entrance stagger, `once: true`) — no conflict.

## Acceptance

- [ ] Scroll down through Services pin zone — green line on col 01, advances through cols 02→04
- [ ] Scroll past pin zone end — all highlights removed (`onLeave`)
- [ ] Scroll back UP into pin zone from below — green line reappears immediately on col 04
- [ ] Continue scrolling up — green line retreats col 04→01 correctly
- [ ] Scroll back above section start — all highlights removed (`onLeaveBack`)
- [ ] TypeScript: no errors (`npx tsc --noEmit`)

## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: