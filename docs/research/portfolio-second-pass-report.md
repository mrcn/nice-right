# Nice Right. Second Historical Pass

**Pull date:** 2026-08-27<br>
**Purpose:** go farther back on the newly uncovered properties, preserve screenshots, and turn only defensible observations into citeable claim candidates.

## Executive verdict

**Taqueria La Paz is the only newly covered property with a strong, externally legible outcome signal.** Nice Right has working instrumentation but not validated business outcomes. UXOXO has older public/measurement history but no Search Console outcome. Dummy Reader has setup evidence, not result evidence.

- **Use first:** Taqueria's dated Search Console visibility: **1,922 clicks / 68,908 impressions** from 28 Aug 2025 to 27 Aug 2026. [C1]
- **Use second, cautiously:** Taqueria's current GA4 property: **1,124 sessions**, including **673 Organic Search sessions (59.9%)**, Apr to Aug 2026. [C2]
- **Keep internal:** Nice Right's **259 sessions / 17 form starts / 17 CTA clicks** in the current property. [C4]
- **Use as chronology only:** UXOXO's first archived homepage capture on 9 Jan 2024 and Taqueria's first capture on 27 Apr 2024. [C3] [C6]
- **Do not use:** combined totals across duplicate/migration GA4 properties, or any sentence saying Nice Right caused a change without a project record.

## Coverage and method

This pass checked both vaulted Google identities and the exact spelling variants. It queried GA4 Admin/Data API history from the API-valid floor through the pull date, page/channel/event reports, Search Console daily/page/query reports from the retained window, RDAP, live robots/sitemaps, Wayback CDX, and archived/current screenshots.

| Evidence type | Can establish | Cannot establish |
|---|---|---|
| GA4 property/stream creation | Measurement setup exists | Project start, authorship, causality |
| GA4 reports | Observed traffic/tracking signals | Qualified leads, sales, who caused them |
| GSC pages/queries | Search visibility/query patterns | Pre-retention history, conversion value |
| RDAP | Domain-registration lower bound | Work start or work ownership |
| Wayback/CDX/screenshots | Public page availability near timestamp | Nice Right authorship or performance |

### Hard limits

- Search Console performance before **15 Apr 2025** was not recoverable through the connected API; pre-retention probes returned zero rows.
- GA4 properties are kept separate. UXOXO and Taqueria splits are not summed.
- Wayback direct replay was rate-limited from this machine. Historical screenshots were captured through `image.thum.io` against exact Wayback URLs; the archive URL remains the citation source.
- Current screenshots used the user's Brave session. No Orca Browser was used.
- A GA4 default-channel label does not identify who ran a campaign. Source, medium, campaign name, engagement quality, and operator must be checked separately.

## Lift metrics

"Lift" here means a descriptive change between defined windows: not proof that Nice Right caused it.

| Comparison | Result | Interpretation |
|---|---:|---|
| Taqueria legacy GA4, matched 12-month periods | **+233.3% adjusted sessions** (1,250 → 4,166) | Raw lift was +279.2%. The adjustment removes the 574-session `Sailthru / email` row because its operator is unknown and its traffic quality is poor. |
| Taqueria GSC, matched Apr to Jun months | **+1.6% clicks** (384 → 390) | Impressions rose 6.7%; relative CTR fell 4.8%. No large search lift is supported. |
| Taqueria current GA4, equal 2-month windows | **−30.9% average sessions** | Organic share rose **+24.1 percentage points** (49.6% → 73.7%); mix improvement is not volume lift. |
| Nice Right GA4, first 3 vs last 3 reported months | **+198.5% average sessions** | Median-month lift is +121.4%, but August supplies 80.4% of post-period sessions and Organic Search share falls. |

Causal/incremental lift is **not estimable** from the connected data: there is no confirmed intervention date, untreated control series, randomized exposure, or CRM/revenue join. UXOXO's property split and Dummy Reader's zero rows make lift comparisons invalid.

## Data-quality correction: the October spike

I originally called these **Email sessions**. That wording was too strong. The underlying GA4 rows are more specific: `Sailthru / email`, campaign `20251022_Newsletter_Chicago`. GA4 does not tell us who operated that campaign, so it cannot be credited to the restaurant or to Nice Right.

