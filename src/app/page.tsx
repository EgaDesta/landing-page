"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years\nExperience" },
  { value: "50+", label: "Projects\nDelivered" },
  { value: "30+", label: "Happy\nClients" },
];

const services = [
  {
    number: "01",
    title: "Web Development",
    desc: "High-performance web applications built with modern architectures.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    desc: "Minimalist, intentional interfaces that prioritize user experience.",
  },
  {
    number: "03",
    title: "Technical Strategy",
    desc: "System architecture and technical planning for scalable products.",
  },
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: false,
        },
      });

      tl.to(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "power2.inOut",
        duration: 1,
      });

      tl.to(
        heroContentRef.current,
        { opacity: 0, y: -50, duration: 0.5 },
        "-=0.5"
      );

      tl.to(
        statsRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

      tl.to(darkSectionRef.current, {
        backgroundColor: "#000000",
        duration: 1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={mainRef} className="relative">
        {/* HERO SECTION */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface px-6">
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />
          <div
            ref={curtainRef}
            className="pattern-lines pointer-events-none absolute inset-0 origin-top scale-y-0"
          />
          <div ref={heroContentRef} className="relative z-10 max-w-3xl text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-on-surface-variant uppercase">
              Creative Technologist
            </span>
            <h1 className="mt-6 font-display text-6xl font-bold leading-none tracking-tighter text-primary md:text-8xl">
              Engineering
              <br />
              the Digital
              <br />
              Future
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Creating high-performance web experiences with precision
              and minimalist aesthetics.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#work"
                className="rounded-lg bg-primary px-8 py-3 font-medium text-surface transition-all hover:opacity-90"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-primary px-8 py-3 font-medium text-primary transition-all hover:bg-primary hover:text-surface"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* STATS */}
          <div
            ref={statsRef}
            className="relative z-10 mt-24 grid w-full max-w-2xl grid-cols-3 gap-8 border-t border-outline/20 pt-12 opacity-0 translate-y-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-display text-4xl font-bold text-primary">
                  {s.value}
                </span>
                <p className="mt-1 font-mono text-xs text-on-surface-variant whitespace-pre-line">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DARK SECTION */}
        <section
          ref={darkSectionRef}
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-900 px-6"
        >
          <div className="pattern-lines pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative z-10 max-w-5xl">
            <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
              Core Disciplines
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              Precision in every
              <br />
              layer of the stack
            </h2>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {services.map((svc) => (
                <div
                  key={svc.number}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <span className="font-mono text-sm text-white/30">{svc.number}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">
                    {svc.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex min-h-[30vh] items-center justify-center bg-black px-6">
          <div className="text-center">
            <span className="font-display text-3xl font-bold tracking-tighter text-white">
              vinxxo
            </span>
            <p className="mt-4 font-mono text-xs tracking-widest text-white/30 uppercase">
              Creative Technologist
            </p>
            <p className="mt-8 font-mono text-xs text-white/20">
              &copy; {new Date().getFullYear()} vinxxo. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
