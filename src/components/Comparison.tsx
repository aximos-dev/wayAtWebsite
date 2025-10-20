import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  { feature: 'Driver Verification', local: false, wayat: true },
  { feature: 'Real-Time Tracking', local: false, wayat: true },
  { feature: 'Emergency Support', local: false, wayat: true },
  { feature: 'Vehicle Inspection', local: false, wayat: true },
  { feature: 'Insurance', local: false, wayat: true },
  { feature: 'Transparent Pricing', local: false, wayat: true },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('.comparison-row');
      gsap.fromTo(
        rows,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="relative py-32 bg-[#0E0E0E] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD500] rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Local Transport vs WayAt
        </h2>

        <div ref={tableRef} className="max-w-4xl mx-auto">
          <div className="bg-[#2A2A2A] rounded-2xl overflow-hidden border border-[#FFD500]/20">
            <div className="grid grid-cols-3 bg-[#FFD500] text-[#0E0E0E] font-bold text-lg">
              <div className="p-6">Feature</div>
              <div className="p-6 text-center border-l border-[#0E0E0E]/20">Local Transport</div>
              <div className="p-6 text-center border-l border-[#0E0E0E]/20">WayAt</div>
            </div>

            {comparisonData.map((item, index) => (
              <div
                key={index}
                className="comparison-row grid grid-cols-3 border-t border-[#FFD500]/10 hover:bg-[#FFD500]/5 transition-colors"
              >
                <div className="p-6 text-white font-medium">{item.feature}</div>
                <div className="p-6 flex justify-center items-center border-l border-[#FFD500]/10">
                  {item.local ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="p-6 flex justify-center items-center border-l border-[#FFD500]/10">
                  {item.wayat ? (
                    <Check className="w-6 h-6 text-[#FFD500]" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
