'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StatItem {
  end: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { end: 290, suffix: '%', label: 'TRAFFIC GROWTH FOR A HOME SERVICE COMPANY' },
  { end: 12, suffix: 'x', label: 'MORE LEADS FROM THE SAME SITE' },
  { end: 80, suffix: '%', label: 'TIME SAVED WITH WORKFLOW AUTOMATION' },
]

const caseStudies = [
  {
    tag: 'HEALTHCARE PLATFORM',
    headline: 'Cut deal-closing time by 40%',
    image: '/images/nursing-home-money.webp',
    alt: 'Healthcare investment platform',
  },
  {
    tag: 'NORTHERN TRUST',
    headline: 'Modernized a Fortune 500 web presence',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
  },
  {
    tag: 'GREENPILL DEV GUILD',
    headline: 'Built a verified impact platform for conservation',
    image: '/images/garden-money.webp',
    alt: 'GreenPill Dev Guild biodiversity platform',
  },
]

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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

      // Stats: mechanical counter with steps easing
      if (statsRef.current) {
        const valueEls = statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]')

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            stats.forEach((stat, i) => {
              const node = valueEls[i]
              if (!node) return
              gsap.set(node.closest('.v8-stat-block'), { opacity: 1 })
              const obj = { value: 0 }
              gsap.to(obj, {
                value: stat.end,
                duration: 1.4,
                ease: `steps(${Math.min(stat.end, 30)})`,
                delay: i * 0.15,
                onUpdate: () => {
                  node.textContent = `${Math.round(obj.value)}${stat.suffix}`
                },
              })
            })
          },
        })
      }

      // Pop in case studies and about
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
        .v8-proof {
          background: #F5F5F0;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-proof-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-proof-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #0000FF;
          margin: 0 0 24px;
        }

        .v8-proof-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 80px;
        }

        /* --- Stats --- */
        .v8-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #0A0A0A;
          margin-bottom: 80px;
        }

        .v8-stat-block {
          padding: 48px 32px;
          border-right: 3px solid #0A0A0A;
        }

        .v8-stat-block:last-child {
          border-right: none;
        }

        .v8-stat-number {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(5rem, 10vw, 10rem);
          line-height: 1;
          color: #FF0000;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .v8-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          margin-top: 16px;
          line-height: 1.5;
        }

        /* --- Case Studies --- */
        .v8-cases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #0A0A0A;
          margin-bottom: 80px;
        }

        .v8-case-card {
          border-right: 3px solid #0A0A0A;
          overflow: hidden;
          text-decoration: none;
          color: #0A0A0A;
          display: block;
        }

        .v8-case-card:last-child {
          border-right: none;
        }

        .v8-case-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-bottom: 3px solid #0A0A0A;
        }

        .v8-case-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(100%) contrast(1.1);
          border-radius: 0;
        }

        .v8-case-card:hover .v8-case-image img {
          filter: grayscale(30%) contrast(1.1) sepia(20%) hue-rotate(180deg);
        }

        .v8-case-body {
          padding: 24px;
        }

        .v8-case-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 12px;
        }

        .v8-case-headline {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
          color: #0A0A0A;
          margin: 0;
          line-height: 1.2;
        }

        /* --- About --- */
        .v8-about-block {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          border: 3px solid #0A0A0A;
          padding: 48px;
          margin-bottom: 64px;
        }

        .v8-about-image {
          flex-shrink: 0;
          width: 180px;
          height: 180px;
          overflow: hidden;
          border: 3px solid #0A0A0A;
        }

        .v8-about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(40%) contrast(1.1);
          border-radius: 0;
        }

        .v8-about-text p {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1.1rem;
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0;
        }

        .v8-about-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
          opacity: 0.6;
          margin-top: 16px !important;
        }

        /* --- CTA --- */
        .v8-proof-cta {
          text-align: center;
        }

        .v8-proof-cta a {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 20px 48px;
          border: 3px solid #0A0A0A;
          border-radius: 0;
          text-decoration: none;
        }

        .v8-proof-cta a:hover {
          background: #0A0A0A;
          color: #F5F5F0;
        }

        /* --- Responsive --- */
        @media (max-width: 900px) {
          .v8-proof {
            padding: 80px 0;
          }

          .v8-proof-inner {
            padding: 0 20px;
          }

          .v8-stats-grid {
            grid-template-columns: 1fr;
          }

          .v8-stat-block {
            border-right: none;
            border-bottom: 3px solid #0A0A0A;
            padding: 32px 24px;
          }

          .v8-stat-block:last-child {
            border-bottom: none;
          }

          .v8-stat-number {
            font-size: clamp(4rem, 18vw, 7rem);
          }

          .v8-cases {
            grid-template-columns: 1fr;
          }

          .v8-case-card {
            border-right: none;
            border-bottom: 3px solid #0A0A0A;
          }

          .v8-case-card:last-child {
            border-bottom: none;
          }

          .v8-about-block {
            flex-direction: column;
            padding: 32px 24px;
            gap: 24px;
          }

          .v8-about-image {
            width: 140px;
            height: 140px;
          }
        }

        @media (max-width: 600px) {
          .v8-proof-heading {
            font-size: clamp(2rem, 10vw, 3rem);
            margin-bottom: 48px;
          }

          .v8-stat-number {
            font-size: clamp(3.5rem, 20vw, 6rem);
          }

          .v8-proof-cta a {
            width: 100%;
            text-align: center;
            padding: 16px 32px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section ref={sectionRef} id="results" className="v8-proof">
        <div className="v8-proof-inner">
          <p className="v8-proof-label v8-hidden v8-pop">RESULTS</p>
          <h2 className="v8-proof-heading v8-hidden v8-pop">NUMBERS FROM REAL PROJECTS</h2>

          {/* Stats */}
          <div ref={statsRef} className="v8-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="v8-stat-block v8-hidden">
                <div className="v8-stat-number">
                  <span data-stat-value>0{stat.suffix}</span>
                </div>
                <div className="v8-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="v8-cases v8-hidden v8-pop">
            {caseStudies.map((cs) => (
              <div key={cs.tag} className="v8-case-card">
                <div className="v8-case-image">
                  <img src={cs.image} alt={cs.alt} />
                </div>
                <div className="v8-case-body">
                  <p className="v8-case-tag">{cs.tag}</p>
                  <h3 className="v8-case-headline">{cs.headline}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="v8-about-block v8-hidden v8-pop">
            <div className="v8-about-image">
              <img src="/images/me-low.jpg" alt="Marcin Dabrowski" />
            </div>
            <div className="v8-about-text">
              <p>
                I&apos;m Marcin. 13 years building websites, 6 at a digital
                agency, 100+ projects for small and mid-size businesses.
                When you work with Nice Right, you work directly with me
                &mdash; start to finish.
              </p>
              <p className="v8-about-sub">
                Currently working with clients in food service, healthcare,
                e-commerce, and local services.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="v8-proof-cta v8-hidden v8-pop">
            <a href="#contact">SEE WHAT&apos;S POSSIBLE FOR YOUR BUSINESS</a>
          </div>
        </div>
      </section>
    </>
  )
}
