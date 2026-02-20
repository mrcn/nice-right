'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'Get Found & Get Customers',
    quote: 'I need a website that actually brings in business.',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns & ads',
      'Google Business & local search setup',
    ],
  },
  {
    title: 'Save Time & Cut Costs',
    quote: 'I spend too much time on things a computer should handle.',
    features: [
      'Custom apps & dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
  },
  {
    title: 'Keep Customers Coming Back',
    quote: "I win customers but they don\u2019t stick around.",
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header reveal
      const header = section.querySelector('.v9-services-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top bottom-=80',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Staggered card reveals
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=60',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // CTA reveal
      const cta = section.querySelector('.v9-services-cta')
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
              start: 'top bottom-=40',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="services" className="v9-services v9-section-warm">
        <div className="v9-services-container">
          <div className="v9-services-header">
            <p className="v9-section-label">What You Get</p>
            <h2 className="v9-services-heading">Three ways I help businesses grow</h2>
          </div>

          <div className="v9-services-stack">
            {services.map((service, i) => (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="v9-service-card"
              >
                <div className="v9-service-accent" aria-hidden="true" />
                <h3 className="v9-service-title">{service.title}</h3>
                <p className="v9-service-quote">&ldquo;{service.quote}&rdquo;</p>
                <ul className="v9-service-features">
                  {service.features.map((f) => (
                    <li key={f}>
                      <svg
                        className="v9-check-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4"
                          stroke="url(#v9-check-grad)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="v9-check-grad"
                            x1="3"
                            y1="4"
                            x2="13"
                            y2="12"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#0B8A6E" />
                            <stop offset="1" stopColor="#06D6A0" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="v9-services-cta">
            <a href="#contact" className="v9-btn v9-btn-gradient">
              Let&apos;s Talk About Your Business
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .v9-services {
          padding: 120px 0;
        }

        .v9-section-warm {
          background: #F8F7F4;
        }

        .v9-services-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .v9-services-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v9-section-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 12px 0;
        }

        .v9-services-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #0C1117;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .v9-services-stack {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .v9-service-card {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.3s ease;
        }

        .v9-service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.09);
        }

        .v9-service-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0B8A6E 0%, #06D6A0 100%);
          border-radius: 20px 20px 0 0;
        }

        .v9-service-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #0C1117;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .v9-service-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(12, 17, 23, 0.5);
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .v9-service-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .v9-service-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          color: #0C1117;
          line-height: 1.5;
        }

        .v9-check-icon {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .v9-services-cta {
          text-align: center;
          margin-top: 56px;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .v9-services {
            padding: 80px 0;
          }

          .v9-services-header {
            margin-bottom: 40px;
          }

          .v9-service-card {
            padding: 28px 24px;
            border-radius: 16px;
          }

          .v9-service-title {
            font-size: 1.3rem;
          }

          .v9-services-stack {
            gap: 24px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .v9-service-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-services-header,
          .v9-services-cta {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}
