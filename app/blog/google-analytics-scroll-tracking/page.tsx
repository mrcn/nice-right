import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Google Analytics: Find Out How Far Users Are Scrolling with Scroll Event Tracking | Nice Right',
  description: 'Gauge how interested users are in a page&apos;s content using Scroll Depth triggers.',
}

export default function GoogleAnalyticsScrollTrackingPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#work">Work</a>
            <a href="/blog">Insights</a>
            <a href="/#contact" className="btn btn-sm">Start Project</a>
          </div>
        </div>
      </nav>

      <article className="blog-post">
        <div className="container">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">Coding & Config</span>
              <span className="post-dot">•</span>
              <span className="post-date">April 28, 2022</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">4 min read</span>
            </div>
            <h1 className="post-title">Google Analytics: Find Out How Far Users Are Scrolling with Scroll Event Tracking</h1>
            <p className="post-subtitle">Gauge how interested users are in a page&apos;s content using Scroll Depth triggers.</p>
          </header>

          <div className="post-content">
            <p>It seems like a lot of my clients don&apos;t get really useful information from Google Analytics because they don&apos;t segment their data, and they don&apos;t leverage the various tools that GA provides.</p>

            <p>Using this Scroll Depth trigger is one way to gauge how interested users are in a page&apos;s content.</p>

            <h2>Step 1 - Configure Your Variables</h2>

            <h2>Step 2 - Create The Trigger</h2>

            <h2>Step 3 - Create The Tag</h2>

            <h2>Step 4 - Test</h2>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Google Analytics</span>
              <span className="tag">GTM</span>
              <span className="tag">Tracking</span>
            </div>
            
            <nav className="post-nav">
              <Link href="/blog" className="back-link">← All Insights</Link>
            </nav>
          </footer>
        </div>
      </article>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}
