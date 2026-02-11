import './page.css'

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <div className="logo">Nice Right</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#work">Work</a>
            <a href="#contact" className="btn btn-sm">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <p className="hero-label">Digital Growth Partner for Small Businesses</p>
          <h1>
            More Customers.
            <br />
            Lower Costs.
            <br />
            <span className="accent">Better Retention.</span>
          </h1>
          <p className="hero-subtitle">
            We build websites, apps, and marketing systems that help small businesses 
            acquire customers more efficiently, serve them at lower cost, and keep them longer.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn">Start a Project</a>
            <a href="#services" className="btn btn-outline">See Services</a>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2>Digital Services That Drive Growth</h2>
          <p>From first impression to long-term loyalty, we help at every stage.</p>
          
          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Acquisition</h3>
              <p>Marketing websites, SEO, AEO/GEO optimization, inbound content, and sales support tools that turn visitors into customers.</p>
            </div>
            <div className="card">
              <div className="card-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>Custom apps, automation workflows, and internal tools that reduce your cost to serve and free up your team.</p>
            </div>
            <div className="card">
              <div className="card-icon">🔄</div>
              <h3>Retention</h3>
              <p>Customer portals, self-service systems, and engagement tools that keep customers coming back.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="approach">
        <div className="container">
          <div className="approach-grid">
            <div>
              <p className="section-label">How We Work</p>
              <h2>Built for Small Business Reality</h2>
              <p>No bloated processes. No enterprise overhead. Just focused work that delivers results.</p>
              
              <ul className="approach-list">
                <li><strong>Fast to launch</strong> — MVPs in weeks, not months</li>
                <li><strong>Clear communication</strong> — No jargon, regular updates
                </li>
                <li><strong>Measurable outcomes</strong> — We track what matters to you
                </li>
                <li><strong>Flexible engagement</strong> — Project-based or ongoing support</li>
              </ul>
            </div>
            <div className="approach-stats">
              <div className="stat">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Launched</div>
              </div>
              <div className="stat">
                <div className="stat-number">13+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">2x</div>
                <div className="stat-label">Avg Efficiency Gain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work">
        <div className="container">
          <p className="section-label">Selected Work</p>
          <h2>Projects That Moved the Needle</h2>
          
          <div className="work-grid">
            <div className="work-item">
              <div className="work-content">
                <h3>Healthcare Real Estate Portal</h3>
                <p>Custom investment platform connecting healthcare providers with property opportunities. Reduced inquiry-to-close time by 40%.</p>
                <div className="work-tags">
                  <span>Web App</span>
                  <span>UX Design</span>
                  <span>Development</span>
                </div>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-content">
                <h3>Biodiversity Impact Platform</h3>
                <p>Software to fund ecological gardens and track environmental impact at scale. Gamified engagement increased participation 3x.</p>
                <div className="work-tags">
                  <span>Product Strategy</span>
                  <span>Full Stack</span>
                  <span>Impact Tracking</span>
                </div>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-content">
                <h3>Corporate Micro-Interactions</h3>
                <p>Animation system for Fortune 500 corporate site. Improved engagement metrics and modernized brand perception.</p>
                <div className="work-tags">
                  <span>Animation</span>
                  <span>Frontend</span>
                  <span>Design System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Ready to grow smarter?</h2>
            <p>Tell us what you're building. We'll respond within 24 hours.</p>
            
            <div className="contact-methods">
              <a href="mailto:hello@niceright.co" className="contact-card">
                <div className="contact-icon">✉️</div>
                <div>
                  <strong>Email</strong>
                  <span>hello@niceright.co</span>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/mklaudiusz" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">💼</div>
                <div>
                  <strong>LinkedIn</strong>
                  <span>Connect with us</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2026 Nice Right. Built for small businesses that want to grow.</p>
        </div>
      </footer>
    </>
  )
}