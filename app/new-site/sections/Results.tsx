export default function Results() {
  const caseStudies = [
    {
      client: 'Northern Trust',
      headline: 'Made a Fortune 500 website feel alive',
      description:
        'Micro-interactions and animation system that modernized brand perception and boosted engagement.',
      image: '/images/bankk.webp',
      link: '/work/northern-trust',
    },
    {
      client: 'Healthcare Investment Platform',
      headline: 'Cut deal-closing time by 40%',
      description:
        'Custom B2B portal connecting healthcare providers with property opportunities \u0026mdash; faster.',
      image: '/images/nursing-home-money.webp',
      link: '/work/healthcare-real-estate',
    },
    {
      client: 'GreenPill Dev Guild',
      headline: '3x more people participating in conservation',
      description:
        'Gamified biodiversity platform that turned ecological impact into something people wanted to be part of.',
      image: '/images/garden-money.webp',
      link: '/work/green-goods',
    },
  ];

  return (
    <section id="results" className="nr-section nr-section-alt">
      <div className="nr-container">
        <div className="text-center mb-16">
          <p className="nr-section-label">Results</p>
          <h2 className="mb-4">What it looks like when it works</h2>
          <p className="text-lg" style={{ color: 'var(--nr-text-muted)' }}>
            Real projects, real outcomes.
          </p>
        </div>

        <div className="nr-grid-3 mb-12">
          {caseStudies.map((study, index) => (
            <a key={index} href={study.link} className="group block">
              <div className="nr-card overflow-hidden">
                <div
                  className="overflow-hidden mb-6 -mx-8 -mt-8"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  <img
                    src={study.image}
                    alt={study.headline}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 500ms',
                    }}
                  />
                </div>

                <p
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  {study.client}
                </p>

                <h3 className="text-xl mb-3 group-hover:text-[var(--nr-amber)] transition-colors">
                  {study.headline}
                </h3>

                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--nr-text-muted)' }}
                >
                  {study.description}
                </p>

                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  View case study \u2192
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="nr-btn nr-btn-accent">
            See What\'s Possible for Your Business
          </a>
          <p className="mt-4 text-sm" style={{ color: 'var(--nr-text-dim)' }}>
            Every project on this page started with a single conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
