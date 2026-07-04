"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ParticleCanvas from "./particle-canvas";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

interface Props { tier: DeviceTier }

export default function AboutSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // dark panel slides from right to cover screen (morph from hero panel)
      if (panelRef.current) {
        gsap.fromTo(panelRef.current,
          { width: "50vw", right: "0vw" },
          {
            width: "100vw",
            right: "0vw",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: 2,
            },
          }
        );
      }

      // pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        anticipatePin: 1,
      });

      // text appears after panel covers
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top+=60% top",
              end: "+=200",
              scrub: 1.5,
            },
          }
        );
      }

      // stats stagger
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll(".stat-item"),
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.15, ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top+=70% top",
              end: "+=300",
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={sectionRef} className="relative h-screen bg-black font-mono overflow-hidden">
      {/* panel slides from right */}
      <div ref={panelRef} className="absolute right-0 top-0 z-10 h-full bg-black" style={{ width: "50vw" }}>
        <div className="corner-brackets absolute inset-0 z-20" />
      </div>

      <ParticleCanvas sectionRef={sectionRef} reduced={reduced} tier={tier} />

      {/* content */}
      <div className="relative z-30 flex h-screen items-center px-16">
        <div ref={textRef} className="max-w-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">About</span>
          </div>
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Building the
            <br />
            future, one
            <br />
            pixel at a time
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
            Creative technologist with 5+ years engineering high-performance digital
            experiences. My approach blends precision with minimalist design philosophy.
          </p>
          <div ref={statsRef} className="mt-8 flex gap-8">
            {[
              { n: "5+", l: "Years Exp." },
              { n: "50+", l: "Projects" },
              { n: "20+", l: "Clients" },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <span className="font-mono text-3xl font-bold text-white">{s.n}</span>
                <p className="mt-1 text-[10px] text-white/30 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
