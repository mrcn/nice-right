import Navigation from './new-site/sections/Navigation';
import Hero from './new-site/sections/Hero';
import Problem from './new-site/sections/Problem';
import HowItWorks from './new-site/sections/HowItWorks';
import Services from './new-site/sections/Services';
import Results from './new-site/sections/Results';
import Testimonials from './new-site/sections/Testimonials';
import Pricing from './new-site/sections/Pricing';
import About from './new-site/sections/About';
import Contact from './new-site/sections/Contact';
import Footer from './new-site/sections/Footer';

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
