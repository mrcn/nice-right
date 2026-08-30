'use client';

import { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackSectionView } from '@/app/lib/analytics';

const levers = [
  {
    num: '01',
    title: 'Be found',
    quote: 'People search for what I do, but I do not show up when they need it.',
    bullets: [
      'Service pages built for local search',
      'Google Business and local listings',
      'Clear paths to call or request a quote',
      'Mobile-first technical foundation',
    ],
    tag: 'Visibility',
    context: 'We start where local customers look and remove the gaps that keep a good business out of the conversation.',
  },
  {
    num: '02',
    title: 'Be chosen',
    quote: 'People visit my site, but too few decide to call.',
    bullets: [
      'Plain-English service positioning',
      'Reviews and proof where decisions happen',
      'A credible first impression on mobile',
      'One clear next step on every page',
    ],
    tag: 'Trust',
    context: 'Showing up is only half the job. The page has to make the next step feel obvious and safe.',
  },
  {
    num: '03',
    title: 'Answer demand',
    quote: 'Good inquiries come in when I am busy or after hours.',
    bullets: [
      'Tap-to-call and simple intake',
      'Missed-call and inquiry follow-up',
      'Scheduling and lead routing',
      'A record of where inquiries came from',
    ],
    tag: 'Response',
    context: 'A good lead is not useful if nobody answers. We make the handoff from interest to conversation easier to manage.',
  },
  {
    num: '04',
    title: 'Stay in touch',
    quote: 'Past customers would hire me again, but I never follow up.',
    bullets: [
      'Review and referral requests',
      'Rebooking reminders',
      'Simple customer follow-up',
      'A practical view of what is working',
    ],
    tag: 'Follow-through',
    context: 'The next job often starts with someone who already knows your work. We give that relationship a way to continue.',
  },
];

