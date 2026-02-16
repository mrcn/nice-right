'use client'

import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`v12-nav${scrolled ? ' v12-nav--scrolled' : ''}`}>
      <div className="v12-nav-inner">
        <a href="/v12" className="v12-nav-logo">
          Nice Right
        </a>
        <div className="v12-nav-links">
          <a href="#how-it-works">Process</a>
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#contact" className="v12-nav-cta">Book a Call</a>
        </div>
      </div>
    </nav>
  )
}
