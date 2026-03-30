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
