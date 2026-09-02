import type { FAQPage, WithContext } from 'schema-dts';
import { absoluteUrl, SITE_URL } from './seo';

export type JsonLd = Record<string, unknown>;

export const founderSchema: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#marcin-klaudiusz`,
  name: 'Marcin Klaudiusz',
  url: SITE_URL,
  sameAs: ['https://linkedin.com/in/mklaudiusz'],
};

export const localBusinessSchema: JsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#business`,
  name: 'Nice Right',
  url: SITE_URL,
  description:
    'A $1,500 Digital Growth Audit for established Chicago home-service businesses, with clear next steps for fixing where qualified local prospects drop out.',
  founder: { '@id': `${SITE_URL}/#marcin-klaudiusz` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.8781,
    longitude: -87.6298,
  },
  priceRange: '$$$',
  areaServed: 'Chicago',
  sameAs: ['https://linkedin.com/in/mklaudiusz'],
};

export const webSiteSchema: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Nice Right',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#business` },
};

export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function monthToIsoDate(value: string): string | undefined {
  if (!value) return undefined;
  const parsed = Date.parse(`1 ${value}`);
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed).toISOString().slice(0, 10);
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#collection`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  date,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  date?: string;
  keywords?: string[];
}): JsonLd {
  const isoDate = date ? monthToIsoDate(date) : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
    ...(keywords?.length ? { keywords } : {}),
    author: { '@id': `${SITE_URL}/#marcin-klaudiusz` },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    serviceType,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'United States',
  };
}

export function buildCreativeWorkSchema({
  name,
  description,
  path,
  client,
}: {
  name: string;
  description: string;
  path: string;
  client?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(path)}#case-study`,
    name,
    headline: name,
    description,
    url: absoluteUrl(path),
    author: { '@id': `${SITE_URL}/#marcin-klaudiusz` },
    publisher: { '@id': `${SITE_URL}/#business` },
    ...(client ? { about: client } : {}),
  };
}
