import './page.css'

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <div className="logo">Nice Right</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#insights">Insights</a>
            <a href="#contact" className="btn btn-sm">Start Project</a>
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
            We build websites, apps, and digital systems that help small businesses grow. 
            From first impression to long-term loyalty, we optimize every touchpoint for results.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn">Discuss Your Project</a>
            <a href="#services" className="btn btn-outline">See Our Services</a>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2>Three Ways We Drive Growth</h2>
          <p className="section-intro">Every digital touchpoint is an opportunity. We build systems that work together.</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-number">01</div>
              <h3>Get More Customers</h3>
              <p className="service-desc">Marketing websites, landing pages, and inbound systems that turn visitors into qualified leads.</p>
              <ul className="service-list">
                <li>High-converting websites & landing pages</li>
                <li>SEO, AEO, GEO optimization</li>
                <li>AI-powered content systems</li>
                <li>Sales support tools & automation</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-number">02</div>
              <h3>Lower Service Costs</h3>
              <p className="service-desc">Custom apps, self-service portals, and automation that reduce manual work and support burden.</p>
              <ul className="service-list">
                <li>Custom web applications</li>
                <li>Customer self-service portals</li>
                <li>Internal tools & workflows</li>
                <li>Process automation</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-number">03</div>
              <h3>Keep Them Longer</h3>
              <p className="service-desc">Engagement systems, retention programs, and loyalty tools that maximize customer lifetime value.</p>
              <ul className="service-list">
                <li>Customer engagement platforms</li>
                <li>Retention & loyalty systems</li>
                <li>Re-engagement campaigns</li>
                <li>Proofs of concept & MVPs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-content">
              <p className="section-label">Why Work With Us</p>
              <h2>Product Leader With 10+ Years Driving Revenue</h2>
              <p>
                Expert at connecting measurable business outcomes to digital strategy. 
                From complex enterprise systems to scrappy startup MVPs, we know how to 
                build what actually moves the needle. Proven record of 100+ successful 
                launches and double-digit efficiency gains.
              </p>
              
              <div className="stats">
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
            
            <div className="proof-image">
              <img src="/images/me-low.jpg" alt="Martin Dabrowski" className="profile-image" />
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work">
        <div className="container">
          <p className="section-label">Selected Work</p>
          <h2>Projects That Moved the Needle</h2>
          <p className="section-intro">Real results for real businesses. Every project focused on measurable outcomes.</p>
          
          <div className="work-grid">
            <a href="/work/northern-trust" className="work-item">
              <div className="work-image">
                <img src="/images/bankk.webp" alt="Northern Trust" />
              </div>
              <div className="work-content">
                <span className="work-client">Northern Trust</span>
                <h3>Corporate Website & Animation System</h3>
                <p>Design and development of micro-interactions for Fortune 500 financial services. Improved engagement metrics and modernized brand perception.</p>
                <span className="work-link">View case study →</span>
              </div>
            </a>
            
            <a href="/work/healthcare-real-estate" className="work-item">
              <div className="work-image">
                <img src="/images/nursing-home-money.webp" alt="Healthcare Portal" />
              </div>
              <div className="work-content">
                <span className="work-client">Healthcare Investment Platform</span>
                <h3>Real Estate Investment Portal</h3>
                <p>Custom B2B platform connecting healthcare providers with property opportunities. Reduced inquiry-to-close time by 40%.</p>
                <span className="work-link">View case study →</span>
              </div>
            </a>
            
            <a href="/work/green-goods" className="work-item">
              <div className="work-image">
                <img src="/images/garden-money.webp" alt="Green Goods" />
              </div>
              <div className="work-content">
                <span className="work-client">GreenPill Dev Guild</span>
                <h3>Biodiversity Impact Platform</h3>
                <p>Software to fund ecological gardens and track environmental impact at scale. Gamified engagement increased participation 3x.</p>
                <span className="work-link">View case study →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="insights" className="insights">
        <div className="container">
          <p className="section-label">Insights</p>
          <h2>Thinking on Product, UX & Growth</h2>
          
          <div className="insights-grid">
            <a href="/blog/health-is-wealth" className="insight-item">
              <div className="insight-meta">
                <span className="insight-category">Product Strategy</span>
                <span className="read-time">2 min read</span>
              </div>
              <h3>Design a Self-Funded Retirement System Through Healthy Living</h3>
              <p>Exploring behavioral economics and incentive design to create sustainable health habits.</p>
            </a>
            
            <a href="/blog/blockchain-art-economics" className="insight-item">
              <div className="insight-meta">
                <span className="insight-category">Web3 & Economics</span>
                <span className="read-time">5 min read</span>
              </div>
              <h3>Designing at the Intersection of Blockchain, Art, and Economics</h3>
              <p>How tokenomics and user experience converge in the creator economy.</p>
            </a>
            
            <a href="/blog/poshmark-social-commerce" className="insight-item">
              <div className="insight-meta">
                <span className="insight-category">UX Analysis</span>
                <span className="read-time">7 min read</span>
              </div>
              <h3>Poshmark: Social Media Behavior & eCommerce Incentives</h3>
              <p>Breaking down the psychology behind successful marketplace engagement.</p>
            </a>
            
            <a href="/blog/google-analytics-scroll-tracking" className="insight-item">
              <div className="insight-meta">
                <span className="insight-category">Analytics</span>
                <span className="read-time">4 min read</span>
              </div>
              <h3>Google Analytics: Scroll Event Tracking</h3>
              <p>Technical guide to understanding user engagement through scroll depth measurement.</p>
            </a>

            <a href="/blog/ssh-vscode-lightsail" className="insight-item">
              <div className="insight-meta">
                <span className="insight-category">Coding & Config</span>
                <span className="read-time">3 min read</span>
              </div>
              <h3>Setting up SSH with VS Code for Amazon Lightsail</h3>
              <p>Connect VS Code to your Amazon Lightsail instance for seamless remote development.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <p className="section-label">Get Started</p>
            <h2>Ready to Grow Smarter?</h2>
            <p className="contact-desc">
              Let's discuss how we can help you acquire more customers, serve them more efficiently, 
              and keep them longer. From quick wins to long-term strategy.
            </p>
            
            <div className="contact-methods">
              <a href="mailto:Marcin@uxoxo.xyz" className="contact-card">
                <div className="contact-icon">✉️</div>
                <div>
                  <strong>Email</strong>
                  <span>Marcin@uxoxo.xyz</span>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/mklaudiusz" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">💼</div>
                <div>
                  <strong>LinkedIn</strong>
                  <span>Connect with me</span>
                </div>
              </a>
            </div>
            
            <p className="location">Based in Cleveland, Ohio • Working with businesses everywhere</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}