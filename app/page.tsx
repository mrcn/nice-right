import './page.css'

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <div className="logo">Nice Right</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Results</a>
            <a href="#writing">Writing</a>
            <a href="#contact" className="btn btn-sm">Let's Talk</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <p className="hero-label">UX Writing & Content Strategy for Small Businesses</p>
          <h1>
            Words That
            <br />
            <span className="accent">Win Customers</span>
          </h1>
          <p className="hero-subtitle">
            We help small businesses grow through clear messaging, strategic content, and user experiences 
            that convert. 13+ years turning complex products into simple, profitable customer journeys.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn">Start Your Project</a>
            <a href="#services" className="btn btn-outline">See How We Help</a>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2>Three Ways We Drive Growth</h2>
          <p className="section-intro">Every word is an opportunity. We optimize the entire customer journey.</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-number">01</div>
              <h3>Get More Customers</h3>
              <p className="service-desc">Website copy, landing pages, SEO content, and sales messaging that turns visitors into buyers.</p>
              <ul className="service-list">
                <li>Homepage & landing page copy</li>
                <li>Email sequences & nurture campaigns</li>
                <li>SEO blog content & pillar pages</li>
                <li>Sales support materials</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-number">02</div>
              <h3>Lower Service Costs</h3>
              <p className="service-desc">Clear documentation, self-service content, and app copy that reduces support burden.</p>
              <ul className="service-list">
                <li>Help center & FAQ content</li>
                <li>App UI copy & microcopy</li>
                <li>Onboarding flows & tutorials</li>
                <li>Process documentation</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-number">03</div>
              <h3>Keep Them Longer</h3>
              <p className="service-desc">Retention emails, loyalty messaging, and engagement content that builds lasting relationships.</p>
              <ul className="service-list">
                <li>Retention email campaigns</li>
                <li>Customer success content</li>
                <li>Re-engagement sequences</li>
                <li>Loyalty program messaging</li>
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
                Expert at connecting measurable business outcomes to content and UX decisions. 
                Adept at translating complex products into clear, compelling messaging. 
                Proven record of 100+ successful launches and double-digit efficiency gains.
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
          <p className="section-label">Client Results</p>
          <h2>Writing That Moved the Needle</h2>
          <p className="section-intro">Selected work showing content strategy and UX writing in action.</p>
          
          <div className="work-grid">
            <a href="https://uxoxo.xyz/portfolio/designing-developing-mirco-interactions-for-northern-trusts-corporate-website/" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-image">
                <img src="/images/bankk.webp" alt="Northern Trust" />
              </div>
              <div className="work-content">
                <span className="work-client">Northern Trust</span>
                <h3>Corporate Website Animation Strategy</h3>
                <p>UX writing and content strategy for micro-interactions that improved engagement metrics and modernized brand perception for Fortune 500 financial services.</p>
                <span className="work-link">Read case study →</span>
              </div>
            </a>
            
            <a href="https://uxoxo.xyz/portfolio/designing-a-custom-healthcare-real-estate-investment-portal" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-image">
                <img src="/images/nursing-home-money.webp" alt="Healthcare Portal" />
              </div>
              <div className="work-content">
                <span className="work-client">Healthcare Investment Platform</span>
                <h3>Real Estate Investment Portal</h3>
                <p>End-to-end UX writing for a complex B2B platform. Clear messaging reduced inquiry-to-close time by 40% and increased qualified leads.</p>
                <span className="work-link">Read case study →</span>
              </div>
            </a>
            
            <a href="https://uxoxo.xyz/portfolio/green-goods-a-biodiversity-impact-platform/" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-image">
                <img src="/images/garden-money.webp" alt="Green Goods" />
              </div>
              <div className="work-content">
                <span className="work-client">GreenPill Dev Guild</span>
                <h3>Biodiversity Impact Platform</h3>
                <p>Content strategy and UX writing for ecological funding app. Gamified engagement copy increased user participation 3x and improved retention.</p>
                <span className="work-link">Read case study →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="writing" className="writing">
        <div className="container">
          <p className="section-label">Writing Samples</p>
          <h2>Thoughts on UX, Content & Strategy</h2>
          
          <div className="writing-grid">
            <a href="https://uxoxo.xyz/health-is-wealth-building-retirement-funds-through-healthy-living/" target="_blank" rel="noopener noreferrer" className="writing-item">
              <div className="writing-meta">
                <span className="writing-category">Product Strategy</span>
                <span className="read-time">2 min read</span>
              </div>
              <h3>Design a Self-Funded Retirement System Through Healthy Living</h3>
              <p>Exploring behavioral economics and incentive design to create sustainable health habits.</p>
            </a>
            
            <a href="https://uxoxo.xyz/dynamic-visions-the-intersection-of-art-and-economics-in-nfts/" target="_blank" rel="noopener noreferrer" className="writing-item">
              <div className="writing-meta">
                <span className="writing-category">Web3 & Economics</span>
                <span className="read-time">5 min read</span>
              </div>
              <h3>Designing at the Intersection of Blockchain, Art, and Economics</h3>
              <p>How tokenomics and user experience converge in the creator economy.</p>
            </a>
            
            <a href="https://uxoxo.xyz/poshmark-social-media-meets-ecommerce/" target="_blank" rel="noopener noreferrer" className="writing-item">
              <div className="writing-meta">
                <span className="writing-category">UX Analysis</span>
                <span className="read-time">7 min read</span>
              </div>
              <h3>Poshmark: Social Media Behavior & eCommerce Incentives</h3>
              <p>Breaking down the psychology behind successful marketplace engagement.</p>
            </a>
            
            <a href="https://uxoxo.xyz/google-analytics-scroll-tracking/" target="_blank" rel="noopener noreferrer" className="writing-item">
              <div className="writing-meta">
                <span className="writing-category">Analytics</span>
                <span className="read-time">1 min read</span>
              </div>
              <h3>Google Analytics: Scroll Event Tracking</h3>
              <p>Technical guide to understanding user engagement through scroll depth measurement.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <p className="section-label">Get Started</p>
            <h2>Ready to Turn Words Into Revenue?</h2>
            <p className="contact-desc">
              Let's discuss how better UX writing and content strategy can help you acquire more customers, 
              serve them more efficiently, and keep them longer.
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
          <p>© 2026 Nice Right. Words that win customers.</p>
        </div>
      </footer>
    </>
  )
}