'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * V7 "Noir Editorial" Proof section
 *
 * Stats with GSAP counter animation, case study cards with parallax images,
 * and an about block. All driven by ScrollTrigger reveals.
 */

interface StatItem {
  end: number
  suffix: string
  label: string
}

interface CaseStudy {
  client: string
  headline: string
  description: string
  image: string
  alt: string
}

const stats: StatItem[] = [
  { end: 290, suffix: '%', label: 'traffic growth for a home service company' },
  { end: 12, suffix: 'x', label: 'more leads from the same site' },
  { end: 80, suffix: '%', label: 'time saved with workflow automation' },
]

const caseStudies: CaseStudy[] = [
  {
    client: 'Healthcare Platform',
    headline: 'cut deal-closing time by 40%',
    description: 'Custom portal connecting providers with property opportunities.',
    image: '/images/nursing-home-money.webp',
    alt: 'Healthcare investment platform',
  },
  {
    client: 'Northern Trust',
    headline: 'modernized a Fortune 500 web presence',
    description: 'Micro-interactions and animation that boosted engagement.',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
  },
  {
    client: 'GreenPill Dev Guild',
    headline: 'built a verified impact platform for conservation',
    description: 'Blockchain PWA tracking biodiversity actions with on-chain attestations.',
    image: '/images/garden-money.webp',
    alt: 'Green Goods biodiversity platform',
  },
]

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show final state for reduced-motion users
      section.querySelectorAll('[data-stat-value]').forEach((el, i) => {
        ;(el as HTMLElement).textContent = `${stats[i].end}${stats[i].suffix}`
      })
      section.querySelectorAll('.v7-proof-stat, .v7-case-card, .v7-about-card, .v7-proof-header').forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
      // -- Header reveal --
      const header = section.querySelector('.v7-proof-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 24 },
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

      // -- 1. Stats: reveal + counter animation --
      if (statsRef.current) {
        const valueEls = statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]')
        const statBlocks = statsRef.current.querySelectorAll('.v7-proof-stat')

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            },
            onStart: () => {
              stats.forEach((stat, i) => {
                const el = valueEls[i]
                if (!el) return
                const obj = { value: 0 }
                gsap.to(obj, {
                  value: stat.end,
                  duration: 2,
                  ease: 'power2.out',
                  snap: { value: 1 },
                  onUpdate: () => {
                    el.textContent = `${Math.round(obj.value)}${stat.suffix}`
                  },
                })
              })
            },
          }
        )
      }

      // -- 2. Case study cards: staggered reveal --
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.v7-case-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.18,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )

        // -- 3. Case study image parallax --
        const images = cardsRef.current.querySelectorAll('.v7-case-image img')
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.v7-case-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        })

        // -- 4. Hover effects on case study cards --
        cards.forEach((card) => {
          const img = card.querySelector('.v7-case-image img')
          if (!img) return

          const hoverTl = gsap.timeline({ paused: true })
          hoverTl.to(img, { scale: 1.18, duration: 0.4, ease: 'power2.out' })

          card.addEventListener('mouseenter', () => hoverTl.play())
          card.addEventListener('mouseleave', () => hoverTl.reverse())
        })
      }

      // -- 5. About card reveal --
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="results" className="v7-proof">
      <div className="v7-container">
        {/* Header */}
        <div className="v7-proof-header">
          <p className="v7-section-label">results</p>
          <h2 className="v7-proof-heading">numbers from real projects</h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="v7-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="v7-proof-stat">
              <div className="v7-stat-number">
                <span data-stat-value>{stat.end}{stat.suffix}</span>
              </div>
              <div className="v7-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div ref={cardsRef} className="v7-case-studies">
          {caseStudies.map((study) => (
            <div key={study.client} className="v7-case-card">
              <div className="v7-case-image">
                <img src={study.image} alt={study.alt} />
              </div>
              <div className="v7-case-body">
                <span className="v7-case-client">{study.client}</span>
                <h3 className="v7-case-headline">{study.headline}</h3>
                <p className="v7-case-desc">{study.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div ref={aboutRef} className="v7-about-card">
          <div className="v7-about-image">
            <img src="/images/hero-abstract.svg" alt="Nice Right" />
          </div>
          <div className="v7-about-text">
            <p className="v7-about-bio">
              I&apos;m Marcin. 13 years building websites, 6 at a digital
              agency, 100+ projects for small and mid-size businesses.
              When you work with Nice Right, you work directly with me
              &mdash; start to finish.
            </p>
            <p className="v7-about-clients">
              Currently working with clients in food service, healthcare,
              e-commerce, and local services.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .v7-proof {
          background: #0A0A0A;
          color: #F5F5F0;
          padding: 120px 0;
          overflow: hidden;
        }

        .v7-proof-header {
          margin-bottom: 64px;
          opacity: 0;
        }

        .v7-proof .v7-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF4D00;
          margin: 0 0 16px;
        }

        .v7-proof-heading {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0;
          color: #F5F5F0;
        }

        /* ---- Stats ---- */
        .v7-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 80px;
          padding-bottom: 64px;
          border-bottom: 1px solid rgba(245, 245, 240, 0.08);
        }

        .v7-proof-stat {
          opacity: 0;
        }

        .v7-stat-number {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 1;
          color: #FF4D00;
          margin-bottom: 8px;
        }

        .v7-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(245, 245, 240, 0.5);
          max-width: 220px;
        }

        /* ---- Case Studies ---- */
        .v7-case-studies {
          display: flex;
          flex-direction: column;
          gap: 48px;
          margin-bottom: 80px;
        }

        .v7-case-card {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: center;
          opacity: 0;
          cursor: default;
        }

        .v7-case-card:nth-child(even) {
          direction: rtl;
        }

        .v7-case-card:nth-child(even) > * {
          direction: ltr;
        }

        .v7-case-image {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 77, 0, 0.2);
          aspect-ratio: 16 / 10;
        }

        .v7-case-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(30%) contrast(1.05);
          transition: filter 0.4s ease;
          will-change: transform;
        }

        .v7-case-card:hover .v7-case-image img {
          filter: grayscale(0%) contrast(1.1);
        }

        .v7-case-body {
          padding: 8px 0;
        }

        .v7-case-client {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFB800;
          display: block;
          margin-bottom: 12px;
        }

        .v7-case-headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 400;
          line-height: 1.2;
          color: #F5F5F0;
          margin: 0 0 12px;
        }

        .v7-case-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(245, 245, 240, 0.55);
          margin: 0;
          max-width: 400px;
        }

        /* ---- About ---- */
        .v7-about-card {
          display: flex;
          align-items: center;
          gap: 32px;
          background: rgba(245, 245, 240, 0.03);
          border: 1px solid rgba(245, 245, 240, 0.06);
          padding: 40px;
          opacity: 0;
        }

        .v7-about-image {
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #FF4D00;
        }

        .v7-about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(20%);
        }

        .v7-about-text {
          flex: 1;
        }

        .v7-about-bio {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #F5F5F0;
          margin: 0 0 8px;
        }

        .v7-about-clients {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: rgba(245, 245, 240, 0.45);
          margin: 0;
          line-height: 1.5;
        }

        /* ---- Mobile ---- */
        @media (max-width: 768px) {
          .v7-proof {
            padding: 80px 0;
          }

          .v7-stats-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
            margin-bottom: 64px;
            padding-bottom: 48px;
          }

          .v7-stat-label {
            max-width: none;
          }

          .v7-case-card,
          .v7-case-card:nth-child(even) {
            grid-template-columns: 1fr;
            gap: 20px;
            direction: ltr;
          }

          .v7-case-image {
            aspect-ratio: 16 / 9;
          }

          .v7-about-card {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
          }

          .v7-about-bio {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .v7-proof-heading {
            font-size: clamp(1.6rem, 8vw, 2.2rem);
          }

          .v7-stat-number {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .v7-proof-stat,
          .v7-case-card,
          .v7-about-card,
          .v7-proof-header {
            opacity: 1 !important;
            transform: none !important;
          }

          .v7-case-image img {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
