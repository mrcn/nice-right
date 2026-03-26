# Article Types — Reference Guide

Four types. Each serves a different reader intent and requires a different structure. Mixing types is the most common failure mode.

---

## Type 1: Utilitarian

**What it is:** Dense, actionable, practitioner-focused. The reader comes with a specific problem and leaves with specific steps.

**The contract with the reader:** "I will not waste your time. You will leave with something you can use today."

**Structure:** Problem → why standard approaches fail → what actually works → numbered steps or checklist.

**Tone:** Terse. No preamble. No "in today's fast-changing landscape." Leads with the answer, not the reasoning.

**When to use:** The reader already knows they have the problem. They're not asking whether the problem exists — they're asking how to solve it.

**What we've written in this type:**
- AI Coding Teams and UAT: A Practitioner's Guide (pillar)
- Playwright MCP for AI Coding Teams
- Building a Multi-Agent QA Pipeline
- Visual Regression Testing for AI-Generated Frontends
- CI/CD Pipeline Design When AI Writes the Code
- What AI Testing Misses
- The Real Economics of AI-Assisted Testing

**What makes it fail:**

- **Starting with context the reader already has.** If the audience knows they have a testing problem, don't spend two paragraphs explaining that AI-generated code can have bugs.
- **Burying the action.** The "what to do" should be visible in the first scroll. If the reader has to read past three sections to find out what you're recommending, you've written an exploratory article with a checklist at the end.
- **False precision on uncertain data.** Citing a vendor statistic as if it's an independent study. Utilitarian readers are practitioners — they'll notice.
- **Comprehensiveness as a goal.** Covering every edge case makes the article longer and the core recommendation harder to find. A utilitarian article should be opinionated: this is what works, here's how, these are the limits.
- **Hedging the recommendation.** "It depends" is not an action. If the answer genuinely depends, give the decision framework, not an escape hatch.

---

## Type 2: Exploratory

**What it is:** Investigative, analytical, zoomed out. The reader isn't sure what they think about something — or they think something that's probably wrong. The article earns a new perspective.

**The contract with the reader:** "I looked at this carefully so you don't have to. Here's what I found."

**Structure:** Observation → investigation → what the data actually shows → implications. Can be structured around a question the article is answering.

**Tone:** Rigorous but readable. Footnotes are welcome. Uncertainty is named, not hidden.

**When to use:** The reader has a vague sense that something is off, or they're operating on received wisdom they haven't examined. The article does the examining.

**What we've written in this type:**
- Why You Shouldn't Trust Most AI Testing Statistics (Including Ours)

**What makes it fail:**

- **Performing rigor without doing it.** Listing more sources isn't the same as evaluating them. If the sources all come from the same interested parties, citing more of them doesn't make the analysis stronger.
- **Burying the finding.** Exploratory doesn't mean meandering. The finding needs to land. "What this means" is the job of the conclusion.
- **False balance.** "Some say X, others say Y" is not analysis. The article should have a point of view earned by the investigation.
- **Letting the scope creep.** This type invites comprehensiveness. Keep it to one question answered well rather than five questions answered partially.
- **Assuming the reader cares about your process.** They care about the finding. The investigation is evidence, not the subject.

---

## Type 3: Narrative

**What it is:** Story-led, case study, human element. A specific team, a specific incident, a specific decision — told as a story rather than as a data point in a list.

**The contract with the reader:** "This actually happened. Something real is at stake."

**Structure:** Scene → complication → what they did → what happened → what it means. Chronological, with a person at the center.

**Tone:** Specific. Names, dates, details. No vague "a company in the financial sector." The specificity is what makes it credible.

**When to use:** When the utilitarian argument is abstract without a concrete example. When the reader needs to see themselves (or someone like them) navigating the decision. When the stakes need to feel real.

**What we've written in this type:**
- Nothing yet. Most of our incidents (DoltHub, OpenObserve, Replit, Airbnb) appear as data points inside other article types — they're the raw material for narrative pieces.

**What makes it fail:**

