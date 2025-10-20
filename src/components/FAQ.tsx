import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    category: "Pricing",
    question: "Are there any hidden charges?",
    answer:
      "No. All prices are transparent and inclusive. We show the complete breakdown before payment.",
  },
  {
    category: "Pricing",
    question: "Can I change my plan anytime?",
    answer:
      "Yes. You can upgrade or downgrade your plan anytime. Changes take effect from the next billing cycle.",
  },
  {
    category: "Pricing",
    question: "What if I need to pause for a month?",
    answer:
      "You can put your subscription on hold for up to 3 months without any charges.",
  },
  {
    category: "Pricing",
    question: "Is cancellation available?",
    answer:
      "You can cancel your ride before you board the vehicle by clicking on the Cancel Ride button on the app. You might be charged a cancellation fee to compensate the time spent by the driver.",
  },
  {
    category: "About",
    question: "How does referral work?",
    answer:
      'Click on "Refer and earn" in the menu and you will see your referral code. Share this referral code with your friends and when any of your friend registers to the WayAt app using your referral code, he/she gets a credit to use for rides on our platform. When your friend takes his/her first ride, you get a credit for your use.',
  },
  {
    category: "About",
    question: "Is WayAt available in my city?",
    answer: "Currently available in Hyderabad. Expanding to more cities soon.",
  },
  {
    category: "About",
    question: "How do I download the app?",
    answer:
      'Available on iOS App Store and Google Play Store. Search for "WayAt".',
  },
  {
    category: "Safety",
    question: "How are drivers verified?",
    answer:
      "All drivers undergo background checks, police verification, reference checks, and vehicle inspection.",
  },
  {
    category: "Safety",
    question: "What if there's a safety concern?",
    answer:
      "Press the SOS button in the app. We alert parents and support team immediately.",
  },
  {
    category: "Safety",
    question: "Is my child's location data private?",
    answer:
      "Yes. All data is encrypted and accessible only to authorized family members.",
  },
  {
    category: "Pricing",
    question: "What payment methods are accepted?",
    answer: "Credit cards, debit cards, UPI, and digital wallets.",
  },
  {
    category: "Technical",
    question: "The app is not working properly. What should I do?",
    answer: "Contact support via in-app chat or email support@wayat.com.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const faqsPerPage = 3;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);
  const currentFaqs = faqs.slice(
    currentPage * faqsPerPage,
    (currentPage + 1) * faqsPerPage
  );

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (openIndex === null) {
          setCurrentPage((prev) => (prev + 1) % totalPages);
        }
      }, 4000);
    };

    const stopAutoSlide = () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
        autoSlideRef.current = null;
      }
    };

    startAutoSlide();

    return () => stopAutoSlide();
  }, [openIndex, totalPages]);

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

    if (faqsRef.current) {
      const faqItems = faqsRef.current.children;
      gsap.fromTo(
        faqItems,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqsRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  const toggleFAQ = (index: number) => {
    const globalIndex = currentPage * faqsPerPage + index;
    const isOpening = openIndex !== globalIndex;
    const targetAnswer = answerRefs.current[index];

    // Close currently open FAQ if any
    if (openIndex !== null && openIndex !== globalIndex) {
      const currentPageIndex = openIndex % faqsPerPage;
      const currentAnswer = answerRefs.current[currentPageIndex];
      if (currentAnswer) {
        gsap.to(currentAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }

    setOpenIndex(openIndex === globalIndex ? null : globalIndex);

    if (targetAnswer) {
      if (isOpening && openIndex !== globalIndex) {
        gsap.fromTo(
          targetAnswer,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      } else if (!isOpening) {
        gsap.to(targetAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  const goToPage = (page: number) => {
    if (page !== currentPage && faqsRef.current) {
      // Animate out current FAQs
      gsap.to(faqsRef.current.children, {
        x: page > currentPage ? -50 : 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentPage(page);
          setOpenIndex(null);

          // Animate in new FAQs
          gsap.fromTo(
            faqsRef.current!.children,
            { x: page > currentPage ? 50 : -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        },
      });
    }
  };

  const nextPage = () => {
    goToPage((currentPage + 1) % totalPages);
  };

  const prevPage = () => {
    goToPage(currentPage === 0 ? totalPages - 1 : currentPage - 1);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative py-32 bg-[#1A1A1A]">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevPage}
              className="p-3 bg-[#FFD500] text-[#0E0E0E] rounded-full hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-[#FFD500]"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-3 bg-[#FFD500] text-[#0E0E0E] rounded-full hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* FAQ Items */}
          <div ref={faqsRef} className="space-y-4">
            {currentFaqs.map((faq, index) => {
              const globalIndex = currentPage * faqsPerPage + index;
              return (
                <div
                  key={globalIndex}
                  className="bg-[#2A2A2A] rounded-xl border border-[#FFD500]/20 hover:border-[#FFD500] transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#FFD500] text-[#0E0E0E] text-xs font-bold rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      {openIndex === globalIndex ? (
                        <Minus className="w-6 h-6 text-[#FFD500] transition-transform duration-200" />
                      ) : (
                        <Plus className="w-6 h-6 text-[#FFD500] transition-transform duration-200" />
                      )}
                    </div>
                  </button>

                  <div
                    ref={(el) => (answerRefs.current[index] = el)}
                    className="overflow-hidden"
                    style={{
                      height: openIndex === globalIndex ? "auto" : 0,
                      opacity: openIndex === globalIndex ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Page Indicator */}
          <div className="text-center mt-8">
            <span className="text-gray-400">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
