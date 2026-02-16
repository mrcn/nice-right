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

export default function V7Page() {
  return (
    <div className="v7">
      <Nav />
      <Hero />
      <HowItWorks />
      <Services />
      <Proof />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
      <VariantSwitcher />
    </div>
  )
}
