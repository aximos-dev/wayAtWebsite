import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsWayAt() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

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

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
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
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-[#FFD500] to-[#FFA500] overflow-hidden"
      style={{ backgroundPosition: '50% 0%' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0E0E0E] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0E0E0E] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-[#0E0E0E] mb-8"
          >
            Revolutionizing School Transportation
          </h2>

          <p
            ref={contentRef}
            className="text-lg md:text-xl text-[#0E0E0E] leading-relaxed"
          >
            WayAt is a trusted platform that connects working parents with verified, professional drivers
            for safe and reliable school transportation. We understand the challenges parents face in finding
            trustworthy transport options for their children. Our mission is to make every school journey a
            safe, transparent, and worry-free experience.
          </p>
        </div>
      </div>
    </section>
  );
}
