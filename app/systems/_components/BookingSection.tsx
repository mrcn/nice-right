'use client';

import { CalEmbed } from '@/app/_shared/CalEmbed';

interface BookingProps {
  /** Unique per-page id -- avoids DOM conflicts when navigating between pages */
  embedId: string;
}

export function BookingSection({ embedId }: BookingProps) {
  return (
    <>
      <section className="sys-booking" id="book">
        <div className="sys-booking-inner">
          <div className="sys-booking-header">
            <span className="sys-label">Book a Call</span>
            <h2 className="sys-booking-heading">
              30 minutes. No pitch. Real talk.
            </h2>
            <p className="sys-booking-sub">
              Tell me where you are. We&apos;ll figure out what fits.
            </p>
          </div>

          <div className="sys-cal-wrap">
            <CalEmbed
              embedId={embedId}
              calLink="niceright/30min"
              loadingText="Loading calendar..."
              ariaLabel="Booking calendar"
              fallbackText={
                <p className="cal-embed-fallback">
                  Taking a while?{' '}
                  <a href="https://cal.com/niceright/30min" target="_blank" rel="noopener noreferrer">
                    Book on Cal.com
                  </a>{' '}
                  or <a href="mailto:Marcin@uxoxo.xyz">email me</a>.
                </p>
              }
            />
          </div>

          <div className="sys-booking-alt">
            <a href="mailto:Marcin@uxoxo.xyz" className="sys-booking-email">
              Or email: Marcin@uxoxo.xyz
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .sys-booking {
          background: #0C1117;
          padding: 120px 0 100px;
        }
        .sys-booking-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .sys-booking-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .sys-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 14px;
        }
        .sys-booking-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .sys-booking-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin: 0;
          max-width: 440px;
          margin-inline: auto;
        }
        .sys-cal-wrap {
          border: 1px solid rgba(6, 214, 160, 0.14);
          border-radius: 16px;
          overflow: hidden;
          background: #0C1117;
        }
        .sys-booking-alt {
          text-align: center;
          margin-top: 24px;
        }
        .sys-booking-email {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .sys-booking-email:hover { color: #06D6A0; }
        @media (max-width: 640px) {
          .sys-booking { padding: 80px 0; }
          .sys-booking-inner { padding: 0 24px; }
        }
      `}</style>
    </>
  );
}
