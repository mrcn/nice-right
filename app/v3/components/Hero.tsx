import { CountUp, HeroReveal } from '../../v2/components/ScrollReveal'

export function Hero() {
  return (
    <section className="v2-hero">
      <div className="v2-container">
        <div className="v2-hero-grid">
          <div className="v2-hero-text">
            <HeroReveal>
              <h1>
                Grow your business.<br />
                <span>I&apos;ll handle the tech.</span>
              </h1>
              <p className="v2-hero-sub">
                Your customers are looking for you right now. I help small
                businesses like yours get found online, win more customers,
                and keep them coming back &mdash; with websites, apps, and
                digital tools built around your goals.
              </p>
              <div className="v2-hero-cta">
                <a href="#contact" className="v2-btn">Book a Free Strategy Call</a>
                <a href="#how-it-works" className="v2-btn v2-btn-outline">See How It Works</a>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '-8px', marginBottom: '16px' }}>
                30 minutes. No pitch, no pressure &mdash; just an honest
                look at what&apos;s possible for your business.
              </p>
              <div className="v2-trust-line">
                <span>Chicago&apos;s Northwest Side</span>
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
  )
}
