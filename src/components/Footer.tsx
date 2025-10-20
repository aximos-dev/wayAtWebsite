import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bus, Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0E0E0E] border-t-2 border-[#FFD500] py-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="w-8 h-8 text-[#FFD500]" />
              <span className="text-2xl font-bold text-white">WayAt</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Making every school journey safe, transparent, and worry-free.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-[#FFD500] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-[#FFD500] transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-400 hover:text-[#FFD500] transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-400 hover:text-[#FFD500] transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>wayatpvtltd@gmail.com</li>
              <li>+91 80749 25389</li>
              <li>Hyderabad, India</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFD500] hover:text-[#0E0E0E] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFD500] hover:text-[#0E0E0E] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFD500]/20 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} WayAt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
