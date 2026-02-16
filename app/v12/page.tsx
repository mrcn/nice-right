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

export default function V12Page() {
  return (
    <div className="v12">
      <a href="#main-content" className="v12-skip-link">
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
