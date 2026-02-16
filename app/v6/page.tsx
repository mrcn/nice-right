import '../v2/page.css'
import { ScrollReveal } from '../v2/components/ScrollReveal'
import { BottomNav } from '../v2/components/BottomNav'
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
        <VariantSwitcher />
      </div>
    </ScrollReveal>
  )
}
