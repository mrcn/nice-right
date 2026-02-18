import { CascadeGrid } from './CascadeGrid'

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
    <section className="v2-testimonials v2-testimonials-alt">
      <div className="v2-container">
        <div className="v2-testimonials-header v2-reveal">
          <div className="v2-section-label">Testimonials</div>
          <h2>What it&apos;s like working together</h2>
        </div>

        <CascadeGrid className="v2-testimonials-grid">
          {testimonials.map((t) => (
            <blockquote key={t.initials} className="v2-testimonial-card">
              <div className="v2-testimonial-pull">
                &ldquo;{t.pull}&rdquo;
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--v2-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {t.quote}
              </p>
              <footer className="v2-testimonial-attribution">
                <div className="v2-testimonial-avatar" aria-hidden="true">{t.initials}</div>
                <div>
                  <cite className="v2-testimonial-name" style={{ fontStyle: 'normal' }}>{t.name}</cite>
                  <div className="v2-testimonial-role">{t.role}</div>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-testimonial-verify"
                  >
                    Verify on LinkedIn &rarr;
                  </a>
                </div>
              </footer>
            </blockquote>
          ))}
        </CascadeGrid>
      </div>
    </section>
  )
}
