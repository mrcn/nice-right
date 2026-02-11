import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Google Analytics: How To Set Up & Test Cross Domain Tracking in GA & Tag Manager | Nice Right',
  description: 'Configure multiple domains to report to a single Google Analytics view.',
}

export default function GoogleAnalyticsCrossDomainPage() {
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
              <span className="post-read-time">8 min read</span>
            </div>
            <h1 className="post-title">Google Analytics: How To Set Up & Test Cross Domain Tracking in GA & Tag Manager</h1>
            <p className="post-subtitle">Configure multiple domains to report to a single Google Analytics view.</p>
          </header>

          <div className="post-content">
            <h2>Making Sure Your Properties Are Set Up Correctly</h2>

            <p>If your business website spans multiple domains, you might want each domain to report to a separate Google Analytics property or view. Alternatively, there are strong arguments for having all domains report to a single view. Fortunately, it&apos;s relatively simple to configure either setup.</p>

            <p>If you&apos;d like to learn why you might want all your domains and sub-domains reporting to a single view, you can email me and ask.</p>

            <p>But here I&apos;m going to show you how I did it.</p>

            <h2>Step 1: Create a Cross-Domain Tracking &quot;Auto Link&quot; Variable in Google Tag Manager (GTM)</h2>

            <ul>
              <li>Open Google Tag Manager (GTM).</li>
              <li>Create a new Auto Link Domains variable.</li>
              <li>Add all the domains you want to link together in this variable.</li>
            </ul>

            <p>Example: <code>example.com, example2.com</code>.</p>

            <p>This variable will define which domains are linked. Later, you&apos;ll use it to configure your tags</p>

            <h2>Step 2: Create a Google &quot;Universal Analytics&quot; Tag & Modify Configuration in Google Tag Manager</h2>

            <p>Now that you&apos;ve created the variable, let&apos;s use it in a Universal Analytics pageview tag.</p>

            <ul>
              <li>In GTM, create or edit your Universal Analytics pageview tag.</li>
              <li>Under Google Analytics Settings, select the correct UA variable.</li>
            </ul>

            <p>This determines which Google Analytics property will receive the data.</p>

            <h3>Fields to Set</h3>

            <p><strong>allowLinker: true</strong></p>

            <p>This setting ensures that data is passed across domains, preserving session continuity. If you omit a domain in your Auto Link variable, tracking will break when users navigate to that domain.</p>

            <p><strong>cookieName: _rollup</strong></p>

            <p>Use a shared cookie name across all linked domains. In this guide, we use <code>_rollup</code> to indicate that the data is part of a consolidated view. You can choose a different name if preferred.</p>

            <p>Ta...</p>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Google Analytics</span>
              <span className="tag">GTM</span>
              <span className="tag">Cross-Domain</span>
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
