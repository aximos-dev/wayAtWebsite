import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Search, Bell } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Download,
    number: "01",
    title: "Download & Register",
    description: "Add child's school details.",
  },
  {
    icon: Search,
    number: "02",
    title: "Book",
    description: "Choose verified drivers by rating & route.",
  },
  {
    icon: Bell,
    number: "03",
    title: "Track & Communicate",
    description: "Monitor live location and receive notifications.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

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
            start: "top 80%",
          },
        }
      );
    }

    if (stepsRef.current) {
      const stepElements = stepsRef.current.children;
      gsap.fromTo(
        stepElements,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
          },
        }
      );
    }

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 0.8,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A]"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-20"
        >
          Simple 3-Step Process
        </h2>

        <div className="relative max-w-5xl mx-auto">
          <svg
            className="absolute top-16 left-0 w-full h-2 hidden lg:block"
            style={{ zIndex: 0 }}
          >
            <line
              ref={lineRef}
              x1="16.66%"
              y1="0"
              x2="83.33%"
              y2="0"
              stroke="#FFD500"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>

          <div
            ref={stepsRef}
            className="grid md:grid-cols-3 gap-12 relative z-10"
          >
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#FFD500] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-yellow">
                      <step.icon className="w-16 h-16 text-[#0E0E0E]" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#0E0E0E] border-4 border-[#FFD500] rounded-full flex items-center justify-center font-bold text-[#FFD500] text-xl">
                      {step.number}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
