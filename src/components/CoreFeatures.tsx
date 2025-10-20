import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  MapPin,
  Bell,
  MessageSquare,
  Calendar,
  Users,
  Star,
  School,
  Share2,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Driver Network",
    description: "Comprehensive background checks and certification",
  },
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description: "Live location monitoring and route visibility",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Instant alerts for pickups, drops, and delays",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Easy booking and schedule management",
  },
  {
    icon: Users,
    title: "Parent's Peace of Mind",
    description: "Parents can trust driver reliability",
  },
  {
    icon: Star,
    title: "Rating & Review System",
    description: "Community-driven driver ratings",
  },
  {
    icon: Share2,
    title: "Ride Sharing (Pooling)",
    description: "Cost-effective shared transportation",
  },
  {
    icon: FileText,
    title: "Safety of Child",
    description: "Child Safety protocols",
  },
];

export default function CoreFeatures() {
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
          duration: 0.4,
          stagger: 0.08,
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
      id="core-features"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#FFD500] to-[#FFA500]"
    >
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#0E0E0E] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-[#0E0E0E] text-center mb-16"
        >
          What Makes WayAt Unique
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-[#0E0E0E] rounded-2xl hover:bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-2 hover:glow-yellow cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#FFD500] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#0E0E0E]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
