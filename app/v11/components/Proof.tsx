'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatItem {
  end: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { end: 290, suffix: '%', label: 'traffic growth for a home service company' },
  { end: 12, suffix: 'x', label: 'more leads from the same site' },
  { end: 80, suffix: '%', label: 'time saved with workflow automation' },
]

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.v11-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      )

      // Stats counter animation
      if (statsRef.current) {
        const valueEls = statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]')
        const statBlocks = statsRef.current.children

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 24, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6,
            ease: 'back.out(1.4)',
            stagger: 0.15,
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
            onStart: () => {
              stats.forEach((stat, i) => {
                const el = valueEls[i]
                if (!el) return
                const obj = { value: 0 }
                gsap.to(obj, {
                  value: stat.end,
                  duration: 1.8,
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

      // Case study cards
      const cards = section.querySelectorAll('.v11-result-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.15,
          scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
        }
      )

      // Image parallax
      const images = section.querySelectorAll('.v11-result-image img')
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8, scale: 1.12, ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.v11-result-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      })

      // About card
      const aboutCard = section.querySelector('.v11-about-card')
      if (aboutCard) {
        gsap.fromTo(
          aboutCard,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: aboutCard, start: 'top 82%', once: true },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="results" className="v11-results">
      <div className="v11-container">
        <div className="v11-section-header">
          <p className="v11-section-label">Results</p>
          <h2>Numbers from real projects</h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="v11-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="v11-stat-block">
              <div className="v11-stat-number">
                <span data-stat-value>{stat.end}{stat.suffix}</span>
              </div>
              <div className="v11-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <div className="v11-casestudies-grid">
          <a href="/work/healthcare-real-estate" className="v11-result-card">
            <div className="v11-result-image">
              <img src="/images/nursing-home-money.webp" alt="Healthcare investment platform" />
            </div>
            <div className="v11-result-body">
              <span className="v11-result-client">Healthcare Platform</span>
              <h3>Cut deal-closing time by 40%</h3>
              <p>Custom portal connecting providers with property opportunities.</p>
              <span className="v11-result-link">View case study &rarr;</span>
            </div>
          </a>
          <a href="/work/northern-trust" className="v11-result-card">
            <div className="v11-result-image">
              <img src="/images/bankk.webp" alt="Northern Trust project" />
            </div>
            <div className="v11-result-body">
              <span className="v11-result-client">Northern Trust</span>
              <h3>Modernized a Fortune 500 web presence</h3>
              <p>Micro-interactions and animation that boosted engagement.</p>
              <span className="v11-result-link">View case study &rarr;</span>
            </div>
          </a>
          <a href="/work/green-goods" className="v11-result-card">
            <div className="v11-result-image">
              <img src="/images/garden-money.webp" alt="Green Goods biodiversity platform" />
            </div>
            <div className="v11-result-body">
              <span className="v11-result-client">GreenPill Dev Guild</span>
              <h3>Built a verified impact platform for conservation</h3>
              <p>Blockchain PWA tracking biodiversity actions with on-chain attestations.</p>
              <span className="v11-result-link">View case study &rarr;</span>
            </div>
          </a>
        </div>

        {/* About */}
        <div className="v11-about-card">
          <img src="/images/hero-abstract.svg" alt="Nice Right" />
          <div>
            <p className="v11-about-text">
              I&apos;m Marcin. 13 years building websites, 6 at a digital
              agency, 100+ projects for small and mid-size businesses.
              When you work with Nice Right, you work directly with me
              &mdash; start to finish.
            </p>
            <p className="v11-about-sub">
              Currently working with clients in food service, healthcare,
              e-commerce, and local services.
            </p>
          </div>
        </div>

        <div className="v11-section-cta">
          <a href="#contact" className="v11-btn">See What&apos;s Possible for Your Business</a>
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-white" aria-hidden="true" />
    </section>
  )
}
