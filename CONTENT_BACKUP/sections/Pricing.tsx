export default function Pricing() {
  return (
    <section className="nr-section nr-section-alt">
      <div className="nr-container">
        <div className="text-center mb-16">
          <p className="nr-section-label">Your Investment</p>
          <h2 className="mb-4">Start with clarity, not a contract.</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="nr-card mb-8">
            <p
              className="text-lg mb-6"
              style={{ color: 'var(--nr-text-muted)' }}
            >
              Every engagement starts with a{' '}
              <strong>Digital Growth Audit</strong> — a focused deep-dive into
              your business, your competitors, and where the real opportunities
              are. The audit is <strong>$1,500</strong>, and that fee gets
              credited in full toward your project if we move forward together.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: 'var(--nr-cream)' }}
              >
                <p
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  Projects
                </p>
                <p
                  className="text-3xl font-serif mb-2"
                  style={{ color: 'var(--nr-navy)' }}
                >
                  $5,000 – $15,000
                </p>
                <p className="text-sm" style={{ color: 'var(--nr-text-dim)' }}>
                  Depending on scope
                </p>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: 'var(--nr-cream)' }}
              >
                <p
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  Growth Partnership
                </p>
                <p
                  className="text-3xl font-serif mb-2"
                  style={{ color: 'var(--nr-navy)' }}
                >
                  $800 – $2,500<span className="text-lg">/mo</span>
                </p>
                <p className="text-sm" style={{ color: 'var(--nr-text-dim)' }}>
                  Ongoing strategy & support
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <a href="#contact" className="nr-btn nr-btn-accent">
                Book Your Growth Audit
              </a>
              <a href="#contact" className="nr-btn nr-btn-outline">
                Get a Conversion Audit ($500)
              </a>
            </div>

            <p
              className="text-center text-sm italic mb-4"
              style={{ color: 'var(--nr-text-muted)' }}
            >
              No retainers. No lock-in. I keep working with you because the
              results speak for themselves.
            </p>

            <p
              className="text-center text-sm"
              style={{ color: 'var(--nr-text-dim)' }}
            >
              Agencies charge $15,000–$40,000 for the same scope. You get the
              same senior-level thinking at a fraction of the overhead.
            </p>
          </div>

          <p
            className="text-center text-sm font-medium"
            style={{ color: 'var(--nr-amber)', fontFamily: 'monospace' }}
          >
            Currently taking on 2 new projects per quarter. Spots for Q2 2026
            are open.
          </p>
        </div>
      </div>
    </section>
  );
}
