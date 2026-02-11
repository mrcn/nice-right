import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Google Analytics Scroll Tracking | Nice Right',
  description: 'Using Scroll Depth trigger to gauge how interested users are in your page content.',
}

export default function ScrollTrackingPage() {
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
              <span className="post-category">Analytics</span>
              <span className="post-dot">•</span>
              <span className="post-date">November 24, 2019</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">4 min read</span>
            </div>
            <h1 className="post-title">Google Analytics Scroll Tracking</h1>
            <p className="post-subtitle">Using Scroll Depth trigger to gauge how interested users are in your page content.</p>
          </header>

          <div className="post-content">
            <p>It seems like a lot of my clients do not get really useful information from Google Analytics because they do not segment their data, and they do not leverage the various tools that GA provides.</p>

            <p>Using this Scroll Depth trigger is one way to gauge how interested users are in a page&apos;s content.</p>

            <h2>Step 1 – Configure Your Variables</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://onewithux.com/wp-content/uploads/2019/11/step1-configure-variables.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <h2>Step 2 – Create The Trigger</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://onewithux.com/wp-content/uploads/2019/11/step2-create-trigger.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <h2>Step 3 – Create The Tag</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://onewithux.com/wp-content/uploads/2019/11/step3-create-tag.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <h2>Step 4 – Test</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://onewithux.com/wp-content/uploads/2019/11/step4-test.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Google Analytics</span>
              <span className="tag">GTM</span>
              <span className="tag">Scroll Tracking</span>
              <span className="tag">Tutorial</span>
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
