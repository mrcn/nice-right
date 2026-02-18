'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'You Share',
    body: 'Free 30-minute call. Tell me about your business and where you feel stuck. I\'ll give you an honest take — even if the answer is "you already have what you need."',
  },
  {
    num: '02',
    title: 'I Build',
    body: 'Website, SEO, Google Business, landing pages — whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    num: '03',
    title: 'You Grow',
    body: 'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v81-reveal').forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.v81-reveal', { opacity: 0, y: 40 });

      const reveals = el.querySelectorAll('.v81-reveal');
      reveals.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power3.out',
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v81-how {
          background: #F5F5F0;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-how-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-how-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-how-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 0.9;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 80px;
        }

        .v81-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #0A0A0A;
        }

        .v81-step {
          border-right: 3px solid #0A0A0A;
          padding: 48px 40px;
          transition: all 0.3s ease;
        }

        .v81-step:last-child {
          border-right: none;
        }

        .v81-step:hover {
          background: rgba(0, 0, 255, 0.03);
        }

        .v81-step-num {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 5vw, 6rem);
          line-height: 1;
          color: #FF0000;
          margin: 0 0 24px;
          transition: transform 0.3s ease;
        }

        .v81-step:hover .v81-step-num {
          transform: scale(1.1) rotate(-2deg);
        }

        .v81-step-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }

        .v81-step-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0;
          opacity: 0.85;
        }

        .v81-how-cta-wrap {
          margin-top: 64px;
          display: flex;
          justify-content: center;
        }

        .v81-how-cta {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 20px 48px;
          border: 3px solid #0A0A0A;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-how-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0A0A0A;
          transition: left 0.3s ease;
          z-index: 0;
        }

        .v81-how-cta:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-how-cta:hover::before {
          left: 0;
        }

        .v81-how-cta span {
          position: relative;
          z-index: 1;
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-how {
            padding: 100px 0;
          }

          .v81-how-inner {
            padding: 0 20px;
          }

          .v81-how-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .v81-step {
            border-right: none;
            border-bottom: 3px solid #0A0A0A;
            padding: 40px 32px;
          }

          .v81-step:last-child {
            border-bottom: none;
          }

          .v81-how-heading {
            margin-bottom: 48px;
          }

          .v81-how-cta {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section ref={sectionRef} id="how-it-works" className="v81-how">
        <div className="v81-how-inner">
          <p className="v81-how-label v81-reveal">Process</p>
          <h2 className="v81-how-heading v81-reveal">How It Works</h2>

          <div className="v81-how-grid">
            {steps.map((step) => (
              <div key={step.num} className="v81-step v81-reveal">
                <div className="v81-step-num">{step.num}</div>
                <h3 className="v81-step-title">{step.title}</h3>
                <p className="v81-step-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="v81-how-cta-wrap v81-reveal">
            <a href="#contact" className="v81-how-cta">
              <span>Start With a Free Call</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
