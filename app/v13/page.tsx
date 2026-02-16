'use client'

import './page.css'
import { VariantSwitcher } from '../components/VariantSwitcher'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Services } from './components/Services'
import { Proof } from './components/Proof'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export default function V13Page() {
  return (
    <div className="v13">
      {/* Aurora background blobs */}
      <div className="v13-aurora-blob v13-aurora-1" aria-hidden="true" />
      <div className="v13-aurora-blob v13-aurora-2" aria-hidden="true" />
      <div className="v13-aurora-blob v13-aurora-3" aria-hidden="true" />
      <div className="v13-aurora-blob v13-aurora-4" aria-hidden="true" />

      <a href="#main-content" className="v13-skip-link">
        Skip to content
      </a>

      <header>
        <Nav />
      </header>

      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Services />
        <Proof />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>

      <Footer />
      <VariantSwitcher />
    </div>
  )
}
