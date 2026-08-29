# Nice Right. Portfolio Timeline Audit

**Pull date:** 27 August 2026<br>
**Purpose:** reconstruct when each connected project appears to have entered distinct presence, measurement, content, and growth phases.

## Executive answer

There are visible phase boundaries, but no single connected source proves **when Nice Right began the work** or proves causality. The strongest defensible reconstruction is:

1. **Master Scoopers:** the clearest candidate. The site was already managed by at least 2019, GA4 measurement begins in July 2023, sitemap/content expansion appears from April 2024 through January 2025, and organic traffic steps up sharply in January to March 2025.
2. **Taqueria La Paz:** domain/measurement/site evidence clusters in April 2024. Traffic is quiet through November 2024, then Organic Search becomes substantial in December 2024 and remains elevated.
3. **Decatique Studios:** an established, multi-phase presence. GSC records a sitemap submission in December 2017 and the Wayback Machine has a homepage capture by August 2018. GA4 begins in 2023; a much broader jewelry-buyer page footprint appears in retained GSC data during late 2025 to 2026.
4. **OneWithUX:** legacy presence is visible as far back as 2019, but the connected data does not show a durable search-success phase.
5. **Nice Right and UXOXO:** measurement signals exist, but they are internal/brand history rather than client-result proof.
6. **A Bober Masonry and Dummy Reader:** site or property traces exist, but not enough outcome data. Green Goods remains represented by source records rather than connected GA4/GSC data.

### The sentence we can use internally

> The data shows when a project's measurable presence changed. It does not, by itself, show who caused the change. Project calendars, invoices, launch records, or client confirmation are the final attribution layer.

## Evidence hierarchy

- **Observed:** directly returned by GA4 Admin/Data API, Search Console, sitemap inventory, Wayback availability, or RDAP.
- **Corroborating pattern:** multiple observed signals line up in time.
- **Hypothesis:** plausible phase interpretation that still needs the project record.
- **Not established:** must not become public copy yet.

## Data limits

- GA4 monthly history was queried from the API-valid floor of **14 August 2015** through **27 August 2026**. A GA4 property's `createTime` and first data month describe measurement setup, not necessarily project launch.
- Search Console performance was queried from **15 April 2025** through **27 August 2026**. A query from 2020 to 31 March 2025 returned zero rows for the checked properties, confirming the retention boundary rather than proving no earlier search activity.
- Search Console `lastSubmitted` is the current recorded sitemap submission timestamp; it is not a complete submission history.
- Wayback dates prove that a public capture was available near that date. They do not prove authorship or Nice Right involvement.
- The Universal Analytics/GA3 Management API returned HTTP 404. No GA3 property/view history was available through the connected credential. Old GA3 exports, screenshots, or a BigQuery/archive source would be needed to bridge that gap.
- The Google Tag Manager probe returned HTTP 403 because the current OAuth token does not include Tag Manager scopes. GTM data was not used in any conclusion.
- Duplicate GA4/GSC properties are shown as separate sources and are never summed as if they were one property.
- Both vaulted Google identities were checked: the `marcin.uxa` identity contains the first portfolio set; the `uxoxo.xyz` identity contains Nice Right, Dummy Reader, a second UXOXO property, and a second Taqueria property.
- `marcin.uxa` was checked as a Google identity, not a public domain. No `uxoxox.xyz` site/property was found; the connected site is `uxoxo.xyz`.

## Project timelines

## 1. Master Scoopers. strongest attribution candidate

### Observed anchors

| Date | Source | Observation |
|---|---|---|
| 22 Apr 2019 | GSC sitemap record | `http://www.masterscoopers.com/sitemap_index.xml` was submitted. This is the earliest Google-managed presence record found for the domain. |
| 20 Sep 2021 | Wayback availability | Homepage capture available near this date. |
| 22 Jul 2023 | GA4 Admin/Data API | Property and web stream created; first measurable month is July 2023. |
| Apr 2024 | GSC sitemap record | HTTPS `sitemap.xml` submitted 17 Apr 2024. |
| Jul 2024 | GSC sitemap record + GA4 | FAQ sitemap submitted 10 Jul; Organic Search reaches 98 sessions in July and 138 in August. |
| Nov 2024 to Jan 2025 | GSC sitemap records | Post sitemap 29 Nov; page sitemap 14 Dec; sitemap index 24 Jan; service-area sitemap 25 Jan. |
| Jan to Mar 2025 | GA4 | Total sessions: **385 → 849 → 1,139**. Organic Search sessions: **290 → 780 → 1,050**. |
| 15 Apr 2025 onward | GSC | Earliest retained Search Console window. First retained window already contains 34 click-producing pages; content pages, not only the homepage, carry the traffic. |

### Phase interpretation