The spike also has weak quality signals. The aggregate row contains 574 sessions, 572 users, 8 engaged sessions, a 5.4-second average session duration, 1.005 page views per session, and a 98.6% bounce rate. The date breakdown is concentrated on 22 October (418 sessions) and 23 October (154 sessions), with small later rows. That pattern is compatible with a bulk newsletter send, link scanning, or low-intent traffic. The source data does not let us choose among those explanations.

The report now excludes this spike from any SEO or causal-lift story. The raw trace is saved in `docs/research/portfolio-second-pass-taqueria-sailthru.json` and `docs/research/portfolio-second-pass-taqueria-attribution.json`.

## Claim cards

These are evidence-ready directions, not automatically approved website copy. Client permission remains required.

### C1. Taqueria La Paz. EVIDENCE-READY / PERMISSION + ATTRIBUTION CHECK

> Google Search recorded 1,922 clicks and 68,908 impressions for taquerialapazchicago.com from 28 Aug 2025 through 27 Aug 2026.

**Evidence:** GSC HTTPS property; exact 365-day slice from daily API data.<br>
**Sources:** [GSC-TAQ]<br>
**Caveat:** Visibility, not leads or sales; work-date matching, authorship, and client permission remain required.<br>
**Recommended use:** Strongest new dated case-study metric.

### C2. Taqueria La Paz. EVIDENCE-READY / MIGRATION CHECK

> The current GA4 property recorded 1,124 sessions from April through August 2026; 673 sessions (59.9%) were attributed to Organic Search.

**Evidence:** Property 530891840; five reported months; created 1 Apr 2026.<br>
**Sources:** [GA-TAQ-CURRENT]<br>
**Caveat:** Partial current-property window; older property is not included. Confirm migration boundary and permission.<br>
**Recommended use:** Secondary supporting metric.

### C3. Taqueria La Paz. PROVENANCE ONLY

> The domain was registered 9 Feb 2024; the earliest returned Wayback homepage capture is 27 Apr 2024; 10 deduplicated HTML captures run through 15 Feb 2026.

**Evidence:** RDAP and Wayback CDX/root capture inventory.<br>
**Sources:** [RDAP-TAQ], [CDX-TAQ]<br>
**Caveat:** Public/domain availability is not a Nice Right start date or authorship proof.<br>
**Recommended use:** Timeline caption only.

### C4. Nice Right. INTERNAL INSTRUMENTATION ONLY

> Nice Right's current GA4 property recorded 259 sessions, 233 users, 17 form_start events, and 17 cta_click events from March through August 2026.

**Evidence:** Property 529974758; six reported months.<br>
**Sources:** [GA-NR]<br>
**Caveat:** Events are tracking signals, not qualified leads or booked calls; no CRM join is connected.<br>
**Recommended use:** Private funnel debugging.

### C5. Nice Right. INTERNAL VISIBILITY SIGNAL

> Search Console recorded 12 clicks and 619 impressions for sc-domain:niceright.co from 15 Apr 2025 through 27 Aug 2026; "nice right" generated 7 clicks.

**Evidence:** Domain-level GSC property; 157 daily rows and 3 query rows.<br>
**Sources:** [GSC-NR]<br>
**Caveat:** Low-volume branded visibility; not a growth or client-result claim.<br>
**Recommended use:** Private baseline.

### C6. UXOXO. PROVENANCE ONLY

> The UXOXO domain has an RDAP registration lower bound of 9 Nov 2023; Wayback's earliest returned homepage capture is 9 Jan 2024; 12 deduplicated HTML captures run through 4 Mar 2025.

**Evidence:** RDAP and Wayback CDX inventory.<br>
**Sources:** [RDAP-UX], [CDX-UX]<br>
**Caveat:** Public presence is not proof of ownership, authorship, or SEO success.<br>
**Recommended use:** Founder/brand chronology.

### C7. UXOXO. DO NOT COMBINE / MEASUREMENT HISTORY

> Two separate GA4 properties exist: 42 sessions across Apr to Jul 2024 and 756 sessions across Oct 2024 to Aug 2026.

