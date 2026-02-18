import { CascadeGrid } from './CascadeGrid';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="v2-how">
      <div className="v2-container">
        <div className="v2-how-header v2-reveal">
          <p className="v2-section-label">How It Works</p>
          <h2>Simple process. Real results.</h2>
        </div>
        <CascadeGrid className="v2-steps-grid">
          <div className="v2-step-card">
            <div className="v2-step-number">1</div>
            <h3>You Share</h3>
            <p>
              Free 30-minute call. Tell me about your business and where you
              feel stuck. I&apos;ll give you an honest take &mdash; even if the
              answer is &ldquo;you already have what you need.&rdquo;
            </p>
          </div>
          <div className="v2-step-card">
            <div className="v2-step-number">2</div>
            <h3>I Build</h3>
            <p>
              Website, SEO, Google Business, landing pages &mdash; whatever
              moves the needle. Your feedback shapes every step. No surprises,
              no scope creep.
            </p>
          </div>
          <div className="v2-step-card">
            <div className="v2-step-number">3</div>
            <h3>You Grow</h3>
            <p>
              Your phone rings more. Your calendar fills up. And I stick around
              to help you keep improving.
            </p>
          </div>
        </CascadeGrid>
        <div
          className="v2-section-cta v2-reveal"
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a href="#contact" className="v2-btn">
            Book a Free Call
          </a>
        </div>
      </div>
    </section>
  );
}