- **Phase 0. established presence:** definitely predates April 2019; the exact owner/work history is unknown.
- **Phase 1. measurement:** GA4 begins July 2023 with a small baseline, generally 44 to 64 sessions/month through late 2023 and early 2024.
- **Phase 2. content/SEO architecture:** sitemap expansion begins April 2024 and continues through January 2025. Organic Search grows from 71 sessions in March 2024 to 138 in August 2024.
- **Phase 3. measurable impact:** the strongest step-change is January to March 2025. Comparing Oct to Dec 2024 (449 sessions) with Jan to Mar 2025 (2,373) gives **+428.5%**. The adjacent six-month comparison that best matches the old website claim is Apr to Sep 2024 (734) to Oct 2024 to Mar 2025 (2,829), **+285.4%**.
- **Phase 4. maintenance/decay:** later GA4 and GSC months decline from the 2025 peak. The case study should describe the dated growth period, not claim current growth.

### What this can become

**Candidate, pending project timeline:**

> During the 2024 to 25 content and search phase, Master Scoopers' GA4 sessions rose from 734 to 2,829 across adjacent six-month periods. a 285.4% increase.

This is the best replacement for the unqualified "290%" claim. Before publishing, match the dates to the actual work and obtain client permission.

## 2. Taqueria La Paz. April 2024 start signal, December 2024 visibility phase

### Observed anchors

| Date | Source | Observation |
|---|---|---|
| 9 Feb 2024 | RDAP | Domain registration lower bound. Not a work-start date. |
| 17 Apr 2024 | GA4 Admin/Data API | Property and stream created; first data appears in April. |
| 27 Apr 2024 | Wayback availability | Homepage capture available near this date. |
| Apr to Nov 2024 | GA4 | Quiet/low baseline: monthly sessions range from 2 to 27. |
| Dec 2024 | GA4 | Sessions jump to 166; Organic Search becomes 98 sessions. |
| Jan to Mar 2025 | GA4 | Sessions continue at 289, 318, 379; Organic Search at 141, 143, 174. |
| Apr 2025 onward | GSC | Search Console retained data shows two pages first, then menu/contact/about pages appear in later windows. |
| 4 Apr 2026 | GSC sitemap record | WordPress sitemap submitted. This is not the beginning of the site or the beginning of search performance. |

### Phase interpretation

- **Phase 1. launch/measurement:** April 2024 is the strongest start-of-presence candidate because domain, GA4, and archive evidence cluster together.
- **Phase 2. quiet build or pre-visibility:** April to November 2024 has little traffic.
- **Phase 3. search visibility:** December 2024 is the obvious inflection. Organic Search becomes a sustained acquisition source rather than an occasional event.
- **Phase 4. page/architecture expansion:** retained GSC data grows from 2 visible pages in Apr to Sep 2025 to 6 visible pages in Apr to Aug 2026.

### What this can become

**Dated outcome, not yet causal copy:**

> A Chicago restaurant moved from a quiet measurement baseline in 2024 to sustained Organic Search visibility beginning in December 2024.

The hard public number remains **1,922 organic Search clicks and 68,907 impressions in the latest retained year**. The December inflection is useful for a case-study narrative once the work date is confirmed.

## 3. Decatique Studios. established presence with several rebuild/content phases

### Observed anchors

| Date | Source | Observation |
|---|---|---|
| 18 Apr 2017 | RDAP | Domain registration lower bound. |
| 31 Dec 2017 | GSC sitemap record | `http://decatiquestudios.com/sitemap.xml` was submitted. |
| 5 Aug 2018 | Wayback availability | Homepage capture available near this date. |
| 18 Dec 2019, 1 Dec 2021, 28 Nov 2022 | Wayback availability | Later homepage captures confirm continuing public presence. |
| 27 Jun 2023 | GA4 Admin/Data API | First GA4 property created; first data appears in June. |
| 9 Nov 2023 | GA4 Admin/Data API | Second GA4 property created under a different account/timezone; treat as duplicate/migration until identified. |
| 17 Apr 2024 | GSC sitemap record | HTTPS `sitemap.xml` submitted. |
| 8 Dec 2024 | GSC sitemap record | `sitemap_index.xml` submitted; GSC reports 4 warnings and 1 error. |
| Oct 2025 to Mar 2026 | GSC URL property | Click-producing pages expand from 6 in the first retained window to 25; jewelry-buyer pages become visible. |
| 14 Aug 2026 | GSC sitemap record | New hyphenated sitemap index submitted with 75 URLs; current XML reports 76 URLs with identical current `lastmod` metadata, suggesting a platform/rebuild artifact rather than reliable page history. |

### Phase interpretation

- **Phase 0. legacy presence:** established by late 2017/2018, well before the available GA4 records.
- **Phase 1. GA4 measurement:** June 2023 property; Organic Search is already the primary channel in the first months.
- **Phase 2. sitemap/content management:** HTTPS sitemap in April 2024, sitemap index in December 2024.
- **Phase 3. content-cluster expansion:** in retained GSC data, click-producing pages grow from 6 to 25 and then 26 as jewelry-buyer pages become visible.
- **Phase 4. current rebuild/migration signal:** the August 2026 sitemap change and all-page `lastmod` reset should be treated as a migration/configuration event until verified.