**Evidence:** Properties 436318262 and 462480631 have separate creation dates and streams.<br>
**Sources:** [GA-UX-OLD], [GA-UX-NEW]<br>
**Caveat:** The split may be migration or duplicate instrumentation; GSC returned zero clicks.<br>
**Recommended use:** Internal measurement audit only.

### C8. Dummy Reader. NO RESULT DATA

> Dummy Reader's domain registration lower bound is 10 Dec 2025 and its GA4 property was created 25 Mar 2026, but the historical report returned zero data rows.

**Evidence:** RDAP, GA4 Admin/Data API, and zero Wayback CDX captures.<br>
**Sources:** [RDAP-DUMMY], [GA-DUMMY], [CDX-DUMMY]<br>
**Caveat:** A live current page is not evidence of traffic or product-market outcome.<br>
**Recommended use:** Setup chronology only.

### C9. Taqueria La Paz. QUALITY-ADJUSTED DESCRIPTIVE LIFT / NOT CAUSAL

> After excluding the 574-session Sailthru / email attribution spike, the same legacy GA4 property shows a descriptive 233.3% year-over-year session lift: 1,250 in Apr 2024 to Mar 2025 to 4,166 adjusted sessions in Apr 2025 to Mar 2026.

**Evidence:** Equal-length, same-property comparison; Organic Search rose from 557 to 2,357 sessions.<br>
**Sources:** [GA-TAQ-LEGACY], [GA-TAQ-QUALITY]<br>
**Caveat:** The subtraction is a data-quality adjustment, not proof that every excluded session was automated or invalid. The campaign operator is unknown. Matched GSC months do not show a comparable large search lift, and Nice Right causality remains unproven.<br>
**Recommended use:** Internal hypothesis only until the intervention window and traffic quality are confirmed.

### C10. Taqueria La Paz. MATCHED-SEASON SEARCH RESULT / SMALL CHANGE

> In matched Apr to Jun months, GSC clicks moved from 384 to 390 (+1.6%) year over year; impressions rose 6.7% while CTR fell 4.8% relatively.

**Evidence:** Same calendar months, same HTTPS GSC property.<br>
**Sources:** [GSC-TAQ]<br>
**Caveat:** Descriptive year-over-year movement, not causal lift; no pre-April-2025 GSC history is available.<br>
**Recommended use:** Use to prevent overclaiming a large search lift.

### C11. Taqueria La Paz. DESCRIPTIVE MIX SHIFT / VOLUME DOWN

> Within the current GA4 property, Organic Search share rose from 49.6% in Apr to May 2026 to 73.7% in Jul to Aug 2026 (+24.1 percentage points), while average monthly sessions fell 30.9%.

**Evidence:** Equal two-month windows within property 530891840.<br>
**Sources:** [GA-TAQ-CURRENT]<br>
**Caveat:** Short current-property window with no seasonality control; higher organic share does not mean more total demand.<br>
**Recommended use:** Internal channel-mix diagnosis.

### C12. Nice Right. DESCRIPTIVE TRAFFIC PULSE / NOT CAUSAL

> Nice Right's average monthly sessions rose 198.5% from the first three reported months (65 total) to the last three (194 total); the median-month lift is 121.4%.

**Evidence:** Equal three-month windows in property 529974758.<br>
**Sources:** [GA-NR]<br>
**Caveat:** August contributes 80.4% of post-period sessions and Organic Search share falls 7.7 percentage points; no control or business-outcome join exists.<br>
**Recommended use:** Private instrumentation review only.

### C13. Taqueria La Paz. DATA QUALITY / ATTRIBUTION BLOCKED

> The October 2025 spike was tagged `Sailthru / email` under campaign `20251022_Newsletter_Chicago`: 574 aggregate sessions, 8 engaged sessions, 5.4-second average duration, and 98.6% bounce rate.

**Evidence:** GA4 source, medium, campaign, date, and engagement reports.<br>
**Sources:** [GA-TAQ-QUALITY]<br>
**Caveat:** The campaign operator is unknown. This does not prove the restaurant ran a newsletter. The traffic is excluded from outcome and SEO-lift claims.<br>
**Recommended use:** Data-quality warning and suppression rule.

### C14. Taqueria La Paz. EVIDENCE-READY / SEARCH ACQUISITION

