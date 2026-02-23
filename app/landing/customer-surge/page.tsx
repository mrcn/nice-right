'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CustomerSurgeLanding() {
  const heroRef = useRef(null);

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
            <span className="text-[#06D6A0] text-sm font-medium">6 Spots Per Quarter — Q2 Waitlist Now Open</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            We Deliver 100 New Paying Customers <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">to</span> <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">Your</span> Local Business in 90 Days
          </h1>

          <p className="text-xl text-gray-400 mb-4">Using Our CUSTOMER MAGNET Protocol — Or You Do Not Pay a Penny</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Claim Your Spot — 6 Per Quarter Max
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">
              The <span className="text-red-400">Problem</span> You Are Facing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Reliance on Walk-Ins</h3>
              <p className="text-gray-400">Waiting for customers to find you is like waiting for rain in a drought.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Brutal Seasonality</h3>
              <p className="text-gray-400">One slow month and you are dipping into savings. Staff is idle.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Discount Dependence</h3>
              <p className="text-gray-400">Competing on price with Groupon. Training customers to wait for sales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MECHANISM SECTION */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">
              Our <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">Proven System</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
            {
              num: '01',
              title: 'Customer Acquisition Engine',
              desc: 'Description for Customer Acquisition Engine phase goes here.',
            },
            {
              num: '02',
              title: 'Irresistible Offer Architecture',
              desc: 'Description for Irresistible Offer Architecture phase goes here.',
            },
            {
              num: '03',
              title: 'Social Proof Amplification',
              desc: 'Description for Social Proof Amplification phase goes here.',
            },
            {
              num: '04',
              title: 'Automated Follow-Up',
              desc: 'Description for Automated Follow-Up phase goes here.',
            },
            {
              num: '05',
              title: 'Referral Multiplication',
              desc: 'Description for Referral Multiplication phase goes here.',
            },
            {
              num: '06',
              title: 'Retention & Ascension',
              desc: 'Description for Retention & Ascension phase goes here.',
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

      {/* GUARANTEE SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B8A6E]/10 to-transparent section-reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">
            100 New Paying Customers in 90 Days <span className="text-[#06D6A0]">Or Full Refund + $500 Cash</span>
          </h2>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Investment</h2>
          </div>

          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 text-center">
            <div className="text-5xl font-bold mb-2">$4,500</div>
            <div className="text-xl text-gray-400 mb-8">+ $1,200/month</div>

            <a
              href="#apply"
              className="block w-full py-4 text-center bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="apply" className="py-24 px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">
            Ready to <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">Get Started?</span>
          </h2>

          <a
            href="mailto:hello@niceright.co?subject=customer-surge Application"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white text-lg font-semibold rounded-xl hover:scale-105 transition-transform"
          >
            Apply Now →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 Nice Right. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
