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
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const progress = progressRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top-=100',
        onEnter: () => setSolid(true),
        onLeaveBack: () => setSolid(false),
      })

      if (
        progress &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        gsap.to(progress, {
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
      className={`v10-nav ${solid ? 'v10-nav--solid' : ''}`}
      aria-label="Main navigation"
    >
      <div className="v10-nav-inner">
        <a href="/" className="v10-nav-logo">
          Nice Right
        </a>

        {/* Desktop links */}
        <div className="v10-nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#contact" className="v10-nav-cta">
            Book a Free Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`v10-nav-hamburger ${menuOpen ? 'v10-nav-hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="v10-nav-mobile">
          <a href="#how-it-works" onClick={handleLinkClick}>
            How It Works
          </a>
          <a href="#services" onClick={handleLinkClick}>
            Services
          </a>
          <a href="#results" onClick={handleLinkClick}>
            Results
          </a>
          <a
            href="#contact"
            className="v10-nav-cta"
            onClick={handleLinkClick}
          >
            Book a Free Call
          </a>
        </div>
      )}

      {/* Neon progress bar */}
      <div
        ref={progressRef}
        className="v10-nav-progress"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </nav>
  )
}
