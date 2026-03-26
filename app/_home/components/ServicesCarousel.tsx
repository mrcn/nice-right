'use client';

import { useEffect, useRef } from 'react';

const services = [
  'Conversion-Optimized Websites',
  'Custom Web Applications',
  'AI Chatbots',
  'LLM Integrations',
  'Workflow Automation',
  'SEO That Works',
  'Google Business Optimization',
  'Landing Pages',
  'E-commerce Solutions',
  'Customer Portals',
  'Email Automation',
  'Smart Forms',
  'Analytics Dashboards',
  'Internal Tools',
  'API Integrations',
  'Proof-of-Concept Apps',
];

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseEnter = () => {
      track.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      track.style.animationPlayState = 'running';
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const allServices = [...services, ...services, ...services];

  return (
    <section className="services-carousel">
      <div className="services-carousel-header">
        <span className="services-carousel-label">What We Do</span>
      </div>

      <div className="services-carousel-container">
        <div ref={trackRef} className="services-carousel-track">
          {allServices.map((service, index) => (
            <div key={index} className="services-carousel-item">
              <span className="services-carousel-dot">&middot;</span>
              <span className="services-carousel-text">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-carousel {
          background: #0c1117;
          padding: 40px 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .services-carousel-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .services-carousel-label {
          font-family:
            'Inter',
            -apple-system,
            sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #06d6a0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .services-carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .services-carousel-container::before,
        .services-carousel-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 2;
          pointer-events: none;
        }

        .services-carousel-container::before {
          left: 0;
          background: linear-gradient(to right, #0c1117, transparent);
        }

        .services-carousel-container::after {
          right: 0;
          background: linear-gradient(to left, #0c1117, transparent);
        }

        .services-carousel-track {
          display: flex;
          gap: 48px;
          animation: scroll 40s linear infinite;
          width: fit-content;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .services-carousel-item {
          display: flex;
          align-items: center;
          gap: 48px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .services-carousel-dot {
          color: rgba(6, 214, 160, 0.5);
          font-size: 1.5rem;
          line-height: 1;
        }

        .services-carousel-text {
          font-family:
            'Inter',
            -apple-system,
            sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.01em;
        }

        @media (max-width: 768px) {
          .services-carousel-track {
            gap: 32px;
            animation: scroll 30s linear infinite;
          }

          .services-carousel-item {
            gap: 32px;
          }

          .services-carousel-text {
            font-size: 0.95rem;
          }

          .services-carousel-container::before,
          .services-carousel-container::after {
            width: 80px;
          }
        }
      `}</style>
    </section>
  );
}
