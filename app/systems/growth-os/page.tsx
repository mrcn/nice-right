import { BookingSection } from '@/app/systems/_components/BookingSection';

export default function GrowthOSPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="go-hero">
        <div className="go-container">
          <span className="go-label">Tier 3 — Systems</span>
          <h1 className="go-hero-heading">
            It&apos;s working.<br />
            Let&apos;s make it work faster.
          </h1>
          <div className="go-price-badge">No setup fee · $597 /mo</div>
          <p className="go-hero-sub">
            For businesses where the system is running — you just need someone
            actively pushing it. Full platform plus Nice Right&apos;s hands on
            the wheel every month. Not software support. A growth partner.
          </p>
          <a href="#book" className="go-btn-gradient">Book a Free Call</a>
          <p className="go-hero-micro">
            No setup fee · Cancel any time · Includes full platform access
          </p>
        </div>
      </section>

      {/* ── 2. Problem ──────────────────────────────────────────────── */}
      <section className="go-problem">
        <div className="go-container">
          <h2 className="go-h2">Having tools isn&apos;t the same as using them.</h2>
          <div className="go-problem-body">
            <p>
              The platform is set up. The automations are running. But you
              haven&apos;t touched it in two months because you&apos;re busy
              running the business.
            </p>
            <p>
              You know there are opportunities in the data. You just don&apos;t
              have time to look at it, think about it, and build the next thing.
            </p>
            <p>
              You&apos;re not looking for more software. You&apos;re looking for
              someone who will actually show up every month and do the work.
            </p>
          </div>
          <p className="go-problem-close">That&apos;s what this is.</p>
        </div>
      </section>

      {/* ── 3. What You Get ─────────────────────────────────────────── */}
      <section className="go-includes">
        <div className="go-container">
          <h2 className="go-h2">What&apos;s included</h2>
          <div className="go-includes-grid">
            <div className="go-includes-group">
              <span className="go-group-label">Everything in Get Running + Get Growing</span>
              <ul className="go-list">
                <li>CRM, unified inbox, webchat widget</li>
                <li>Missed call text-back, review requests, lead follow-up</li>
                <li>Booking calendar, rebooking + referral engine</li>
                <li>Invoicing, Text2Pay, proposals &amp; estimates</li>
                <li>Document &amp; contract signing</li>
                <li>Social media scheduler</li>
                <li>Lead capture funnels + email newsletter</li>
                <li>Pipeline view + quarterly calls</li>
              </ul>
            </div>
            <div className="go-includes-group">
              <span className="go-group-label">Plus Nice Right running it with you</span>
              <ul className="go-list go-list--detailed">
                <li>
                  <strong>One new build per month</strong> — A campaign,
                  automation, funnel, or tool. Whatever moves the needle that
                  month.
                </li>
                <li>
                  <strong>Monthly performance review</strong> — We look at the
                  numbers together. What&apos;s working, what to cut, what&apos;s next.
                </li>
                <li>
                  <strong>Direct access</strong> — You message me, I reply
                  within hours. Not a ticket system.
                </li>
                <li>
                  <strong>Priority support</strong> — Anything that comes up
                  gets handled fast.
                </li>
                <li>
                  <strong>Evolving scope</strong> — What we focus on changes as
                  your business grows.
                </li>
              </ul>
            </div>
          </div>
          <p className="go-pull-quote">
            <em>
              &ldquo;It&apos;s working. I just need it to work faster — and I can&apos;t keep doing this alone.&rdquo;
            </em>
          </p>
        </div>
      </section>

      {/* ── 4. What to Expect ───────────────────────────────────────── */}
      <section className="go-expect">
        <div className="go-container">
          <h2 className="go-h2">How it works month to month</h2>
          <div className="go-milestones">
            <div className="go-milestone">
              <span className="go-milestone-label">Month 1</span>
              <p>
                We audit everything in place — what&apos;s working, what&apos;s
                missing, what to fix first. First new build.
              </p>
            </div>
            <div className="go-milestone">
              <span className="go-milestone-label">Every month</span>
              <p>Review numbers. Decide what to build. Build it.</p>
            </div>
            <div className="go-milestone">
              <span className="go-milestone-label">Ongoing</span>
              <p>
                Scope adjusts as your business does. This isn&apos;t a locked
                retainer — it&apos;s a working relationship.
              </p>
            </div>
          </div>
          <p className="go-expect-note">
            This works best when there&apos;s momentum to accelerate. If
            you&apos;re earlier stage, Get Running or Get Growing is probably
            the right start.
          </p>
        </div>
      </section>

      {/* ── 5. What You Own ─────────────────────────────────────────── */}
      <section className="go-ownership">
        <div className="go-container">
          <h2 className="go-h2 go-h2--light">What you own when you leave.</h2>
          <div className="go-ownership-body">
            <p>
              All contact data, lead history, and email lists are yours.
              Strategy docs, reports, and briefs we create together are yours.
            </p>
            <p>
              If you ever want to take the platform in-house, we do a full
              handoff — your contacts, your automations, transferred to a GHL
              account in your name.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Booking ──────────────────────────────────────────────── */}
      <BookingSection embedId="cal-embed-growth-os" />

      <style>{`
        /* ── Base tokens ──────────────────────────────────────────── */
        .go-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .go-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #06D6A0;
          margin-bottom: 20px;
        }

        .go-h2 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 400;
          color: #0C1117;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin: 0 0 48px;
        }

        .go-h2--light {
          color: #ffffff;
        }

        /* ── Hero ─────────────────────────────────────────────────── */
        .go-hero {
          background: #0C1117;
          padding-top: 160px;
          padding-bottom: 120px;
        }

        .go-hero-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 28px;
        }

        .go-price-badge {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #06D6A0;
          background: rgba(6, 214, 160, 0.1);
          border: 1px solid rgba(6, 214, 160, 0.25);
          border-radius: 100px;
          padding: 6px 18px;
          margin-bottom: 28px;
        }

        .go-hero-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.7;
          max-width: 540px;
          margin: 0 0 36px;
        }

        .go-btn-gradient {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          border-radius: 12px;
          padding: 15px 32px;
          box-shadow: 0 4px 18px rgba(6, 214, 160, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          margin-bottom: 20px;
        }

        .go-btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(6, 214, 160, 0.38);
        }

        .go-hero-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          margin: 0;
          letter-spacing: 0.03em;
        }

        /* ── Problem ──────────────────────────────────────────────── */
        .go-problem {
          background: #F8F7F4;
          padding: 100px 0;
        }

        .go-problem-body {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .go-problem-body p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(12, 17, 23, 0.68);
          line-height: 1.75;
          margin: 0;
        }

        .go-problem-close {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.4rem;
          font-style: italic;
          color: #0B8A6E;
          margin: 0;
        }

        /* ── Includes ─────────────────────────────────────────────── */
        .go-includes {
          background: #ffffff;
          padding: 100px 0;
        }

        .go-includes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          margin-bottom: 56px;
        }

        .go-includes-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .go-group-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(12, 17, 23, 0.45);
        }

        .go-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .go-list li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.875rem;
          color: rgba(12, 17, 23, 0.7);
          padding-left: 18px;
          position: relative;
          line-height: 1.5;
        }

        .go-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .go-list--detailed li {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .go-list--detailed li strong {
          color: #0C1117;
          font-weight: 600;
        }

        .go-pull-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-style: italic;
          color: rgba(12, 17, 23, 0.5);
          line-height: 1.5;
          letter-spacing: -0.01em;
          max-width: 680px;
          margin: 0;
        }

        /* ── What to Expect ───────────────────────────────────────── */
        .go-expect {
          background: #F8F7F4;
          padding: 100px 0;
        }

        .go-milestones {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid rgba(12, 17, 23, 0.1);
          margin-bottom: 40px;
        }

        .go-milestone {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 32px;
          align-items: baseline;
          padding: 28px 0;
          border-bottom: 1px solid rgba(12, 17, 23, 0.07);
        }

        .go-milestone-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          padding-top: 3px;
        }

        .go-milestone p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(12, 17, 23, 0.68);
          line-height: 1.65;
          margin: 0;
        }

        .go-expect-note {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.875rem;
          color: rgba(12, 17, 23, 0.5);
          line-height: 1.65;
          max-width: 560px;
          margin: 0;
        }

        /* ── Ownership ────────────────────────────────────────────── */
        .go-ownership {
          background: #0C1117;
          padding: 100px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .go-ownership-body {
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .go-ownership-body p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.75;
          margin: 0;
        }

        /* ── Responsive ───────────────────────────────────────────── */
        @media (max-width: 768px) {
          .go-container {
            padding: 0 24px;
          }

          .go-hero {
            padding-top: 120px;
            padding-bottom: 80px;
          }

          .go-problem,
          .go-includes,
          .go-expect,
          .go-ownership {
            padding: 72px 0;
          }

          .go-includes-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .go-milestone {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .go-hero-heading {
            font-size: 2.4rem;
          }

          .go-problem,
          .go-includes,
          .go-expect,
          .go-ownership {
            padding: 56px 0;
          }
        }

        /* ── Reduced motion ───────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .go-btn-gradient {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
