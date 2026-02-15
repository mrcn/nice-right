'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ---------------------------------------------------------------------------
// 1. ScrollReveal
//    Wraps page content; observes all `.v2-reveal` elements and adds
//    `.v2-visible` when they enter the viewport (once).
// ---------------------------------------------------------------------------

export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('.v2-reveal')

    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add('v2-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('v2-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}

// ---------------------------------------------------------------------------
// 2. CountUp
//    Animates a number from 0 to `end` with cubic ease-out.
// ---------------------------------------------------------------------------

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

export function CountUp({ end, suffix = '', duration = 1500 }: CountUpProps) {
  const [display, setDisplay] = useState('0')
  const spanRef = useRef<HTMLSpanElement>(null)
  const hasFired = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    if (prefersReducedMotion()) {
      setDisplay(`${end}${suffix}`)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true
          observer.unobserve(el)

          let start: number | null = null

          const step = (ts: number) => {
            if (start === null) start = ts
            const elapsed = ts - start
            const progress = Math.min(elapsed / duration, 1)
            const value = Math.round(easeOutCubic(progress) * end)
            setDisplay(`${value}${suffix}`)
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [end, suffix, duration])

  return <span ref={spanRef}>{display}</span>
}

// ---------------------------------------------------------------------------
// 3. HeroReveal
//    Animates children in on mount: opacity 0 + translateY(20px) -> visible.
//    Uses CSS transitions set via JS; respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

export function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      return
    }

    // Start hidden
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'

    // Force layout so the browser registers the initial state
    // before we apply the transition.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight

    // Apply transition and animate to visible
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  }, [])

  return <div ref={ref}>{children}</div>
}
