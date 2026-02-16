'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const nav = navRef.current
    const progress = progressRef.current
    if (!nav || !progress) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll-driven background change
    const handleScroll = () => {
      if (window.scrollY > 100) {
        nav.classList.add('v7-nav-scrolled')
      } else {
        nav.classList.remove('v7-nav-scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Progress bar via GSAP ScrollTrigger
    let ctx: gsap.Context | null = null
    if (!prefersReduced) {
      ctx = gsap.context(() => {
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
      })
    } else {
      progress.style.display = 'none'
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (ctx) ctx.revert()
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav ref={navRef} className="v7-nav" aria-label="Main navigation">
      <div className="v7-container">
        <div className="v7-nav-inner">
          <a href="/" className="v7-nav-logo">
            <em>nice right</em>
          </a>

          <div className={`v7-nav-links${menuOpen ? ' v7-nav-open' : ''}`}>
            <a href="#how-it-works" onClick={closeMenu}>how it works</a>
            <a href="#services" onClick={closeMenu}>services</a>
            <a href="#results" onClick={closeMenu}>results</a>
            <a href="#contact" className="v7-nav-cta" onClick={closeMenu}>
              book a free call
            </a>
          </div>

          <button
            className="v7-nav-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              style={
                menuOpen
                  ? { transform: 'rotate(45deg) translate(4px, 4px)' }
                  : undefined
              }
            />
            <span style={menuOpen ? { opacity: 0 } : undefined} />
            <span
              style={
                menuOpen
                  ? { transform: 'rotate(-45deg) translate(5px, -5px)' }
                  : undefined
              }
            />
          </button>
        </div>
      </div>

      <div
        ref={progressRef}
        className="v7-nav-progress"
        aria-hidden="true"
      />

      <style>{`
        .v7-nav-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--v7-accent, #FF4D00);
          transform-origin: left;
          transform: scaleX(0);
          z-index: 101;
          pointer-events: none;
        }

        .v7-nav-logo em {
          font-family: var(--v7-font-heading, 'Instrument Serif', serif);
          font-style: italic;
          font-size: 1.2rem;
          letter-spacing: -0.02em;
          color: var(--v7-text, #F5F5F0);
          transition: color 0.2s ease;
        }

        .v7-nav-logo:hover em {
          color: var(--v7-accent, #FF4D00);
        }
      `}</style>
    </nav>
  )
}
