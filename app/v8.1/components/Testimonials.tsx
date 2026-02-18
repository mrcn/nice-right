'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
];

export function Testimonials() {
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
        .v81-testimonials {
          background: #F5F5F0;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-testimonials-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-testimonials-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-testimonials-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 80px;
        }

        .v81-testimonials-list {
          list-style: none;
          margin: 0 0 64px;
          padding: 0;
          border: 3px solid #0A0A0A;
        }

        .v81-testimonial-item {
          padding: 48px;
          border-bottom: 3px solid #0A0A0A;
          position: relative;
          transition: all 0.3s ease;
        }

        .v81-testimonial-item:last-child {
          border-bottom: none;
        }

        .v81-testimonial-item:hover {
          background: rgba(0, 0, 255, 0.02);
        }

        .v81-testimonial-quote-mark {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 8vw, 7rem);
          line-height: 0.8;
          color: #FF0000;
          margin: 0 0 16px;
          display: block;
          user-select: none;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .v81-testimonial-item:hover .v81-testimonial-quote-mark {
          opacity: 0.6;
          transform: scale(1.1) rotate(-5deg);
        }

        .v81-testimonial-quote {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1.15rem, 2vw, 1.4rem);
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0 0 32px;
          max-width: 900px;
        }

        .v81-testimonial-attribution {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .v81-testimonial-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
        }

        .v81-testimonial-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0A0A0A;
          opacity: 0.6;
        }

        .v81-testimonial-verify {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0000FF;
          text-decoration: none;
          padding: 8px 16px;
          border: 2px solid #0000FF;
          margin-left: auto;
          transition: all 0.2s ease;
        }

        .v81-testimonial-verify:hover {
          background: #0000FF;
          color: #fff;
        }

        .v81-testimonials-cta {
          text-align: center;
        }

        .v81-testimonials-cta a {
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-testimonials-cta a::before {
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

        .v81-testimonials-cta a:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-testimonials-cta a:hover::before {
          left: 0;
        }

        .v81-testimonials-cta a span {
          position: relative;
          z-index: 1;
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-testimonials {
            padding: 100px 0;
          }

          .v81-testimonials-inner {
            padding: 0 20px;
          }

          .v81-testimonial-item {
            padding: 32px 24px;
          }

          .v81-testimonial-quote-mark {
            font-size: clamp(3rem, 10vw, 5rem);
          }

          .v81-testimonial-verify {
            margin-left: 0;
            margin-top: 8px;
            width: 100%;
            text-align: center;
          }

          .v81-testimonials-cta a {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .v81-testimonials-heading {
            font-size: clamp(2rem, 10vw, 3rem);
            margin-bottom: 48px;
          }

          .v81-testimonial-attribution {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="testimonials" className="v81-testimonials">
        <div className="v81-testimonials-inner">
          <p className="v81-testimonials-label v81-reveal">Testimonials</p>
          <h2 className="v81-testimonials-heading v81-reveal">
            What They Said
          </h2>

          <ul className="v81-testimonials-list">
            {testimonials.map((t) => (
              <li key={t.name} className="v81-testimonial-item v81-reveal">
                <span className="v81-testimonial-quote-mark" aria-hidden="true">
                  "
                </span>
                <p className="v81-testimonial-quote">{t.quote}</p>
                <div className="v81-testimonial-attribution">
                  <span className="v81-testimonial-name">{t.name}</span>
                  <span className="v81-testimonial-role">{t.role}</span>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v81-testimonial-verify"
                  >
                    Verify on LinkedIn
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="v81-testimonials-cta v81-reveal">
            <a href="#contact">
              <span>Join These Happy Clients</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
