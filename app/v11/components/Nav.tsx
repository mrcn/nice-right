'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top-=60',
        onUpdate: (self) => {
          setScrolled(self.progress > 0.005)
        },
      })

      if (progressRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`v11-nav ${scrolled ? 'v11-nav--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="v11-nav-inner">
        <a href="/" className="v11-nav-logo">
          <span className="v11-nav-logo-star" aria-hidden="true">✻</span>
          Nice Right
        </a>

        {/* Desktop links */}
        <div className="v11-nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#contact" className="v11-nav-cta">
            Book a Free Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`v11-nav-hamburger ${menuOpen ? 'v11-nav-hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="v11-nav-mobile">
          <a href="#how-it-works" onClick={handleLinkClick}>How It Works</a>
          <a href="#services" onClick={handleLinkClick}>Services</a>
          <a href="#results" onClick={handleLinkClick}>Results</a>
          <a href="#contact" className="v11-nav-cta" onClick={handleLinkClick}>
            Book a Free Call
          </a>
        </div>
      )}

      {/* Progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="v11-nav-progress"
      />
    </nav>
  )
}
