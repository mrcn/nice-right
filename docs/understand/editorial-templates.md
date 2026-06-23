# Understand editorial templates

These templates turn the master SEO/AI-readiness plan into repeatable page production rules. Use them before creating use-case, guide, comparison, or example pages.

## Shared page requirements

Every indexable Understand page should include:

- Clear H1 that describes the job of the page.
- One-sentence answer/definition near the top.
- Internal links to Home, How It Works, Examples, and Testing where relevant.
- Direct Play testing CTA when appropriate.
- Visible trust boundary for retellings.
- Structured data that matches visible content only.
- FAQ if the page answers conceptual/search questions.

Preferred terminology:

- Original
- Understand version
- Retelling style
- Closeness
- Compare with original
- Voice performance
- Continue listening

Avoid opaque/internal phrasing as public labels:

- Fidelity-first
- Persona-first
- Medium-first
- Compare/Trust without explanation
- Prototype, unless referring to the lab/study pages

## Template: Use-case page

URL pattern:

```text
/use-cases/[job]
```

Example staging path:

```text
/labs/understand/use-cases/classics
```

Required sections:

1. Hero
   - H1: `Listen to [job/text type] without giving up`
   - Definition: `Understand is an AI listening app that retells difficult [text type] so it is easier to keep listening on your phone.`
2. Why this text is hard
3. How Understand helps
   - Bring text
   - Retell
   - Compare
   - Listen
   - Continue
4. Example card linking to relevant proof page
5. What it is not
6. FAQ
7. Testing CTA

Schema:

- WebPage
- FAQPage when FAQ visible
- BreadcrumbList

## Template: Guide page

URL pattern:

```text
/guides/[topic]
```

Required sections:

1. Short answer
2. Problem explanation
3. Difference table
4. Step-by-step workflow
5. Examples / proof links
6. Caveats/trust boundary
7. FAQ
8. CTA to testing or examples

Schema:

- Article
- FAQPage if visible
- BreadcrumbList

## Template: Example page

URL pattern:

```text
/examples/[source-or-text-type]-retold-audio
```

Required sections:

1. H1: `Listen to [source] in clearer language`
2. Source metadata
   - title
   - author/translator
   - source URL
   - rights note
3. Why this text is a good proof
4. Audio player, if ready
5. Original → Understand comparison
6. What changed
7. What stayed close
8. Trust boundary
9. FAQ
10. Testing CTA

Schema:

- WebPage
- AudioObject if audio visible
- FAQPage if FAQ visible
- BreadcrumbList
- CreativeWork/Book only if visible metadata supports it

## Template: Comparison page

URL pattern:

```text
/compare/[competitor-or-category]
```

Do not publish comparison pages until the core domain pages, use cases, and proof pages are stronger.

Required sections:

1. Short answer
2. Who each product/category is for
3. Difference table
4. Where generic TTS wins
5. Where Understand is different
6. Trust/caveats
7. CTA

Rules:

- Be fair.
- Do not overclaim.
- Do not imply competitor capabilities without source checking.
- Focus on category distinction: read-aloud vs retell-for-listening.

## First pages to create from templates

1. `/use-cases/classics`
2. `/use-cases/research`
3. `/guides/text-to-speech-is-not-enough-for-hard-text`
4. `/guides/retelling-vs-summarizing-vs-translating`
5. `/examples/shakespeare-plain-english-audio`
