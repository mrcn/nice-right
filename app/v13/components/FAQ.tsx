'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    question: 'What if I\u2019m not sure what I need?',
    answer:
      'That\u2019s the most common starting point \u2014 and exactly what the free call is for. I\u2019ll look at where your business is today and tell you plainly what would move the needle. Sometimes it\u2019s a new site. Sometimes it\u2019s three changes to the one you have.',
  },
  {
    question: 'How long until I see results?',
    answer:
      'Most projects go live within 4\u20138 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes build over your first 2\u20133 months.',
  },
  {
    question: 'Do I own everything you build?',
    answer:
      'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Most projects range from $3,000 to $15,000 depending on scope. I\u2019ll give you an exact quote on our call \u2014 no surprises. Payment plans available for every budget.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const answerEl = answerRef.current
    if (!content || !answerEl) return

    if (open) {
      gsap.to(content, {
        height: answerEl.offsetHeight + 16,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
      })
    }
  }, [open])

  return (
    <div className={`v13-faq-item v13-glass-card ${open ? 'v13-faq-item-open' : ''}`}>
      <button
        className="v13-faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>&ldquo;{question}&rdquo;</span>
        <span className="v13-faq-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div ref={contentRef} className="v13-faq-content" style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <div ref={answerRef}>
          <p className="v13-faq-answer">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
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
        el.querySelectorAll('.v13-faq-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el.querySelector('.v13-faq-list'),
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="v13-faq">
      <div className="v13-container">
        <div className="v13-section-header">
          <p className="v13-section-label">Questions</p>
          <h2>Before you book</h2>
        </div>
        <div className="v13-faq-list">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="v13-section-cta">
          <a href="#contact" className="v13-btn v13-btn-aurora">Book a Free Call</a>
          <p className="v13-section-cta-micro">30 minutes, no commitment</p>
        </div>
      </div>
    </section>
  )
}
