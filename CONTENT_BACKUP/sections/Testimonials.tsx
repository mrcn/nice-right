export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'He delivered not only what was asked, but took the initiative to provide his own recommendations and went above and beyond what we asked for.',
      name: 'Roman Panchyshyn',
      role: 'Sr. Manager UX',
      company: 'Northern Trust',
      initials: 'RP',
    },
    {
      quote:
        'A great approach to breaking down industry terms for clients and makes sure everyone understands the intent and purpose.',
      name: 'Jonathan Carstensen',
      role: 'Project Manager',
      company: 'Comrade Web Agency',
      initials: 'JC',
    },
    {
      quote:
        'He was able to decipher what we wanted despite inadequate information from us at times.',
      name: 'Britt Skaathun',
      role: 'Assistant Professor',
      company: 'UC San Diego',
      initials: 'BS',
    },
    {
      quote:
        "It's mind blowing how fast this guy can learn and understand new concepts.",
      name: 'Brian Jemilo II',
      role: 'CTO',
      company: 'Shibiko AI',
      initials: 'BJ',
    },
  ];

  return (
    <section className="nr-section">
      <div className="nr-container">
        <div className="text-center mb-16">
          <p className="nr-section-label">Proof</p>
          <h2>What clients say</h2>
        </div>

        <div className="nr-grid-2">
          {testimonials.map((t, index) => (
            <div key={index} className="nr-card">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: 'var(--nr-navy)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--nr-navy)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--nr-text-dim)' }}
                  >
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>

              <p
                className="font-serif italic text-lg"
                style={{ color: 'var(--nr-text-muted)' }}
              >
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
