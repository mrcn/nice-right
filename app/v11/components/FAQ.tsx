'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    q: 'What if I\u2019m not sure what I need?',
    a: 'That\u2019s the most common starting point \u2014 and exactly what the free call is for. I\u2019ll look at where your business is today and tell you plainly what would move the needle. Sometimes it\u2019s a new site. Sometimes it\u2019s three changes to the one you have.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most projects go live within 4\u20138 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes build over your first 2\u20133 months.',
  },
  {
    q: 'Do I own everything you build?',
    a: 'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
  },
  {
    q: 'What does it cost?',
    a: 'Most projects range from $3,000 to $15,000 depending on scope. I\u2019ll give you an exact quote on our call \u2014 no surprises. Payment plans available for every budget.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const answer = answerRef.current
    const inner = innerRef.current
    if (!answer || !inner) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      answer.style.maxHeight = open ? `${inner.scrollHeight}px` : '0px'
      answer.style.opacity = open ? '1' : '0'
      return
    }

    if (open) {
      gsap.to(answer, {
        maxHeight: inner.scrollHeight + 20,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      gsap.to(answer, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }, [open])

  return (
    <div className={`v11-faq-item ${open ? 'v11-faq-item--open' : ''}`}>
      <button
        className="v11-faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`v11-faq-answer-${index}`}
      >
        <span className="v11-faq-q">&ldquo;{q}&rdquo;</span>
        <span className="v11-faq-chevron" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        ref={answerRef}
        id={`v11-faq-answer-${index}`}
        className="v11-faq-answer"
        role="region"
        style={{ maxHeight: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div ref={innerRef} className="v11-faq-answer-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.v11-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      )

      const items = section.querySelectorAll('.v11-faq-item')
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: items[0], start: 'top 82%', once: true },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="v11-faq">
      <div className="v11-container">
        <div className="v11-section-header">
          <p className="v11-section-label">Questions</p>
          <h2>Before you book</h2>
        </div>
        <div className="v11-faq-list">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
        <div className="v11-section-cta">
          <a href="#contact" className="v11-btn">Book a Free Call</a>
          <p className="v11-section-cta-micro">30 minutes, no commitment</p>
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-peach" aria-hidden="true" />
    </section>
  )
}
