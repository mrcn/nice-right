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
    label: 'Open Design · Product UX',
    date: 'July 2026',
    description:
      'Rethinking first-run for a reading-and-listening product so the opening feels like the real experience instead of a small playable demo.',
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

      <nav className="wr-nav">
        <div className="wr-nav-inner">
          <Link href="/" className="wr-nav-logo">
            Nice Right
          </Link>
          <div className="wr-nav-links">
            <a href="/#services">Services</a>
            <a href="/#results">Results</a>
            <Link href="/studies" className="wr-nav-active">
              Studies
            </Link>
            <a href="/#contact" className="wr-nav-cta">
              Book a Free Call
            </a>
          </div>
        </div>
      </nav>

      <main className="wr-main">
        <section className="wr-header">
          <div className="wr-container">
            <p className="wr-section-label">Studies</p>
            <h1>Open design studies and product decision work</h1>
            <p className="wr-intro studies-intro">
              Artifact-led product and UX investigations. These pages show the
              design question, the earlier failure, the current direction, and
              the evidence behind the change.
            </p>
          </div>
        </section>

        <section className="wr-list">
          <div className="wr-container">
            <div className="studies-grid">
              {studies.map((study) => (
                <article key={study.slug} className="study-card">
                  <Link
                    href={`/studies/${study.slug}`}
                    className="study-card-link"
                  >
                    <div className="study-card-image-wrap">
                      <img
                        className="study-card-image"
                        src={study.image}
                        alt={study.alt}
                      />
                    </div>
                    <div className="study-card-body">
                      <div className="study-card-meta">
                        <span className="study-card-label">{study.label}</span>
                        <span className="study-card-date">{study.date}</span>
                      </div>
                      <h2 className="study-card-title">{study.title}</h2>
                      <p className="study-card-desc">{study.description}</p>
                      <span className="study-card-read">Open →</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="wr-footer">
        <div className="wr-container">
          <p>© 2026 Nice Right.</p>
        </div>
      </footer>
    </>
  );
}