> Across the available legacy GA4 period, Google / organic produced 2,829 sessions and 1,139 engaged sessions, with a 40.3% engagement rate and 107-second average session duration.

**Evidence:** Aggregate GA4 source/medium report for property 436955005.<br>
**Sources:** [GA-TAQ-QUALITY]<br>
**Caveat:** Source-level traffic is not proof of Nice Right authorship, leads, or revenue. Match the dates to the project record.<br>
**Recommended use:** Better supporting evidence than the Sailthru spike.

### C15. Taqueria La Paz. EVIDENCE-READY / BEHAVIOR PROXY

> The legacy GA4 property recorded 80 outbound Google Maps click events from 73 users, including 69 engaged sessions. It also recorded 29 Instagram and 19 Facebook click events.

**Evidence:** GA4 click event report grouped by link URL.<br>
**Sources:** [GA-TAQ-QUALITY]<br>
**Caveat:** These are outbound click events, not completed directions, visits, calls, or orders.<br>
**Recommended use:** Local-intent support after client permission.

### C16. Taqueria La Paz. EVIDENCE-READY / REFERRAL SIGNAL

> Named referral domains sent 159 sessions and 70 engaged sessions in the available legacy GA4 period: WTTW 81/35, WBEZ 43/23, Chicago Sun-Times 23/4, and City Cast 12/8.

**Evidence:** Aggregate GA4 source/medium report.<br>
**Sources:** [GA-TAQ-QUALITY]<br>
**Caveat:** GA4 records referring domains, not article URLs or who secured the mentions. Verify the pages before calling this press coverage or earned media.<br>
**Recommended use:** Lead for a separate referral/source investigation.

### C17. Taqueria La Paz. TRACKING GAP / NO OBSERVED CONVERSION

> The GA4 properties have conversion-style key events configured, but the report returned no observed purchase, close_convert_lead, or qualify_lead events.

**Evidence:** GA4 Admin key-event configuration and event/key-event reports for properties 436955005 and 530891840.<br>
**Sources:** [GA-TAQ-QUALITY]<br>
**Caveat:** A zero event row does not prove that no calls, orders, or leads happened. It proves only that these configured GA4 events were not observed in the queried properties and window.<br>
**Recommended use:** Tracking-fix requirement, not portfolio copy.

## Project dossiers

### Nice Right

- GA4 property **529974758** was created 25 Mar 2026; first data month is March 2026.
- Observed totals through Aug 2026: **259 sessions**, **233 users**, **485 page views**, **1,924 events**.
- Custom events: **17 `form_start`**, **17 `cta_click`**, and **2 `tool_scan_submit`**. These are instrumentation signals, not confirmed leads.
- GSC domain property: **12 clicks / 619 impressions** in the retained window; branded query "nice right" produced 7 clicks.
- Wayback CDX returned zero HTML captures for `niceright.co`; this does not prove the domain did not exist earlier.

**Decision:** private funnel baseline, not portfolio proof.

### Dummy Reader

- RDAP registration lower bound: **10 Dec 2025**.
- GA4 property **529935066** and `dummyreader.com` stream were created **25 Mar 2026**.
- GA4 history returned **zero data rows**; Wayback CDX returned zero HTML captures.
- The current homepage is live and was captured in Brave with HTTP 200, but current copy is not analytics proof.

**Decision:** setup/launch chronology only.

### UXOXO

- RDAP registration lower bound: **9 Nov 2023**.
- Wayback CDX returned **12 deduplicated HTML captures** from Jan 2024 through Mar 2025; earliest homepage capture: **9 Jan 2024**.
- GA4 property **436318262**: 42 sessions across Apr to Jul 2024.
- GA4 property **462480631**: 756 sessions across Oct 2024 to Aug 2026.
- GSC `http://uxoxo.xyz/` returned no clicks in the retained window.
- Page-level reports show portfolio pages as small-interest signals, not outcome evidence.

**Decision:** chronology and measurement audit only. Never combine the two properties without reconciliation.

### Taqueria La Paz

