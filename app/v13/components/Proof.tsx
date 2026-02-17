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
    title: 'Cut deal-closing time by 40%',
    description: 'Custom portal connecting providers with property opportunities.',
  },
  {
    href: '/work/northern-trust',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
    client: 'Northern Trust',
    title: 'Modernized a Fortune 500 web presence',
    description: 'Micro-interactions and animation that boosted engagement.',
  },
  {
    href: '/work/green-goods',
    image: '/images/garden-money.webp',
    alt: 'Green Goods biodiversity platform',
    client: 'GreenPill Dev Guild',
    title: 'Built a verified impact platform for conservation',
    description: 'Blockchain PWA tracking biodiversity actions with on-chain attestations.',
  },
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
        section.querySelector('.v13-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      )

      // Stats counter animation
      if (statsRef.current) {
        const valueEls = statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]')
        const statBlocks = statsRef.current.querySelectorAll('.v13-stat-item')

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 30 },
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

      // Case study cards
      gsap.fromTo(
        section.querySelectorAll('.v13-case-card'),
        { opacity: 0, y: 50, rotateX: 2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: section.querySelector('.v13-cases-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Image parallax
      const images = section.querySelectorAll('.v13-case-image img')
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.v13-case-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      })

      // About card
      gsap.fromTo(
        section.querySelector('.v13-about-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.v13-about-card'),
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="results" className="v13-results">
      <div className="v13-container">
        <div className="v13-section-header">
          <p className="v13-section-label">Results</p>
          <h2>Numbers from real projects</h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="v13-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="v13-stat-item">
              <div className="v13-stat-number">
                <span data-stat-value>{stat.end}{stat.suffix}</span>
              </div>
              <div className="v13-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <div className="v13-cases-grid">
          {caseStudies.map((study) => (
            <a key={study.client} href={study.href} className="v13-case-card v13-glass-card">
              <div className="v13-case-image">
                <img src={study.image} alt={study.alt} loading="lazy" />
              </div>
              <div className="v13-case-body">
                <span className="v13-case-client">{study.client}</span>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <span className="v13-case-link">View case study &rarr;</span>
              </div>
            </a>
          ))}
        </div>

        {/* About */}
        <div className="v13-about-card v13-glass-card">
          <img
            src="/images/hero-abstract.svg"
            alt="Nice Right"
            className="v13-about-photo"
          />
          <div className="v13-about-text">
            <p>
              I&apos;m Marcin. 13 years building websites, 6 at a digital
              agency, 100+ projects for small and mid-size businesses.
              When you work with Nice Right, you work directly with me
              &mdash; start to finish.
            </p>
            <p className="v13-about-sub">
              Currently working with clients in food service, healthcare,
              e-commerce, and local services.
            </p>
          </div>
        </div>

        <div className="v13-section-cta">
          <a href="#contact" className="v13-btn v13-btn-aurora">
            See What&apos;s Possible for Your Business
          </a>
        </div>
      </div>
    </section>
  )
}
