'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    initials: 'RP',
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let gsapModule: typeof import('gsap') | null = null
    let scrollModule: typeof import('gsap/ScrollTrigger') | null = null

    const init = async () => {
      gsapModule = await import('gsap')
      scrollModule = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.v10-testimonial-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
    init()

    return () => {
      if (scrollModule) {
        scrollModule.ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="v10-testimonials" id="testimonials">
      <div className="v10-testimonials-inner">
        <div className="v10-testimonials-header">
          <span className="v10-section-label">// TESTIMONIALS</span>
          <h2 className="v10-section-heading">WHAT THEY SAID</h2>
        </div>

        <div className="v10-testimonials-grid">
          {testimonials.map((t) => (
            <blockquote key={t.initials} className="v10-testimonial-card">
              <div className="v10-testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </div>
              <div className="v10-testimonial-output">
                <span className="v10-testimonial-prompt">$ stdout &gt;</span>
                <p className="v10-testimonial-text">{t.quote}</p>
              </div>
              <footer className="v10-testimonial-attribution">
                <div className="v10-testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="v10-testimonial-meta">
                  <cite className="v10-testimonial-name">{t.name}</cite>
                  <span className="v10-testimonial-role">{t.role}</span>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v10-testimonial-verify"
                  >
                    VERIFY_ON_LINKEDIN &rarr;
                  </a>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      <style>{`
        .v10-testimonials {
          padding: 120px 24px;
          background: #0A0010;
          position: relative;
          overflow: hidden;
        }
        .v10-testimonials::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FF00FF, transparent);
          box-shadow: 0 0 20px #FF00FF, 0 0 40px #FF00FF40;
        }
        .v10-testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .v10-testimonials-header {
          margin-bottom: 64px;
        }
        .v10-section-label {
          display: block;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: #39FF14;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .v10-testimonials .v10-section-heading {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          text-transform: uppercase;
          color: #E0D0FF;
          margin: 0;
          letter-spacing: 0.05em;
          text-shadow: 0 0 30px #FF00FF60, 0 0 60px #FF00FF30;
        }
        .v10-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        @media (max-width: 768px) {
          .v10-testimonials-grid {
            grid-template-columns: 1fr;
          }
          .v10-testimonials {
            padding: 80px 16px;
          }
        }
        .v10-testimonial-card {
          position: relative;
          margin: 0;
          padding: 40px 32px 32px;
          background: #0D0018;
          border: 1px solid #2A1F3D;
          box-shadow:
            0 0 15px #FF00FF15,
            inset 0 0 30px #0A001080;
          transition: border-color 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        .v10-testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF00FF, #00FFFF, #FF00FF);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .v10-testimonial-card:hover {
          border-color: #FF00FF60;
          box-shadow:
            0 0 30px #FF00FF25,
            0 0 60px #FF00FF10,
            inset 0 0 30px #0A001080;
        }
        .v10-testimonial-card:hover::before {
          opacity: 1;
        }
        .v10-testimonial-quote-mark {
          font-size: 6rem;
          line-height: 0.8;
          color: #00FFFF;
          font-family: Georgia, serif;
          text-shadow: 0 0 20px #00FFFF80, 0 0 40px #00FFFF40;
          position: absolute;
          top: 12px;
          right: 24px;
          opacity: 0.4;
          user-select: none;
        }
        .v10-testimonial-output {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
        }
        .v10-testimonial-prompt {
          display: block;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.7rem;
          color: #00FFFF;
          text-shadow: 0 0 8px #00FFFF60;
          margin-bottom: 12px;
          opacity: 0.7;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .v10-testimonial-text {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #C0B0E0;
          margin: 0;
        }
        .v10-testimonial-attribution {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid #2A1F3D;
          position: relative;
          z-index: 1;
        }
        .v10-testimonial-avatar {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1A0F2E;
          border: 1px solid #39FF14;
          box-shadow: 0 0 10px #39FF1430;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #39FF14;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .v10-testimonial-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .v10-testimonial-name {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-style: normal;
          font-size: 0.85rem;
          font-weight: 700;
          color: #39FF14;
          text-shadow: 0 0 8px #39FF1440;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .v10-testimonial-role {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          color: #8070A0;
          letter-spacing: 0.03em;
        }
        .v10-testimonial-verify {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.7rem;
          color: #00FFFF;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: text-shadow 0.3s, color 0.3s;
          margin-top: 2px;
        }
        .v10-testimonial-verify:hover {
          color: #FF00FF;
          text-shadow: 0 0 10px #FF00FF80;
        }
      `}</style>
    </section>
  )
}
