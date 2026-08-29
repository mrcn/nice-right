import { BookingSection } from '@/app/systems/_components/BookingSection';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Get Growing | Nice Right',
  description:
    'A retention and referral engine for small businesses: rebooking automation, referral asks, newsletters, funnels, invoicing, and pipeline visibility.',
  path: '/systems/get-growing/',
};

export const metadata = buildSeoMetadata(page);

export default function GetGrowingPage() {
  const serviceSchema = buildServiceSchema({
    name: 'Get Growing',
    description: page.description,
    path: page.path,
    serviceType: 'Retention and referral automation',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Systems', path: '/systems/get-running/' },
    { name: 'Get Growing', path: page.path },
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
      <section className="gg-hero">
        <div className="gg-container">
          <span className="gg-label">Tier 2 — Systems</span>
          <h1 className="gg-hero-heading">
            Your customers should<br />
            be coming back.
          </h1>
          <div className="gg-price-badge">$1,200 setup &middot; $247 /mo</div>
          <p className="gg-hero-sub">
            Your work is good. Customers leave happy. But most of them never hear from you again — and you never ask for the referral.
            This tier builds the system that brings customers back and makes each good job worth more.
            The work is already there. Now make it work harder.
          </p>
          <a href="#book" className="gg-btn-cta">Book a Free Call</a>
          <div className="gg-hero-stats">
            <span>2–3 week setup</span>
            <span className="gg-dot">&middot;</span>
            <span>Cancel any time</span>
            <span className="gg-dot">&middot;</span>
            <span>Includes everything in Tier 1</span>
          </div>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="gg-problem">
        <div className="gg-container">
          <h2 className="gg-section-heading">Good work doesn&rsquo;t sell itself.</h2>
          <div className="gg-problem-cards">
            <div className="gg-problem-card">
              <p>You did a great job. The customer was happy. But you never heard from them again because nobody got back to them.</p>
            </div>
            <div className="gg-problem-card">
              <p>You&rsquo;ve got dozens of past customers sitting in your phone. They&rsquo;d probably hire you again. But you&rsquo;ve never asked.</p>
            </div>
            <div className="gg-problem-card">
              <p>You don&rsquo;t have a referral problem. You have a system problem. No one asks, so no one refers.</p>
            </div>
          </div>
          <p className="gg-problem-close">
            The fix isn&rsquo;t working harder. It&rsquo;s building the engine once and letting it run.
          </p>
        </div>
      </section>

      {/* 3. What You Get */}
      <section className="gg-includes">
        <div className="gg-container">
          <h2 className="gg-section-heading">What&rsquo;s included</h2>

          <div className="gg-includes-groups">
            <div className="gg-includes-group">
              <div className="gg-group-label">Everything in Get Running</div>
              <ul className="gg-feature-list">
                <li>CRM — contacts organized, nothing falls through</li>
                <li>Unified inbox — SMS, email, web chat, social in one feed</li>
                <li>Webchat widget — works on any website</li>
                <li>Missed call text-back</li>
                <li>Review requests — automated after every job</li>
                <li>Customer follow-through sequence</li>
                <li>Booking page</li>
              </ul>
            </div>

            <div className="gg-includes-group gg-includes-group--growth">
              <div className="gg-group-label">Plus the retention &amp; referral engine</div>
              <ul className="gg-feature-list gg-feature-list--detailed">
                <li>
                  <strong>Rebooking automation</strong>
                  <span> — Reaches out to past customers at the right time, automatically.</span>
                </li>
                <li>
                  <strong>Referral system</strong>
                  <span> — Sends an automated ask after a great job, while they&rsquo;re still happy.</span>
                </li>
                <li>
                  <strong>Invoicing &amp; Text2Pay</strong>
                  <span> — Send invoices and collect payment via text. No separate billing tool needed.</span>
                </li>
                <li>
                  <strong>Proposals &amp; estimates</strong>
                  <span> — Send professional quotes that clients can approve and sign digitally.</span>
                </li>
                <li>
                  <strong>Social media scheduler</strong>
                  <span> — Schedule posts across platforms from one place.</span>
                </li>
                <li>
                  <strong>Customer inquiry funnel</strong>
                  <span> — A focused page built to turn visitors into conversations.</span>
                </li>
                <li>
                  <strong>Email newsletter</strong>
                  <span> — A monthly send to your list. Written and sent for you.</span>
                </li>
                <li>
                  <strong>Pipeline view</strong>
                  <span> — See every inquiry, where it stands, and what comes next.</span>
                </li>
                <li>
                  <strong>Quarterly strategy call</strong>
                  <span> — We look at the numbers together every 90 days.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="gg-callout">
            Referral and rebooking flows typically pay for this plan within 60 days.
          </div>
        </div>
      </section>

      {/* 4. What to Expect */}
      <section className="gg-timeline">
        <div className="gg-container">
          <h2 className="gg-section-heading">What to expect</h2>
          <div className="gg-milestones">
            <div className="gg-milestone">
              <div className="gg-milestone-marker">Weeks 1–3</div>
              <p className="gg-milestone-text">We build the full system — foundation + retention + referral layer.</p>
            </div>
            <div className="gg-milestone">
              <div className="gg-milestone-marker">Day 1 live</div>
              <p className="gg-milestone-text">Automations start running. Old customers start hearing from you.</p>
            </div>
            <div className="gg-milestone">
              <div className="gg-milestone-marker">60 days</div>
              <p className="gg-milestone-text">Most businesses see referrals and rebooking start coming through without any extra work.</p>
            </div>
          </div>
          <p className="gg-timeline-note">
            For the first time, you&rsquo;ll have a clear picture of your inquiry pipeline.
          </p>
        </div>
      </section>

      {/* 5. What You Own */}
      <section className="gg-ownership">
        <div className="gg-container">
          <h2 className="gg-section-heading gg-section-heading--light">Your data is yours.</h2>
          <div className="gg-ownership-body">
            <p>Contacts, inquiries, form submissions, and your email list are all yours. Full export any time.</p>
            <p>The automations and funnels run inside our platform. If you ever want to take them in-house, we&rsquo;ll transfer everything to a GHL account in your name.</p>
          </div>
        </div>
      </section>

      {/* 6. Booking */}
      <BookingSection embedId="cal-embed-get-growing" />

      <style>{`
        /* ============================================================
           GET GROWING PAGE — gg- prefix
        ============================================================ */

        /* Shared container */
        .gg-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* Shared label */
        .gg-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #06D6A0;
          margin-bottom: 20px;
        }

        /* Shared section headings */
        .gg-section-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 400;
          color: #0C1117;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 48px 0;
        }

        .gg-section-heading--light {
          color: #ffffff;
        }

        /* ============================================================
           1. HERO
        ============================================================ */
        .gg-hero {
          background: #0C1117;
          padding-top: 160px;
          padding-bottom: 100px;
        }

        .gg-hero-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 28px 0;
        }

        .gg-price-badge {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #06D6A0;
          background: rgba(6, 214, 160, 0.1);
          border: 1px solid rgba(6, 214, 160, 0.25);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 28px;
          letter-spacing: 0.01em;
        }

        .gg-hero-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 0 36px 0;
        }

        .gg-btn-cta {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          border-radius: 12px;
          padding: 15px 32px;
          box-shadow: 0 4px 18px rgba(6, 214, 160, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          margin-bottom: 28px;
        }

        .gg-btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(6, 214, 160, 0.38);
        }

        .gg-hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.01em;
        }

        .gg-dot {
          color: rgba(255, 255, 255, 0.2);
        }

        /* ============================================================
           2. PROBLEM
        ============================================================ */
        .gg-problem {
          background: #F8F7F4;
          padding: 100px 0;
        }

        .gg-problem-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 40px;
        }

        .gg-problem-card {
          background: #ffffff;
          padding: 32px 28px;
          border-radius: 2px;
        }

        .gg-problem-card:first-child {
          border-radius: 10px 2px 2px 10px;
        }

        .gg-problem-card:last-child {
          border-radius: 2px 10px 10px 2px;
        }

        .gg-problem-card p {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1rem;
          color: rgba(12, 17, 23, 0.7);
          line-height: 1.65;
          margin: 0;
        }

        .gg-problem-close {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          color: #0B8A6E;
          line-height: 1.5;
          letter-spacing: -0.01em;
          margin: 0;
          max-width: 640px;
        }

        /* ============================================================
           3. WHAT'S INCLUDED
        ============================================================ */
        .gg-includes {
          background: #ffffff;
          padding: 100px 0;
        }

        .gg-includes-groups {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .gg-includes-group {
          padding: 36px 32px;
          border: 1px solid rgba(12, 17, 23, 0.08);
          border-radius: 14px;
        }

        .gg-includes-group--growth {
          border-color: rgba(11, 138, 110, 0.2);
          background: rgba(11, 138, 110, 0.02);
        }

        .gg-group-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 20px;
        }

        .gg-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .gg-feature-list li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: rgba(12, 17, 23, 0.72);
          padding-left: 18px;
          position: relative;
          line-height: 1.5;
        }

        .gg-feature-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .gg-feature-list--detailed li {
          gap: 6px;
          font-size: 0.85rem;
          line-height: 1.55;
        }

        .gg-feature-list--detailed li strong {
          color: #0C1117;
          font-weight: 600;
        }

        .gg-feature-list--detailed li span {
          color: rgba(12, 17, 23, 0.55);
        }

        .gg-callout {
          background: linear-gradient(135deg, rgba(11, 138, 110, 0.06) 0%, rgba(6, 214, 160, 0.06) 100%);
          border: 1px solid rgba(11, 138, 110, 0.18);
          border-radius: 12px;
          padding: 22px 28px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #0B8A6E;
          line-height: 1.55;
          max-width: 640px;
        }

        /* ============================================================
           4. WHAT TO EXPECT
        ============================================================ */
        .gg-timeline {
          background: #F8F7F4;
          padding: 100px 0;
        }

        .gg-milestones {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid rgba(12, 17, 23, 0.1);
          margin-bottom: 40px;
        }

        .gg-milestone {
          padding: 36px 32px 36px 0;
          border-right: 1px solid rgba(12, 17, 23, 0.08);
        }

        .gg-milestone:last-child {
          border-right: none;
          padding-right: 0;
        }

        .gg-milestone:not(:first-child) {
          padding-left: 32px;
        }

        .gg-milestone-marker {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 12px;
        }

        .gg-milestone-text {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(12, 17, 23, 0.65);
          line-height: 1.65;
          margin: 0;
        }

        .gg-timeline-note {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(12, 17, 23, 0.5);
          line-height: 1.6;
          margin: 0;
        }

        /* ============================================================
           5. WHAT YOU OWN
        ============================================================ */
        .gg-ownership {
          background: #0C1117;
          padding: 100px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gg-ownership-body {
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gg-ownership-body p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.75;
          margin: 0;
        }

        /* ============================================================
           RESPONSIVE
        ============================================================ */
        @media (max-width: 900px) {
          .gg-includes-groups {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .gg-problem-cards {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .gg-problem-card:first-child,
          .gg-problem-card:last-child {
            border-radius: 10px;
          }

          .gg-problem-card {
            border-radius: 10px;
          }
        }

        @media (max-width: 768px) {
          .gg-container {
            padding: 0 24px;
          }

          .gg-hero {
            padding-top: 140px;
            padding-bottom: 72px;
          }

          .gg-problem,
          .gg-includes,
          .gg-timeline,
          .gg-ownership {
            padding: 72px 0;
          }

          .gg-milestones {
            grid-template-columns: 1fr;
          }

          .gg-milestone {
            padding: 28px 0;
            border-right: none;
            border-bottom: 1px solid rgba(12, 17, 23, 0.08);
          }

          .gg-milestone:last-child {
            border-bottom: none;
          }

          .gg-milestone:not(:first-child) {
            padding-left: 0;
          }

          .gg-hero-stats {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .gg-hero-heading {
            font-size: 2.2rem;
          }

          .gg-section-heading {
            font-size: 1.7rem;
            margin-bottom: 32px;
          }

          .gg-includes-group {
            padding: 28px 20px;
          }
        }

        /* ============================================================
           REDUCED MOTION
        ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .gg-btn-cta {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
