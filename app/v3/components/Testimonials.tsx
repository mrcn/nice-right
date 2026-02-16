const testimonials = [
  {
    initials: 'RP',
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    pull: 'He delivered not only what was asked...',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    pull: 'A great approach to breaking down industry terms...',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    pull: 'He was able to decipher what we wanted...',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    pull: "It's mind blowing how fast this guy can learn...",
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  return (
    <section className="v2-testimonials">
      <div className="v2-container">
        <div className="v2-testimonials-header">
          <div className="v2-section-label">From People I&apos;ve Worked With</div>
          <h2>What it&apos;s like working together</h2>
        </div>

        <div className="v2-testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.initials} className="v2-testimonial-card">
              <div className="v2-testimonial-pull">
                &ldquo;{t.pull}&rdquo;
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--v2-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {t.quote}
              </p>
              <div className="v2-testimonial-attribution">
                <div className="v2-testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="v2-testimonial-name">{t.name}</div>
                  <div className="v2-testimonial-role">{t.role}</div>
                  <a
                    href="https://linkedin.com/in/mklaudiusz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-testimonial-verify"
                  >
                    View on LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
