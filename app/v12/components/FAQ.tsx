'use client'

import { useEffect, useRef } from 'react'
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

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v12-section-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v12-faq-item'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="v12-section v12-faq">
      <div className="v12-container">
        <div className="v12-section-grid">
          <div className="v12-section-number" aria-hidden="true">05</div>
          <div className="v12-section-body">
            <div className="v12-section-header">
              <span className="v12-label">Questions</span>
              <h2>Before you book</h2>
            </div>
            <div className="v12-faq-list">
              {faqs.map((faq) => (
                <div key={faq.question} className="v12-faq-item">
                  <p className="v12-faq-q">&ldquo;{faq.question}&rdquo;</p>
                  <p className="v12-faq-a">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="v12-section-cta">
              <a href="#contact" className="v12-btn">Book a Free Call</a>
              <p className="v12-section-cta-micro">30 minutes, no commitment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="v12-rule" aria-hidden="true" />
    </section>
  )
}
