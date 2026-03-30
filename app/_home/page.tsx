'use client';

import './page.css';
import { useScrollDepth } from '@/app/hooks/useScrollDepth';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { Services } from './components/Services';
import { Proof } from './components/Proof';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function V9Page() {
  useScrollDepth();
  return (
    <div className="v9">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <ServicesCarousel />
        <Services />
        <Proof />
        <Testimonials />
        <Pricing />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
