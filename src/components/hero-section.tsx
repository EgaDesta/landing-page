"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import MagneticButton from "./magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

interface Props { tier: DeviceTier }

export default function HeroSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // title per-character clip reveal
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.fromTo(chars, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 2,
          },
        });
      }

      // divider idle motion
      if (dividerRef.current && !isLow) {
        gsap.to(dividerRef.current, {
          x: "+=2",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // nav hide on scroll down
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300",
        onUpdate: (self) => {
          if (!navRef.current) return;
          gsap.set(navRef.current, { opacity: 1 - self.progress * 2 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isLow]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen overflow-hidden bg-surface font-mono">
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 px-16 py-6"
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

      {/* LEFT — white */}
      <div ref={leftRef} className="absolute inset-0 z-10 flex flex-col justify-center bg-surface px-16 pr-[52%]">
        <h1 ref={titleRef} className="overflow-hidden font-mono text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.85] tracking-tighter text-black">
          {"vinxxo".split("").map((ch, i) => (
            <span key={i} className="char inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p className="mt-4 max-w-md text-xs leading-relaxed text-black/40">
          Creative technologist engineering high-performance digital experiences
          at the intersection of design and code.
        </p>
        <div className="mt-10 flex gap-4">
          <MagneticButton
            href="#contact"
            className="rounded-none border-2 border-black bg-black px-8 py-3 text-[10px] tracking-[0.25em] text-white uppercase transition-all hover:bg-white hover:text-black"
          >
            Contact
          </MagneticButton>
          <MagneticButton
            href="#portfolio"
            className="rounded-none border-2 border-black px-8 py-3 text-[10px] tracking-[0.25em] text-black uppercase transition-all hover:bg-black hover:text-white"
          >
            Portfolio
          </MagneticButton>
        </div>
      </div>

      {/* RIGHT — black */}
      <div ref={rightRef} className="absolute right-0 top-0 z-20 h-full w-1/2 bg-black">
        <div className="flex h-full flex-col justify-center px-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">Featured Work</span>
          </div>
          <div className="space-y-8">
            {["Every pixel tells a story.", "Every interaction intentional."].map((t, i) => (
              <p key={i} className="font-mono text-2xl font-semibold leading-tight text-white md:text-3xl">
                {t}
              </p>
            ))}
          </div>
          <div className="mt-12 flex gap-10">
            {[{ n: "5+", l: "Years Exp." }, { n: "50+", l: "Projects" }, { n: "30+", l: "Clients" }].map((s) => (
              <div key={s.l}>
                <span className="font-mono text-4xl font-bold text-white">{s.n}</span>
                <p className="mt-1 text-[10px] text-white/30 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div ref={dividerRef} className="absolute left-1/2 top-0 z-30 h-full w-[1px] -translate-x-1/2 bg-black/20" />
    </section>
  );
}
