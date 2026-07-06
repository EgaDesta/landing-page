"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

gsap.registerPlugin(ScrollTrigger);

interface Props { tier: DeviceTier }

export default function HeroSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Title per-character clip-path wipe
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.fromTo(chars,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            stagger: 0.08,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 10%",
              scrub: 2,
            },
          }
        );
      }

      // Title 3D rotation on scroll
      if (titleWrapRef.current) {
        gsap.fromTo(titleWrapRef.current,
          { rotationX: 20, y: 30 },
          {
            rotationX: 0,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: 1.5,
            },
          }
        );
      }

      // Divider idle motion
      if (dividerRef.current && !isLow) {
        gsap.to(dividerRef.current, {
          x: "+=1.5",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Nav fade
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250",
        onUpdate: (self) => {
          if (!navRef.current) return;
          gsap.set(navRef.current, { opacity: 1 - self.progress * 2 });
        },
      });

      // Left content subtle parallax
      if (leftRef.current) {
        gsap.fromTo(leftRef.current.querySelector(".left-content"),
          { y: 0 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isLow]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen overflow-hidden bg-white font-mono">
      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 px-12 py-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-sm font-bold tracking-tight text-black">vinxxo</span>
          <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] text-black/50 uppercase">
            {["About", "Services", "Portfolio", "Timeline", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-black transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* LEFT — white half */}
      <div ref={leftRef} className="absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden bg-white">
        <div className="left-content flex h-full flex-col items-center justify-center px-16">
          <div className="mb-4 flex items-center gap-2 self-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            <span className="text-[10px] tracking-[0.25em] text-black/40 uppercase">Creative Technologist</span>
          </div>

          <p className="mt-4 max-w-xs self-start text-xs leading-relaxed text-black/40">
            High-performance web experiences at the intersection of design and code.
          </p>

          <div className="mt-10 self-start">
            <MagneticButton
              href="#contact"
              className="rounded-none border-2 border-black bg-black px-8 py-3 text-[10px] tracking-[0.25em] text-white uppercase transition-colors hover:bg-white hover:text-black"
            >
              Contact
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* RIGHT — black half */}
      <div ref={rightRef} className="absolute inset-y-0 right-0 z-10 w-1/2 bg-black">
        <div className="flex h-full flex-col items-center justify-center px-16">
          <div className="mb-6 flex items-center gap-2 self-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">Featured Work</span>
          </div>
          <div className="self-start">
            {["Every pixel tells a story.", "Every interaction intentional."].map((t, i) => (
              <p key={i} className="font-mono text-xl font-semibold leading-tight text-white md:text-2xl">
                {t}
              </p>
            ))}
          </div>
          <div className="mt-10 self-start">
            <MagneticButton
              href="#portfolio"
              className="rounded-none border-2 border-white px-8 py-3 text-[10px] tracking-[0.25em] text-white uppercase transition-colors hover:bg-white hover:text-black"
            >
              Portfolio
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* CENTER TITLE — spanning divider */}
      <div ref={titleWrapRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "800px" }}>
        <h1
          ref={titleRef}
          className="font-mono text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-tighter text-black"
          style={{ transformStyle: "preserve-3d" }}
        >
          {"vinxxo".split("").map((ch, i) => (
            <span key={i} className="char inline-block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      </div>

      {/* DIVIDER */}
      <div ref={dividerRef} className="absolute left-1/2 top-0 z-30 h-full w-[1px] -translate-x-1/2 bg-black/15" />
    </section>
  );
}
