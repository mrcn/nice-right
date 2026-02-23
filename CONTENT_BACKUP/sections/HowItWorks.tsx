export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'We Talk',
      description:
        "Free 20-minute call. You tell me about your business, what's working, and where you're stuck. I'll give you an honest assessment \u0026mdash; even if the answer is \"you don't need me yet.\"",
    },
    {
      number: '2',
      title: 'I Build',
      description:
        "I design and build your website, app, or system \u0026mdash; with regular check-ins so you always know what's happening. No surprises, no scope creep.",
    },
    {
      number: '3',
      title: 'You Grow',
      description:
        'Your new digital presence starts working for you. More leads, lower costs, happier customers. And I stick around to help you keep improving.',
    },
  ];

  return (
    <section id="how-it-works" className="nr-section nr-section-alt">
      <div className="nr-container">
        <div className="text-center mb-16">
          <p className="nr-section-label">How It Works</p>
          <h2 className="mb-4">Simple process. Real results.</h2>
          <p className="text-lg" style={{ color: 'var(--nr-text-muted)' }}>
            No jargon, no mystery. Here\'s what working together looks like.
          </p>
        </div>

        <div className="nr-grid-3 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="nr-card">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6"
                style={{ backgroundColor: 'var(--nr-amber)' }}
              >
                {step.number}
              </div>
              <h3 className="text-xl mb-4">{step.title}</h3>
              <p style={{ color: 'var(--nr-text-muted)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="nr-btn nr-btn-outline">
            Start With a Conversation
          </a>
          <p className="mt-4 text-sm" style={{ color: 'var(--nr-text-dim)' }}>
            Most clients say this call alone was worth it.
          </p>
        </div>
      </div>
    </section>
  );
}
