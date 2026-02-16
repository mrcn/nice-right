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

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v13-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v13-service-card'),
        { opacity: 0, y: 60, rotateX: 2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: el.querySelector('.v13-services-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="v13-services">
      <div className="v13-container">
        <div className="v13-section-header">
          <p className="v13-section-label">What You Get</p>
          <h2>Three ways I help businesses grow</h2>
        </div>
        <div className="v13-services-grid">
          {services.map((service) => (
            <div key={service.title} className="v13-service-card v13-glass-card">
              <div className="v13-service-accent" aria-hidden="true" />
              <h3>{service.title}</h3>
              <p className="v13-service-quote">
                &ldquo;{service.quote}&rdquo;
              </p>
              <ul className="v13-service-features">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <span className="v13-feature-dot" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="v13-section-cta">
          <a href="#contact" className="v13-btn v13-btn-aurora">
            Let&apos;s Talk About Your Business
          </a>
        </div>
      </div>
    </section>
  )
}
