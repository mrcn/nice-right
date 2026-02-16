'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

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

      const cards = section.querySelectorAll('.v11-service-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.15,
          scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
        }
      )

      // Animate accent bars
      const bars = section.querySelectorAll('.v11-service-accent-bar')
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 0.6, ease: 'power2.inOut',
          stagger: 0.15,
          scrollTrigger: { trigger: cards[0], start: 'top 75%', once: true },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="v11-services">
      <div className="v11-container">
        <div className="v11-section-header">
          <p className="v11-section-label">What You Get</p>
          <h2>Three ways I help businesses grow</h2>
        </div>
        <div className="v11-services-grid">
          <div className="v11-service-card">
            <div className="v11-service-accent-bar" />
            <div className="v11-service-card-body">
              <h3>Get Found &amp; Get Customers</h3>
              <p className="v11-service-quote">
                &ldquo;I need a website that actually brings in business.&rdquo;
              </p>
              <ul className="v11-service-features">
                <li>Websites that turn visitors into paying customers</li>
                <li>SEO so the right people find you first</li>
                <li>Landing pages for campaigns &amp; ads</li>
                <li>Google Business &amp; local search setup</li>
              </ul>
            </div>
          </div>
          <div className="v11-service-card">
            <div className="v11-service-accent-bar" />
            <div className="v11-service-card-body">
              <h3>Save Time &amp; Cut Costs</h3>
              <p className="v11-service-quote">
                &ldquo;I spend too much time on things a computer should handle.&rdquo;
              </p>
              <ul className="v11-service-features">
                <li>Custom apps &amp; dashboards for your team</li>
                <li>Customer self-service portals</li>
                <li>Workflow automation that frees up your day</li>
                <li>Internal tools your team will actually use</li>
              </ul>
            </div>
          </div>
          <div className="v11-service-card">
            <div className="v11-service-accent-bar" />
            <div className="v11-service-card-body">
              <h3>Keep Customers Coming Back</h3>
              <p className="v11-service-quote">
                &ldquo;I win customers but they don&apos;t stick around.&rdquo;
              </p>
              <ul className="v11-service-features">
                <li>Loyalty programs</li>
                <li>Email sequences that keep you top of mind</li>
                <li>Customer feedback systems</li>
                <li>Retention analytics</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="v11-section-cta">
          <a href="#contact" className="v11-btn">Let&apos;s Talk About Your Business</a>
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-alt" aria-hidden="true" />
    </section>
  )
}
