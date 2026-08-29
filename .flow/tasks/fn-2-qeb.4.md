# fn-2-qeb.4 CSS cleanup and old system removal
## Description
Remove orphaned work CSS files and run the final work-page smoke test.

## Goal
Delete orphaned old CSS files and verify no references remain. Final smoke test.

## Pre-work: Verify import paths
Run these before deleting anything:
```bash
grep -rn "import.*page.css" app/work/
```
Expected:
- `app/work/page.tsx`: imports `'../page.css'` → resolves to `app/page.css` (NOT `app/work/page.css`)
- `app/work/northern-trust/page.tsx`: imports `'../page.css'` → resolves to `app/work/page.css`  
- `app/work/healthcare-real-estate/page.tsx`: same as above
- `app/work/green-goods/page.tsx`: same as above

After tasks 2+3 remove all these imports, this grep should return empty.

## Files to delete
- `app/work/page.css` — 306 lines, only used by the 3 case study pages (removed in task 3)
- Do NOT delete `app/page.css` — may be used by other routes

## Steps
1. Confirm `grep -rn "import.*app/work/page.css" app/` is empty
2. Confirm `grep -rn "import.*page.css" app/work/` is empty
3. Delete `app/work/page.css`
4. Run `npm run build` — must succeed
5. Check no old class names in work pages: `grep -r "className=\"nav\"\|className=\"container\"\|className=\"case-study\"" app/work/`

## Acceptance
- [ ] `app/work/page.css` does not exist
- [ ] `npm run build` exits 0
- [ ] No old class names (`nav`, `container`, `btn`, `work-header`, `case-study`) in `app/work/**/*.tsx`
- [ ] `app/page.css` untouched

## Done summary
Merged the old work CSS cleanup in PR #8; the remaining FAQ section-label styling was recovered in PR #30.
## Evidence
- Commits: 2620730b94c36625438a57e38ecf7e96512429a0, 5d33235e2a1791fb060b2b95be77441d5d4055dd
- Tests: npm test, npm run build
- PRs: #8, #30
