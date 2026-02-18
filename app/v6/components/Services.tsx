import { CascadeGrid } from './CascadeGrid'

export function Services() {
  return (
    <section id="services" className="v2-services">
      <div className="v2-container">
        <div className="v2-services-header v2-reveal">
          <p className="v2-section-label">What You Get</p>
          <h2>Three ways I help businesses grow</h2>
        </div>
        <CascadeGrid className="v2-services-grid" animateAccentBars staggerEach={0.15}>
          <div className="v2-service-card">
            <div className="v2-service-accent-bar" />
            <div className="v2-service-card-body">
              <h3>Get Found &amp; Get Customers</h3>
              <p className="v2-service-quote">
                &ldquo;I need a website that actually brings in business.&rdquo;
              </p>
              <ul className="v2-service-features">
                <li>Websites that turn visitors into paying customers</li>
                <li>SEO so the right people find you first</li>
                <li>Landing pages for campaigns &amp; ads</li>
                <li>Google Business &amp; local search setup</li>
              </ul>
            </div>
          </div>
          <div className="v2-service-card">
            <div className="v2-service-accent-bar" />
            <div className="v2-service-card-body">
              <h3>Save Time &amp; Cut Costs</h3>
              <p className="v2-service-quote">
                &ldquo;I spend too much time on things a computer should handle.&rdquo;
              </p>
              <ul className="v2-service-features">
                <li>Custom apps &amp; dashboards for your team</li>
                <li>Customer self-service portals</li>
                <li>Workflow automation that frees up your day</li>
                <li>Internal tools your team will actually use</li>
              </ul>
            </div>
          </div>
          <div className="v2-service-card">
            <div className="v2-service-accent-bar" />
            <div className="v2-service-card-body">
              <h3>Keep Customers Coming Back</h3>
              <p className="v2-service-quote">
                &ldquo;I win customers but they don&apos;t stick around.&rdquo;
              </p>
              <ul className="v2-service-features">
                <li>Loyalty programs</li>
                <li>Email sequences that keep you top of mind</li>
                <li>Customer feedback systems</li>
                <li>Retention analytics</li>
              </ul>
            </div>
          </div>
        </CascadeGrid>
        <div className="v2-section-cta v2-reveal">
          <a href="#contact" className="v2-btn">Let&apos;s Talk About Your Business</a>
        </div>
      </div>
    </section>
  )
}
