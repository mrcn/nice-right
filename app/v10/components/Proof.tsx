'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { value: 290, suffix: '%', label: 'Traffic growth for a home service company' },
  { value: 12, suffix: 'x', label: 'More leads from the same site' },
  { value: 80, suffix: '%', label: 'Time saved with workflow automation' },
]

const caseStudies = [
  {
    client: 'Healthcare Platform',
    headline: 'Cut deal-closing time by 40%',
    description:
      'Custom portal connecting providers with property opportunities.',
    image: '/images/nursing-home-money.webp',
  },
  {
    client: 'Northern Trust',
    headline: 'Modernized a Fortune 500 web presence',
    description:
      'Micro-interactions and animation that boosted engagement.',
    image: '/images/bankk.webp',
  },
  {
    client: 'GreenPill Dev Guild',
    headline: 'Built a verified impact platform for conservation',
    description:
      'Blockchain PWA tracking biodiversity actions with on-chain attestations.',
    image: '/images/garden-money.webp',
  },
]

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Still show the numbers without animation
      el.querySelectorAll<HTMLElement>('[data-target]').forEach((numEl) => {
        const target = parseInt(numEl.dataset.target || '0', 10)
        const suffix = numEl.dataset.suffix || ''
        numEl.textContent = target + suffix
      })
      return
    }

    const ctx = gsap.context(() => {
      // Header reveal
      const header = el.querySelector('.v10-proof-header')
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

      // Counter animation with mechanical feel
      const statEls = el.querySelectorAll<HTMLElement>('[data-target]')
      statEls.forEach((numEl, i) => {
        const target = parseInt(numEl.dataset.target || '0', 10)
        const suffix = numEl.dataset.suffix || ''

        ScrollTrigger.create({
          trigger: numEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              delay: i * 0.25,
              ease: 'power2.out',
              onUpdate: () => {
                // Mechanical stepping: show integers snapping up
                numEl.textContent = Math.round(obj.val) + suffix
              },
              onComplete: () => {
                numEl.textContent = target + suffix
                // Glow pulse on completion
                gsap.fromTo(
                  numEl,
                  { textShadow: '0 0 40px #39FF14, 0 0 80px #39FF1466' },
                  {
                    textShadow:
                      '0 0 20px #39FF1480, 0 0 40px #39FF1440',
                    duration: 0.6,
                    ease: 'power2.out',
                  }
                )
              },
            })
          },
        })
      })

      // Stat label fade in
      const statLabels = el.querySelectorAll('.v10-proof-stat-label')
      gsap.fromTo(
        statLabels,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-proof-stats'),
            start: 'top 80%',
            once: true,
          },
          delay: 0.6,
        }
      )

      // Case study cards stagger
      const cards = el.querySelectorAll('.v10-case-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

      // About card reveal
      const aboutCard = el.querySelector('.v10-proof-about')
      if (aboutCard) {
        gsap.fromTo(
          aboutCard,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutCard,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Hover glow on case study cards
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 25px #00FFFF33, 0 0 50px #00FFFF15',
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0px transparent',
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
        .v10-proof {
          background: #120820;
          padding: 120px 24px;
          position: relative;
          overflow: hidden;
        }

        .v10-proof::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #39FF14, transparent);
          box-shadow: 0 0 20px #39FF14, 0 0 40px #39FF1440;
        }

        /* Subtle grid */
        .v10-proof::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#39FF1406 1px, transparent 1px),
            linear-gradient(90deg, #39FF1406 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .v10-proof-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .v10-proof-header {
          margin-bottom: 72px;
          opacity: 0;
        }

        .v10-proof .v10-section-label {
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

        .v10-proof-heading {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          text-transform: uppercase;
          color: #E0D0FF;
          margin: 0;
          letter-spacing: 0.05em;
          text-shadow: 0 0 30px #39FF1460, 0 0 60px #39FF1430;
        }

        /* ---------- Stats ---------- */
        .v10-proof-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 80px;
          text-align: center;
        }

        .v10-proof-stat {
          position: relative;
        }

        /* Radial glow behind stat numbers */
        .v10-proof-stat::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 100px;
          background: radial-gradient(ellipse, #39FF1418, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .v10-proof-stat-number {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: clamp(4rem, 9vw, 8rem);
          font-weight: 800;
          line-height: 1;
          color: #39FF14;
          text-shadow: 0 0 20px #39FF1480, 0 0 40px #39FF1440;
          display: block;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .v10-proof-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8B7BA8;
          max-width: 240px;
          margin: 0 auto;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }

        /* ---------- Case Studies ---------- */
        .v10-proof-cases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-bottom: 56px;
        }

        .v10-case-card {
          background: #1A0F2E;
          border: 1px solid #2A1F3D;
          overflow: hidden;
          opacity: 0;
          transition: border-color 0.3s ease;
        }

        .v10-case-card:hover {
          border-color: #00FFFF;
        }

        .v10-case-image {
          height: 200px;
          overflow: hidden;
          position: relative;
        }

        .v10-case-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.6) brightness(0.75);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.5s ease;
        }

        /* Cyan tint overlay */
        .v10-case-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #00FFFF;
          mix-blend-mode: color;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .v10-case-card:hover .v10-case-image img {
          transform: scale(1.06);
          filter: saturate(0.9) brightness(0.9);
        }

        .v10-case-card:hover .v10-case-image::after {
          opacity: 0.25;
        }

        .v10-case-body {
          padding: 24px;
        }

        .v10-case-client {
          display: block;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: #00FFFF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 10px;
          text-shadow: 0 0 8px #00FFFF44;
        }

        .v10-case-body h3 {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 1.05rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #E0D0FF;
          margin: 0 0 10px;
        }

        .v10-case-body p {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          color: #8B7BA8;
          line-height: 1.6;
          margin: 0;
        }

        /* ---------- About Card (terminal style) ---------- */
        .v10-proof-about {
          display: flex;
          gap: 32px;
          align-items: center;
          background: #0D0018;
          border: 1px solid #2A1F3D;
          border-left: 3px solid #BF00FF;
          padding: 36px;
          margin-bottom: 64px;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        /* Top neon line accent */
        .v10-proof-about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #BF00FF, #00FFFF44, transparent);
        }

        .v10-proof-about-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid #BF00FF;
          box-shadow: 0 0 20px #BF00FF33;
          filter: grayscale(60%) contrast(1.1);
        }

        .v10-proof-about-text {
          flex: 1;
        }

        .v10-proof-bio {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.88rem;
          line-height: 1.7;
          color: #E0D0FFcc;
          margin: 0 0 12px;
          padding-left: 18px;
          position: relative;
        }

        .v10-proof-bio::before {
          content: '>';
          position: absolute;
          left: 0;
          top: 0;
          color: #39FF14;
          font-weight: 700;
          text-shadow: 0 0 6px #39FF1444;
        }

        .v10-proof-bio-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: #8B7BA8;
          margin: 0;
          padding-left: 18px;
          line-height: 1.6;
        }

        /* ---------- CTA ---------- */
        .v10-proof-cta {
          text-align: center;
        }

        .v10-proof-cta-btn {
          display: inline-block;
          padding: 16px 40px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #00FFFF;
          background: transparent;
          text-decoration: none;
          border: 2px solid #00FFFF;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px #00FFFF44;
          text-shadow: 0 0 10px #00FFFF66;
          position: relative;
          overflow: hidden;
        }

        .v10-proof-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #00FFFF;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .v10-proof-cta-btn:hover {
          color: #0A0010;
          text-shadow: none;
          box-shadow: 0 0 30px #00FFFF88, 0 0 60px #00FFFF44;
        }

        .v10-proof-cta-btn:hover::before {
          opacity: 1;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 1024px) {
          .v10-proof-cases {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .v10-proof {
            padding: 80px 16px;
          }

          .v10-proof-stats {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 56px;
          }

          .v10-proof-stat-number {
            font-size: clamp(3rem, 15vw, 5rem);
          }

          .v10-proof-cases {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .v10-proof-about {
            flex-direction: column;
            text-align: center;
            padding: 28px 20px;
          }

          .v10-proof-bio,
          .v10-proof-bio-sub {
            padding-left: 0;
            text-align: left;
          }

          .v10-proof-bio::before {
            display: none;
          }

          .v10-proof-cta-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .v10-proof {
            padding: 64px 16px;
          }

          .v10-proof-header {
            margin-bottom: 48px;
          }

          .v10-case-body {
            padding: 20px;
          }

          .v10-proof-about {
            padding: 20px 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v10-proof-header,
          .v10-case-card,
          .v10-proof-about {
            opacity: 1 !important;
            transform: none !important;
          }

          .v10-case-image img {
            transition: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} id="results" className="v10-proof">
        <div className="v10-proof-inner">
          <div className="v10-proof-header">
            <span className="v10-section-label">// RESULTS</span>
            <h2 className="v10-proof-heading">NUMBERS FROM REAL PROJECTS</h2>
          </div>

          {/* Stats */}
          <div className="v10-proof-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="v10-proof-stat">
                <span
                  className="v10-proof-stat-number"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
                <p className="v10-proof-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="v10-proof-cases">
            {caseStudies.map((cs) => (
              <div key={cs.client} className="v10-case-card">
                <div className="v10-case-image">
                  <img src={cs.image} alt={cs.client} loading="lazy" />
                </div>
                <div className="v10-case-body">
                  <span className="v10-case-client">{cs.client}</span>
                  <h3>{cs.headline}</h3>
                  <p>{cs.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="v10-proof-about">
            <img
              src="/images/hero-abstract.svg"
              alt="Nice Right"
              className="v10-proof-about-img"
              loading="lazy"
            />
            <div className="v10-proof-about-text">
              <p className="v10-proof-bio">
                I&apos;m Marcin. 13 years building websites, 6 at a digital
                agency, 100+ projects for small and mid-size businesses. When
                you work with Nice Right, you work directly with me — start to
                finish.
              </p>
              <p className="v10-proof-bio-sub">
                Currently working with clients in food service, healthcare,
                e-commerce, and local services.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="v10-proof-cta">
            <a href="#contact" className="v10-proof-cta-btn">
              SEE WHAT&apos;S POSSIBLE
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
