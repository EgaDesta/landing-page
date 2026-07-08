"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

gsap.registerPlugin(ScrollTrigger);

interface Props { tier: DeviceTier }

const services = [
  { num: "01", title: "Web Development", desc: "High-performance web applications built with modern architectures. From server-rendered Next.js to real-time WebSocket systems." },
  { num: "02", title: "UI/UX Design", desc: "Minimalist, intentional interfaces that prioritize user experience and accessibility at every breakpoint." },
  { num: "03", title: "Technical Strategy", desc: "System architecture and technical planning for scalable products. Microservices, monorepos, and deployment automation." },
  { num: "04", title: "Motion Design", desc: "Scroll-driven narratives, micro-interactions, and cinematic transitions using GSAP and WebGL." },
];

export default function ServicesSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced || isLow) return;
    const ctx = gsap.context(() => {
      const panels = sectionRef.current?.querySelectorAll(".service-panel");
      if (!panels?.length || !trackRef.current) return;
      const total = panels.length;

      // horizontal scroll-jack
      gsap.to(trackRef.current, {
        xPercent: -100 * (total - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total * 100}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // progress indicator
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${total * 100}%`,
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isLow]);

  return (
    <section id="services" ref={sectionRef} className="relative h-screen bg-black font-mono overflow-hidden">
      {/* progress bar */}
      <div className="absolute left-0 top-0 z-50 h-[2px] w-full bg-white/10">
        <div ref={progressRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>

      <div ref={trackRef} className="flex h-full" style={{ width: `${services.length * 100}%` }}>
        {services.map((s, i) => (
          <div
            key={s.num}
            id={`service-${i}`}
            className="service-panel relative flex h-full flex-col justify-center px-16"
            style={{ width: `${100 / services.length}%` }}
          >
            {/* giant index */}
            <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 font-mono text-[clamp(8rem,20vw,20rem)] font-bold leading-none text-white/5 select-none">
              {s.num}
            </span>
            <div className="relative z-10 max-w-lg">
              <span className="mb-2 block text-[10px] tracking-[0.3em] text-accent uppercase">// Service</span>
              <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">{s.title}</h2>
              <p className="mt-6 text-sm leading-relaxed text-white/50">{s.desc}</p>
            </div>
            {/* decorative corner brackets */}
            <div className="corner-brackets absolute inset-x-8 inset-y-12 z-0 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* step indicators */}
      <div className="absolute bottom-12 left-1/2 z-50 flex -translate-x-1/2 gap-3">
        {services.map((_, i) => (
          <a
            key={i}
            href={`#service-${i}`}
            className="block h-2 w-2 rounded-full border border-white/20 transition-colors hover:border-accent"
          />
        ))}
      </div>
    </section>
  );
}
