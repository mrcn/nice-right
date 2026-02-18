'use client';

import { useEffect, useState } from 'react';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'how-it-works',
        'services',
        'results',
        'testimonials',
        'faq',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (
          el &&
          el.offsetTop <= scrollPos &&
          el.offsetTop + el.offsetHeight > scrollPos
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#services', label: 'Services' },
    { href: '#results', label: 'Results' },
  ];

  return (
    <>
      <style>{`
        .v81-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(245, 245, 240, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 3px solid #0A0A0A;
          transition: all 0.3s ease;
        }

        .v81-nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .v81-logo {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }

        .v81-logo:hover {
          color: #0000FF;
        }

        .v81-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .v81-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
          padding: 8px 16px;
          border: 2px solid transparent;
          transition: none;
          position: relative;
        }

        .v81-nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: #0000FF;
          transform: scaleX(0);
          transform-origin: left;
          transition: none;
        }

        .v81-nav-link:hover {
          color: #0000FF;
        }

        .v81-nav-link:hover::after {
          transform: scaleX(1);
        }

        .v81-nav-link:focus-visible {
          outline: 2px solid #0000FF;
          outline-offset: 2px;
          border-color: transparent;
        }

        .v81-nav-link.active {
          border-color: #0A0A0A;
          background: #0A0A0A;
          color: #F5F5F0;
        }

        .v81-nav-link.active::after {
          background: #F5F5F0;
          transform: scaleX(1);
        }

        .v81-nav-link.active:hover {
          background: #0000FF;
          border-color: #0000FF;
        }

        .v81-nav-cta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #FFFFFF;
          background: #0000FF;
          padding: 12px 20px;
          border: 2px solid #0A0A0A;
          margin-left: 8px;
          transition: none;
        }

        .v81-nav-cta:hover {
          background: #0A0A0A;
          box-shadow: 4px 4px 0px #0A0A0A;
        }

        .v81-nav-cta:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #0A0A0A;
        }

        .v81-nav-toggle {
          display: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          background: none;
          border: 2px solid #0A0A0A;
          padding: 8px 12px;
          cursor: pointer;
          color: #0A0A0A;
          position: relative;
          width: 44px;
          height: 44px;
          transition: none;
        }

        .v81-nav-toggle:active {
          transform: scale(0.95);
        }

        .v81-nav-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s, transform 0.2s;
        }

        .v81-nav-icon.hidden {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }

        @media (max-width: 900px) {
          .v81-nav-inner {
            padding: 0 20px;
            height: 64px;
          }

          .v81-nav-toggle {
            display: block;
          }

          .v81-nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: rgba(245, 245, 240, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 24px;
            gap: 8px;
            border-bottom: 3px solid #0A0A0A;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .v81-nav-links.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .v81-nav-link {
            width: 100%;
            text-align: center;
            padding: 16px;
            font-size: 0.9rem;
          }

          .v81-nav-cta {
            width: 100%;
            text-align: center;
            margin-left: 0;
            margin-top: 8px;
            padding: 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <nav className="v81-nav" aria-label="Main navigation">
        <div className="v81-nav-inner">
          <a href="/" className="v81-logo">
            NICE RIGHT
          </a>

          <button
            className="v81-nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`v81-nav-icon ${menuOpen ? 'hidden' : ''}`}>
              ☰
            </span>
            <span className={`v81-nav-icon ${menuOpen ? '' : 'hidden'}`}>
              ✕
            </span>
          </button>

          <div className={`v81-nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`v81-nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="v81-nav-cta"
              onClick={() => setMenuOpen(false)}
            >
              Book Call
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
