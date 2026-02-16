'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    num: '01',
    cmd: 'YOU SHARE',
    output:
      'Free 30-minute call. Tell me about your business and where you feel stuck. I\u2019ll give you an honest take \u2014 even if the answer is \u201cyou already have what you need.\u201d',
  },
  {
    num: '02',
    cmd: 'I BUILD',
    output:
      'Website, SEO, Google Business, landing pages \u2014 whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    num: '03',
    cmd: 'YOU GROW',
    output:
      'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        el.querySelector('.v10-how-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-how-header'),
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Terminal cards stagger in
      const cards = el.querySelectorAll('.v10-step-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.15,
          }
        )

        // Typewriter on the output text
        const outputEl = card.querySelector<HTMLElement>('.v10-step-output')
        if (!outputEl) return

        const text = outputEl.textContent || ''
        outputEl.textContent = ''

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const chars = text.split('')
            chars.forEach((char, ci) => {
              const span = document.createElement('span')
              span.textContent = char
              span.style.opacity = '0'
              outputEl.appendChild(span)

              gsap.to(span, {
                opacity: 1,
                duration: 0.02,
                delay: 0.4 + ci * 0.012,
                ease: 'none',
              })
            })
          },
        })
      })

      // Neon border glow pulse on cards
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 30px #39FF1444, inset 0 0 30px #39FF1411, -4px 0 0 #39FF14',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0px transparent, inset 0 0 0px transparent, -4px 0 0 #39FF1466',
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v10-how {
          background: #0A0010;
          padding: 120px 24px;
          position: relative;
          overflow: hidden;
        }

        .v10-how::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#BF00FF06 1px, transparent 1px),
            linear-gradient(90deg, #BF00FF06 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .v10-how-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .v10-how-header {
          margin-bottom: 64px;
          opacity: 0;
        }

        .v10-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          color: #BF00FF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          text-shadow: 0 0 10px #BF00FF66;
        }

        .v10-how-header h2 {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .v10-steps-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .v10-step-card {
          background: #0D0018;
          border-left: 4px solid #39FF1466;
          padding: 32px;
          position: relative;
          opacity: 0;
          transition: border-color 0.3s ease;
          box-shadow: -4px 0 0 #39FF1466;
        }

        .v10-step-card:hover {
          border-left-color: #39FF14;
        }

        .v10-step-prompt {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 16px;
        }

        .v10-step-num {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.85rem;
          color: #39FF14;
          text-shadow: 0 0 8px #39FF1444;
        }

        .v10-step-chevron {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 1rem;
          color: #39FF14;
          text-shadow: 0 0 8px #39FF1444;
        }

        .v10-step-cmd {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 1.1rem;
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .v10-step-output {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #E0D0FFaa;
          margin: 0;
          padding-left: 36px;
        }

        /* Blinking cursor at end of output */
        .v10-step-output::after {
          content: '_';
          font-family: 'JetBrains Mono', monospace;
          color: #39FF14;
          animation: v10-blink 1s steps(1) infinite;
        }

        @keyframes v10-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .v10-how {
            padding: 80px 20px;
          }

          .v10-step-card {
            padding: 24px 20px;
          }

          .v10-step-output {
            padding-left: 0;
          }
        }
      `}</style>

      <section ref={sectionRef} id="how-it-works" className="v10-how">
        <div className="v10-how-inner">
          <div className="v10-how-header">
            <p className="v10-section-label">// PROCESS</p>
            <h2>HOW IT WORKS</h2>
          </div>

          <div className="v10-steps-list">
            {steps.map((step) => (
              <div key={step.num} className="v10-step-card">
                <div className="v10-step-prompt">
                  <span className="v10-step-num">{step.num}</span>
                  <span className="v10-step-chevron">&gt;</span>
                  <span className="v10-step-cmd">{step.cmd}</span>
                </div>
                <p className="v10-step-output">{step.output}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