- **Anecdote without argument.** "This happened to a team" is not an article unless it demonstrates something. The story needs to earn a principle.
- **Corporate case study voice.** "Company X leveraged AI-powered solutions to achieve significant improvements." Nobody reads this.
- **Protecting the subject.** The most interesting narratives have real failure, real uncertainty, real tension. A story where everything works out as expected and everyone made good decisions is not a story.
- **Generalizing too fast.** One team's experience is one team's experience. The article can say what it implies — but it can't say what all teams should do based on one story.
- **Using narrative to avoid taking a position.** "Here's what they did" is not the same as "here's what worked and why." The article needs a point.

---

## Type 4: Argument / Thesis

**What it is:** A single counterintuitive claim, argued well, landed with specifics. The reader has an existing frame. The article replaces it.

**The contract with the reader:** "The way you're thinking about this is wrong. Here's the right frame."

**Structure:** State the claim plainly → show why the current frame fails → build the case for the new frame → name the implication → land on action without selling.

**Tone:** Confident, direct, no hedging on the core claim. Acknowledges what the argument doesn't cover. Does not oversell.

**When to use:** When the most important thing isn't what to do but how to think about what to do. When the standard framing produces the wrong decisions even when executed perfectly.

**What we've written in this type:**
- Nothing yet. The Wardley-based AI adoption article is the first candidate.

**What makes it fail:**

- **Fear as urgency.** "Act now before it's too late" manufactures urgency artificially. If the argument is correct, the urgency comes from the logic. Manufacture it and the reader senses they're being sold something.
- **Jargon as credibility.** Naming the Wardley map, explaining its history, defining all four evolution stages — this buries the insight under apparatus. The concept does the work; the brand name doesn't need to.
- **Arguing against a straw man.** The frame you're replacing has to be real. If nobody actually thinks that way, you're not replacing a frame — you're tilting at a windmill.
- **Letting the action slide into a pitch.** "Here's what to do" should feel like the logical conclusion of the argument, not a service offering. The moment it sounds like "and that's where we come in," the credibility of the whole article evaporates.
- **Hedging the claim.** The central claim has to be stated plainly and defended. "It depends" or "in many cases" softens the claim until there's nothing left to argue. If the claim has real limits, name them specifically — don't dissolve the claim with qualifications.

---

## Cross-Type Principles (What Makes Any of These Fail)

These apply regardless of article type:

**Audience mismatch.** Writing for the reader you wish you had rather than the one actually reading. If your reader doesn't know what Git is, don't use it as an analogy. If your reader isn't asking about coding tools, don't frame the article around coding tools.

**The expertise performance.** Demonstrating knowledge rather than transferring it. Long sentences with many clauses, Latin phrases, field-specific jargon used without explanation. The goal is understanding, not impressiveness.

**Treating the article as a container for everything you know.** The article has one job. Everything that doesn't serve that job makes the job harder.

**False authority from uncertain data.** A statistic from a vendor, cited without disclosure, presented as established fact. Readers who know the field will notice. Readers who don't know the field will eventually encounter the vendor's competing claim somewhere else and feel misled.

**Conclusions that don't follow from the article.** The ending promises more than the body delivered, or lands somewhere different from where the argument was going. The conclusion should feel inevitable — the place the argument was always heading.

---

## What We've Produced (Article Inventory)

| Title | Type | Status |
|---|---|---|
| AI Coding Teams and UAT: A Practitioner's Guide | Utilitarian (pillar) | Complete + red-teamed |
| Playwright MCP: Setup, Token Economics, When to Use It | Utilitarian | Complete + red-teamed |
| Building a Multi-Agent QA Pipeline: The OpenObserve Model | Utilitarian | Complete + red-teamed |
| Visual Regression Testing for AI-Generated Frontends | Utilitarian | Complete + red-teamed |
| CI/CD Pipeline Design When AI Writes the Code | Utilitarian | Complete + red-teamed |
| What AI Testing Misses | Utilitarian | Complete + red-teamed |
| The Real Economics of AI-Assisted Testing | Utilitarian | Complete + red-teamed |
| Why You Shouldn't Trust Most AI Testing Statistics | Exploratory | Complete |
| The Practice Is the Moat (working title) | Argument/Thesis | In progress |
| [DoltHub / OpenObserve / incident narrative — TBD] | Narrative | Not started |
