import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  MapPin,
  Camera,
  Calendar,
  DollarSign,
  MessageCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: "Verified Drivers",
    description: "Background checks, document validation, regular training.",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Live GPS, route transparency, arrival alerts.",
  },
  {
    icon: Camera,
    title: "Complete Safety",
    description: "AI-powered dashcams, SOS system, driver monitoring.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "One-time or recurring bookings, vacation holds.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear billing, affordable packages.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "In-app messaging, privacy-protected.",
  },
];

export default function WhyWayAt() {
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
            start: "top 80%",
          },
        }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 bg-[#0E0E0E] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD500] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD500] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Why Parents Choose WayAt
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-[#2A2A2A] rounded-2xl border border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 hover:glow-yellow cursor-pointer hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#FFD500] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-[#0E0E0E]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
