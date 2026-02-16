'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top+=80',
        onEnter: () => setSolid(true),
        onLeaveBack: () => setSolid(false),
      })
    })

    return () => ctx.revert()
  }, [])

  // Close mobile menu on anchor click
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`v9-nav ${solid ? 'v9-nav--solid' : ''}`}
        aria-label="Main navigation"
      >
        <div className="v9-nav-inner">
          <a href="/" className="v9-nav-logo">
            Nice Right
          </a>

          {/* Desktop links */}
          <div className="v9-nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#contact" className="v9-nav-cta">
              Book a Free Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`v9-nav-hamburger ${menuOpen ? 'v9-nav-hamburger--open' : ''}`}
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
          <div className="v9-nav-mobile">
            <a href="#how-it-works" onClick={handleLinkClick}>How It Works</a>
            <a href="#services" onClick={handleLinkClick}>Services</a>
            <a href="#results" onClick={handleLinkClick}>Results</a>
            <a href="#contact" className="v9-nav-cta" onClick={handleLinkClick}>
              Book a Free Call
            </a>
          </div>
        )}
      </nav>

      <style>{`
        .v9-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px;
          z-index: 100;
          transition: background 0.35s ease, box-shadow 0.35s ease;
          background: transparent;
        }

        .v9-nav--solid {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .v9-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
        }

        .v9-nav-logo {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          color: #ffffff;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .v9-nav--solid .v9-nav-logo {
          color: #0C1117;
        }

        .v9-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .v9-nav-links a {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.25s ease, opacity 0.25s ease;
          letter-spacing: 0.01em;
        }

        .v9-nav-links a:hover {
          opacity: 0.7;
        }

        .v9-nav--solid .v9-nav-links a {
          color: #0C1117;
        }

        .v9-nav--solid .v9-nav-links a:hover {
          opacity: 0.6;
        }

        .v9-nav-cta {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600 !important;
          font-size: 0.85rem !important;
          color: #ffffff !important;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 12px rgba(6, 214, 160, 0.2);
        }

        .v9-nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(6, 214, 160, 0.3);
          opacity: 1 !important;
        }

        .v9-nav--solid .v9-nav-cta {
          color: #ffffff !important;
        }

        /* Hamburger */
        .v9-nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .v9-nav-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #ffffff;
          border-radius: 1px;
          transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
        }

        .v9-nav--solid .v9-nav-hamburger span {
          background: #0C1117;
        }

        .v9-nav-hamburger--open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .v9-nav-hamburger--open span:nth-child(2) {
          opacity: 0;
        }

        .v9-nav-hamburger--open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile dropdown */
        .v9-nav-mobile {
          position: absolute;
          top: 64px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          padding: 20px 28px 28px;
          gap: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          animation: v9NavSlideDown 0.25s ease forwards;
        }

        @keyframes v9NavSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .v9-nav-mobile a {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          color: #0C1117;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: color 0.2s ease;
        }

        .v9-nav-mobile a:last-child {
          border-bottom: none;
        }

        .v9-nav-mobile .v9-nav-cta {
          margin-top: 12px;
          text-align: center;
          padding: 12px 20px;
          border-radius: 10px;
          border-bottom: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .v9-nav-links {
            display: none;
          }

          .v9-nav-hamburger {
            display: flex;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .v9-nav {
            transition: none;
          }

          .v9-nav-mobile {
            animation: none;
          }

          .v9-nav-cta {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
