'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

const LINKEDIN_URL = 'https://www.linkedin.com/in/mklaudiusz/details/recommendations/'

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const quotesRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // Each testimonial block reveals independently
      quotesRef.current.forEach((block) => {
        if (!block) return

        const quoteMarkEl = block.querySelector('.v7-testimonial-quotemark')
        const quoteTextEl = block.querySelector('.v7-testimonial-text')
        const attrEl = block.querySelector('.v7-testimonial-attribution')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            once: true,
          },
        })

        if (quoteMarkEl) {
          tl.from(quoteMarkEl, {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
          })
        }

        if (quoteTextEl) {
          tl.from(
            quoteTextEl,
            {
              y: 30,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.25'
          )
        }

        if (attrEl) {
          tl.from(
            attrEl,
            {
              y: 20,
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.35'
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="v7-testimonials" ref={sectionRef}>
      <div className="v7-testimonials-container">
        <div className="v7-testimonials-header" ref={headerRef}>
          <span className="v7-label">testimonials</span>
          <h2 className="v7-testimonials-heading">what it&apos;s like working together</h2>
        </div>

        <div className="v7-testimonials-list">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className="v7-testimonial-block"
              ref={(el) => { quotesRef.current[i] = el }}
            >
              <span className="v7-testimonial-quotemark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="v7-testimonial-text">{t.quote}</p>
              <footer className="v7-testimonial-attribution">
                <cite className="v7-testimonial-name">{t.name}</cite>
                <span className="v7-testimonial-role">{t.role}</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v7-testimonial-verify"
                >
                  verify on linkedin &rarr;
                </a>
              </footer>
              {i < testimonials.length - 1 && (
                <div className="v7-testimonial-separator" aria-hidden="true" />
              )}
            </blockquote>
          ))}
        </div>
      </div>

      <style>{`
        .v7-testimonials {
          padding: 140px 24px;
          background: #0A0A0A;
        }

        .v7-testimonials-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .v7-testimonials-header {
          margin-bottom: 80px;
        }

        .v7-testimonials-heading {
          font-family: var(--font-instrument-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          line-height: 1.1;
          margin: 0;
        }

        .v7-testimonials-list {
          display: flex;
          flex-direction: column;
        }

        .v7-testimonial-block {
          position: relative;
          margin: 0;
          padding: 60px 0 60px 0;
          border: none;
        }

        .v7-testimonial-block:first-child {
          padding-top: 0;
        }

        .v7-testimonial-quotemark {
          position: absolute;
          top: -10px;
          left: -8px;
          font-family: var(--font-instrument-serif);
          font-size: clamp(8rem, 12vw, 12rem);
          line-height: 1;
          color: #FF4D00;
          opacity: 0.15;
          pointer-events: none;
          user-select: none;
        }

        .v7-testimonial-block:first-child .v7-testimonial-quotemark {
          top: -70px;
        }

        .v7-testimonial-text {
          font-family: var(--font-instrument-serif);
          font-style: italic;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          line-height: 1.4;
          color: #F5F5F0;
          margin: 0 0 32px 0;
          position: relative;
          z-index: 1;
        }

        .v7-testimonial-attribution {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 8px 16px;
          position: relative;
          z-index: 1;
        }

        .v7-testimonial-name {
          font-family: var(--font-inter);
          font-style: normal;
          font-size: 1rem;
          font-weight: 600;
          color: #F5F5F0;
        }

        .v7-testimonial-role {
          font-family: var(--font-inter);
          font-size: 0.9rem;
          color: rgba(245, 245, 240, 0.4);
        }

        .v7-testimonial-verify {
          font-family: var(--font-jetbrains-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #FF4D00;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .v7-testimonial-verify:hover {
          opacity: 0.7;
        }

        .v7-testimonial-separator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            #FF4D00 0%,
            rgba(255, 77, 0, 0.2) 40%,
            transparent 100%
          );
        }

        @media (max-width: 768px) {
          .v7-testimonials {
            padding: 100px 20px;
          }
          .v7-testimonial-block {
            padding: 40px 0;
          }
          .v7-testimonial-quotemark {
            font-size: 7rem;
            top: -5px;
            left: -4px;
          }
          .v7-testimonial-block:first-child .v7-testimonial-quotemark {
            top: -50px;
          }
        }
      `}</style>
    </section>
  )
}
