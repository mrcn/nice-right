# Content Plan

*Single source of truth for all content — articles, ideas, pairings, status.*

---

## Content Architecture Principle

Every **argument/thesis** article identifies a frame shift. Every frame shift has a practical implication. That implication becomes a **utilitarian** companion article. They cross-reference each other.

Exploratory articles support the argument articles with methodology and source scrutiny. Narrative articles make abstract patterns concrete.

```
Argument article (the frame shift)
    └── Utilitarian companion (the how-to that follows from the frame shift)

Exploratory article (source scrutiny / meta-analysis)
    └── Supports all articles in the cluster

Narrative article (the specific story)
    └── Makes one pattern from the cluster concrete
```

---

## Published Articles

### AI Coding + UAT Cluster

| Title | Type | File | Status | Paired With |
|---|---|---|---|---|
| AI Coding Teams and UAT: A Practitioner's Guide | Utilitarian (pillar) | `articles/ai-coding-uat-practitioners-guide.md` | Complete + red-teamed | — |
| Playwright MCP: Setup, Token Economics, When to Use It | Utilitarian | `articles/playwright-mcp-guide.md` | Complete + red-teamed | — |
| Building a Multi-Agent QA Pipeline: The OpenObserve Model | Utilitarian | `articles/multi-agent-qa-pipeline.md` | Complete + red-teamed | — |
| Visual Regression Testing for AI-Generated Frontends | Utilitarian | `articles/visual-regression-ai-frontends.md` | Complete + red-teamed | — |
| CI/CD Pipeline Design When AI Writes the Code | Utilitarian | `articles/cicd-pipeline-ai-coding.md` | Complete + red-teamed | — |
| What AI Testing Misses | Utilitarian | `articles/what-ai-testing-misses.md` | Complete + red-teamed | — |
| The Real Economics of AI-Assisted Testing | Utilitarian | `articles/ai-testing-economics.md` | Complete + red-teamed | — |
| Why You Shouldn't Trust Most AI Testing Statistics | Exploratory | `articles/ai-testing-data-provenance.md` | Complete | Supports full cluster |

### AI Strategy + SMB Cluster

| Title | Type | File | Status | Paired With |
|---|---|---|---|---|
| The Practice Is the Moat | Argument/Thesis | `articles/practice-is-the-moat.md` | Draft (needs revision) | → How to Build Your First AI Practice (planned) |

---

## In Progress

### Revisions Needed

- `articles/practice-is-the-moat.md` — needs: Wardley map section, competitor diagnostic, defensibility paragraph, practice-transfers-to-tools development, industry velocity, success signals

### Planned: Utilitarian Companion to "The Practice Is the Moat"

**Title (working):** "How to Build Your First AI Practice: A 90-Day Framework for Small Businesses"

**Answers:**
- Who in your organization actually builds this
- What it looks like on day 1 vs. day 30 vs. day 90
- Time commitment per week (realistic estimate)
- Real cost beyond the subscription
- Can I hire this, or does it have to grow internally?
- How to pick the first problem
- What success signals look like at 30 days

**Type:** Utilitarian
**Audience:** SMB owner who read the argument article and is ready to act
**Status:** Planned, not started

---

## Ideas Queue

### Narrative candidates
*(Raw material from existing research — needs a practitioner at the center)*

- **"How OpenObserve reduced flaky tests from 35 to 4"** — the specific journey, told as a story. Center on the Sentinel agent decision (controversial internally, blocked other engineers). What happened, what they learned, what they'd do differently.
- **"The DoltHub constraint"** — the decision to strip all git autonomy from Claude. One team, one constraint, why they made it, what it prevented, what it cost.
- **"The done-ish problem"** — Nathan Onn's WooCommerce handler that was never wired to the pricing page. Full story: what Claude produced, why the tests passed, when they discovered it, how they fixed the process.

### Argument/Thesis candidates

- **"The Merge Gate Is Not a Trust Problem"** — most teams treat human code review as a trust issue ("do we trust the AI?"). It's actually an architecture problem. The architectural argument for why humans control merge regardless of model quality. Pairs with: CI/CD pipeline utilitarian article (already written).
- **"Why Your AI Vendor's Benchmark Numbers Are Meaningless"** — the SWE-bench contamination story, written for a non-technical decision-maker audience. What benchmarks actually measure, which ones to look at instead, how to evaluate AI tool claims without a CS degree. (Exploratory framing but argument-forward.)
- **"The Test Is Not the Product"** — AI generates tests that pass, code that works by test definition, and features nobody asked for. The argument that test coverage is a lagging indicator of software quality and what the leading indicators are.

### Exploratory candidates

- **"What 900 Engineering Teams Actually Told Harness"** — deep dive into the Harness 2025 survey data, the conflict of interest, what can and can't be concluded from it, what independent sources say about the same questions. Methodological honesty as the subject.
- **"The SWE-bench Contamination Problem, Explained"** — full treatment for a technical audience, not just a caveat. The York University research, the Waterloo memory test, SWE-bench Pro as the alternative. What this means for every AI coding tool comparison you've read.

### Utilitarian candidates

- **"Setting Up a Merge Gate That Actually Stops AI-Generated Bugs"** — the six steps from the CI/CD article, expanded into a full implementation guide with specific tool configs.
- **"The Screenshot Feedback Loop: Step-by-Step Setup"** — concrete implementation of the "give Claude eyes" pattern. Shell scripts, Playwright config, how to integrate into your dev workflow.
- **"Choosing Between Claude Code, Cursor, and OpenCode: A Decision Framework"** — the decision tree with clear if/then logic, not a feature comparison table.

---

## Reference Docs

| Doc | Purpose | File |
|---|---|---|
| Brand Voice | Tone, audience, source standards, failure modes | `docs/brand-voice.md` |
| Article Types | Four types, when to use, failure modes per type | `docs/article-types.md` |
| Practice Moat Research Brief | Research foundation for SMB AI argument article | `docs/practice-moat-research-brief.md` |

---

## Cluster Map

```
SMB AI Strategy Cluster
├── The Practice Is the Moat [Argument] ←→ How to Build Your First AI Practice [Utilitarian, planned]
└── Why You Can't Trust AI Benchmarks [Argument, planned, non-technical version]

AI Coding + UAT Cluster
├── AI Coding Teams and UAT: Practitioner's Guide [Utilitarian, pillar]
├── Playwright MCP Guide [Utilitarian]
├── Multi-Agent QA Pipeline [Utilitarian]
├── Visual Regression Testing [Utilitarian]
├── CI/CD Pipeline Design [Utilitarian]
├── What AI Testing Misses [Utilitarian]
├── AI Testing Economics [Utilitarian]
└── Why You Shouldn't Trust AI Testing Statistics [Exploratory] ← supports all above

Narrative pieces (planned, cross-cluster)
├── The OpenObserve Journey [Narrative]
├── The DoltHub Constraint [Narrative]
└── The Done-Ish Problem [Narrative]
```
