'use client'

import { useState } from 'react'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="v8-nav" aria-label="Main navigation">
      <div className="v8-nav-inner">
        <a href="/" className="v8-logo">NICE RIGHT</a>

        <button
          className="v8-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '[X]' : '[=]'}
        </button>

        <div className={`v8-nav-links ${menuOpen ? 'v8-nav-links--open' : ''}`}>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>SERVICES</a>
          <a href="#results" onClick={() => setMenuOpen(false)}>RESULTS</a>
          <a href="#contact" className="v8-btn v8-btn-nav" onClick={() => setMenuOpen(false)}>BOOK CALL</a>
        </div>
      </div>
    </nav>
  )
}
