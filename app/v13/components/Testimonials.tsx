'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    initials: 'RP',
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    pull: 'He delivered not only what was asked...',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    pull: 'A great approach to breaking down industry terms...',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    pull: 'He was able to decipher what we wanted...',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    pull: "It's mind blowing how fast this guy can learn...",
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v13-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v13-testimonial-card'),
        { opacity: 0, y: 50, rotateX: 2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: el.querySelector('.v13-testimonials-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v13-testimonials">
      <div className="v13-container">
        <div className="v13-section-header">
          <p className="v13-section-label">Testimonials</p>
          <h2>What it&apos;s like working together</h2>
        </div>

        <div className="v13-testimonials-grid">
          {testimonials.map((t) => (
            <blockquote key={t.initials} className="v13-testimonial-card v13-glass-card">
              <div className="v13-testimonial-pull">
                &ldquo;{t.pull}&rdquo;
              </div>
              <p className="v13-testimonial-quote">{t.quote}</p>
              <footer className="v13-testimonial-footer">
                <div className="v13-testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <cite className="v13-testimonial-name">{t.name}</cite>
                  <div className="v13-testimonial-role">{t.role}</div>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v13-testimonial-verify"
                  >
                    Verify on LinkedIn &rarr;
                  </a>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