- RDAP registration lower bound: **9 Feb 2024**.
- Earliest Wayback homepage capture: **27 Apr 2024**; CDX returned **10 deduplicated HTML captures** through **15 Feb 2026**, including a contact-page capture from Mar 2025.
- Legacy GA4 property **436955005** begins in Apr 2024 and is retained separately. Its October 2025 spike contains 574 sessions tagged `Sailthru / email` under campaign `20251022_Newsletter_Chicago`. The operator is unknown, so do not call it a client email campaign or pure SEO growth.
- After excluding the 574-session Sailthru / email row, the same-property lift is **+233.3%**: 1,250 sessions in Apr 2024 to Mar 2025 versus 4,166 adjusted sessions in Apr 2025 to Mar 2026. The raw, unadjusted comparison is +279.2%.
- Across the available legacy period, Google / organic produced **2,829 sessions**, **1,139 engaged sessions**, a **40.3% engagement rate**, and a **107-second average session duration**.
- The same property recorded **80 Google Maps click events from 73 users**, plus 29 Instagram and 19 Facebook click events. These are behavior proxies, not completed visits, calls, or orders.
- Named referral domains contributed **159 sessions and 70 engaged sessions**: WTTW 81/35, WBEZ 43/23, Chicago Sun-Times 23/4, and City Cast 12/8. Verify the article URLs before calling this press coverage.
- GA4 key-event settings include `purchase` on the legacy property and `purchase`, `close_convert_lead`, and `qualify_lead` on the current property. The queried reports returned no occurrences of those configured events.
- Current GA4 property **530891840** begins in Apr 2026: **1,124 sessions**, **673 Organic Search sessions** through Aug 2026.
- GSC HTTPS property: **2,576 clicks / 96,795 impressions** in the full retained window; exact latest 12-month slice: **1,922 / 68,908**.
- Top retained-window queries include **"taqueria la paz" (696)** and **"la paz restaurants" (578)**. These are search-demand signals, not sales.

**Decision:** strongest new case-study candidate, pending work-date matching and client permission.

## Screenshot register

Original full-size PNGs are in `docs/research/second-pass-screenshots/`; the visual report uses embedded review-sized previews.

| Screenshot | What it shows | Citation / note |
|---|---|---|
| [`docs/research/second-pass-screenshots/niceright-current.png`] | niceright-current | https://niceright.co/ |
| [`docs/research/second-pass-screenshots/dummyreader-current.png`] | dummyreader-current | https://dummyreader.com/ |
| [`docs/research/second-pass-screenshots/uxoxo-current.png`] | uxoxo-current | https://uxoxo.xyz/ |
| [`docs/research/second-pass-screenshots/taqueria-current.png`] | taqueria-current | https://taquerialapazchicago.com/ |
| [`docs/research/second-pass-screenshots/uxoxo-2024-01-09-wayback.png`] | uxoxo-2024-01-09-wayback | https://web.archive.org/web/20240109174843/http://uxoxo.xyz/ |
| [`docs/research/second-pass-screenshots/uxoxo-2025-03-04-wayback.png`] | uxoxo-2025-03-04-wayback | https://web.archive.org/web/20250304114157/https://uxoxo.xyz/ |
| [`docs/research/second-pass-screenshots/taqueria-2024-04-27-wayback.png`] | taqueria-2024-04-27-wayback | https://web.archive.org/web/20240427133354/https://taquerialapazchicago.com/ |
| [`docs/research/second-pass-screenshots/taqueria-2024-12-15-wayback.png`] | taqueria-2024-12-15-wayback | https://web.archive.org/web/20241215011254/https://taquerialapazchicago.com/ |
| [`docs/research/second-pass-screenshots/taqueria-2025-03-27-contact-wayback.png`] | taqueria-2025-03-27-contact-wayback | https://web.archive.org/web/20250327084308/https://taquerialapazchicago.com/contact-us/ |
| [`docs/research/second-pass-screenshots/taqueria-2026-02-15-wayback.png`] | taqueria-2026-02-15-wayback | https://web.archive.org/web/20260215044138/https://taquerialapazchicago.com/ |

## Source register

The authenticated API URLs identify the report/property/site. Raw snapshots preserve the exact returned rows and pull date.

