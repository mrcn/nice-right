# fn-1-ac7.4 Sales Process: Lead Flow, Qualification, Proposals

## Description

Define and document the sales process for commission-based engagements. Includes lead qualification criteria, proposal template, and handoff workflow.

**Size:** S  
**Files:**
- docs/sales/qualification-criteria.md
- docs/sales/proposal-template.md
- docs/sales/lead-flow.md
- app/contact/page.tsx (optional: structured intake form)

### Lead Qualification Criteria

**Must-Have (Required):**
- Small business (under 50 employees)
- Existing website with traffic (min 500 visitors/month)
- Online sales or lead forms (trackable conversions)
- Decision-maker access (can approve engagement)
- 3-month commitment willingness

**Nice-to-Have (Scoring):**
- Current conversion rate below 2%
- Clear revenue per transaction
- Previous agency experience (knows what to expect)
- Growth mindset (not just "fix our site")

**Red Flags (Disqualify):**
- No existing traffic
- No trackable conversions
- Price shopping only
- Unrealistic expectations ("10x in 30 days")
- No budget for base fee

### Lead Flow

1. **Capture:** Calculator submission, contact form, direct email
2. **Triage:** Review qualification criteria (within 24 hours)
3. **Qualification Call:** 15-min call to confirm fit
4. **Proposal:** Send performance partnership proposal
5. **Close:** Contract signed, tracking installed
6. **Kickoff:** Strategy session, baseline established

### Proposal Template

**Sections:**
1. **Executive Summary:** Your goals + our approach
2. **Current State:** Baseline metrics (from calculator or audit)
3. **Proposed Engagement:**
   - Base fee: $X/month
   - Commission: X% of attributed results
   - 3-month trial period
   - Month-to-month thereafter
4. **Tracking & Attribution:** How we measure results
5. **Expected Outcomes:** Conservative, moderate, optimistic scenarios
6. **Investment Summary:** Total cost at different result levels
7. **Next Steps:** Contract, kickoff timeline

**Tone:** Partnership-focused, transparent about model, confident in results.

### Intake Form (Optional)

Structured contact form replacing simple email:
- Name, email, company
- Website URL
- Current monthly traffic (estimate)
- Biggest challenge (dropdown)
- Preferred contact method

## Approach

- Document sales process in docs/ directory
- Create reusable proposal template
- Optional: Build structured intake form at /contact
- Keep qualification lightweight (don't over-engineer)

## Key Context

- Current contact method: simple email link
- No CRM or lead management system
- Sales process currently informal

## Acceptance

- [ ] Qualification criteria documented with scoring
- [ ] Lead flow documented with timeframes
- [ ] Proposal template covers all sections
- [ ] Template includes pricing placeholders
- [ ] Red flags list prevents bad fits
- [ ] Optional: Intake form built and functional

## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
