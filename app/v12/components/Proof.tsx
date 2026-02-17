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

const caseStudies = [
  {
    href: '/work/healthcare-real-estate',
    image: '/images/nursing-home-money.webp',
    alt: 'Healthcare investment platform',
    client: 'Healthcare Platform',
    headline: 'Cut deal-closing time by 40%',
    description: 'Custom portal connecting providers with property opportunities.',
  },
  {
    href: '/work/northern-trust',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
    client: 'Northern Trust',
    headline: 'Modernized a Fortune 500 web presence',
    description: 'Micro-interactions and animation that boosted engagement.',
  },
  {
    href: '/work/green-goods',
    image: '/images/garden-money.webp',
    alt: 'Green Goods biodiversity platform',
    client: 'GreenPill Dev Guild',
    headline: 'Built a verified impact platform for conservation',
    description: 'Blockchain PWA tracking biodiversity actions with on-chain attestations.',
  },
]

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v12-section-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      if (statsRef.current) {
        const valueEls = statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]')
        const statBlocks = statsRef.current.querySelectorAll('.v12-stat')

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            },
            onStart: () => {
              stats.forEach((stat, i) => {
                const valEl = valueEls[i]
                if (!valEl) return
                const obj = { value: 0 }
                gsap.to(obj, {
                  value: stat.end,
                  duration: 1.4,
                  ease: 'power2.out',
                  snap: { value: 1 },
                  onUpdate: () => {
                    valEl.textContent = `${Math.round(obj.value)}${stat.suffix}`
                  },
                })
              })
            },
          }
        )
      }

      gsap.fromTo(
        el.querySelectorAll('.v12-case'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el.querySelector('.v12-cases'),
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        el.querySelector('.v12-about'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.querySelector('.v12-about'),
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="results" className="v12-section v12-proof">
      <div className="v12-container">
        <div className="v12-section-grid">
          <div className="v12-section-number" aria-hidden="true">03</div>
          <div className="v12-section-body">
            <div className="v12-section-header">
              <span className="v12-label">Results</span>
              <h2>Numbers from real projects</h2>
            </div>

            <div ref={statsRef} className="v12-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="v12-stat">
                  <div className="v12-stat-value">
                    <span data-stat-value>{stat.end}{stat.suffix}</span>
                  </div>
                  <div className="v12-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="v12-cases">
              {caseStudies.map((study) => (
                <a key={study.href} href={study.href} className="v12-case">
                  <div className="v12-case-image">
                    <img src={study.image} alt={study.alt} loading="lazy" />
                  </div>
                  <div className="v12-case-body">
                    <span className="v12-case-client">{study.client}</span>
                    <h3>{study.headline}</h3>
                    <p>{study.description}</p>
                    <span className="v12-case-link">View case study &rarr;</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="v12-about">
              <img
                src="/images/hero-abstract.svg"
                alt="Nice Right"
                className="v12-about-photo"
                loading="lazy"
              />
              <div className="v12-about-text">
                <p>
                  I&apos;m Marcin. 13 years building websites, 6 at a digital
                  agency, 100+ projects for small and mid-size businesses.
                  When you work with Nice Right, you work directly with me
                  &mdash; start to finish.
                </p>
                <p className="v12-about-sub">
                  Currently working with clients in food service, healthcare,
                  e-commerce, and local services.
                </p>
              </div>
            </div>

            <div className="v12-section-cta">
              <a href="#contact" className="v12-btn">See What&apos;s Possible for Your Business</a>
            </div>
          </div>
        </div>
      </div>
      <div className="v12-rule" aria-hidden="true" />
    </section>
  )
}