const DESKTOP_QUERY = '(min-width: 1025px)';
const TABLET_QUERY = '(min-width: 769px) and (max-width: 1024px)';
const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DESKTOP_NAV_OFFSET = 64;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackedViewRef = useRef(false);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let activeTriggers: ScrollTrigger[] = [];

    const setAttr = (name: string, value: string) => {
      section.setAttribute(name, value);
    };

    const setReady = (value: boolean) => setAttr('data-services-ready', String(value));
    const setPinned = (value: boolean) => setAttr('data-services-pinned', String(value));
    const setPinEnabled = (value: boolean) => setAttr('data-services-pin-enabled', String(value));
    const setFitStatus = (value: 'ok' | 'min-fit-failed') => setAttr('data-services-fit-status', value);

    const markViewedOnce = () => {
      if (trackedViewRef.current) return;
      trackedViewRef.current = true;
      trackSectionView('services');
    };

    const clearActive = (cols: HTMLElement[]) => {
      section.classList.remove('v9-services--highlight');
      cols.forEach((col) => col.classList.remove('v9-lever-col--active'));
    };

    const clearDesktopFit = () => {
      section.style.removeProperty('--services-fit');
      section.style.removeProperty('--services-pad-y');
      section.style.removeProperty('--services-gap-y');
      section.style.removeProperty('--services-card-pad-y');
      section.style.removeProperty('--services-heading-size');
      section.style.removeProperty('--services-sub-size');
      section.style.removeProperty('--services-title-size');
      section.style.removeProperty('--services-quote-size');
      section.style.removeProperty('--services-bullet-size');
      section.style.removeProperty('--services-tag-size');
      section.style.removeProperty('--services-info-size');
    };

    const killLocalTriggers = () => {
      activeTriggers.forEach((trigger) => trigger.kill(true));
      activeTriggers = [];
    };

    const applyDesktopFit = (cols: HTMLElement[]) => {
      setReady(false);
      setFitStatus('ok');

      const minFit = 0.68;
      const tolerance = 4;
      let fit = 1;
      let passed = false;

      const measureOverflow = () => {
        const sectionOverflow = Math.max(0, section.scrollHeight - section.clientHeight);
        const cardOverflow = Math.max(
          0,
          ...cols.map((col) => Math.max(0, col.scrollHeight - col.clientHeight))
        );
        return Math.max(sectionOverflow, cardOverflow);
      };

      for (let step = 0; step < 9; step += 1) {
        section.style.setProperty('--services-fit', fit.toFixed(3));
        section.style.setProperty('--services-pad-y', `${Math.max(28, Math.round(42 * fit))}px`);
        section.style.setProperty('--services-gap-y', `${Math.max(22, Math.round(34 * fit))}px`);
        section.style.setProperty('--services-card-pad-y', `${Math.max(18, Math.round(26 * fit))}px`);
        section.style.setProperty('--services-heading-size', `${Math.max(42, 46 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-sub-size', `${Math.max(14, 15.2 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-title-size', `${Math.max(24, 26 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-quote-size', `${Math.max(13.2, 14.2 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-bullet-size', `${Math.max(12.8, 13.6 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-tag-size', `${Math.max(11.2, 12 * fit).toFixed(2)}px`);
        section.style.setProperty('--services-info-size', `${Math.max(12.2, 13 * fit).toFixed(2)}px`);

        // Force layout before measuring the next correction step.
        section.getBoundingClientRect();

        if (measureOverflow() <= tolerance) {
          passed = true;
          break;
        }

        fit = Math.max(minFit, fit - 0.04);
        if (fit <= minFit) break;
      }

      if (!passed && measureOverflow() > tolerance) {
        setFitStatus('min-fit-failed');
      }
    };

    const setup = () => {
      ctx?.revert();
      ctx = null;
      killLocalTriggers();
      setReady(false);
      setPinned(false);
      setPinEnabled(false);
      clearDesktopFit();

      ctx = gsap.context(() => {
        const header = section.querySelector<HTMLElement>('.v9-services-header');
        const cols = Array.from(section.querySelectorAll<HTMLElement>('.v9-lever-col'));
        let prevActive = -1;

        const animateBullets = (col: HTMLElement) => {
          const bullets = col.querySelectorAll<HTMLElement>('.v9-lever-bullets li');
          gsap.killTweensOf(bullets);
          gsap.fromTo(
            bullets,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
          );
        };

        const setActiveCol = (active: number) => {
          if (active === prevActive || !cols[active]) return;
          cols.forEach((col, i) => col.classList.toggle('v9-lever-col--active', i === active));
          animateBullets(cols[active]);
          prevActive = active;
        };

        const showHeader = () => {
          markViewedOnce();
          if (!header) return;
          gsap.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
        };

        const showCols = () => {
          gsap.fromTo(
            cols,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: 'power3.out',
              overwrite: 'auto',
              onComplete: () => {
                gsap.set(cols, { clearProps: 'opacity,transform' });
              },
            }
          );
        };

        const makeTrigger = (vars: ScrollTrigger.Vars) => {
          const trigger = ScrollTrigger.create(vars);
          activeTriggers.push(trigger);
          return trigger;
        };

        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
          setAttr('data-services-mode', 'reduced-motion');
          clearActive(cols);
          gsap.set([header, cols], { clearProps: 'all' });
          setReady(true);
          return;
        }

        makeTrigger({ trigger: header ?? section, start: 'top 85%', once: true, onEnter: showHeader });
        makeTrigger({ trigger: cols[0] ?? section, start: 'top 85%', once: true, onEnter: showCols });

        if (window.matchMedia(MOBILE_QUERY).matches) {
          setAttr('data-services-mode', 'mobile');
          section.classList.add('v9-services--highlight');
          cols.forEach((col) => {
            makeTrigger({
              trigger: col,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleClass: { targets: col, className: 'v9-lever-col--active' },
            });
          });
          setReady(true);
          return;
        }

        if (window.matchMedia(TABLET_QUERY).matches) {
          setAttr('data-services-mode', 'tablet');
          clearActive(cols);
          setReady(true);
          return;
        }

        if (window.matchMedia(DESKTOP_QUERY).matches) {
          setAttr('data-services-mode', 'desktop-pin');
          setPinEnabled(true);
          section.classList.add('v9-services--highlight');
          applyDesktopFit(cols);

          const pinTrigger = makeTrigger({
            trigger: section,
            start: () => `top ${DESKTOP_NAV_OFFSET}px`,
            end: '+=120%',
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onEnter: () => {
              setPinned(true);
              section.classList.add('v9-services--highlight');
              setActiveCol(0);
            },
            onLeave: () => {
              setPinned(false);
              clearActive(cols);
              prevActive = -1;
            },
            onEnterBack: () => {
              setPinned(true);
              section.classList.add('v9-services--highlight');
              prevActive = -1;
            },
            onLeaveBack: () => {
              setPinned(false);
              clearActive(cols);
              prevActive = -1;
            },
            onToggle: (self) => {
              setPinned(self.isActive);
            },
            onUpdate: (self) => {
              setPinned(self.isActive);
              const active = Math.min(Math.floor(self.progress * cols.length), cols.length - 1);
              setActiveCol(active);
            },
          });

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            setPinEnabled(true);
            setReady(true);
            if (pinTrigger.isActive) setPinned(true);
          });
        }
      }, section);
    };

    setup();

    const onResize = () => {
      setReady(false);
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 160);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    reducedMotion.addEventListener?.('change', onResize);
    document.fonts?.ready.then(() => requestAnimationFrame(() => {
      if (section.getAttribute('data-services-mode') !== 'desktop-pin') {
        setFitStatus('ok');
        setReady(true);
        return;
      }
      applyDesktopFit(Array.from(section.querySelectorAll<HTMLElement>('.v9-lever-col')));
      ScrollTrigger.refresh();
      setReady(true);
    }));

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      reducedMotion.removeEventListener?.('change', onResize);
      killLocalTriggers();
      ctx?.revert();
      section.classList.remove('v9-services--highlight');
      setPinned(false);
      setPinEnabled(false);
      setReady(false);
      clearDesktopFit();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        aria-label="Where good local jobs get lost"
        className="v9-services v9-section-warm"
        data-services-mode="pending"
        data-services-pin-enabled="false"
        data-services-pinned="false"
        data-services-ready="false"
        data-services-fit-status="ok"
      >
        <div className="v9-services-container">
          <div className="v9-services-header">
            <span className="v9-section-label">Where good jobs get lost</span>
            <h2 className="v9-services-heading">
              More local customers need more than a ranking.
            </h2>
            <p className="v9-services-sub">
              They have to find you, trust you, reach you, and hear from you
              again. The audit traces that path and shows you where prospects
              drop out.
            </p>
          </div>

          <div className="v9-levers">
            {levers.map((lever) => (
              <div key={lever.num} className="v9-lever-col">
                <div className="v9-lever-num">{lever.num}</div>
                <h3 className="v9-lever-title">{lever.title}</h3>
                <p className="v9-lever-quote">&ldquo;{lever.quote}&rdquo;</p>
                <ul className="v9-lever-bullets">
                  {lever.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="v9-lever-info">
                  <span className="v9-lever-tag">{lever.tag}</span>
                  <p>{lever.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .v9-services {
          --services-fit: 1;
          --services-pad-y: 120px;
          --services-gap-y: 72px;
          --services-card-pad-y: 40px;
          --services-nav-offset: 64px;
          --services-heading-size: clamp(2.2rem, 3.5vw, 2.9rem);
          --services-sub-size: 0.95rem;
          --services-title-size: 1.625rem;
          --services-quote-size: 0.9rem;
          --services-bullet-size: 0.85rem;
          --services-tag-size: 0.75rem;
          --services-info-size: 0.8125rem;
          padding: 120px 0;
        }

        .v9-section-warm {
          background: #F8F7F4;
        }

        .v9-services-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v9-services-header {
          margin-bottom: 72px;
          max-width: min(1120px, 100%);
        }

        .v9-section-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(0.66rem, calc(0.75rem * var(--services-fit)), 0.75rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: clamp(8px, calc(14px * var(--services-fit)), 14px);
        }

        .v9-services-heading {
          font-family: var(--v9-font-heading);
          font-size: var(--services-heading-size);
          font-weight: 400;
          color: #0C1117;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(8px, calc(14px * var(--services-fit)), 14px) 0;
        }

        .v9-services-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: var(--services-sub-size);
          color: rgba(12, 17, 23, 0.55);
          line-height: 1.45;
          margin: 0;
        }

        .v9-levers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-lever-col {
          padding: 40px 28px 40px 28px;
          border-right: 1px solid rgba(12, 17, 23, 0.08);
          display: flex;
          flex-direction: column;
          will-change: opacity;
        }

        .v9-lever-col:last-child {
          border-right: none;
          padding-right: 0;
        }

        .v9-lever-num {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(0.62rem, calc(0.75rem * var(--services-fit)), 0.75rem);
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #0B8A6E;
          margin-bottom: clamp(6px, calc(12px * var(--services-fit)), 12px);
        }

        .v9-lever-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: var(--services-title-size);
          font-weight: 400;
          color: #0C1117;
          line-height: 1.08;
          margin: 0 0 clamp(7px, calc(12px * var(--services-fit)), 12px) 0;
        }

        .v9-lever-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: var(--services-quote-size);
          color: rgba(12, 17, 23, 0.60);
          line-height: 1.36;
          margin: 0 0 clamp(8px, calc(22px * var(--services-fit)), 22px) 0;
          padding-bottom: clamp(8px, calc(22px * var(--services-fit)), 22px);
          border-bottom: 1px solid rgba(12, 17, 23, 0.07);
        }

        .v9-lever-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 clamp(12px, calc(18px * var(--services-fit)), 18px) 0;
          display: flex;
          flex-direction: column;
          gap: clamp(3px, calc(8px * var(--services-fit)), 8px);
        }

        .v9-lever-bullets li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: var(--services-bullet-size);
          color: rgba(12, 17, 23, 0.75);
          padding-left: clamp(12px, calc(16px * var(--services-fit)), 16px);
          position: relative;
          line-height: 1.32;
        }

        .v9-lever-bullets li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .v9-lever-info {
          margin-top: clamp(10px, calc(14px * var(--services-fit)), 14px);
          background: #ffffff;
          border-radius: 10px;
          padding: clamp(7px, calc(9px * var(--services-fit)), 10px) clamp(9px, calc(12px * var(--services-fit)), 12px);
          border: 1px solid rgba(12, 17, 23, 0.07);
        }

        .v9-lever-tag {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: var(--services-tag-size);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0B8A6E;
          background: rgba(11, 138, 110, 0.07);
          border: 1px solid rgba(11, 138, 110, 0.15);
          border-radius: 20px;
          padding: 3px 10px;
          margin-bottom: clamp(4px, calc(8px * var(--services-fit)), 8px);
        }

        .v9-lever-info p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: var(--services-info-size);
          color: rgba(12, 17, 23, 0.55);
          line-height: 1.36;
          margin: 0;
        }

        @media (min-width: 1025px) {
          .v9-services {
            height: calc(100vh - var(--services-nav-offset));
            height: calc(100svh - var(--services-nav-offset));
            min-height: calc(100vh - var(--services-nav-offset));
            min-height: calc(100svh - var(--services-nav-offset));
            padding: var(--services-pad-y) 0;
            display: flex;
            align-items: stretch;
          }

          .v9-services-container {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            row-gap: var(--services-gap-y);
          }

          .v9-services-header {
            margin-bottom: 0;
          }

          .v9-levers {
            min-height: 0;
            height: 100%;
            align-items: stretch;
          }

          .v9-lever-col {
            min-height: 0;
            height: 100%;
            padding-top: var(--services-card-pad-y);
            padding-bottom: var(--services-card-pad-y);
          }
        }

        @media (max-width: 1024px) {
          .v9-levers {
            grid-template-columns: 1fr 1fr;
          }

          .v9-lever-col:nth-child(2) {
            border-right: none;
            padding-right: 0;
          }

          .v9-lever-col:nth-child(3) {
            border-right: 1px solid rgba(12, 17, 23, 0.08);
            padding-left: 28px;
            padding-top: 40px;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }

          .v9-lever-col:nth-child(4) {
            border-right: none;
            padding-right: 0;
            padding-top: 40px;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }
        }

        @media (max-width: 768px) {
          .v9-services {
            padding: 80px 0;
          }

          .v9-services-container {
            padding: 0 24px;
          }

          .v9-levers {
            grid-template-columns: 1fr;
          }

          .v9-lever-col {
            padding: 32px 0 32px 16px !important;
            border-right: none !important;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }

          .v9-lever-col:first-child {
            border-top: none;
            padding-top: 0 !important;
          }
        }

        /* Scroll highlight */
        .v9-services--highlight .v9-lever-col {
          opacity: var(--v9-highlight-dim);
          transition:
            opacity var(--v9-highlight-duration) var(--v9-highlight-easing),
            box-shadow var(--v9-highlight-duration) var(--v9-highlight-easing),
            background 0.2s ease-out;
        }

        .v9-services--highlight .v9-lever-col .v9-lever-title {
          transition: color var(--v9-highlight-duration) var(--v9-highlight-easing);
        }

        .v9-services--highlight .v9-lever-col--active {
          opacity: 1;
          box-shadow: inset var(--v9-highlight-inset-w) 0 0 var(--v9-accent);
          background: var(--v9-highlight-bg);
        }

        .v9-services--highlight .v9-lever-col--active .v9-lever-title {
          color: var(--v9-accent);
        }

        /* bg tint intentionally preserved under reduced-motion — color cue, not animation */
        @media (prefers-reduced-motion: reduce) {
          .v9-services {
            height: auto;
            min-height: 0;
            display: block;
            padding: 120px 0;
          }

          .v9-services-header,
          .v9-lever-col,
          .v9-lever-col .v9-lever-title {
            opacity: 1 !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
