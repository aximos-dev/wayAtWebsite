import Header from './components/Header';
import Hero from './components/Hero';
import WhatIsWayAt from './components/WhatIsWayAt';
import WhyWayAt from './components/WhyWayAt';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import Story from './components/Story';
import CoreValues from './components/CoreValues';
import CoreFeatures from './components/CoreFeatures';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Header />
      <Hero />
      <WhatIsWayAt />
      <WhyWayAt />
      <HowItWorks />
      <Comparison />
      <Story />
      <CoreValues />
      <CoreFeatures />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
