export function Pricing() {
  return (
    <section id="pricing" className="v2-pricing">
      <div className="v2-container">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="v2-pricing-header v2-reveal">
            <p className="v2-section-label">Your Investment</p>
            <h2>Let&apos;s figure out the right fit together.</h2>
          </div>

          <div className="v2-reveal v2-reveal-delay-1">
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>
              Every engagement starts with a conversation &mdash; a free 30-minute
              call where we look at your business, what&apos;s working, and where
              you&apos;re leaving money on the table.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>
              From there, I&apos;ll give you a clear recommendation. Sometimes
              it&apos;s a quick fix. Sometimes it&apos;s a full build. You&apos;ll
              know exactly what you&apos;re getting, what it costs, and what results
              to expect &mdash; before you spend a dollar.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
              No retainers. No lock-in contracts. I keep working with you because
              the results speak for themselves.
            </p>
          </div>

          <div className="v2-reveal v2-reveal-delay-2" style={{
            background: 'var(--v2-card-bg)',
            borderRadius: 'var(--v2-radius)',
            padding: '24px 28px',
            boxShadow: 'var(--v2-shadow)',
            marginBottom: 32,
          }}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--v2-text-muted)', marginBottom: 12 }}>
              You own everything I build. Your domain, your code, your content. Always.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--v2-text-muted)' }}>
              Payment plans available &mdash; designed around your business cash flow, not mine.
            </p>
          </div>

          <div className="v2-reveal v2-reveal-delay-3" style={{ textAlign: 'center' }}>
            <a href="#contact" className="v2-btn" style={{ width: '100%', textAlign: 'center', maxWidth: 360 }}>
              Book a Free Strategy Call
            </a>
            <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 12 }}>
              30 minutes. You&apos;ll walk away with clarity on your next step &mdash;
              whether or not we work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
