import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Google Analytics Cross-Domain Tracking | Nice Right',
  description: 'How to configure cross-domain tracking in Google Analytics for multiple domains.',
}

export default function CrossDomainTrackingPage() {
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
              <span className="post-date">May 4, 2019</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">4 min read</span>
            </div>
            <h1 className="post-title">Google Analytics Cross-Domain Tracking</h1>
            <p className="post-subtitle">How to configure cross-domain tracking in Google Analytics for multiple domains.</p>
          </header>

          <div className="post-content">
            <h2>Making Sure Your Properties Are Set Up Correctly</h2>

            <p>If your business website spans multiple domains, you might want each domain to report to a separate Google Analytics property or view. Alternatively, there are strong arguments for having all domains report to a single view. Fortunately, it is relatively simple to configure either setup.</p>

            <p>If you would like to learn why you might want all your domains and sub-domains reporting to a single view, <a href="mailto:Marcin@uxoxo.xyz">you can email me and ask</a>.</p>

            <p>But here I am going to show you how I did it.</p>

            <h2>Step 1: Create a Cross-Domain Tracking Auto Link Variable in Google Tag Manager (GTM)</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://uxoxo.xyz/wp-content/uploads/2019/05/1-cross-domain-01.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <ol>
              <li>Open <strong>Google Tag Manager (GTM)</strong>.</li>
              <li>Create a new <strong>Auto Link Domains</strong> variable.</li>
              <li>Add all the domains you want to link together in this variable. Example: <code>example.com, example2.com</code>.</li>
            </ol>

            <p>This variable will define which domains are linked. Later, you will use it to configure your tags.</p>

            <h2>Step 2: Create a Google Universal Analytics Tag &amp; Modify Configuration in Google Tag Manager</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://uxoxo.xyz/wp-content/uploads/2019/05/2-cross-domain-02.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <p>Now that you have created the variable, let us use it in a Universal Analytics pageview tag.</p>

            <ol>
              <li>In GTM, create or edit your Universal Analytics <strong>pageview tag</strong>.</li>
              <li>Under <strong>Google Analytics Settings</strong>, select the correct UA variable. This determines which Google Analytics property will receive the data.</li>
            </ol>

            <h3>Fields to Set</h3>

            <ul>
              <li><strong>allowLinker: true</strong> - This setting ensures that data is passed across domains, preserving session continuity. If you omit a domain in your Auto Link variable, tracking will break when users navigate to that domain.</li>
              <li><strong>cookieName: _rollup</strong> - Use a shared cookie name across all linked domains. In this guide, we use <code>_rollup</code> to indicate that the data is part of a consolidated view. You can choose a different name if preferred.</li>
            </ul>

            <h3>Tag Configuration</h3>

            <p>In the <strong>Cross-Domain Tracking</strong> section, select the variable you created earlier (<code>Auto Link Domains</code>). Initially, you might see &quot;true&quot; entered manually, but make sure to replace it with the correct variable name.</p>

            <p>Now that we have a variable which auto-magically links your domains together, we are going to put it to work inside of our pageview tag. Make sure to select the correct UA variable under &quot;Google Analytics Settings.&quot; The view corresponding to the UA code here is the one which all our data will display to.</p>

            <h3>Testing: Real Time Reporting Method</h3>

            <p>You can do it in &quot;real time&quot; by visiting the domains you linked together and viewing the real time reports. If you, a single user, is showing up as 2 or more users (1 user per page), then it is not correctly set up. However, if you have lots of traffic on your site this method will not work. You simply will not be able to tell if the difference between the numbers is significant or accurate.</p>

            <h2>Step 3: The UTM Method of Testing The Success of Your Cross Domain Tracking</h2>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://uxoxo.xyz/wp-content/uploads/2019/05/3-creating-utm-and-browsing-site.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <h3>3.1 Create UTM and Browse All Domains</h3>

            <h3>3.2 The UTM Method</h3>

            <p>This method tracks a user&apos;s journey using a UTM parameter.</p>

            <ol>
              <li><strong>Create a UTM link</strong> using the <a href="https://ga-dev-tools.appspot.com/campaign-url-builder/">Google Campaign URL Builder</a>.</li>
              <li>Visit your site with the UTM link and navigate across all linked domains.</li>
              <li>In Google Analytics:
                <ul>
                  <li>Go to <strong>Behavior &gt; Site Content &gt; All Pages</strong>.</li>
                  <li>Create a segment using your UTM source as the traffic source.</li>
                  <li>Apply the segment to view all pages visited during the session. The list should show pages from all linked domains in order of visitation.</li>
                </ul>
              </li>
            </ol>

            <p><strong>Tip:</strong> Ensure the view you are using does not filter out your IP address. Filtering your own traffic can lead to misleading results.</p>

            <div className="video-container">
              <video controls width="100%">
                <source src="https://uxoxo.xyz/wp-content/uploads/2019/05/4-create-segment-from-utm-and-view-pages.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <h2>Troubleshooting Common Issues</h2>

            <ul>
              <li><strong>Session Breaks:</strong> Double-check your Auto Link Domains variable to ensure all linked domains are included.</li>
              <li><strong>Cookie Errors:</strong> Verify that all linked domains use the same cookie name in their configurations.</li>
              <li><strong>Real-Time Testing Fails:</strong> Use the UTM method for precise results.</li>
            </ul>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Google Analytics</span>
              <span className="tag">GTM</span>
              <span className="tag">Cross-Domain</span>
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
