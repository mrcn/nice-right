'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'ROMAN PANCHYSHYN',
    role: 'Sr. Manager UX, Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    name: 'JONATHAN CARSTENSEN',
    role: 'PM, Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    name: 'BRITT SKAATHUN',
    role: 'Asst Professor, UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    name: 'BRIAN JEMILO II',
    role: 'CTO, Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v8-hidden').forEach((node) => {
        ;(node as HTMLElement).style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set('.v8-hidden', { opacity: 0 })

      const popEls = el.querySelectorAll('.v8-pop')
      popEls.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.set(node, { opacity: 1, delay: 0.01 * i })
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v8-testimonials {
          background: #F5F5F0;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-testimonials-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-testimonials-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #0000FF;
          margin: 0 0 24px;
        }

        .v8-testimonials-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 80px;
        }

        .v8-testimonials-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .v8-testimonial-item {
          padding: 48px 0;
          border-bottom: 3px solid #0A0A0A;
          position: relative;
        }

        .v8-testimonial-item:first-child {
          border-top: 3px solid #0A0A0A;
        }

        .v8-testimonial-quote-mark {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(6rem, 12vw, 10rem);
          line-height: 0.6;
          color: #0000FF;
          margin: 0 0 24px;
          display: block;
          user-select: none;
        }

        .v8-testimonial-quote {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0 0 32px;
          max-width: 900px;
        }

        .v8-testimonial-attribution {
          display: flex;
          align-items: baseline;
          gap: 16px;
          flex-wrap: wrap;
        }

        .v8-testimonial-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
        }

        .v8-testimonial-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
          opacity: 0.6;
        }

        .v8-testimonial-verify {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0000FF;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }

        .v8-testimonial-verify:hover {
          color: #0A0A0A;
        }

        @media (max-width: 900px) {
          .v8-testimonials {
            padding: 80px 0;
          }

          .v8-testimonials-inner {
            padding: 0 20px;
          }

          .v8-testimonial-item {
            padding: 32px 0;
          }

          .v8-testimonial-quote-mark {
            font-size: clamp(5rem, 15vw, 8rem);
          }
        }

        @media (max-width: 600px) {
          .v8-testimonials-heading {
            font-size: clamp(2rem, 10vw, 3rem);
            margin-bottom: 48px;
          }

          .v8-testimonial-attribution {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="v8-testimonials">
        <div className="v8-testimonials-inner">
          <p className="v8-testimonials-label v8-hidden v8-pop">TESTIMONIALS</p>
          <h2 className="v8-testimonials-heading v8-hidden v8-pop">WHAT THEY SAID</h2>

          <ul className="v8-testimonials-list">
            {testimonials.map((t, i) => (
              <li key={t.name} className="v8-testimonial-item v8-hidden v8-pop">
                <span className="v8-testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="v8-testimonial-quote">{t.quote}</p>
                <div className="v8-testimonial-attribution">
                  <span className="v8-testimonial-name">{t.name}</span>
                  <span className="v8-testimonial-role">{t.role}</span>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v8-testimonial-verify"
                  >
                    VERIFY ON LINKEDIN
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
