import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    price: "₹199",
    period: "/month",
    features: [
      "1 Child",
      "Real-Time Tracking",
      "Basic Notifications",
      "In-App Chat",
      "Standard Support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹499",
    period: "/month",
    features: [
      "Unlimited Children",
      "Real-Time Tracking",
      "Advanced Notifications",
      "In-App Chat",
      "Premium Support",
      "Ride History",
      "School Integration",
      "Monthly Reports",
    ],
    highlighted: true,
  },
];

export default function Pricing() {
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
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
      id="pricing"
      ref={sectionRef}
      className="relative py-32 bg-[#0E0E0E] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD500] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD500] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
        >
          Choose Your Plan
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16">
          Transparent pricing with no hidden charges
        </p>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? "bg-[#FFD500] border-4 border-[#FFD500] scale-105"
                  : "bg-[#2A2A2A] border-2 border-[#FFD500]/20 hover:border-[#FFD500]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0E0E0E] text-[#FFD500] px-6 py-2 rounded-full font-bold text-sm border-2 border-[#FFD500]">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    plan.highlighted ? "text-[#0E0E0E]" : "text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlighted ? "text-[#0E0E0E]" : "text-[#FFD500]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-xl ml-2 ${
                      plan.highlighted ? "text-[#0E0E0E]" : "text-gray-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 ${
                        plan.highlighted ? "text-[#0E0E0E]" : "text-[#FFD500]"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-[#0E0E0E]" : "text-gray-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.highlighted
                    ? "bg-[#0E0E0E] text-[#FFD500] hover:bg-[#1A1A1A]"
                    : "bg-[#FFD500] text-[#0E0E0E] hover:glow-yellow-intense"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
