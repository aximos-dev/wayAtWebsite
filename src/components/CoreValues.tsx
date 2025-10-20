import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Eye, Heart, Lightbulb, Users, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Shield, title: 'Safety First', description: 'Every decision prioritizes child safety and security.' },
  { icon: Eye, title: 'Transparency', description: 'Open communication and clear information at every step.' },
  { icon: Heart, title: 'Trust', description: 'Building lasting relationships through verified connections.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Leveraging technology for smarter transportation solutions.' },
  { icon: Users, title: 'Community', description: 'Creating a supportive network of parents and drivers.' },
  { icon: CheckCircle, title: 'Reliability', description: 'Consistent, dependable service you can count on.' },
];

export default function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

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

    if (valuesRef.current) {
      const valueElements = valuesRef.current.children;
      gsap.fromTo(
        valueElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E] overflow-hidden"
      style={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD500] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFD500] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Our Core Values
        </h2>

        <div ref={valuesRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group flex items-start gap-6 p-8 bg-[#2A2A2A]/50 backdrop-blur-sm rounded-2xl border border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 hover:bg-[#2A2A2A]"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#FFD500] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-[#0E0E0E]" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
