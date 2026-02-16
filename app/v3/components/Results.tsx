import { CountUp } from '../../v2/components/ScrollReveal'

export function Results() {
  return (
    <section id="results" className="v2-results">
      <div className="v2-container">
        <div className="v2-results-header v2-reveal">
          <p className="v2-section-label">Results</p>
          <h2>Real numbers from real projects</h2>
        </div>

        {/* Stats row — leads before case studies */}
        <div
          className="v2-reveal v2-reveal-delay-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            maxWidth: 720,
            margin: '0 auto 48px',
            textAlign: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontFamily: "'Instrument Serif', serif",
                color: 'var(--v2-accent)',
                fontWeight: 400,
              }}
            >
              <CountUp end={290} suffix="%" />
            </div>
            <div style={{ fontSize: '0.85rem', color: '#777', marginTop: 4 }}>
              traffic growth for a home service company
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontFamily: "'Instrument Serif', serif",
                color: 'var(--v2-accent)',
                fontWeight: 400,
              }}
            >
              <CountUp end={12} suffix="x" />
            </div>
            <div style={{ fontSize: '0.85rem', color: '#777', marginTop: 4 }}>
              more leads from the same site
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontFamily: "'Instrument Serif', serif",
                color: 'var(--v2-accent)',
                fontWeight: 400,
              }}
            >
              <CountUp end={80} suffix="%" />
            </div>
            <div style={{ fontSize: '0.85rem', color: '#777', marginTop: 4 }}>
              time saved with workflow automation
            </div>
          </div>
        </div>

        {/* Case studies — most relatable first */}
        <div className="v2-results-grid">
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
          <a href="/work/northern-trust" className="v2-result-card v2-reveal v2-reveal-delay-4">
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
        </div>

        <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="#contact" className="v2-btn">See What&apos;s Possible for Your Business</a>
          <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
            Every project here started with a single conversation.
          </p>
        </div>
      </div>
    </section>
  )
}
