export function HowItWorks() {
  return (
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
            <h3>You Share</h3>
            <p>
              Free 30-minute call. Tell me about your business, your goals, and
              where you feel stuck. I&apos;ll give you an honest take &mdash; even
              if the answer is &ldquo;you already have what you need.&rdquo;
            </p>
          </div>
          <div className="v2-step-card v2-reveal v2-reveal-delay-2">
            <div className="v2-step-number">2</div>
            <h3>I Build</h3>
            <p>
              I design and build your website, app, or system &mdash; and your
              feedback shapes every step. Regular check-ins mean you always know
              what&apos;s happening. No surprises, no scope creep.
            </p>
          </div>
          <div className="v2-step-card v2-reveal v2-reveal-delay-3">
            <div className="v2-step-number">3</div>
            <h3>You Grow</h3>
            <p>
              Your new digital presence starts working for you. More leads,
              lower costs, happier customers. And I stick around to help you
              keep improving.
            </p>
          </div>
        </div>
        <div className="v2-reveal v2-reveal-delay-4" style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="#contact" className="v2-btn v2-btn-outline">Start With a Conversation</a>
          <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 10 }}>
            Most clients say this call alone gave them clarity they didn&apos;t expect.
          </p>
        </div>
      </div>
    </section>
  )
}
