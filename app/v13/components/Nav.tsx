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
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!progressRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current.style.display = 'none'
      return
    }

    const ctx = gsap.context(() => {
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
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('v13-nav-scrolled')
      } else {
        nav.classList.remove('v13-nav-scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className="v13-nav" aria-label="Main navigation">
      <div className="v13-container">
        <div className="v13-nav-content">
          <a href="/v13" className="v13-logo">Nice Right</a>

          <button
            className="v13-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`v13-nav-links ${mobileOpen ? 'v13-nav-links-open' : ''}`}>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#results" onClick={() => setMobileOpen(false)}>Results</a>
            <a href="#contact" className="v13-btn v13-btn-sm" onClick={() => setMobileOpen(false)}>
              Book a Free Call
            </a>
          </div>
        </div>
      </div>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="v13-nav-progress"
      />
    </nav>
  )
}
