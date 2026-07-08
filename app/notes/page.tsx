import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/app/lib/articles';
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
} from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';
import WritingFilter from './WritingFilter';

const title = 'Notes | Nice Right';
const description =
  'Practitioner notes on AI coding, testing, and strategy. Verified sources, disclosed conflicts, honest numbers.';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Notes | Nice Right',
  description,
  path: '/notes/',
});

export default function WritingIndex() {
  const articles = getAllArticles();
  const collectionSchema = buildCollectionPageSchema({
    name: title,
    description,
    path: '/notes/',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Notes', path: '/notes/' },
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
            <Link href="/studies">Studies</Link>
            <Link href="/notes" className="wr-nav-active">
              Notes
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
            <p className="wr-section-label">Notes</p>
            <h1>Practitioner notes on AI and strategy</h1>
            <p className="wr-intro">
              Field notes from building and shipping with AI tools. Verified
              sources, disclosed conflicts, honest numbers.
            </p>
          </div>
        </section>

        <section className="wr-list">
          <div className="wr-container">
            <WritingFilter articles={articles} />
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
