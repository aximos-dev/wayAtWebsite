import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-32 bg-[#1A1A1A]"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-12"
        >
          Our Journey
        </h2>

        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Founded by <span className="text-[#FFD500] font-semibold">Vikas & Rohi</span>, WayAt was
            born out of personal challenges finding safe, reliable transportation for children.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Their goal: create a community-driven, transparent system that ensures every parent's peace of mind.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group p-8 bg-[#2A2A2A] rounded-2xl border-2 border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 text-center hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#FFD500] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-10 h-10 text-[#0E0E0E]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To revolutionize school transportation through verified, transparent, and reliable driver-parent connections.
            </p>
          </div>

          <div className="group p-8 bg-[#2A2A2A] rounded-2xl border-2 border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 text-center hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#FFD500] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-10 h-10 text-[#0E0E0E]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              A world where every child's school commute is safe, traceable, and trustworthy.
            </p>
          </div>

          <div className="group p-8 bg-[#2A2A2A] rounded-2xl border-2 border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 text-center hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#FFD500] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-10 h-10 text-[#0E0E0E]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
            <p className="text-gray-400 leading-relaxed">
              Building trust through shared experiences and collective commitment to child safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
