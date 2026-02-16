'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'GET FOUND & GET CUSTOMERS',
    quote: 'I need a website that actually brings in business.',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns & ads',
      'Google Business & local search setup',
    ],
  },
  {
    title: 'SAVE TIME & CUT COSTS',
    quote: 'I spend too much time on things a computer should handle.',
    features: [
      'Custom apps & dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
  },
  {
    title: 'KEEP CUSTOMERS COMING BACK',
    quote: 'I win customers but they don\'t stick around.',
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

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header reveal with neon flicker
      const header = el.querySelector('.v10-services-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Neon flicker on section heading when it enters view
      const heading = el.querySelector<HTMLElement>('.v10-services-heading')
      if (heading) {
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              heading,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.8,
                ease: 'none',
                keyframes: {
                  '0%': { opacity: 0 },
                  '10%': { opacity: 0.8 },
                  '15%': { opacity: 0.2 },
                  '20%': { opacity: 0.9 },
                  '25%': { opacity: 0.4 },
                  '35%': { opacity: 1 },
                  '100%': { opacity: 1 },
                },
              }
            )
          },
        })
      }

      // Staggered card reveal from left
      const cards = el.querySelectorAll('.v10-svc-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -50, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
            delay: i * 0.18,
          }
        )
      })

      // Hover glow effect on cards
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow:
              '0 0 30px #FF00FF44, 0 0 60px #FF00FF22, inset 0 0 20px #FF00FF08',
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow:
              '0 0 0px transparent, inset 0 0 0px transparent',
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v10-services {
          background: #0A0010;
          padding: 120px 24px;
          position: relative;
          overflow: hidden;
        }

        .v10-services::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FF00FF, transparent);
          box-shadow: 0 0 20px #FF00FF, 0 0 40px #FF00FF40;
        }

        /* Subtle grid overlay */
        .v10-services::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#FF00FF06 1px, transparent 1px),
            linear-gradient(90deg, #FF00FF06 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .v10-services-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .v10-services-header {
          margin-bottom: 64px;
          opacity: 0;
        }

        .v10-services .v10-section-label {
          display: block;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          text-shadow: 0 0 10px #39FF1444;
        }

        .v10-services-heading {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          text-transform: uppercase;
          color: #E0D0FF;
          margin: 0;
          letter-spacing: 0.05em;
          text-shadow: 0 0 30px #FF00FF60, 0 0 60px #FF00FF30;
        }

        .v10-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .v10-svc-card {
          background: #1A0F2E;
          border: 1px solid #2A1F3D;
          border-left: 3px solid #FF00FF;
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: border-color 0.3s ease;
        }

        /* Neon glow line at top on hover */
        .v10-svc-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #FF00FF, #BF00FF, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .v10-svc-card:hover::before {
          opacity: 1;
        }

        .v10-svc-card:hover {
          border-color: #FF00FF;
        }

        .v10-svc-title {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 1.05rem;
          font-weight: 700;
          color: #FF00FF;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 16px;
          text-shadow: 0 0 10px #FF00FF44;
        }

        .v10-svc-quote {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-style: italic;
          color: #8B7BA8;
          line-height: 1.6;
          margin: 0 0 24px;
          padding-left: 12px;
          border-left: 2px solid #BF00FF44;
        }

        .v10-svc-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .v10-svc-feature {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.82rem;
          line-height: 1.5;
          color: #E0D0FFcc;
          padding-left: 22px;
          position: relative;
        }

        .v10-svc-feature::before {
          content: '>';
          position: absolute;
          left: 0;
          color: #39FF14;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          text-shadow: 0 0 6px #39FF1444;
        }

        .v10-services-cta {
          text-align: center;
          margin-top: 64px;
        }

        .v10-services-cta-btn {
          display: inline-block;
          padding: 16px 40px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #FF00FF;
          background: transparent;
          text-decoration: none;
          border: 2px solid #FF00FF;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px #FF00FF44;
          text-shadow: 0 0 10px #FF00FF66;
          position: relative;
          overflow: hidden;
        }

        .v10-services-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #FF00FF;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .v10-services-cta-btn:hover {
          color: #0A0010;
          text-shadow: none;
          box-shadow: 0 0 30px #FF00FF88, 0 0 60px #FF00FF44;
        }

        .v10-services-cta-btn:hover::before {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .v10-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .v10-services {
            padding: 80px 16px;
          }

          .v10-services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .v10-svc-card {
            padding: 28px 20px;
          }

          .v10-services-cta-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .v10-services {
            padding: 64px 16px;
          }

          .v10-services-header {
            margin-bottom: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v10-services-header,
          .v10-svc-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} id="services" className="v10-services">
        <div className="v10-services-inner">
          <div className="v10-services-header">
            <span className="v10-section-label">// SERVICES</span>
            <h2 className="v10-services-heading">WHAT YOU GET</h2>
          </div>

          <div className="v10-services-grid">
            {services.map((svc) => (
              <div key={svc.title} className="v10-svc-card">
                <h3 className="v10-svc-title">{svc.title}</h3>
                <p className="v10-svc-quote">&ldquo;{svc.quote}&rdquo;</p>
                <ul className="v10-svc-features">
                  {svc.features.map((feat) => (
                    <li key={feat} className="v10-svc-feature">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="v10-services-cta">
            <a href="#contact" className="v10-services-cta-btn">
              LET&apos;S TALK
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
