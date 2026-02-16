'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'get found & get customers',
    quote: 'I need a website that actually brings in business.',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns & ads',
      'Google Business & local search setup',
    ],
  },
  {
    title: 'save time & cut costs',
    quote: 'I spend too much time on things a computer should handle.',
    features: [
      'Custom apps & dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
  },
  {
    title: 'keep customers coming back',
    quote: 'I win customers but they don\u2019t stick around.',
    features: [
      'Loyalty programs',
      'Email sequences that keep you top of mind',
      'Customer feedback systems',
      'Retention analytics',
    ],
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

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

      // Cards staggered reveal with accent bar animation
      const validCards = cardsRef.current.filter(Boolean)
      if (validCards.length) {
        validCards.forEach((card, i) => {
          if (!card) return

          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          })

          // Accent bar grows in
          const bar = card.querySelector('.v7-service-accent-bar')
          if (bar) {
            gsap.from(bar, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.6,
              delay: i * 0.15 + 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
              },
            })
          }
        })
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="v7-services" ref={sectionRef}>
      <div className="v7-services-container">
        <div className="v7-services-header" ref={headerRef}>
          <span className="v7-label">what you get</span>
          <h2 className="v7-services-heading">three ways i help businesses grow</h2>
        </div>

        <div className="v7-services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="v7-service-card"
              ref={(el) => { cardsRef.current[i] = el }}
            >
              <div className="v7-service-accent-bar" />
              <div className="v7-service-card-body">
                <h3 className="v7-service-title">{service.title}</h3>
                <p className="v7-service-quote">
                  &ldquo;{service.quote}&rdquo;
                </p>
                <ul className="v7-service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="v7-services-cta" ref={ctaRef}>
          <a href="#contact" className="v7-btn">
            let&apos;s talk about your business
          </a>
        </div>
      </div>

      <style>{`
        .v7-services {
          padding: 140px 24px;
          background: #0A0A0A;
        }

        .v7-services-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .v7-services-header {
          margin-bottom: 72px;
        }

        .v7-services-heading {
          font-family: var(--font-instrument-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          line-height: 1.1;
          margin: 0;
        }

        .v7-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .v7-services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .v7-services {
            padding: 100px 20px;
          }
        }

        .v7-service-card {
          background: #161616;
          border: 1px solid rgba(245, 245, 240, 0.06);
          border-radius: 2px;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .v7-service-accent-bar {
          width: 4px;
          flex-shrink: 0;
          background: #FF4D00;
        }

        .v7-service-card-body {
          padding: 36px 32px;
          flex: 1;
        }

        .v7-service-title {
          font-family: var(--font-instrument-serif);
          font-size: 1.35rem;
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          margin: 0 0 16px 0;
          line-height: 1.3;
        }

        .v7-service-quote {
          font-family: var(--font-instrument-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: rgba(245, 245, 240, 0.4);
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .v7-service-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .v7-service-features li {
          font-family: var(--font-inter);
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(245, 245, 240, 0.6);
          padding: 4px 0 4px 20px;
          position: relative;
        }

        .v7-service-features li::before {
          content: '\u2014';
          position: absolute;
          left: 0;
          color: #FF4D00;
          font-size: 0.85rem;
        }

        .v7-services-cta {
          margin-top: 64px;
          text-align: center;
        }

        .v7-btn {
          display: inline-block;
          font-family: var(--font-inter);
          font-size: 0.95rem;
          font-weight: 500;
          color: #0A0A0A;
          background: #FF4D00;
          padding: 16px 40px;
          border-radius: 2px;
          text-decoration: none;
          text-transform: lowercase;
          letter-spacing: 0.02em;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .v7-btn:hover {
          background: #E64400;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  )
}
