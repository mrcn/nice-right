'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface NavItem {
  label: string
  href: string
  sectionId: string
  icon: string
  isCta?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Process', href: '#how-it-works', sectionId: 'how-it-works', icon: '\u26A1' },
  { label: 'Services', href: '#services', sectionId: 'services', icon: '\u25C6' },
  { label: 'Pricing', href: '#pricing', sectionId: 'pricing', icon: '\u25CE' },
  { label: 'Results', href: '#results', sectionId: 'results', icon: '\u2726' },
  { label: 'Talk', href: '#contact', sectionId: 'contact', icon: '', isCta: true },
]

const SCROLL_DELTA_THRESHOLD = 10

export function BottomNav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isVisible, setIsVisible] = useState(true)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY.current

    if (Math.abs(delta) >= SCROLL_DELTA_THRESHOLD) {
      setIsVisible(delta < 0)
      lastScrollY.current = currentScrollY
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`v2-bottom-nav${isVisible ? '' : ' v2-nav-hidden'}`}
      aria-label="Section navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.sectionId

        if (item.isCta) {
          return (
            <a
              key={item.sectionId}
              href={item.href}
              className="v2-bottom-nav-item v2-bottom-nav-cta"
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          )
        }

        return (
          <a
            key={item.sectionId}
            href={item.href}
            className={`v2-bottom-nav-item${isActive ? ' v2-nav-active' : ''}`}
            onClick={(e) => handleClick(e, item.href)}
            aria-current={isActive ? 'true' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