| ID | Source | URL |
|---|---|---|
| [GA-NR] | GA4 Data API. Nice Right property | https://analyticsdata.googleapis.com/v1beta/properties/529974758:runReport |
| [GSC-NR] | Search Console API. sc-domain:niceright.co | https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aniceright.co/searchAnalytics/query |
| [GA-TAQ-CURRENT] | GA4 Data API. Taqueria current property | https://analyticsdata.googleapis.com/v1beta/properties/530891840:runReport |
| [GA-TAQ-LEGACY] | GA4 Data API. Taqueria legacy property | https://analyticsdata.googleapis.com/v1beta/properties/436955005:runReport |
| [GA-TAQ-QUALITY] | GA4 Data API, Taqueria attribution-quality reports | https://analyticsdata.googleapis.com/v1beta/properties/436955005:runReport |
| [GSC-TAQ] | Search Console API. Taqueria HTTPS property | https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Ftaquerialapazchicago.com%2F/searchAnalytics/query |
| [GA-UX-OLD] | GA4 Data API. UXOXO April property | https://analyticsdata.googleapis.com/v1beta/properties/436318262:runReport |
| [GA-UX-NEW] | GA4 Data API. UXOXO October property | https://analyticsdata.googleapis.com/v1beta/properties/462480631:runReport |
| [GA-DUMMY] | GA4 Admin/Data API. Dummy Reader property | https://analyticsdata.googleapis.com/v1beta/properties/529935066:runReport |
| [RDAP-TAQ] | RDAP. taquerialapazchicago.com | https://rdap.verisign.com/com/v1/domain/taquerialapazchicago.com |
| [RDAP-DUMMY] | RDAP. dummyreader.com | https://rdap.verisign.com/com/v1/domain/dummyreader.com |
| [RDAP-UX] | RDAP. uxoxo.xyz | https://rdap.centralnic.com/xyz/domain/uxoxo.xyz |
| [CDX-TAQ] | Wayback CDX. taquerialapazchicago.com | https://web.archive.org/cdx/search/cdx?url=taquerialapazchicago.com%2F%2A&output=json&filter=statuscode%3A200&filter=mimetype%3Atext%2Fhtml&collapse=digest&from=2010&to=2026 |
| [CDX-UX] | Wayback CDX. uxoxo.xyz | https://web.archive.org/cdx/search/cdx?url=uxoxo.xyz%2F%2A&output=json&filter=statuscode%3A200&filter=mimetype%3Atext%2Fhtml&collapse=digest&from=2010&to=2026 |
| [CDX-NR] | Wayback CDX. niceright.co | https://web.archive.org/cdx/search/cdx?url=niceright.co%2F%2A&output=json&filter=statuscode%3A200&filter=mimetype%3Atext%2Fhtml&collapse=digest&from=2010&to=2026 |
| [CDX-DUMMY] | Wayback CDX. dummyreader.com | https://web.archive.org/cdx/search/cdx?url=dummyreader.com%2F%2A&output=json&filter=statuscode%3A200&filter=mimetype%3Atext%2Fhtml&collapse=digest&from=2010&to=2026 |

## Next attribution gate

1. Get the Taqueria project start/rebuild/content dates from invoices, messages, calendar, repository, or client confirmation.
2. Decide which Taqueria GA4 property is canonical and document the migration boundary.
3. Validate whether the GSC numbers correspond to a Nice Right intervention window.
4. Validate Nice Right custom events against booked calls or CRM outcomes.
5. Obtain permission before publishing names, logos, screenshots, or numbers.

## Durable files

- `docs/research/portfolio-second-pass-evidence.json`. compact joined evidence, claim cards, and lift metrics.
- `docs/research/portfolio-second-pass-lift.json`. standalone descriptive-lift calculations and non-estimable causal cases.
- `docs/research/portfolio-second-pass-google.json`. raw page-level GA4/GSC snapshot.
- `docs/research/portfolio-second-pass-taqueria-attribution.json`. source, referral, link, and key-event trace.
- `docs/research/portfolio-second-pass-taqueria-sailthru.json`. October campaign quality trace.
- `docs/research/portfolio-second-pass-public.json`. raw public/RDAP/Wayback metadata snapshot.
- `docs/research/portfolio-second-pass.html` and `.pdf`. visual report.
- `docs/research/second-pass-screenshots/`. full-size current and historical screenshots.
