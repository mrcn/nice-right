import type { Metadata } from 'next'
import '../v2/page.css'
import { ScrollReveal } from '../v2/components/ScrollReveal'
import { BottomNav } from '../v2/components/BottomNav'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { PainSection } from './components/PainSection'
import { About } from './components/About'
import { HowItWorks } from './components/HowItWorks'
import { Services } from './components/Services'
import { Results } from './components/Results'
import { Testimonials } from './components/Testimonials'
import { Pricing } from './components/Pricing'
import { FAQ } from './components/FAQ'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export const metadata: Metadata = {
  title: 'Nice Right | Websites That Bring In Customers for Chicago NW Side Businesses',
  description:
    'I help small businesses on Chicago\'s Northwest Side get found online, win more customers, and keep them coming back. 100+ projects. 13+ years. One senior person, start to finish.',
}

export default function V3Home() {
  return (
    <ScrollReveal>
      <div className="v2">
        <Nav />
        <Hero />
        <PainSection />
        <About />
        <HowItWorks />
        <Services />
        <Results />
        <Testimonials />
        <Pricing />
        <FAQ />
        <ContactSection />
        <Footer />
        <BottomNav />
      </div>
    </ScrollReveal>
  )
}
