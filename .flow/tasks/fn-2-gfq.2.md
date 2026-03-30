# fn-2-gfq.2 Testimonials a11y: fonts, contrast, touch targets

## Description
Fix font sizes and color contrast in Testimonials.tsx. Touch targets are already correct (dots use `padding: 16px` = 44×44px total hit area) — do NOT change dot sizing.

**Size:** M  
**Files:** `app/_home/components/Testimonials.tsx`

## Font size violations
- Line ~480: `.v9-testimonial-avatar` at `0.78rem` → `0.8rem` (minor bump, keep it subtle)
- Line ~504: `.v9-testimonial-role` at `0.78rem` → `0.8rem`
- Line ~512: `.v9-testimonial-project` at `0.72rem` → `0.75rem`
- Line ~525: `.v9-testimonial-verify` at `0.72rem` → `0.75rem`

## Contrast violations
- Scan all `rgba(255,255,255,X)` where X < 0.50 on text elements
- Raise to minimum 0.50 (= ~5.32:1 on #0C1117, safe AA margin)
- Exception: purely decorative separators/borders can remain low opacity

## Touch targets — NO CHANGE NEEDED
- `.v9-testimonial-dot` visual size is 12px but already has `padding: 16px` → effective hit area 44×44px
- Verified by repo-scout. Do not modify dot sizing.

## Approach
- Read the full `<style>` block in Testimonials.tsx
- For each `font-size` value, check and raise if below threshold
- For each `rgba` color on text (not borders/separators), check opacity ≥ 0.50
- Do not change visual hierarchy, colors, or layout
## Approach

### Font size (line ~525)
- Find the role/company meta text style, raise to `0.75rem`

### Contrast (check all rgba values)
- Any `rgba(255,255,255,X)` where X < 0.5 → raise to 0.55
- Exception: purely decorative elements (borders, separators) can stay low

### Touch targets (line ~549)
- Dot buttons are `12px × 12px` visually
- Do NOT change the visual dot size
- Options (pick one): add `padding: 16px` to each button (most reliable), or use `::after { content: ''; position: absolute; inset: -16px; }` with `position: relative` on the button
- Ensure dots remain visually unchanged — hit area only expands invisibly
- Verify aria-label is present on each dot button (already exists per audit)
## Acceptance
- [ ] All font-size values in Testimonials.tsx ≥ `0.75rem`
- [ ] No text `rgba` opacity below 0.50 in Testimonials.tsx
- [ ] Testimonial dot visual appearance unchanged
- [ ] `npm run build` passes
## Done summary
- Task completed
## Evidence
- Commits:
- Tests:
- PRs: