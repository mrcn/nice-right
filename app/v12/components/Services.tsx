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
    quote: '\u201cI need a website that actually brings in business.\u201d',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns & ads',
      'Google Business & local search setup',
    ],
  },
  {
    title: 'Save Time & Cut Costs',
    quote: '\u201cI spend too much time on things a computer should handle.\u201d',
    features: [
      'Custom apps & dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
  },
  {
    title: 'Keep Customers Coming Back',
    quote: '\u201cI win customers but they don\u2019t stick around.\u201d',
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

      gsap.fromTo(
        el.querySelectorAll('.v12-service-card'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="v12-section v12-services">
      <div className="v12-container">
        <div className="v12-section-grid">
          <div className="v12-section-number" aria-hidden="true">02</div>
          <div className="v12-section-body">
            <div className="v12-section-header">
              <span className="v12-label">What You Get</span>
              <h2>Three ways I help businesses grow</h2>
            </div>
            <div className="v12-services-grid">
              {services.map((service) => (
                <div key={service.title} className="v12-service-card">
                  <h3>{service.title}</h3>
                  <p className="v12-service-quote">{service.quote}</p>
                  <ul className="v12-service-features">
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="v12-section-cta">
              <a href="#contact" className="v12-btn">Let&apos;s Talk About Your Business</a>
            </div>
          </div>
        </div>
      </div>
      <div className="v12-rule" aria-hidden="true" />
    </section>
  )
}
