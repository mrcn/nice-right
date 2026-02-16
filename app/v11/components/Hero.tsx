'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } })

      tl.fromTo(
        el.querySelector('.v11-hero-badge'),
        { opacity: 0, scale: 0.6, rotate: -12 },
        { opacity: 1, scale: 1, rotate: -3, duration: 0.6 }
      )
        .fromTo(
          el.querySelector('h1'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          el.querySelector('.v11-hero-sub'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          el.querySelectorAll('.v11-hero-trust span'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          el.querySelector('.v11-hero-cta'),
          { opacity: 0, y: 16, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(
          el.querySelector('.v11-hero-micro'),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          el.querySelector('.v11-hero-image'),
          { opacity: 0, scale: 0.85, rotate: 5 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power2.out' },
          0.3
        )

      // Spin the decorative elements
      gsap.to(el.querySelector('.v11-hero-ornament-1'), {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      })
      gsap.to(el.querySelector('.v11-hero-ornament-2'), {
        rotate: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v11-hero" id="hero">
      <div className="v11-container">
        <div className="v11-hero-grid">
          <div className="v11-hero-text">
            <div className="v11-hero-badge" aria-hidden="true">
              <span>Far out!</span>
            </div>
            <h1>
              Grow your business.
              <br />
              <span className="v11-hero-accent">I&apos;ll handle the tech.</span>
            </h1>
            <p className="v11-hero-sub">
              Your customers are looking for you right now. I help small
              businesses get found, win more customers, and keep them
              coming back.
            </p>
            <div className="v11-hero-trust">
              <span>Chicago&apos;s Northwest Side</span>
              <span>100+ projects</span>
              <span>13+ years</span>
            </div>
            <div className="v11-hero-cta">
              <a href="#contact" className="v11-btn">Book a Free Call</a>
            </div>
            <p className="v11-hero-micro">
              30 minutes. An honest look at what&apos;s possible
              for your business.
            </p>
          </div>
          <div className="v11-hero-visual">
            <div className="v11-hero-ornament-1" aria-hidden="true">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r="55" fill="none" stroke="var(--v11-yellow)" strokeWidth="2" strokeDasharray="8 6" />
              </svg>
            </div>
            <div className="v11-hero-ornament-2" aria-hidden="true">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <path d="M40 0 L44 36 L80 40 L44 44 L40 80 L36 44 L0 40 L36 36 Z" fill="var(--v11-pink)" opacity="0.5" />
              </svg>
            </div>
            <div className="v11-hero-image">
              <img src="/images/me-low.jpg" alt="Marcin Dabrowski" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-alt" aria-hidden="true" />
    </section>
  )
}
