# fn-8-acc.11 Repo cleanup: root PNGs, prototype HTML, deduplicate blog CSS

## Description
Three cleanup items: (1) 171 PNG screenshots (~61 MB) in the repo root — design review artifacts that should not be tracked. (2) 12 HTML prototype files in `/public` (hero-demo-*.html, contact-demo-*.html, etc.) are publicly accessible on the deployed site, exposing design experiments to crawlers and users. (3) `page.css` is duplicated ~6 times across blog routes (each ~290 identical lines).

**Size:** M
**Files:**
- `.gitignore` (add PNG pattern + public demo files)
- `public/` (remove 12 prototype HTML files)
- `app/blog/blog-shared.css` (new — single shared CSS)
- `app/blog/*/page.tsx` (update 5 import paths)

**Approach:**
- Add `*.png` to `.gitignore` root level, OR add a more targeted pattern like `/[a-z]*.png` to catch root-level design screenshots without affecting `public/images/*.png`. Add `/public/hero-demo-*.html`, `/public/*-demo-*.html` to `.gitignore`.
- Delete the 12 prototype HTML files from `/public` (`hero-demo-1.html`, `hero-demo-2.html`, `hero-demo-3.html`, `contact-demo-1.html`, `contact-demo-2.html`, `contact-demo-3.html`, `bio-balance-demo.html`, `bio-contact-demo.html`, `pricing-prototypes.html`, `pricing-v2.html`, `proof-demo.html`, `video-test.html`)
- Blog CSS deduplication: create `app/blog/blog-shared.css`, move the shared 290 lines there, replace the 5 `page.css` files with `@import '../blog-shared.css'` (or just update the import in each `page.tsx`)
- Note on root PNGs: The 61 MB is already in git history. This task ONLY adds `.gitignore` (prevents future commits) and removes the files from working tree. Git history cleanup (filter-branch/BFG) is a separate decision — flag in PR as open question.
## Acceptance
- [ ] `npm run build` succeeds
- [ ] 12 prototype HTML files are absent from `dist/` output
- [ ] `dist/hero-demo-1.html` does not exist (verify with `ls dist/*.html`)
- [ ] `.gitignore` prevents root-level PNG files from being staged
- [ ] Blog pages render correctly (CSS not broken by deduplication)
- [ ] `git status` shows no staged PNG files after `git add .`
- [ ] `app/blog/blog-shared.css` exists; individual blog `page.css` files are removed or reduced to `@import` only
- [ ] Root PNG files are removed from working tree (not just gitignored — untrack and delete)
## Done summary
Removed 12 prototype HTML files from public/, untracked and deleted 171 root-level design screenshot PNGs with /*.png gitignore pattern, and deduplicated 6 identical 290-line blog page.css files into a single app/blog/blog-shared.css with updated imports in all blog page.tsx files.
## Evidence
- Commits: eab32e21686a3b9337c395fd5fe60ca80ed36d01
- Tests: npm run build (54 static pages generated successfully), npm test (4 tests passed: example.test.ts + a11y.test.tsx)
- PRs: