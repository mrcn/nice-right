'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '1',
    title: 'You Share',
    body: 'Free 30-minute call. Tell me about your business and where you feel stuck. I\u2019ll give you an honest take\u2009\u2014\u2009even if the answer is \u201cyou already have what you need.\u201d',
  },
  {
    number: '2',
    title: 'I Build',
    body: 'Website, SEO, Google Business, landing pages\u2009\u2014\u2009whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    number: '3',
    title: 'You Grow',
    body: 'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.v9-step-card')
      const header = section.querySelector('.v9-how-header')
      const cta = section.querySelector('.v9-how-cta')

      // Header reveal
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Cards staggered reveal
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            once: true,
          },
        }
      )

      // CTA reveal
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top 90%',
              once: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="how-it-works"
        className="v9-how v9-section-light"
      >
        <div className="v9-container">
          <div className="v9-how-header">
            <span className="v9-section-label">How It Works</span>
            <h2 className="v9-how-heading">Simple process. Real results.</h2>
          </div>

          <div className="v9-steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="v9-step-card">
                <span className="v9-step-number">{step.number}</span>
                <h3 className="v9-step-title">{step.title}</h3>
                <p className="v9-step-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="v9-how-cta">
            <a href="#contact" className="v9-btn v9-btn-gradient">
              Book a Free Call
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .v9-how {
          position: relative;
          background: #ffffff;
          padding: 120px 0;
          z-index: 1;
        }

        .v9-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .v9-how-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v9-section-label {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0B8A6E;
          margin-bottom: 16px;
        }

        .v9-how-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0C1117;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .v9-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-bottom: 60px;
        }

        .v9-step-card {
          background: #ffffff;
          border: 1px solid rgba(12, 17, 23, 0.06);
          border-radius: 12px;
          padding: 40px 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.3s ease;
        }

        .v9-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.09);
        }

        .v9-step-number {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1;
        }

        .v9-step-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #0C1117;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .v9-step-body {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(12, 17, 23, 0.6);
          margin: 0;
        }

        .v9-how-cta {
          text-align: center;
        }

        /* Shared button styles (also defined in Hero, safe to duplicate for
           standalone rendering; CSS cascade handles dedup naturally) */
        .v9-btn {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.25s ease;
        }

        .v9-btn-gradient {
          padding: 16px 40px;
          border-radius: 12px;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          box-shadow: 0 4px 24px rgba(6, 214, 160, 0.2),
                      0 1px 3px rgba(0, 0, 0, 0.12);
        }

        .v9-btn-gradient:hover {
          transform: scale(1.02) translateY(-1px);
          box-shadow: 0 8px 32px rgba(6, 214, 160, 0.3),
                      0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .v9-btn-gradient:active {
          transform: scale(0.99);
        }

        /* ----- Responsive ----- */

        @media (max-width: 860px) {
          .v9-steps-grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 48px;
          }

          .v9-how {
            padding: 80px 0;
          }
        }

        /* ----- Reduced motion ----- */

        @media (prefers-reduced-motion: reduce) {
          .v9-how-header,
          .v9-step-card,
          .v9-how-cta {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-step-card:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  )
}
