# Understand analytics event map

Date: 2026-06-23

## Implementation

Understand pages use `app/labs/understand/_components/UnderstandAnalytics.tsx`.

It listens for:

- click events on `[data-understand-event]`
- play events on `[data-understand-audio]`

Events are sent through `trackUnderstandEvent()` in `app/lib/analytics.ts` and include:

```text
product: understand
page: window.location.pathname
label
href, when present
```

## Current events

| Event | Trigger |
|---|---|
| `understand_play_testing_cta_clicked` | Google Play / testing CTA clicks |
| `understand_testing_page_clicked` | Internal navigation to Testing page |
| `understand_examples_clicked` | Internal navigation to Examples index |
| `understand_how_it_works_clicked` | Internal navigation to How It Works |
| `understand_example_clicked` | Example page click, currently Aesop |
| `understand_audio_play` | Audio playback, currently Aesop sample |

## Next analytics additions

- `understand_compare_original_viewed`
- `understand_retelling_style_selected`
- `understand_closeness_selected`
- `understand_use_case_clicked`
- `understand_guide_clicked`
- `understand_domain_cta_clicked` after standalone domain exists

## Notes

This is intentionally light. It does not block static generation and stays compatible with the current GA helper.
