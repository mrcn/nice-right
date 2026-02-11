import Image from 'next/image'
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
            <a href="#thoughts">Thoughts</a>
            <a href="#contact" className="btn btn-sm">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-visual">
            <Image 
              src="/images/bad-design-1.png" 
              alt="Bad UX examples" 
              width={600} 
              height={400}
              className="hero-image"
              priority
            />
          </div>
          <p className="hero-label">Digital Growth Partner for Small Businesses</p>
          <h1>
            Kiss Bad User Experiences
            <br />
            <span className="accent">Goodbye</span>
          </h1>
          <p className="hero-subtitle">
            Martin Dabrowski is a UX Strategist with a 13+ year background designing complex user-flows, 
            custom web apps, and sales support systems in agencies and in-house. We help small businesses 
            acquire customers more efficiently, serve them at lower cost, and keep them longer.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn">Start a Project</a>
            <a href="#work" className="btn btn-outline">See Our Work</a>
          </div>
          
          <div className="hero-contact">
            <a href="https://linkedin.com/in/mklaudiusz" target="_blank" rel="noopener noreferrer">LinkedIn: linkededin.com/mklaudiusz</a>
            <a href="mailto:Marcin@uxoxo.xyz">Email: Marcin@uxoxo.xyz</a>
            <a href="https://codepen.io/uxoxo" target="_blank" rel="noopener noreferrer">Codepen: codepen.io/uxoxo</a>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="container">
          <p className="section-label">About</p>
          <div className="philosophy-content">
            <p className="philosophy-text">
              Product Leader with 10+ years driving revenue, efficiency, and product success for Fortune 500s, 
              SaaS, start-ups, and digital agencies. Expert at connecting measurable business outcomes to 
              software design and development decisions. Adept at complex ecosystem UX and translating 
              ambiguous challenges into clear roadmaps. Proven record of 100+ successful launches and 
              double-digit efficiency gains.
            </p>
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

      <section id="work" className="work">
        <div className="container">
          <p className="section-label">Highlight Work</p>
          <h2>Projects That Moved the Needle</h2>
          
          <div className="work-grid">
            <div className="work-item">
              <div className="work-image">
                <Image src="/images/bankk.webp" alt="Northern Trust" width={400} height={250} />
              </div>
              <div className="work-content">
                <h3>Design & Development for a Suite of Animations at Northern Trust</h3>
                <p>Read more about the process</p>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                <Image src="/images/nursing-home-money.webp" alt="Healthcare Portal" width={400} height={250} />
              </div>
              <div className="work-content">
                <h3>Designing a Custom Healthcare Real Estate Investment Portal</h3>
                <p>Read all about it</p>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                <Image src="/images/garden-money.webp" alt="Green Goods" width={400} height={250} />
              </div>
              <div className="work-content">
                <h3>Software to Fund Biodiversity Gardens & Track Ecological Impact at Scale</h3>
                <p>Read about the app</p>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                <Image src="/images/sparkblox.webp" alt="Sparkblox" width={400} height={250} />
              </div>
              <div className="work-content">
                <h3>Designing Sparkblox, our No-Code Toolkit for Products Leveraging the Blockchain</h3>
                <span className="coming-soon">COMING SOON</span>
              </div>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                <Image src="/images/financial-org.webp" alt="POS System" width={400} height={250} />
              </div>
              <div className="work-content">
                <h3>Designing a Buyer-Facing POS System for Customizable Products</h3>
                <span className="coming-soon">COMING SOON</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="thoughts" className="thoughts">
        <div className="container">
          <p className="section-label">Thoughts</p>
          <h2>Writing on Design, Code & Strategy</h2>
          
          <div className="thoughts-grid">
            <div className="thought-item">
              <div className="thought-image">
                <div className="thought-placeholder">🌱</div>
              </div>
              <div className="thought-content">
                <h3>Design a Self-Funded Retirement System Through Healthy Living</h3>
                <span className="read-time">2 min</span>
              </div>
            </div>
            
            <div className="thought-item">
              <div className="thought-image">
                <div className="thought-placeholder">🎨</div>
              </div>
              <div className="thought-content">
                <h3>Designing at the intersection of Blockchain, Art, and Economics</h3>
                <span className="read-time">5 min</span>
              </div>
            </div>
            
            <div className="thought-item">
              <div className="thought-image">
                <Image src="/images/code-terminal.webp" alt="SSH Setup" width={300} height={180} />
              </div>
              <div className="thought-content">
                <h3>Setting up SSH with VS Code for Amazon Lightsail</h3>
                <span className="read-time">3 min</span>
              </div>
            </div>
            
            <div className="thought-item">
              <div className="thought-image">
                <div className="thought-placeholder">🛒</div>
              </div>
              <div className="thought-content">
                <h3>Poshmark: Social Media Behavior & eCommerce Incentives</h3>
                <span className="read-time">7 min</span>
              </div>
            </div>
            
            <div className="thought-item">
              <div className="thought-image">
                <Image src="/images/scroll-tracking.webp" alt="Scroll Tracking" width={300} height={180} />
              </div>
              <div className="thought-content">
                <h3>Google Analytics: Find Out How Far Users Are Scrolling with Scroll Event Tracking</h3>
                <span className="read-time">1 min</span>
              </div>
            </div>
            
            <div className="thought-item">
              <div className="thought-image">
                <Image src="/images/cross-domain-tracking.webp" alt="Cross Domain Tracking" width={300} height={180} />
              </div>
              <div className="thought-content">
                <h3>Google Analytics: How To Set Up & Test Cross Domain Tracking in GA & Tag Manager</h3>
                <span className="read-time">4 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="influences">
        <div className="container">
          <div className="influences-grid">
            <div className="influences-image">
              <Image src="/images/me-low.jpg" alt="Martin Dabrowski" width={300} height={400} className="profile-image" />
            </div>
            <div className="influences-content">
              <p className="section-label">Influences and Current Work</p>
              <p>
                My approach to UX is influenced by Jesse James Garrett, Sophia Prater, and Joe Natoli. 
                Beyond design, I draw inspiration from Clayton Christensen, John Cutler, Nassim Taleb, 
                and principles rooted in systems thinking.
              </p>
              <p>
                With the growth of AI, I'm continuing to focus on process digitization and AI workflow 
                automation, as well as exploring screenless interfaces and latent computing.
              </p>
              <p>
                I also continue UX and Product Leadership at the GreenPill Dev Guild, working on our 
                biodiversity funding and impact tracking app, Green Goods.
              </p>
              
              <p className="influences-cta">I'm open to opportunities with agencies and businesses.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Let's Connect</h2>
            <p>I'm open to opportunities with agencies and businesses.</p>
            
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
            
            <p className="location">Currently based in Cleveland, Ohio</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2026 UXOXO.</p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/mklaudiusz/" target="_blank" rel="noopener noreferrer">linkedin</a>
            <a href="mailto:marcin@uxoxo.xyz">email</a>
          </div>
        </div>
      </footer>
    </>
  )
}