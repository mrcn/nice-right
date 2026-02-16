export function Services() {
  return (
    <section id="services" className="v2-services">
      <div className="v2-container">
        <div className="v2-services-header v2-reveal">
          <p className="v2-section-label">What You Get</p>
          <h2>Everything your business needs online</h2>
          <p>Three pillars of digital growth &mdash; all built around your goals.</p>
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
                <li>Websites that turn visitors into paying customers</li>
                <li>SEO so the right people find you first</li>
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
                <li>Custom apps &amp; dashboards for your team</li>
                <li>Customer self-service portals</li>
                <li>Workflow automation that frees up your day</li>
                <li>Internal tools your team will actually use</li>
              </ul>
            </div>
          </div>
          <div className="v2-service-card v2-reveal v2-reveal-delay-3">
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
        </div>
        <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="#contact" className="v2-btn v2-btn-outline">Find Out What Would Work for Your Business</a>
          <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
            Unsure which fits? That&apos;s exactly what the free strategy call answers.
          </p>
        </div>
      </div>
    </section>
  )
}
