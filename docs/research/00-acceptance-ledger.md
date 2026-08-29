# Nice Right Research & Design Acceptance Ledger

## Scope

This ledger governs the redesign research. It records whether each step produced
useful, decision-grade work—not merely whether a document or image was produced.

Current scope: **Step 1 — decision register**, **Step 2 — current-source audit**, and **Step 3 — historical portfolio timeline**.

## Governing rule

A step is useful only when it:

1. has one specific goal;
2. names the uncertainty it should reduce;
3. produces auditable evidence;
4. attempts to falsify its own conclusion;
5. has explicit pass/fail criteria; and
6. unlocks a concrete next decision.

A polished artifact, a long report, model agreement, or owner preference is not
itself evidence that useful work was done.

## Evidence labels

- **FACT** — directly observed or directly supplied, with a source.
- **PUBLISHED CLAIM** — something Nice Right says; not independently verified.
- **EXTERNAL OBSERVATION** — observed in a market/buyer source; not necessarily generalizable.
- **HYPOTHESIS** — plausible interpretation requiring evidence.
- **EXPERIMENT** — a test intended to produce new evidence.
- **UNKNOWN** — not established; must not be silently filled with plausible language.

## Acceptance ledger

| ID | Step | Specific goal | Evidence required | Verification/check | Pass criteria | Status | Decision unlocked |
|---|---|---|---|---|---|---|---|
| A1 | Decision register | Make every consequential redesign decision visible before research | `01-decision-register.md` with decision, current assumption, evidence needed, falsification test, and gate | Check that buyer, trigger, offer, proof, CTA, architecture, visual direction, and measurement are all represented | No hidden decision is being made by the research process; each open decision has a named evidence requirement | **PASS** | Research has a defined job rather than a vague “learn about buyers” brief |
| A2 | Current live capture | Establish what the public site actually contains now | Desktop/mobile live captures and DOM inventory | `tmp/research/current-live-audit.json`; HTTP status; headings, sections, links, images, forms, dimensions | Both viewports return HTTP 200; inventory is reproducible and source content can be located | **PASS** | We can distinguish current implementation from old documents and memory |
| A3 | Current source inventory | Separate Nice Right’s current statements/assets from interpretation | Exact source paths, URLs, quotes, claims, assets, and implementation notes | Compare live DOM to `app/_home/page.tsx` and component source; tag claims as published claims rather than facts | Every major public promise, proof item, offer, CTA, and audience statement has provenance or is listed as unresolved | **PASS** | Independent research can use the site as context without treating it as buyer truth |
| A4 | Contradiction/gap audit | Prevent stale strategy and design documents from becoming invisible constraints | List of conflicts, stale versions, unsupported claims, missing proof, and unrendered content | Compare current live output with `docs/offer-*`, `docs/v2-*`, `docs/brand-guidelines.md`, and `docs/DESIGN.md` | Conflicts are explicitly recorded; none are silently resolved in favor of the newest or longest document | **PASS WITH CAVEATS** | We know which prior material may be used only as hypothesis/history |
| A5 | Market/buyer research | Establish target-buyer situations, triggers, language, alternatives, and objections | Source-linked buyer evidence, direct or public, with supporting and disconfirming material | Require source proximity, recency, and confidence; test rival explanations | **OPEN — next phase**; no “validated” buyer conclusion without buyer-proximate evidence | **NOT STARTED** | Segment and experience hypotheses |
| A6 | Sales/offer research | Establish what is bought, why now, perceived risk, and qualification | Sales/delivery artifacts, buyer conversations, or real commitment tests | Map claim → proof → objection → response → action | **OPEN — next phase**; no offer direction treated as proven from framework output | **NOT STARTED** | Offer and message hypotheses |
| A7 | UX research | Establish how relevant visitors move from arrival to qualified action | Traffic/source map, task walkthroughs, comprehension tests, booking-flow evidence | Test uncoached understanding and action, not only heuristic quality | **OPEN — after buyer/offer hypotheses** | **NOT STARTED** | Page architecture and interaction hypotheses |
| A8 | Visual exploration | Find distinctive visual expressions for validated experience hypotheses | Image boards, visual grammar, page-rhythm strips, direct review artifacts | Blind comparison; check distinctiveness, audience fit, authenticity, and hypothesis fit | **OPEN — after A5/A6/A7 gates**; images cannot claim to validate UX or conversion | **NOT STARTED** | Visual direction shortlist |
| A9 | Prototype validation | Determine whether the selected direction works with real content and behavior | Responsive prototype, real copy, proof provenance, interaction, accessibility/performance checks | Task-based review with relevant buyers plus technical checks | **OPEN — after A8**; owner approval alone cannot pass | **NOT STARTED** | Production direction |
| A10 | Historical portfolio timeline | Reconstruct project-specific presence, measurement, content, and growth phases without confusing analytics setup with Nice Right authorship | GA4 monthly history, GA4 Admin timestamps, GSC sitemap/performance records, archive availability, and explicit retention/API limits | Compare independent anchors; test the rival explanation that a metric jump is only tracking or seasonality; require project records for attribution | **PASS WITH LIMITATIONS**; phase patterns are usable, authorship/causality remains gated | **PASS WITH LIMITATIONS** | Evidence-qualified portfolio copy and case-study selection |

## Step 1 result

**PASS, scope-limited.** The decision register exists and exposes the decisions that
research must answer. It does not resolve those decisions.

## Step 2 result

**PASS, scope-limited, with caveats.** The current live page and source inventory are
reproducible. This is not a market-validation pass. It establishes what Nice Right
currently says and shows, not whether buyers believe, need, or act on it.

## Step 3 result

**PASS WITH LIMITATIONS.** The historical timeline reconstructs distinct phase patterns for Master Scoopers, Taqueria La Paz, Decatique Studios, Nice Right, UXOXO, Dummy Reader, and A Bober Masonry across both vaulted Google identities, and deliberately keeps measurement dates, public-presence dates, correlated growth, duplicate properties, and Nice Right attribution separate. The second pass adds page-level GA4/GSC evidence, six Wayback screenshots plus current Brave captures, eight base claim cards, and a lift-metrics extension that distinguishes descriptive movement from causal uplift. GA3 history remains unavailable through the current API; final authorship requires project records and client permission.

Artifacts:

- `docs/research/portfolio-timeline-audit.md`
- `docs/research/portfolio-timeline-evidence.json`
- `docs/research/portfolio-timeline-audit.html`
- `docs/research/portfolio-timeline-audit.pdf`
- `docs/research/portfolio-second-pass-report.md`
- `docs/research/portfolio-second-pass-evidence.json`
- `docs/research/portfolio-second-pass.html`
- `docs/research/portfolio-second-pass.pdf`
- `docs/research/second-pass-screenshots/`
- `docs/research/portfolio-second-pass-lift.json`

## Evidence from this run

- Live URL: `https://niceright.co/`
- Capture data: `tmp/research/current-live-audit.json`
- Captures: `tmp/research/current-live-desktop.png`, `tmp/research/current-live-mobile.png`
- Source composition: `app/_home/page.tsx` and `app/_home/components/*.tsx`
- Current live version text: `v9.1.1`
- No production source files were changed by Steps 1–2; research artifacts are under `docs/research/`.

## Failure policy

If a later step fails its criteria, do not continue to visual generation to create the
appearance of progress. Record the failure, revise the hypothesis or research method,
and rerun only the failed step.
