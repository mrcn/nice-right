import type { Metadata } from 'next'
import './page.css'
import { ScrollReveal, CountUp, HeroReveal } from './components/ScrollReveal'
import { BottomNav } from './components/BottomNav'
import { ContactSection } from './components/ContactSection'

export const metadata: Metadata = {
  title: 'Nice Right | Websites, Apps & Digital Growth for Small Businesses',
  description: 'Grow your business with a website that works, apps that save time, and digital systems that keep customers coming back. Senior-level strategy, transparent pricing, no long-term contracts.',
}

export default function V2Home() {
  return (
    <ScrollReveal>
      <div className="v2">
        {/* Nav */}
        <nav className="v2-nav">
          <div className="v2-container v2-nav-content">
            <a href="/v2/" className="v2-logo">Nice Right</a>
            <div className="v2-nav-links">
              <a href="#how-it-works">How It Works</a>
              <a href="#services">Services</a>
              <a href="#pricing">Pricing</a>
              <a href="#results">Results</a>
              <a href="#contact" className="v2-btn v2-btn-sm">Let&apos;s Talk</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="v2-hero">
          <div className="v2-container">
            <div className="v2-hero-grid">
              <div className="v2-hero-text">
                <HeroReveal>
                  <h1>
                    Grow your business.<br />
                    <span>We&apos;ll handle the tech.</span>
                  </h1>
                  <p className="v2-hero-sub">
                    You know your business. I know how to get you more customers,
                    cut your costs, and keep people coming back &mdash; with websites,
                    apps, and digital tools built around what actually works.
                  </p>
                  <div className="v2-hero-cta">
                    <a href="#contact" className="v2-btn">Book a Free Strategy Call</a>
                    <a href="#how-it-works" className="v2-btn v2-btn-outline">See How It Works</a>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '-8px', marginBottom: '16px' }}>
                    20 minutes. No pitch, no pressure &mdash; just an honest look at what&apos;s possible.
                  </p>
                  <div className="v2-trust-line">
                    <span>Cleveland, OH</span>
                    <span>Fortune 500 to Main Street</span>
                    <span><CountUp end={100} suffix="+" /> projects</span>
                    <span><CountUp end={13} suffix="+" /> years</span>
                  </div>
                </HeroReveal>
              </div>
              <div className="v2-hero-image">
                <img src="/images/me-low.jpg" alt="Marcin Dabrowski" />
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section style={{ padding: '48px 0', background: 'var(--v2-bg)' }}>
          <div className="v2-container">
            <div className="v2-reveal" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
              <p className="v2-section-label">Sound familiar?</p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                You&apos;ve been burned before. The agency that charged $20,000 for a site
                built on a $50 template. The freelancer who vanished mid-project. The DIY
                website builder that looked fine until you realized nobody could find you on
                Google. You don&apos;t need another vendor who talks in jargon and bills in
                surprises. You need someone who builds things that actually work for
                businesses like yours &mdash; and can prove it.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="v2-how">
          <div className="v2-container">
            <div className="v2-how-header v2-reveal">
              <p className="v2-section-label">How It Works</p>
              <h2>Simple process. Real results.</h2>
              <p>No jargon, no mystery. Here&apos;s what working together looks like.</p>
            </div>
            <div className="v2-steps-grid">
              <div className="v2-step-card v2-reveal v2-reveal-delay-1">
                <div className="v2-step-number">1</div>
                <h3>We Talk</h3>
                <p>
                  Free 20-minute call. You tell me about your business,
                  what&apos;s working, and where you&apos;re stuck. I&apos;ll give you
                  an honest assessment &mdash; even if the answer is &ldquo;you don&apos;t need me yet.&rdquo;
                </p>
              </div>
              <div className="v2-step-card v2-reveal v2-reveal-delay-2">
                <div className="v2-step-number">2</div>
                <h3>I Build</h3>
                <p>
                  I design and build your website, app, or system &mdash; with
                  regular check-ins so you always know what&apos;s happening. No
                  surprises, no scope creep.
                </p>
              </div>
              <div className="v2-step-card v2-reveal v2-reveal-delay-3">
                <div className="v2-step-number">3</div>
                <h3>You Grow</h3>
                <p>
                  Your new digital presence starts working for you. More
                  leads, lower costs, happier customers. And I stick around
                  to help you keep improving.
                </p>
              </div>
            </div>
            <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="#contact" className="v2-btn v2-btn-outline">Start With a Conversation</a>
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
                Most clients say this call alone was worth it.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="v2-services">
          <div className="v2-container">
            <div className="v2-services-header v2-reveal">
              <p className="v2-section-label">What I Do</p>
              <h2>Everything your business needs online</h2>
              <p>Three pillars of digital growth, all under one roof.</p>
            </div>
            <div className="v2-services-grid">
              <div className="v2-service-card v2-reveal v2-reveal-delay-1">
                <div className="v2-service-accent-bar" />
                <div className="v2-service-card-body">
                  <h3>Get Found &amp; Get Customers</h3>
                  <p className="v2-service-quote">
                    &ldquo;I need a website that actually brings in business.&rdquo;
                  </p>
                  <ul className="v2-service-features">
                    <li>Websites that convert visitors into leads</li>
                    <li>SEO so people actually find you</li>
                    <li>Landing pages for campaigns &amp; ads</li>
                    <li>Google Business &amp; local search setup</li>
                  </ul>
                </div>
              </div>
              <div className="v2-service-card v2-reveal v2-reveal-delay-2">
                <div className="v2-service-accent-bar" />
                <div className="v2-service-card-body">
                  <h3>Save Time &amp; Cut Costs</h3>
                  <p className="v2-service-quote">
                    &ldquo;I spend too much time on things a computer should handle.&rdquo;
                  </p>
                  <ul className="v2-service-features">
                    <li>Custom apps &amp; dashboards</li>
                    <li>Customer self-service portals</li>
                    <li>Workflow automation</li>
                    <li>Internal tools your team actually uses</li>
                  </ul>
                </div>
              </div>
              <div className="v2-service-card v2-reveal v2-reveal-delay-3">
                <div className="v2-service-accent-bar" />
                <div className="v2-service-card-body">
                  <h3>Keep Customers Coming Back</h3>
                  <p className="v2-service-quote">
                    &ldquo;I win customers but lose them too fast.&rdquo;
                  </p>
                  <ul className="v2-service-features">
                    <li>Loyalty &amp; rewards programs</li>
                    <li>Email &amp; engagement sequences</li>
                    <li>Customer feedback systems</li>
                    <li>Retention analytics &amp; optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="#pricing" className="v2-btn v2-btn-outline">Find Out What Would Work for You</a>
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
                Not sure which of these you need? That&apos;s what the Growth Audit answers.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="v2-testimonials">
          <div className="v2-container">
            <div className="v2-testimonials-header v2-reveal">
              <p className="v2-section-label">Proof</p>
              <h2>What clients say</h2>
            </div>
            <div className="v2-testimonials-grid">
              <div className="v2-testimonial-card v2-reveal v2-reveal-delay-1">
                <p className="v2-testimonial-pull">
                  &ldquo;He delivered not only what was asked, but took the initiative to provide
                  his own recommendations and went above and beyond.&rdquo;
                </p>
                <div className="v2-testimonial-attribution">
                  <div className="v2-testimonial-avatar">RP</div>
                  <div>
                    <div className="v2-testimonial-name">Roman Panchyshyn</div>
                    <div className="v2-testimonial-role">Sr. Manager UX, Northern Trust</div>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-testimonial-verify"
                >
                  View on LinkedIn &rarr;
                </a>
              </div>
              <div className="v2-testimonial-card v2-reveal v2-reveal-delay-2">
                <p className="v2-testimonial-pull">
                  &ldquo;A great approach to breaking down industry terms for clients
                  and makes sure everyone understands the intent and purpose.&rdquo;
                </p>
                <div className="v2-testimonial-attribution">
                  <div className="v2-testimonial-avatar">JC</div>
                  <div>
                    <div className="v2-testimonial-name">Jonathan Carstensen</div>
                    <div className="v2-testimonial-role">Project Manager, Comrade Web Agency</div>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-testimonial-verify"
                >
                  View on LinkedIn &rarr;
                </a>
              </div>
              <div className="v2-testimonial-card v2-reveal v2-reveal-delay-3">
                <p className="v2-testimonial-pull">
                  &ldquo;He was able to decipher what we wanted despite inadequate
                  information from us at times.&rdquo;
                </p>
                <div className="v2-testimonial-attribution">
                  <div className="v2-testimonial-avatar">BS</div>
                  <div>
                    <div className="v2-testimonial-name">Britt Skaathun</div>
                    <div className="v2-testimonial-role">Assistant Professor, UC San Diego</div>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-testimonial-verify"
                >
                  View on LinkedIn &rarr;
                </a>
              </div>
              <div className="v2-testimonial-card v2-reveal v2-reveal-delay-4">
                <p className="v2-testimonial-pull">
                  &ldquo;It&apos;s mind blowing how fast this guy can learn
                  and understand new concepts.&rdquo;
                </p>
                <div className="v2-testimonial-attribution">
                  <div className="v2-testimonial-avatar">BJ</div>
                  <div>
                    <div className="v2-testimonial-name">Brian Jemilo II</div>
                    <div className="v2-testimonial-role">CTO, Shibiko AI</div>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-testimonial-verify"
                >
                  View on LinkedIn &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="v2-results">
          <div className="v2-container">
            <div className="v2-results-header v2-reveal">
              <p className="v2-section-label">Results</p>
              <h2>What it looks like when it works</h2>
              <p>Real projects, real outcomes.</p>
            </div>
            <div className="v2-results-grid">
              <a href="/work/northern-trust" className="v2-result-card v2-reveal v2-reveal-delay-1">
                <div className="v2-result-image">
                  <img src="/images/bankk.webp" alt="Northern Trust project" />
                </div>
                <div className="v2-result-body">
                  <span className="v2-result-client">Northern Trust</span>
                  <h3>Made a Fortune 500 website feel alive</h3>
                  <p>Micro-interactions and animation system that modernized brand perception and boosted engagement.</p>
                  <span className="v2-result-link">View case study &rarr;</span>
                </div>
              </a>
              <a href="/work/healthcare-real-estate" className="v2-result-card v2-reveal v2-reveal-delay-2">
                <div className="v2-result-image">
                  <img src="/images/nursing-home-money.webp" alt="Healthcare investment platform" />
                </div>
                <div className="v2-result-body">
                  <span className="v2-result-client">Healthcare Investment Platform</span>
                  <h3>Cut deal-closing time by 40%</h3>
                  <p>Custom B2B portal connecting healthcare providers with property opportunities &mdash; faster.</p>
                  <span className="v2-result-link">View case study &rarr;</span>
                </div>
              </a>
              <a href="/work/green-goods" className="v2-result-card v2-reveal v2-reveal-delay-3">
                <div className="v2-result-image">
                  <img src="/images/garden-money.webp" alt="Green Goods project" />
                </div>
                <div className="v2-result-body">
                  <span className="v2-result-client">GreenPill Dev Guild</span>
                  <h3>3x more people participating in conservation</h3>
                  <p>Gamified biodiversity platform that turned ecological impact into something people wanted to be part of.</p>
                  <span className="v2-result-link">View case study &rarr;</span>
                </div>
              </a>
            </div>
            <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="#contact" className="v2-btn">See What&apos;s Possible for Your Business</a>
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
                Every project on this page started with a single conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="v2-pricing">
          <div className="v2-container">
            <div className="v2-pricing-header v2-reveal">
              <p className="v2-section-label">Your Investment</p>
              <h2>Start with clarity, not a contract.</h2>
            </div>
            <div className="v2-reveal v2-reveal-delay-1" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                Every engagement starts with a <strong>Digital Growth Audit</strong> &mdash; a focused
                deep-dive into your business, your competitors, and where the real opportunities are.
                The audit is <strong>$1,500</strong>, and that fee gets credited in full toward your project
                if we move forward together. Most projects land between <strong>$5,000 and $15,000</strong> depending
                on scope. For businesses that want ongoing momentum, the <strong>Growth Partnership</strong> runs
                $800&ndash;$2,500/month &mdash; strategy, optimization, and support without hiring in-house.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: 32 }}>
                Need something lighter? The <strong>$500 Conversion Audit</strong> gives you a
                prioritized list of fixes for your existing site, delivered in 48 hours.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                <a href="#contact" className="v2-btn">Book Your Growth Audit</a>
                <a href="#contact" className="v2-btn v2-btn-outline">Get a Conversion Audit ($500)</a>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: 8 }}>
                $1,500 audit fee credited toward your project. Zero risk.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic', marginBottom: 8 }}>
                No retainers. No lock-in. I keep working with you because the results speak for themselves.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#777' }}>
                Agencies charge $15,000&ndash;$40,000 for the same scope. You get the same
                senior-level thinking at a fraction of the overhead.
              </p>
            </div>
            <div className="v2-reveal v2-reveal-delay-2" style={{ textAlign: 'center', marginTop: 32 }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--v2-accent)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                Currently taking on 2 new projects per quarter. Spots for Q2 2026 are open.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="v2-faq">
          <div className="v2-container">
            <div className="v2-faq-header v2-reveal">
              <p className="v2-section-label">Questions</p>
              <h2>Things people ask before saying yes</h2>
            </div>
            <div className="v2-faq-grid">
              <div className="v2-faq-item v2-reveal v2-reveal-delay-1">
                <p className="v2-faq-q">&ldquo;What if it doesn&apos;t work?&rdquo;</p>
                <p className="v2-faq-a">
                  Then we fix it. I don&apos;t hand you a website and disappear. Every project includes
                  a post-launch review where we look at the data together and adjust. The Growth Audit
                  we start with is designed to surface real opportunities before a single line of code
                  gets written &mdash; so we&apos;re building toward something with evidence behind it,
                  not guessing.
                </p>
              </div>
              <div className="v2-faq-item v2-reveal v2-reveal-delay-2">
                <p className="v2-faq-q">&ldquo;Can one person really handle my project?&rdquo;</p>
                <p className="v2-faq-a">
                  Yes &mdash; and that&apos;s the point. I&apos;ve led teams at agencies and on Fortune 500
                  engagements. You get one person who understands the full picture, not five people who
                  each know a slice. For projects that genuinely need extra hands, I bring in specialists
                  I trust. But you always talk to me.
                </p>
              </div>
              <div className="v2-faq-item v2-reveal v2-reveal-delay-1">
                <p className="v2-faq-q">&ldquo;Why not just hire an agency?&rdquo;</p>
                <p className="v2-faq-a">
                  You can. You&apos;ll pay 3&ndash;5x more, wait longer, and spend half your meetings
                  explaining your business to whoever they rotate onto your account that month. Agencies
                  are built on overhead &mdash; project managers, account execs, office leases. I&apos;m
                  built on doing the work. Same experience, direct access, no markup on middlemen.
                </p>
              </div>
              <div className="v2-faq-item v2-reveal v2-reveal-delay-2">
                <p className="v2-faq-q">&ldquo;What if I don&apos;t know what I need?&rdquo;</p>
                <p className="v2-faq-a">
                  That&apos;s the most common starting point. The Growth Audit exists for exactly this.
                  We&apos;ll look at your business goals, your current digital presence, and what your
                  competitors are doing &mdash; then I&apos;ll tell you, plainly, what would actually
                  move the needle. Sometimes it&apos;s a new site. Sometimes it&apos;s three changes to
                  the one you have.
                </p>
              </div>
              <div className="v2-faq-item v2-reveal v2-reveal-delay-1">
                <p className="v2-faq-q">&ldquo;How long until I see results?&rdquo;</p>
                <p className="v2-faq-a">
                  Most projects go live within 4&ndash;8 weeks. Quick wins like speed improvements,
                  SEO fixes, or conversion tweaks often show up within days of launch. Bigger outcomes
                  build over the first 2&ndash;3 months. I&apos;ll set realistic timelines up front so
                  you know exactly what to expect.
                </p>
              </div>
              <div className="v2-faq-item v2-reveal v2-reveal-delay-2">
                <p className="v2-faq-q">&ldquo;What&apos;s the first step?&rdquo;</p>
                <p className="v2-faq-a">
                  Book a free 20-minute call. You tell me where your business is and where you want it
                  to go. I&apos;ll be honest about whether I can help &mdash; and if I can, I&apos;ll
                  outline what that looks like. No pitch deck, no pressure, no follow-up spam.
                  Just a conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="v2-about">
          <div className="v2-container">
            <div className="v2-about-grid">
              <div className="v2-about-image v2-reveal">
                <img src="/images/me-low.jpg" alt="Marcin Dabrowski" />
              </div>
              <div className="v2-about-text v2-reveal v2-reveal-delay-1">
                <h2>Hi, I&apos;m Marcin.</h2>
                <p>
                  I spent years building digital products at the enterprise level &mdash; designing
                  animation systems for Northern Trust, architecting healthcare portals that handle
                  multimillion-dollar transactions, leading teams at agencies. I was good at it. But
                  I kept noticing the same thing: small businesses were getting the worst deal in tech.
                </p>
                <p>
                  So I made a choice. The same way a Michelin-trained chef might leave a hotel kitchen
                  to open a neighborhood restaurant, I took everything I learned building for the biggest
                  companies and focused it where it actually changes lives &mdash; on businesses like yours.
                </p>
                <p>
                  No account managers. No juniors learning on your dime. When you hire Nice Right, you work
                  directly with me &mdash; the same person who designed micro-interactions for Northern Trust
                  and built a restaurant&apos;s entire web presence over a weekend.
                </p>
                <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 8 }}>
                  Currently working with clients in financial services, healthcare, food service,
                  e-commerce, conservation tech, and local services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <footer className="v2-footer">
          <div className="v2-container">
            <p>&copy; 2026 Nice Right. Digital growth for small businesses.</p>
          </div>
        </footer>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </ScrollReveal>
  )
}
