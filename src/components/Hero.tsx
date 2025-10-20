import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    if (busRef.current) {
      tl.fromTo(
        busRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        0.5
      );
    }

    if (headlineRef.current) {
      const text = headlineRef.current.textContent || "";
      const chars = text.split("");
      headlineRef.current.innerHTML = chars
        .map(
          (char) =>
            `<span style="display:inline-block;opacity:0">${
              char === " " ? "&nbsp;" : char === "\n" ? "<br/>" : char
            }</span>`
        )
        .join("");

      tl.to(
        headlineRef.current.children,
        {
          opacity: 1,
          duration: 0.03,
          stagger: 0.03,
          ease: "power2.out",
        },
        1
      );
    }

    if (subheadRef.current) {
      tl.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        1.5
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        2
      );
    }

    const particles = heroRef.current?.querySelectorAll(".particle");
    if (particles) {
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          opacity: "random(0.2, 0.8)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0E0E0E]"
    >
      {/* Lottie Animation Background - Positioned at bottom */}
      <div
        className={`absolute left-0 w-full h-full z-0 ${
          isMobile ? "top-96 bottom-0" : "xl:top-44 bottom-0"
        }`}
      >
        <DotLottieReact
          src={
            isMobile
              ? "https://lottie.host/93e08466-c973-40ec-a441-8acbf46ba638/WhMgnwKfMh.lottie"
              : "https://lottie.host/1b9a29e7-ef07-467b-9297-54d3312bfaf3/clH1AbUi2t.lottie"
          }
          loop
          autoplay
          className={`w-full h-full opacity-60 ${
            isMobile
              ? "object-cover object-bottom"
              : "xl:object-cover xl:object-bottom object-cover"
          }`}
        />
      </div>

      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0E0E0E]/40 to-[#0E0E0E]/90 z-1" />

      <div className="absolute inset-0 opacity-30 z-2">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#FFD500] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-shadow-glow"
          >
            School Transportation Reinvented
          </h1>

          <p
            ref={subheadRef}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            WayAt connects parents, drivers, and schools for real-time tracking,
            attendance, and safety alerts.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-[#FFD500] text-[#0E0E0E] text-lg font-bold rounded-lg hover:glow-yellow-intense transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-[#0E0E0E] transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
