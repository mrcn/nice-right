'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#fafaf9]/95 backdrop-blur-md shadow-sm py-3`}
      >
        <div className="nr-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                aria-label="NR"
              >
                <rect
                  x="2"
                  y="2"
                  width="36"
                  height="36"
                  rx="4"
                  fill="var(--nr-navy)"
                />
                <path
                  d="M11 30V10h4l8 14V10h4v20h-4l-8-14v14h-4z"
                  fill="var(--nr-cream)"
                />
                <path
                  d="M25 10h6c3.3 0 6 2.7 6 6s-2.7 6-6 6h-2v8h-4V10zm4 4v4h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z"
                  fill="var(--nr-cream)"
                />
                <path
                  d="M27 22l3 3 6-6"
                  stroke="var(--nr-amber)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span
                className="font-serif text-xl tracking-tight"
                style={{ color: 'var(--nr-navy)' }}
              >
                Nice Right
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--nr-text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--nr-navy)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--nr-text-muted)')
                  }
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="nr-btn nr-btn-primary text-sm">
                Book a Call
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 transition-all origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                  style={{ backgroundColor: 'var(--nr-navy)' }}
                />
                <span
                  className={`w-full h-0.5 transition-all ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                  style={{ backgroundColor: 'var(--nr-navy)' }}
                />
                <span
                  className={`w-full h-0.5 transition-all origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                  style={{ backgroundColor: 'var(--nr-navy)' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0f172a]/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-[#fafaf9] shadow-xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium"
                  style={{ color: 'var(--nr-navy)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="nr-btn nr-btn-primary mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
