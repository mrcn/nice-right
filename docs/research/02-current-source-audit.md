# Nice Right Current-Source Audit

## Scope and purpose

This is a factual inventory of the current public site and its implementation. It is
not a conversion critique and it is not independent buyer research.

The audit answers: **What does Nice Right currently say, show, and ask visitors to do?**
It does not answer whether the claims are true, whether the target buyer believes them,
or whether the page converts qualified prospects.

## Capture evidence

Captured from `https://niceright.co/` with Playwright + Chromium during this run.

| Viewport | HTTP | Page height | H1 headings | Main sections/section-like nodes | Links | Images | Form elements |
|---|---:|---:|---:|---:|---:|---:|---:|
| Desktop 1440×900 | 200 | 9,779px | 1 | 20 DOM nodes including nested testimonial footers | 31 | 4 | 0 |
| Mobile 390×844 | 200 | 12,060px | 1 | 20 DOM nodes including nested testimonial footers | 31 | 4 | 0 |

Artifacts:

- `tmp/research/current-live-audit.json`
- `tmp/research/current-live-desktop.png`
- `tmp/research/current-live-mobile.png`

The zero form-element count reflects the externally embedded Cal.com booking experience
not exposing native form elements in the captured page DOM. The page provides a Cal.com
fallback link and an email link.

## Current page composition

Source composition is defined in `app/_home/page.tsx`:

1. `Nav`
2. `Hero`
3. `ServicesCarousel`
4. `Services`
5. `Proof`
6. `Testimonials`
7. `Pricing`
8. `ContactSection`
9. `Footer`

`FAQ.tsx` exists in the repository but is **not imported or rendered** by the current
homepage. It is source material, not current public-page content.

## Current public audience and positioning statements

### Directly observed copy

- Hero: “Get found by people looking for you right now.”
- Hero qualifier: “For owners who already run a home service business.”
- Hero mechanism language: “I build the digital side — so your phone and calendar do more of the selling.”
- Footer descriptor: “Digital Partner for Growing Businesses.”
- Services framing: “There are only four ways to grow a business.”
- Contact framing: “Let’s figure out what would work for your business.”

### Evidence status

These are **PUBLISHED CLAIMS / POSITIONING STATEMENTS**. They establish the current
intended audience and message, but not buyer demand or comprehension.

The current page is attempting to speak primarily to home-service owners while also
presenting a broad capability range: websites, applications, AI chatbots, LLM
integrations, automation, SEO, Google Business optimization, e-commerce, portals,
analytics, internal tools, and API integrations.

## Current growth-lever content

The `Services` component presents four levers:

1. **Get More Customers** — SEO site, Google/local listings, lead capture/email, paid-traffic-ready pages.
2. **Charge More** — positioning, social proof, client-facing tools, outcome-based packaging.
3. **Keep Customers** — post-purchase sequences, rebooking, loyalty/referrals, CRM automation.
4. **Cut the Waste** — process audit, scheduling/intake automation, AI-assisted workflows, internal tools.

Each lever includes a first-person customer problem statement, a category tag, a context
paragraph, and a quantitative or causal assertion in some cases.

These are useful candidate problem frames. They are not yet validated as the four most
important or most purchase-driving problems for the target segment.

## Current offers and commitment path

The live page presents three offer types under “Investment”:

1. **The Digital Foundation**
   - Promise: business “findable and credible”
   - Timeline: typically 4–8 weeks
   - Includes a five-page website, local listings, email capture/lead magnet, welcome sequence, and 30-day check-in.

2. **The Growth Experiment**
   - Promise: one growth lever tested and proven
   - Timeline: first results in 30–45 days
   - Includes a working solution, launch strategy, early results, and data for the next decision.

3. **The Growth Partnership**
   - Promise: ongoing growth support
   - Timeline: ongoing
   - Includes strategy, prioritization, systems/automation/tools/campaigns, and direct access.

The page also says:

- “Share what’s not working. We’ll figure out what fits.”
- “Name your price.”
- “Every business is at a different stage — and every budget is different too.”
- “30 MINUTES. NO PITCH. REAL TALK.”

No numeric prices are rendered in the current live pricing section. The current primary
CTA is a free strategy call, linking to a Cal.com 30-minute booking flow:
`niceright/30min`.

The CTA appears in the navigation, hero, pricing area, FAQ source, and contact pathway,
with wording variations including “Book a Free Call” and “Book Your Free Strategy Call.”

## Current proof inventory

### Quantitative published claims

The live page publishes:

- **290%** traffic growth for a home service company
- **12x** more leads from the same site
- **80%** time saved with workflow automation
- **100+ projects**
- **13+ years**
- Acquiring a customer costs **5–7×** more than keeping one
- A **1% price increase = 8% operating profit improvement**
- “First results in 30–45 days” for the Growth Experiment
- “Typically 4–8 weeks” for the Digital Foundation

For this audit these are all **PUBLISHED CLAIMS**, not verified results. The live page
does not provide, in the immediate stats block, a named client, baseline, timeframe,
method, attribution, or source artifact for the 290%, 12x, or 80% figures.

### Case studies

The current page shows three case-study links and images:

- **Healthcare Platform** — “Cut deal-closing time by 40%”; custom portal connecting providers with property opportunities.
- **Northern Trust** — “Modernized a Fortune 500 web presence”; micro-interactions and animation that boosted engagement.
- **GreenPill Network** — “Built a verified impact platform for conservation”; blockchain PWA tracking biodiversity actions with on-chain attestations.

