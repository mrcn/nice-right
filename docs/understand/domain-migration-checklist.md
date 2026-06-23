# Understand standalone domain migration checklist

## Domain/DNS

- [ ] Choose final domain.
- [ ] Decide apex vs `www` canonical.
- [ ] Decide temporary subdomain if needed, e.g. `understand.uxoxo.xyz`.
- [ ] Add domain to hosting provider.
- [ ] Configure DNS.
- [ ] Verify HTTPS.
- [ ] Confirm apex/www redirects.

## URL migration

Current staging paths:

```text
https://niceright.co/labs/understand/
https://niceright.co/labs/understand/how-it-works/
https://niceright.co/labs/understand/testing/
https://niceright.co/labs/understand/examples/
```

Future own-domain paths:

```text
https://[domain]/
https://[domain]/how-it-works/
https://[domain]/testing/
https://[domain]/examples/
```

Tasks:

- [ ] Update internal links.
- [ ] Update canonical URLs.
- [ ] Update sitemap `siteUrl`.
- [ ] Add redirects from Nice Right lab pages if desired.
- [ ] Decide noindex/canonical for `/labs/understand/studies`.

## Search Console

- [ ] Add domain property.
- [ ] Verify DNS ownership.
- [ ] Submit sitemap.
- [ ] Inspect home, how-it-works, examples, testing.
- [ ] Monitor indexing.

## Robots / sitemap / AI files

- [ ] Root `/robots.txt` present.
- [ ] Root `/sitemap.xml` present.
- [ ] Root `/llms.txt` present.
- [ ] Sitemap includes only intended indexable pages.
- [ ] Lab/study/prototype pages excluded or canonicalized as intended.

## Structured data

Validate with Rich Results Test:

- [ ] Home SoftwareApplication/WebSite/Organization.
- [ ] How It Works WebPage/FAQ/Breadcrumb.
- [ ] Testing SoftwareApplication/FAQ/Breadcrumb.
- [ ] Example pages WebPage/AudioObject/FAQ/Breadcrumb.

## Analytics

- [ ] Configure analytics property for own domain.
- [ ] Track Play testing CTA clicks.
- [ ] Track examples clicks.
- [ ] Track audio plays.
- [ ] Track compare/original views.
- [ ] Track internal navigation to testing.

## Launch QA

- [ ] Mobile hero and nav.
- [ ] CTA links.
- [ ] Audio playback.
- [ ] Page speed / LCP.
- [ ] Accessibility smoke test.
- [ ] Source attribution.
- [ ] Legal/trust disclaimers.
- [ ] Open Graph previews.

## Post-launch

- [ ] Request indexing for core pages.
- [ ] Check Search Console coverage after 48–72 hours.
- [ ] Review queries after first impressions.
- [ ] Adjust title/meta based on actual query data.
