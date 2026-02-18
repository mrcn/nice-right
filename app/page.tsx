import './v2/page.css'
import { ScrollReveal } from './v2/components/ScrollReveal'
import { BottomNav } from './v2/components/BottomNav'
import { Nav } from './v6/components/Nav'
import { Hero } from './v6/components/Hero'
import { HowItWorks } from './v6/components/HowItWorks'
import { Services } from './v6/components/Services'
import { Proof } from './v6/components/Proof'
import { Testimonials } from './v6/components/Testimonials'
import { FAQ } from './v6/components/FAQ'
import { ContactSection } from './v6/components/ContactSection'
import { Footer } from './v6/components/Footer'

export default function V6Page() {
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
      </div>
    </ScrollReveal>
  )
}
