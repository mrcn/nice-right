import type { FAQPage, WebSite, WithContext } from 'schema-dts';

// schema-dts does not support @type arrays directly, so we use a plain object
// typed as the JSON-LD payload we emit.
export interface LocalBusinessJsonLd {
  '@context': string;
  '@type': string[];
  name: string;
  url: string;
  description: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  priceRange: string;
  areaServed: string;
}

export const localBusinessSchema: LocalBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Nice Right',
  url: 'https://niceright.co',
  description:
    'Digital growth partner for small businesses — strategy, design, and SEO that turns your website into your best salesperson.',
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
};

export const webSiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nice Right',
  url: 'https://niceright.co',
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
