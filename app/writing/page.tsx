import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/app/lib/articles';
import WritingFilter from './WritingFilter';

export const metadata: Metadata = {
  title: 'Writing | Nice Right',
  description:
    'Practitioner writing on AI coding, testing, and strategy. Verified sources, disclosed conflicts, honest numbers.',
};

export default function WritingIndex() {
  const articles = getAllArticles();

  return (
    <>
      <nav className="wr-nav">
        <div className="wr-nav-inner">
          <Link href="/" className="wr-nav-logo">
            Nice Right
          </Link>
          <div className="wr-nav-links">
            <a href="/#services">Services</a>
            <a href="/#results">Results</a>
            <Link href="/writing" className="wr-nav-active">
              Writing
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
            <p className="wr-section-label">Writing</p>
            <h1>Practitioner writing on AI and strategy</h1>
            <p className="wr-intro">
              Field notes from building and shipping with AI tools. Verified sources, disclosed
              conflicts, honest numbers.
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
