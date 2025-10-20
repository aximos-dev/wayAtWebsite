import { useEffect, useRef, useState } from 'react';
import { Menu, X, Bus } from 'lucide-react';
import { gsap } from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0E0E0E] shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Bus className="w-8 h-8 text-[#FFD500]" />
            <span className="text-2xl font-bold text-white">WayAt</span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#FFD500] transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('features')} className="text-white hover:text-[#FFD500] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-[#FFD500] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-white hover:text-[#FFD500] transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-[#FFD500] transition-colors">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-6 py-2 bg-[#FFD500] text-[#0E0E0E] font-semibold rounded-lg hover:glow-yellow-intense transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white hover:text-[#FFD500] transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-white hover:text-[#FFD500] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-white hover:text-[#FFD500] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-white hover:text-[#FFD500] transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white hover:text-[#FFD500] transition-colors">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full px-6 py-2 bg-[#FFD500] text-[#0E0E0E] font-semibold rounded-lg"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
