'use client';

import { useEffect, useState } from 'react';

export function Footer() {
  return (
    <>
      <style>{`
        .v81-footer {
          background: #0A0A0A;
          color: #F5F5F0;
          padding: 80px 0 40px;
          border-top: 3px solid #0A0A0A;
        }

        .v81-footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .v81-footer-brand p {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #F5F5F0;
          opacity: 0.7;
          margin: 16px 0 0;
          max-width: 300px;
        }

        .v81-footer-logo {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #F5F5F0;
          letter-spacing: -0.02em;
        }

        .v81-footer-col h4 {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #F5F5F0;
          margin: 0 0 20px;
          opacity: 0.9;
        }

        .v81-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .v81-footer-col li {
          margin: 12px 0;
        }

        .v81-footer-col a {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #F5F5F0;
          opacity: 0.6;
          transition: all 0.2s;
        }

        .v81-footer-col a:hover {
          opacity: 1;
          color: #0000FF;
        }

        .v81-footer-bottom {
          max-width: 1400px;
          margin: 64px auto 0;
          padding: 32px 40px 0;
          border-top: 1px solid rgba(245, 245, 240, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .v81-footer-bottom p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #F5F5F0;
          opacity: 0.4;
          margin: 0;
        }

        .v81-footer-social {
          display: flex;
          gap: 24px;
        }

        .v81-footer-social a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #F5F5F0;
          opacity: 0.6;
          transition: all 0.2s;
        }

        .v81-footer-social a:hover {
          opacity: 1;
          color: #0000FF;
        }

        @media (max-width: 900px) {
          .v81-footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 0 20px;
            gap: 32px;
          }
          
          .v81-footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
            padding: 32px 20px 0;
          }
        }

        @media (max-width: 600px) {
          .v81-footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <footer className="v81-footer">
        <div className="v81-footer-grid">
          <div className="v81-footer-brand">
            <div className="v81-footer-logo">NICE RIGHT</div>
            <p>
              Web development for small businesses that want to get found, get
              customers, and grow.
            </p>
          </div>

          <div className="v81-footer-col">
            <h4>Navigate</h4>
            <ul>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#results">Results</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="v81-footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services">Web Development</a>
              </li>
              <li>
                <a href="#services">SEO</a>
              </li>
              <li>
                <a href="#services">Automation</a>
              </li>
              <li>
                <a href="#services">Consulting</a>
              </li>
            </ul>
          </div>

          <div className="v81-footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="mailto:Marcin@uxoxo.xyz">Email</a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/niceright/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="v81-footer-bottom">
          <p>&copy; 2026 Nice Right. Chicago's Northwest Side.</p>
          <div className="v81-footer-social">
            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://cal.com/niceright/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cal.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
