'use client';

import './page.css';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { HowItWorks } from './components/HowItWorks';
import { Services } from './components/Services';
import { Proof } from './components/Proof';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function V9Page() {
  return (
    <div className="v9">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <ServicesCarousel />
        <HowItWorks />
        <Services />
        <Proof />
        <Testimonials />
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
