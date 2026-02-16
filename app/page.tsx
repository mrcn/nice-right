import type { Metadata } from 'next'
import './v2/page.css'
import { ScrollReveal } from './v2/components/ScrollReveal'
import { BottomNav } from './v2/components/BottomNav'
import { VariantSwitcher } from './components/VariantSwitcher'
import { Nav } from './v6/components/Nav'
import { Hero } from './v6/components/Hero'
import { HowItWorks } from './v6/components/HowItWorks'
import { Services } from './v6/components/Services'
import { Proof } from './v6/components/Proof'
import { Testimonials } from './v6/components/Testimonials'
import { FAQ } from './v6/components/FAQ'
import { ContactSection } from './v6/components/ContactSection'
import { Footer } from './v6/components/Footer'

export const metadata: Metadata = {
  title: 'Nice Right | Websites That Bring In Customers',
  description:
    'I help small businesses get found online, win more customers, and keep them coming back. 100+ projects. 13+ years. Chicago\'s Northwest Side.',
}

export default function Home() {
  return (
    <ScrollReveal>
      <div className="v2">
        <a href="#main-content" className="v2-skip-link">
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
        <BottomNav />
        <VariantSwitcher />
      </div>
    </ScrollReveal>
  )
}
