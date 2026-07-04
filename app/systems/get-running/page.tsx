import { BookingSection } from '@/app/systems/_components/BookingSection';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Get Running | Nice Right',
  description:
    'A starter business automation system for missed calls, CRM, reviews, web chat, booking, and lead follow-up.',
  path: '/systems/get-running/',
};

export const metadata = buildSeoMetadata(page);

export default function GetRunningPage() {
  const serviceSchema = buildServiceSchema({
    name: 'Get Running',
    description: page.description,
    path: page.path,
    serviceType: 'Business automation setup',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Systems', path: '/systems/get-running/' },
    { name: 'Get Running', path: page.path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 1. Hero */}
      <section className="gr-hero">
        <div className="gr-container">
          <span className="gr-label">Tier 1 — Systems</span>
          <h1 className="gr-hero-h1">
            <span className="gr-hero-line1">Stop losing leads</span>
            <span className="gr-hero-line2">you don&apos;t know about.</span>
          </h1>
          <div className="gr-price-badge">$700 setup &middot; $97 /mo</div>
          <p className="gr-hero-sub">
            Built for businesses with nothing automated yet. The phone rings and
            nobody follows up. A job finishes and no one asks for a review. A
            form gets submitted and two days pass in silence. This fixes all of
            that.
          </p>
          <a href="#book" className="gr-btn-gradient">Book a Free Call</a>
          <div className="gr-hero-stats">
            <span>1–2 week setup</span>
            <span className="gr-stat-dot" aria-hidden="true">&middot;</span>
            <span>Cancel any time</span>
            <span className="gr-stat-dot" aria-hidden="true">&middot;</span>
            <span>No tech skills needed</span>
          </div>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="gr-problem gr-warm">
        <div className="gr-container">
          <h2 className="gr-section-h2">
            You&apos;re working. The follow-up isn&apos;t.
          </h2>
          <div className="gr-problem-cards">
            <div className="gr-problem-card">
              <p>
                The phone rings when you&apos;re on a job. You can&apos;t
                answer. They call someone else.
              </p>
            </div>
            <div className="gr-problem-card">
              <p>
                A customer leaves happy. Nobody asks for a review. That job
                disappears from the internet.
              </p>
            </div>
            <div className="gr-problem-card">
              <p>
                Someone fills out your form. Nothing happens for two days.
                They&apos;ve already moved on.
              </p>
            </div>
          </div>
          <p className="gr-problem-close">
            None of that is your fault. You&apos;re running a business. This is
            the fix.
          </p>
        </div>
      </section>

      {/* 3. What You Get */}
      <section className="gr-features gr-white">
        <div className="gr-container">
          <h2 className="gr-section-h2">
            What&apos;s included
          </h2>
          <ul className="gr-feature-list">
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>CRM</strong> — All your contacts in one place. No more
                scattered texts and sticky notes.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Unified inbox</strong> — SMS, email, web chat, and
                social messages in one feed. Nothing slips through.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Webchat widget</strong> — A live chat button for your
                website. Works on any site — Wix, Squarespace, WordPress, or
                custom. Conversations go straight into your inbox.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Missed call text-back</strong> — When you can&apos;t
                answer, an automatic reply goes out in seconds.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Review requests</strong> — After every job, a message
                goes out asking for a Google review. You don&apos;t touch it.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Lead follow-up</strong> — The moment someone reaches
                out, a 3-message sequence starts automatically.
              </div>
            </li>
            <li className="gr-feature-row">
              <span className="gr-feature-arrow" aria-hidden="true">→</span>
              <div>
                <strong>Booking calendar</strong> — Clients pick a time
                directly. Embeds on any website. No phone tag.
              </div>
            </li>
          </ul>
          <div className="gr-callout">
            Includes an onboarding call. We walk through everything together and
            make sure it&apos;s set up for your business specifically.
          </div>
        </div>
      </section>

      {/* 4. What to Expect */}
      <section className="gr-timeline gr-warm">
        <div className="gr-container">
          <h2 className="gr-section-h2">
            What happens after you sign up
          </h2>
          <div className="gr-timeline-steps">
            <div className="gr-timeline-step">
              <div className="gr-timeline-marker">Week 1–2</div>
              <p className="gr-timeline-desc">
                We build and configure your account.
              </p>
            </div>
            <div className="gr-timeline-connector" aria-hidden="true" />
            <div className="gr-timeline-step">
              <div className="gr-timeline-marker">Day 1 live</div>
              <p className="gr-timeline-desc">
                First automations go out. Missed calls get answered.
              </p>
            </div>
            <div className="gr-timeline-connector" aria-hidden="true" />
            <div className="gr-timeline-step">
              <div className="gr-timeline-marker">Month 1</div>
              <p className="gr-timeline-desc">
                Most clients get 2–5 new Google reviews without doing a thing.
              </p>
            </div>
          </div>
          <p className="gr-timeline-note">
            You don&apos;t need any tech skills. If you can check your email,
            you can use this.
          </p>
        </div>
      </section>

      {/* 5. What You Own */}
      <section className="gr-ownership gr-dark">
        <div className="gr-container">
          <h2 className="gr-section-h2 gr-section-h2--light">
            Your data is yours.
          </h2>
          <p className="gr-ownership-p">
            Your contact list, lead history, and conversation logs are yours.
            Export any time, no questions asked.
          </p>
          <p className="gr-ownership-p">
            The automations run inside our platform. If you ever want to move
            to your own account, we&apos;ll help you do that too.
          </p>
        </div>
      </section>

      {/* 6. Booking */}
      <BookingSection embedId="cal-embed-get-running" />

      <style>{`
        /* ---- Shared ---- */
        .gr-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .gr-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #06D6A0;
          margin-bottom: 20px;
        }

        .gr-section-h2 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.12;
          margin: 0 0 48px;
          color: #0C1117;
        }

        .gr-section-h2--light {
          color: #ffffff;
        }

        /* ---- Hero ---- */
        .gr-hero {
          background: #0C1117;
          padding-top: 160px;
          padding-bottom: 100px;
        }

        .gr-hero-h1 {
          display: flex;
          flex-direction: column;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin: 0 0 28px;
        }

        .gr-hero-line1 {
          color: #ffffff;
          animation: gr-line-reveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        .gr-hero-line2 {
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gr-line-reveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        @keyframes gr-line-reveal {
          from { clip-path: inset(100% 0 0 0); transform: translateY(24px); opacity: 0; }
          to   { clip-path: inset(0% 0 0 0);   transform: translateY(0);    opacity: 1; }
        }

        @keyframes gr-fade-up {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .gr-price-badge {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #06D6A0;
          background: rgba(6, 214, 160, 0.1);
          border: 1px solid rgba(6, 214, 160, 0.25);
          border-radius: 100px;
          padding: 6px 18px;
          margin-bottom: 28px;
          animation: gr-fade-up 0.6s ease-out 0.75s both;
        }

        .gr-hero-sub {
          max-width: 560px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 36px;
          animation: gr-fade-up 0.6s ease-out 0.9s both;
        }

        .gr-btn-gradient {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          border-radius: 12px;
          padding: 15px 36px;
          box-shadow: 0 4px 24px rgba(6, 214, 160, 0.22), 0 1px 3px rgba(0, 0, 0, 0.12);
          transition: transform 0.22s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.22s ease;
          animation: gr-fade-up 0.6s ease-out 1.05s both;
        }

        .gr-btn-gradient:hover {
          transform: scale(1.02) translateY(-1px);
          box-shadow: 0 8px 32px rgba(6, 214, 160, 0.32), 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .gr-btn-gradient:active {
          transform: scale(0.99);
        }

        .gr-hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
          animation: gr-fade-up 0.6s ease-out 1.2s both;
        }

        .gr-stat-dot {
          color: rgba(255, 255, 255, 0.2);
        }

        /* ---- Problem ---- */
        .gr-warm { background: #F8F7F4; }
        .gr-white { background: #ffffff; }
        .gr-dark  { background: #0C1117; }

        .gr-problem {
          padding: 96px 0;
        }

        .gr-problem-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .gr-problem-card {
          padding: 28px 24px;
          border-left: 3px solid #0B8A6E;
          background: rgba(11, 138, 110, 0.04);
        }

        .gr-problem-card p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #1a2433;
          margin: 0;
        }

        .gr-problem-close {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          line-height: 1.65;
          color: rgba(26, 36, 51, 0.65);
          margin: 0;
          max-width: 520px;
        }

        /* ---- Features ---- */
        .gr-features {
          padding: 96px 0;
        }

        .gr-feature-list {
          list-style: none;
          margin: 0 0 36px;
          padding: 0;
        }

        .gr-feature-row {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.97rem;
          line-height: 1.6;
          color: #1a2433;
        }

        .gr-feature-row:first-child {
          border-top: 1px solid rgba(0, 0, 0, 0.07);
        }

        .gr-feature-arrow {
          color: #0B8A6E;
          font-size: 1.1rem;
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .gr-feature-row strong {
          color: #0C1117;
          font-weight: 600;
        }

        .gr-callout {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.93rem;
          line-height: 1.65;
          color: #1a2433;
          padding: 22px 26px;
          border: 1.5px solid rgba(11, 138, 110, 0.3);
          border-radius: 10px;
          background: rgba(11, 138, 110, 0.04);
        }

        /* ---- Timeline ---- */
        .gr-timeline {
          padding: 96px 0;
        }

        .gr-timeline-steps {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 40px;
        }

        .gr-timeline-step {
          flex: 1;
          padding-right: 16px;
        }

        .gr-timeline-connector {
          flex-shrink: 0;
          width: 32px;
          height: 2px;
          background: linear-gradient(90deg, #0B8A6E, #06D6A0);
          margin-top: 18px;
          border-radius: 2px;
        }

        .gr-timeline-marker {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0B8A6E;
          margin-bottom: 10px;
        }

        .gr-timeline-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.93rem;
          line-height: 1.6;
          color: #1a2433;
          margin: 0;
        }

        .gr-timeline-note {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(26, 36, 51, 0.6);
          margin: 0;
          line-height: 1.6;
        }

        /* ---- Ownership ---- */
        .gr-ownership {
          padding: 96px 0;
        }

        .gr-ownership-p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.97rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.65);
          max-width: 580px;
          margin: 0 0 20px;
        }

        .gr-ownership-p:last-child {
          margin-bottom: 0;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .gr-problem-cards {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .gr-timeline-steps {
            flex-direction: column;
            gap: 0;
          }

          .gr-timeline-step {
            padding-right: 0;
            padding-bottom: 16px;
          }

          .gr-timeline-connector {
            width: 2px;
            height: 24px;
            margin-top: 0;
            margin-left: 0;
            margin-bottom: 0;
            background: linear-gradient(180deg, #0B8A6E, #06D6A0);
          }
        }

        @media (max-width: 640px) {
          .gr-container {
            padding: 0 24px;
          }

          .gr-hero {
            padding-top: 120px;
            padding-bottom: 72px;
          }

          .gr-hero-h1 {
            font-size: clamp(2.2rem, 8vw, 3rem);
          }

          .gr-problem,
          .gr-features,
          .gr-timeline,
          .gr-ownership {
            padding: 72px 0;
          }

          .gr-section-h2 {
            font-size: clamp(1.5rem, 6vw, 2rem);
            margin-bottom: 36px;
          }

          .gr-problem-card {
            padding: 22px 18px;
          }

          .gr-btn-gradient {
            width: 100%;
            text-align: center;
            padding: 15px 24px;
          }

          .gr-hero-stats {
            gap: 8px;
          }
        }

        /* ---- Reduced motion ---- */
        @media (prefers-reduced-motion: reduce) {
          .gr-hero-line1,
          .gr-hero-line2,
          .gr-price-badge,
          .gr-hero-sub,
          .gr-btn-gradient,
          .gr-hero-stats {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </>
  );
}
