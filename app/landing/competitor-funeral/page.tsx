'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CompetitorFuneralLanding() {
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
    <div className="min-h-screen bg-[#0a0f0d] text-white">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B8A6E]/10 border border-[#06D6A0]/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#06D6A0] rounded-full animate-pulse"></span>
            <span className="text-[#06D6A0] text-sm font-medium">One Client Per Category Per Metro</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            Name Your Competitor. In 90 Days, They <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">Will</span> <span className="bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] bg-clip-text text-transparent">Wish</span> They Had Never Heard of You.
          </h1>

          <p className="text-xl text-gray-400 mb-4">Become the Undisputed #1 in Your Local Market</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0B8A6E] to-[#06D6A0] text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Apply for Category Exclusivity
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
              <h3 className="text-xl font-semibold mb-3">Commodity Market</h3>
              <p className="text-gray-400">You look like everyone else. Customers cannot tell the difference so they choose on price.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Price Wars</h3>
              <p className="text-gray-400">Competitors undercut you. Margins shrink while acquisition costs rise.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Invisible to Customers</h3>
              <p className="text-gray-400">You are page 3 of Google. No authority, no presence, no trust.</p>
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
              title: 'Market Positioning',
              desc: 'Description for Market Positioning phase goes here.',
            },
            {
              num: '02',
              title: 'Competitive Intelligence',
              desc: 'Description for Competitive Intelligence phase goes here.',
            },
            {
              num: '03',
              title: 'Category Domination',
              desc: 'Description for Category Domination phase goes here.',
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
            Category #1 Position <span className="text-[#06D6A0]">Or Full Refund</span>
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
            <div className="text-5xl font-bold mb-2">Custom</div>
            <div className="text-xl text-gray-400 mb-8">Application only</div>

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
            href="mailto:hello@niceright.co?subject=competitor-funeral Application"
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