### What this can become

> Decatique is not a "before/after one launch" story. It is a long-running presence that appears to have passed through measurement, sitemap, and content-cluster phases.

The strongest measurable proof remains the current search footprint: **136,414 impressions, 725 clicks, and a 32.5% latest-90-day click increase** in the previously audited window. The exact work period needs to be matched to the page-cluster expansion.

## 4. OneWithUX. legacy site, no defensible search-success phase

- RDAP registration: December 2018.
- Wayback captures: July 2019, November 2020, December 2021, March 2022, and September 2024.
- GA4 property/stream: 17 June 2023; first data appears in June.
- Traffic is primarily Direct, intermittent, and low volume.
- Search Console retained data shows impressions but **zero clicks**.

**Conclusion:** useful founder/site history, not a client-result case study.

## 5. UXOXO. two GA4 measurement phases, no Search Console outcome

- Wayback capture available near January 2024.
- GA4 property/stream A created 12 April 2024 for `https://www.uxoxo.xyz`; data appears April to July 2024.
- GA4 property/stream B created 10 October 2024 for `http://uxoxo.xyz`; data resumes October 2024 onward.
- The split is observed; it may be a migration or duplicate setup. Do not sum the properties until continuity is confirmed.
- Traffic is primarily Direct and there is no meaningful GSC outcome.

**Conclusion:** internal brand history only; no defensible search-success phase.

## Nice Right. newly instrumented internal property

- GA4 property **529974758** and its web stream were created 25 March 2026; first data appears in March 2026.
- The current GA4 series is therefore not evidence about earlier Nice Right site history.
- GSC `sc-domain:niceright.co` is connected under the second identity: 12 clicks and 619 impressions in the retained window.
- This is useful funnel/instrumentation evidence, not a client-result claim.

**Conclusion:** Nice Right is now covered in the timeline as an internal measurement phase, but there is no older GA4 history in the connected accounts.

## Dummy Reader. property exists, no data

- GA4 property **529935066** and a `dummyreader.com` web stream were created 25 March 2026.
- The historical report returned no data rows.
- No connected GSC performance source was available.

**Conclusion:** property/setup signal only; no measurable presence phase.

## 6. A Bober Masonry. insufficient volume

- Domain registration lower bound: July 2023.
- Wayback homepage capture: May 2024.
- GA4 property/stream created: August 2024.
- Only a small amount of GA4 data is present, with a peak of 11 monthly sessions.

**Conclusion:** evidence of a measurement/site trace, not a public proof point.

## Projects named in source documents but absent from this connected data

Nice Right source records mention **Dummy Reader** and **Green Goods** as active or historical work. Dummy Reader now has a GA4 property under the second identity, but it has no data rows. No connected GA4/GSC timeline for Green Goods appeared in either identity. Their project pages can still prove product/design work, but not an analytics-based "presence growth" claim.

## Claim candidates for Nice Right

These are not yet approved website copy. They are the strongest evidence-shaped directions:

1. **Master Scoopers:** "Sessions increased 285.4% across adjacent six-month periods during the documented 2024 to 25 growth phase."
2. **Master Scoopers:** "452K Google Search impressions and 2,053 clicks in the latest retained year."
3. **Taqueria La Paz:** "1,922 organic Search clicks for a Chicago restaurant in the latest retained year."
4. **Decatique:** "Search visibility expanded from 6 to 25 click-producing pages across retained Search Console windows."
5. **Decatique:** "Search clicks increased 32.5% in the latest 90-day comparison."

Do not yet publish:

- "I started working on [date]" without a project record.
- "I caused the traffic increase" without matching intervention and comparison dates.
- "12× more leads" without baseline, event definition, and downstream validation.
- "80% time saved" without process baseline and client-confirmed measurement.
- Any combined total across duplicate GA4 properties.

## Final attribution checklist

Before a timeline becomes a case study, attach:

1. Project start/rebuild/content-launch date from an invoice, calendar, email, repository, or client confirmation.
2. Canonical analytics property and stream ID.
3. Exact baseline and comparison dates.
4. Sitemap/page/content changes made during the window.
5. Business outcome: form, call, sale, or client-confirmed result.
6. Permission to name the client and publish the number.

## Saved evidence

- Compact evidence snapshot: `docs/research/portfolio-timeline-evidence.json` (updated to include both Google identities)
- Shareable timeline deck: `docs/research/portfolio-timeline-audit.html`
- PDF export: `docs/research/portfolio-timeline-audit.pdf`
- Prior portfolio proof deck: `docs/research/portfolio-proof-audit.html`
- Prior portfolio proof PDF: `docs/research/portfolio-proof-audit.pdf`