These establish available portfolio work. They do not, by themselves, establish relevance
to the primary home-service buyer.

### Testimonials

The live page displays four testimonials, duplicated in the DOM for carousel looping:

- Roman Panchyshyn — Sr. Manager UX, Northern Trust
- Jonathan Carstensen — Project Manager, Comrade Web Agency
- Britt Skaathun — Assistant Professor, UC San Diego
- Brian Jemilo II — CTO, Shibiko AI

The visible testimonials establish praise for initiative, translation of technical language,
reliability, adaptability, and speed. They are not testimonials from the currently stated
home-service audience. Each currently uses initials rather than a client photograph and
points to the same LinkedIn recommendations URL.

### Founder/contact proof

The contact section includes:

- Founder image: “Marcin Klaudiusz — founder of Nice Right”
- “Every project I take on, I answer for personally.”
- “Since 2013, 100+ projects for small and mid-size businesses.”
- Email: `Marcin@uxoxo.xyz`
- LinkedIn profile link

These are available identity and accessibility assets. The email domain and brand domain
are different; this is a fact to keep visible for later trust review, not a conclusion.

## Current interaction and implementation inventory

- Hero uses GSAP entrance animation and a pinned scroll/fade behavior.
- Navigation changes state after the hero and includes a mobile menu with focus handling.
- Services carousel auto-scrolls a list of 16 capabilities, repeated three times in the DOM; hover pauses it and reduced motion disables animation.
- Services uses responsive layout logic and scroll-driven highlighting/pinning behavior.
- Proof animates stat counters and case-study reveals.
- Testimonials use a horizontally scrolling, looping carousel with dot controls and duplicated slides.
- Pricing uses scroll-driven tier highlighting and hover instrumentation.
- Contact uses an external Cal.com embed with fallback links.
- Analytics hooks exist for CTA, navigation, section, pricing, FAQ, contact, and hover interactions.

These are implementation facts. They are not evidence that the interactions improve
comprehension or conversion.

## Source-document status

### `docs/offer-strategy-final.md`

Status in the document: “Strategy defined. Ready to build landing page + start outreach.”
It proposes hyper-local Portage Park/Six Corners positioning, home services first, and an
established owner-operator segment. It also contains offer, guarantee, price, and outreach
recommendations.

For this research:

- The document is **INTERNAL STRATEGY / HYPOTHESIS**, not buyer evidence.
- Its geography, segment size/revenue, urgency, pricing response, and “zero consultants”
  competitive claims require independent verification.
- Its strongest use is to expose decisions and hypotheses that need testing.

### `docs/offer-research-*.md` and `docs/offer-brainstorm-*.md`

These documents contain frameworks, recommendations, offer ideas, sales scripts, and
market assertions. Some include external links; the documents do not yet provide a
source-linked evidence ledger separating observed buyer behavior from analyst inference.

For this research they are **HYPOTHESIS / METHOD NOTES** until each consequential claim
is source-checked.

### `docs/v2-homepage-research.md` and `docs/v2-new-content.md`

These describe earlier UXOXO/Nice Right versions, including different geography, brand
positioning, page structure, and proof assumptions. They are **HISTORICAL CONTEXT** and
proposed content, not current public truth.

### `docs/brand-guidelines.md` and `docs/DESIGN.md`

These are design-direction records, not buyer research. They contain conflicting or
superseded visual assumptions, including navy/amber, dark teal/amber, and a later
instruction that the muted era is closed. During buyer research they must not function as
creative constraints.

## Contradictions and evidence gaps to carry forward

1. The site says it is primarily for home-service businesses, while its visible named proof is healthcare real estate, Northern Trust, and conservation technology.
2. The strongest home-service evidence is currently an anonymous 290% traffic claim, not a named, inspectable case study.
3. The page publishes 12x leads and 80% time saved without immediate attribution or methodology.
4. The live page presents three different offer types but no numeric pricing; “Name your price” may be intentionally flexible or may create uncertainty. This is unresolved.
5. The capability marquee is much broader than the stated home-service positioning.
6. Testimonials prove technical collaboration and communication but do not directly prove home-service commercial outcomes.
7. The current CTA asks for a 30-minute call, but the audit has not established why that is the right first commitment or how it is qualified.
8. `FAQ.tsx` contains potentially useful objections and proposed answers but is not public on the current page.
9. Existing strategy documents mix Chicago, Cleveland, UXOXO, Nice Right, home services, restaurants, dental, and enterprise audiences.
10. Existing research documents use “research” labels while mixing external citations, reasoning, recommendations, and unsupported claims.

## Unknowns — do not fill silently

- Best-fit trade or business type
- Revenue/team maturity and buying authority
- Primary acquisition channel and arrival intent
- Actual buying trigger
- Current alternatives and switching costs
- Budget/reference price and willingness to commit
- Which outcomes matter most: demand, pricing power, retention, admin relief, credibility, or something else
- Whether the stated quantitative results are attributable, repeatable, and relevant
- Which proof assets can be named and published
- Whether the free call is the best first action
- Whether the one-page architecture supports the buyer’s decision
- Current conversion, booking, show, close, and lead-quality baselines

## Step 2 acceptance result

**PASS WITH CAVEATS.** The current public page and implementation have been inventoried
with reproducible capture evidence. The audit deliberately does not make buyer, market,
psychology, offer, or conversion claims that the current site cannot establish.

The next phase must independently research the target buyers and use this audit only as
context, claim inventory, asset inventory, and a list of hypotheses to challenge.
