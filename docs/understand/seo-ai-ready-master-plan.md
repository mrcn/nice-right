# Understand own-domain SEO + AI-readiness master plan

Date: 2026-06-23
Board: `understand-website-seo`
Status: active operating plan

## Executive summary

Understand should move toward its own product domain. The current Nice Right `/labs/understand` implementation is a staging surface for a domain-ready site.

Positioning:

> **Understand is an on-ramp to difficult text.**

Category:

> **AI listening app for difficult text**

The site should not over-index on example audio. Example/audio pages are proof assets inside a broader website system: product home, How It Works, Testing, examples, use cases, guides, comparison pages, structured data, analytics, Search Console, sitemap, robots, and `llms.txt`.

## Research-grounded principles

- Google Search Central emphasizes helpful, reliable, people-first content. Understand pages should be useful artifacts, not thin keyword pages.
- Structured data should describe visible page content only. Use JSON-LD carefully and validate it.
- `robots.txt` controls crawling, not indexing. Use canonicals/noindex decisions deliberately.
- AI-search readiness depends on clear definitions, consistent terminology, answer-ready headings, tables, FAQs, source attribution, structured data, and `llms.txt` as an orientation layer.

## Final own-domain sitemap

```text
/
/how-it-works
/testing
/examples
/examples/aesop-fables-retold-audio
/examples/shakespeare-plain-english-audio
/examples/plato-apology-plain-english-audio
/examples/genesis-kjv-plain-english-audio
/examples/frankenstein-chapter-1-retold-audio
/use-cases
/use-cases/classics
/use-cases/students
/use-cases/research
/use-cases/legalese
/use-cases/reading-fatigue
/use-cases/commuting
/guides
/guides/text-to-speech-is-not-enough-for-hard-text
/guides/retelling-vs-summarizing-vs-translating
/guides/how-to-listen-to-shakespeare-in-plain-english
/guides/why-comparison-matters-for-ai-retellings
/guides/how-to-make-dense-pdfs-easier-to-listen-to
/compare
/compare/speechify-alternative-for-difficult-text
/compare/naturalreader-alternative-for-hard-books
/compare/elevenreader-alternative-for-retold-listening
/privacy
/terms
/support
/llms.txt
/robots.txt
/sitemap.xml
```

## Pillars and clusters

| Pillar | Purpose | Initial pages | Target keywords |
|---|---|---|---|
| AI listening app for difficult text | Category creation | `/`, `/how-it-works`, `/guides/text-to-speech-is-not-enough-for-hard-text` | AI listening app for difficult text; AI reader for hard text; app to understand difficult text |
| Classic and old text made listenable | Recognizable proof + SEO | `/use-cases/classics`, Shakespeare, Frankenstein | Shakespeare plain English audio; classic literature plain English audio |
| Dense academic/research text | Student/researcher utility | `/use-cases/students`, `/use-cases/research` | listen to academic papers; AI reader for research papers |
| Practical dense documents/legalese | Everyday high-friction text | `/use-cases/legalese` | legalese to plain English audio; understand terms of service |
| Reading fatigue/mobile continuation | Phone-native habit | `/use-cases/reading-fatigue`, `/use-cases/commuting` | app for reading fatigue; listen instead of read |
| Public-domain proof library | Useful proof artifacts | `/examples`, Aesop, Shakespeare, Plato | Aesop fables plain English audio; Plato Apology plain English audio |

## First-pass keyword priorities

| Priority | Query / target | Page type |
|---|---|---|
| P0 | AI listening app for difficult text | Home / How It Works |
| P0 | text to speech is not enough for hard text | Guide |
| P0 | Aesop fables plain English audio | Example, live |
| P0 | Shakespeare plain English audio | Example + guide |
| P1 | listen to academic papers | Use case |
| P1 | AI reader for research papers | Use case |
| P1 | legalese to plain English audio | Use case |
| P1 | Plato Apology plain English audio | Example |
| P2 | Speechify alternative for difficult text | Comparison |
| P2 | NaturalReader alternative for hard books | Comparison |

## AI-ready requirements

Every major page should include:

- one-sentence definition near the top
- clear H1/H2 hierarchy
- concise answer block
- comparison tables where relevant
- step-by-step workflow lists
- visible FAQ
- consistent terminology
- internal links to canonical pages

Structured data plan:

| Page type | Schema |
|---|---|
| Home/product | WebSite, Organization, SoftwareApplication if app facts visible |
| How It Works | WebPage, FAQPage, BreadcrumbList |
| Testing | SoftwareApplication, FAQPage, BreadcrumbList |
| Example with audio | WebPage, AudioObject, FAQPage, BreadcrumbList |
| Guide | Article, FAQPage, BreadcrumbList |
| Use case | WebPage, FAQPage, BreadcrumbList |
| Compare | WebPage, FAQPage, BreadcrumbList |

`llms.txt` should define Understand, preferred terminology, canonical pages, trust boundary, and conversion link.

## P0 remaining work

1. Choose exact domain or temporary subdomain.
2. Deploy and review How It Works.
3. Deploy and review Testing.
4. Add structured data foundations.
5. Add analytics event map.
6. Add canonical/domain migration checklist.
7. Wire SEO API/SERP data if credentials are available.
8. Build first use-case templates.
9. Build first guide templates.
10. Then expand proof pages beyond Aesop.

## Kanban mapping

| Plan area | Kanban cards |
|---|---|
| Own-domain architecture | `t_c7a2ac85`, `t_6bd59a89` |
| Roadmap rebalance | `t_41562a85` |
| How It Works | `t_57646aa0`, `t_bc360418` |
| Testing | `t_f7dacfbc`, `t_0caaf51a` |
| SEO data/backlog | `t_2901e49c`, `t_166948d9` |
| Technical SEO/schema | `t_2d507be8`, `t_a194158c` |
| Analytics | `t_7110d994` |
| Templates | `t_360f290b` |
| Example expansion | `t_5221e308`, `t_e3a97441`, `t_d3f8c75c` |
| QA | `t_3187d08f` |
