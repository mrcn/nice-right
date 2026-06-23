# Understand SEO data pull note

Date: 2026-06-23
Kanban card: `t_2901e49c`

## Status

A true SEO API pull is not yet wired because no SEO API credentials are visible in the current shell environment.

Checked for likely environment variables:

```text
SEO
SERP
AHREFS
SEMRUSH
DATAFORSEO
GOOGLE
GSC
SEARCH
```

No usable SEO API credential was present.

## Current fallback used

Until credentials are available, planning used:

- web search result inspection
- competitor/adjacent site extraction
- Google Search Central guidance
- product-positioning fit
- keyword intent clustering

This produced:

```text
docs/understand/first-20-seo-backlog.md
docs/understand/competitor-pattern-audit.md
docs/understand/seo-ai-ready-master-plan.md
```

## Preferred API path

When credentials are available, use one of:

1. DataForSEO keyword ideas + SERP API.
2. Ahrefs/Semrush export/API if configured.
3. Google Search Console after own-domain property receives impressions.

## Data to pull

For each seed:

- volume
- keyword difficulty / competition proxy
- SERP titles/URLs
- intent class
- People Also Ask / related queries if available
- top competitor page type
- content gap

Seeds:

```text
AI reader for hard text
AI listening app for difficult text
text to speech for hard text
Shakespeare plain English audio
classic literature plain English audio
listen to academic papers
AI reader for research papers
legalese to plain English audio
retelling vs summarizing
Speechify alternative for difficult text
```

## Script placeholder

Create `scripts/understand_seo/pull_keywords.py` once the API provider and credentials are known.

The script should output:

```text
data/understand_seo/keyword_ideas.csv
data/understand_seo/serp_snapshots/*.json
docs/understand/keyword-opportunity-report.md
```
