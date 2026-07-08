import Link from 'next/link';
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
} from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Studies | Nice Right',
  description:
    'Open design studies, product questions, and artifact-led investigations from Nice Right.',
  path: '/studies/',
};

const studies = [
  {
    slug: 'understand-first-run',
    title: 'Understand — First Run',
    label: 'Featured study',
    category: 'Open Design · Product UX',
    description:
      'Rethinking first-run for a reading-and-listening product so the opening feels like entry into a real session, not a small playable demo.',
    image: '/images/studies/understand-first-run/current-library.png',
    alt: 'Understand library wireframe showing continue listening, starter books, and own-text entry.',
  },
];

export const metadata = buildSeoMetadata(page);

export default function StudiesIndex() {
  const collectionSchema = buildCollectionPageSchema({
    name: page.title,
    description: page.description,
    path: page.path,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Studies', path: '/studies/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="v9-studies-hero">
        <div className="v9-studies-hero-inner">
          <p className="v9-studies-label">Studies</p>
          <h1>Open design work, made public</h1>
          <p className="v9-studies-intro">
            Product and UX investigations grounded in real artifacts. Each study
            focuses on one design question, what changed, and the evidence
            behind the current direction.
          </p>
        </div>
      </section>

      <section className="v9-studies-list" aria-label="Studies list">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/studies/${study.slug}`}
            className="v9-studies-item"
          >
            <div className="v9-studies-item-image">
              <img
                src={study.image}
                alt={study.alt}
                width="1200"
                height="900"
              />
            </div>
            <div className="v9-studies-item-content">
              <span className="v9-studies-item-eyebrow">{study.label}</span>
              <span className="v9-studies-item-category">{study.category}</span>
              <h2>{study.title}</h2>
              <p>{study.description}</p>
              <span className="v9-studies-item-link">Open study →</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
