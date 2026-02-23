import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import Services from './sections/Services';
import Results from './sections/Results';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <Services />
      <Results />
      <Testimonials />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
