export default function Services() {
  const services = [
    {
      title: 'Get Found \u0026 Get Customers',
      quote: 'I need a website that actually brings in business.',
      features: [
        'Websites that convert visitors into leads',
        'SEO so people actually find you',
        'Landing pages for campaigns \u0026 ads',
        'Google Business \u0026 local search setup',
      ],
    },
    {
      title: 'Save Time \u0026 Cut Costs',
      quote: 'I spend too much time on things a computer should handle.',
      features: [
        'Custom apps \u0026 dashboards',
        'Customer self-service portals',
        'Workflow automation',
        'Internal tools your team actually uses',
      ],
    },
    {
      title: 'Keep Customers Coming Back',
      quote: 'I win customers but lose them too fast.',
      features: [
        'Loyalty \u0026 rewards programs',
        'Email \u0026 engagement sequences',
        'Customer feedback systems',
        'Retention analytics \u0026 optimization',
      ],
    },
  ];

  return (
    <section id="services" className="nr-section">
      <div className="nr-container">
        <div className="text-center mb-16">
          <p className="nr-section-label">What I Do</p>
          <h2 className="mb-4">Everything your business needs online</h2>
          <p className="text-lg" style={{ color: 'var(--nr-text-muted)' }}>
            Three pillars of digital growth, all under one roof.
          </p>
        </div>

        <div className="nr-grid-3 mb-12">
          {services.map((service, index) => (
            <div key={index} className="nr-card relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{
                  background:
                    'linear-gradient(to bottom, var(--nr-amber), var(--nr-amber-dark))',
                }}
              />
              <div className="pl-6">
                <h3 className="text-xl mb-4 pr-4">{service.title}</h3>

                <p
                  className="font-serif italic mb-6"
                  style={{ color: 'var(--nr-text-muted)' }}
                >
                  \u201c{service.quote}\u201d
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{ color: 'var(--nr-text-muted)' }}
                    >
                      <span style={{ color: 'var(--nr-amber)' }}>\u2014</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="nr-btn nr-btn-outline">
            Find Out What Would Work for You
          </a>
          <p className="mt-4 text-sm" style={{ color: 'var(--nr-text-dim)' }}>
            Not sure which of these you need? That\'s what the Growth Audit
            answers.
          </p>
        </div>
      </div>
    </section>
  );
}
