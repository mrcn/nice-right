'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContractorGrowthLanding() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const dreamRef = useRef(null);
  const mechanismRef = useRef(null);
  const guaranteeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.section-reveal', {
        scrollTrigger: {
          trigger: '.section-reveal',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C1117] text-white">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B8A6E]/10 border border-[#06D6A0]/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#06D6A0] rounded-full animate-pulse"></span>
            <span className="text-[#06D6A0] text-sm font-medium">
              Currently Accepting Applications — Only 4 Spots This Month
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            We Help Service Contractors Add{' '}
            <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">
              $40K-$80K/Month
            </span>{' '}
            in Predictable Revenue in 90 Days
          </h1>

          <p className="text-xl text-gray-400 mb-4">
            Without Door-Knocking, Cold Calling, or Begging for Reviews
          </p>

          <p className="text-lg text-gray-500 mb-10">
            The DOMINATE LOCAL System — Proven for HVAC, Plumbing, Roofing &
            Electrical Contractors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Apply Now — Only 4 Spots This Month
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-[#06D6A0] hover:text-[#06D6A0] transition-colors"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ 12x Average Lead Increase</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ $500K Revenue Guarantee</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ 90-Day Implementation</span>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section
        ref={problemRef}
        className="py-24 px-4 sm:px-6 lg:px-8 section-reveal"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">
              You're Losing{' '}
              <span className="text-red-400">$50K+ Every Month</span> to
              Competitors With Worse Reviews
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Reliance on Referrals
              </h3>
              <p className="text-gray-400">
                Waiting for word-of-mouth is like waiting for lightning to
                strike. You can't scale a business on hope.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Brutal Seasonality</h3>
              <p className="text-gray-400">
                One slow month and you're dipping into savings. Your crew is
                idle while competitors stay busy.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Price Shoppers</h3>
              <p className="text-gray-400">
                When you do get leads, they're comparing you to the cheapest
                option. You're competing on price, not value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DREAM OUTCOME */}
      <section
        ref={dreamRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-transparent section-reveal"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">
              Imagine Your Business{' '}
              <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">
                30 Days From Now
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                Before
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  <span>5-10 leads per month from referrals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  <span>$20K/month revenue, unpredictable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Chasing customers, begging for reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Competing on price with 20 other contractors</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#0B8A6E]/20 to-[#06D6A0]/10 rounded-2xl border border-[#0B8A6E]/30">
              <h3 className="text-sm text-[#06D6A0] uppercase tracking-wide mb-4">
                After (90 Days)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#06D6A0]">✓</span>
                  <span>80+ qualified leads per month consistently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06D6A0]">✓</span>
                  <span>$100K+/month revenue, predictable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06D6A0]">✓</span>
                  <span>Calendar filled, customers calling YOU</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06D6A0]">✓</span>
                  <span>Premium pricing, you choose your customers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MECHANISM */}
      <section
        ref={mechanismRef}
        className="py-24 px-4 sm:px-6 lg:px-8 section-reveal"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">
              The{' '}
              <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">
                DOMINATE LOCAL
              </span>{' '}
              System
            </h2>
            <p className="text-xl text-gray-400">
              7 phases to predictable revenue growth
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01',
                title: 'Authority Architecture',
                desc: 'Conversion-optimized website that positions you as the #1 choice in your market',
              },
              {
                num: '02',
                title: 'Google Domination Protocol',
                desc: 'Local SEO strategy that puts you above national chains and local competitors',
              },
              {
                num: '03',
                title: 'Review Velocity Engine',
                desc: 'Automated 5-star review generation system (20+ reviews/month)',
              },
              {
                num: '04',
                title: 'Instant Response Automation',
                desc: 'AI chat that books appointments 24/7, never misses a lead',
              },
              {
                num: '05',
                title: 'Retargeting Reminder Matrix',
                desc: 'Stay in front of every website visitor until they become a customer',
              },
              {
                num: '06',
                title: 'Competitive Intel Loop',
                desc: 'Exploit competitor weak spots and capture their market share',
              },
              {
                num: '07',
                title: 'Revenue Reporting Dashboard',
                desc: 'Track ROI, not vanity metrics. Know exactly where every dollar comes from',
              },
            ].map((phase, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-[#0B8A6E]/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0B8A6E] to-[#06D6A0] rounded-xl flex items-center justify-center font-bold">
                  {phase.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-gray-400">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section
        ref={guaranteeRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B8A6E]/10 to-transparent section-reveal"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B8A6E]/20 border border-[#06D6A0]/30 rounded-full mb-8">
            <svg
              className="w-5 h-5 text-[#06D6A0]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[#06D6A0] font-semibold">
              The $500K Revenue Guarantee
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif mb-6">
            $500K in Attributable Revenue in 12 Months{' '}
            <span className="text-[#06D6A0]">
              Or We Work For Free Until You Hit It
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="font-semibold mb-2">30-Day Momentum</h3>
              <p className="text-gray-400 text-sm">
                25+ qualified leads in first 30 days or we pause and fix it
              </p>
            </div>

            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="font-semibold mb-2">90-Day Acceleration</h3>
              <p className="text-gray-400 text-sm">
                80+ leads/month system running or we work free until it does
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#0B8A6E]/20 to-[#06D6A0]/10 rounded-xl border border-[#0B8A6E]/30">
              <h3 className="font-semibold mb-2">12-Month Guarantee</h3>
              <p className="text-gray-400 text-sm">
                $500K in tracked revenue or 100% refund + work free until hit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Investment</h2>
            <p className="text-xl text-gray-400">
              Less than the cost of one bad month
            </p>
          </div>

          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">
                $7,500
                <span className="text-xl text-gray-500 font-normal">
                  {' '}
                  setup
                </span>
              </div>
              <div className="text-2xl text-gray-400">+ $1,500/month</div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                'Complete DOMINATE LOCAL System setup',
                'All 7 phases implemented',
                'Dedicated account strategist',
                'Weekly optimization calls',
                'Monthly performance reports',
                'Unlimited support (business hours)',
                '$500K Revenue Guarantee',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#06D6A0] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#0B8A6E]/10 rounded-xl border border-[#0B8A6E]/30 mb-8">
              <p className="text-center text-sm text-gray-400">
                <span className="text-[#06D6A0] font-semibold">
                  ROI Example:
                </span>{' '}
                One $10K job per month covers your entire investment. Most
                clients see 10-30x ROI within 90 days.
              </p>
            </div>

            <a
              href="#apply"
              className="block w-full py-4 text-center bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Apply Now — Only 4 Spots Available
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="apply" className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">
              Dominate Your Local Market?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            Applications are reviewed within 24 hours. If we're a fit, you'll
            receive a detailed audit of your current market position and a
            roadmap to $500K+ in new revenue.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            <span className="text-red-400 font-semibold">
              Only 2 spots remaining this month
            </span>
          </div>

          <a
            href="mailto:hello@niceright.co?subject=Contractor Growth Application"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white text-lg font-semibold rounded-xl hover:scale-105 transition-transform"
          >
            Apply for the DOMINATE LOCAL System →
          </a>

          <p className="mt-6 text-sm text-gray-500">
            Questions? Email hello@niceright.co or text (555) 123-4567
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 Nice Right. Chicago's Northwest Side.</p>
          <p className="mt-2">
            Guarantees subject to qualification and contract terms.
          </p>
        </div>
      </footer>
    </div>
  );
}
