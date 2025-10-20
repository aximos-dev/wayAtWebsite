import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Finally, peace of mind every morning. I can track my daughter's bus in real-time and know she's safe.",
    author: 'Anita Sharma',
    role: 'Parent',
  },
  {
    quote: 'Effortless management for 20+ routes. The dashboard makes everything so simple.',
    author: 'Rajesh Kumar',
    role: 'School Admin',
  },
  {
    quote: "Safety alerts really work. Parents appreciate the transparency and I feel more professional.",
    author: 'Meera Patel',
    role: 'Driver',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { x: (i) => (i === 0 ? -100 : i === 1 ? 0 : 100), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    const busses = sectionRef.current?.querySelectorAll('.bus-silhouette');
    if (busses) {
      busses.forEach((bus, i) => {
        gsap.to(bus, {
          x: i % 2 === 0 ? 50 : -50,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-[#FFD500] to-[#FFA500] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="bus-silhouette absolute top-20 left-10 text-9xl">🚌</div>
        <div className="bus-silhouette absolute bottom-20 right-10 text-9xl">🚌</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-[#0E0E0E] text-center mb-16"
        >
          What People Say
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 bg-[#0E0E0E] rounded-2xl hover:scale-105 transition-all duration-300 hover:glow-yellow"
            >
              <Quote className="w-12 h-12 text-[#FFD500] mb-6" />

              <p className="text-white text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-[#FFD500]/20 pt-6">
                <p className="text-[#FFD500] font-bold text-lg">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
