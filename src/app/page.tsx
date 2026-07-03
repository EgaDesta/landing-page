"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const asciiArt = `
  :::       :::  ::::::::::  ::::::::::  :::    :::
  :+:       :+:  :+:         :+:         :+:   :+:
  +:+       +:+  +:+         +:+         +:+  +:+
  +#+  +:+  +#+  +#++:++#    +#++:++#    +#++:++
  +#+ +#+#+ +#+  +#+         +#+         +#+  +#+
   #+#+# #+#+#   #+#         #+#         #+#   #+#
    ###   ###    ##########  ##########  ###    ###
`.trim();

export default function Home() {
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const darkPanelRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(darkPanelRef.current, {
        width: "100%",
        ease: "power2.inOut",
      }, 0);

      tl.to(leftContentRef.current, {
        opacity: 0,
        x: -40,
        ease: "power2.in",
      }, 0);

      tl.fromTo(rightContentRef.current, {
        opacity: 0, x: 40,
      }, {
        opacity: 1, x: 0,
        ease: "power2.out",
      }, 0.2);

      tl.to(navRef.current, { opacity: 0, y: -30, ease: "power2.inOut" }, 0);
      tl.to(dividerRef.current, { opacity: 0, ease: "power2.inOut" }, 0);
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* NAV */}
      <div ref={navRef} className="fixed left-0 right-0 top-0 z-50 px-margin-desktop py-6">
        <div className="mx-auto flex max-w-container-max items-center justify-between">
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            vinxxo
          </span>
          <div className="flex items-center gap-6">
            <a href="#work" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">Work</a>
            <a href="#about" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">About</a>
            <a href="#contact" className="rounded border border-primary px-5 py-1.5 font-mono text-xs tracking-widest text-primary uppercase hover:bg-primary hover:text-surface transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* PINNED SPLIT SCREEN */}
      <div ref={pinRef} className="relative h-screen">
        <div ref={heroRef} className="ascii-bg relative h-screen w-full overflow-hidden bg-surface">

          {/* LIGHT SIDE */}
          <div ref={leftContentRef} className="relative z-10 flex h-full flex-col justify-center px-16">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-widest text-on-surface-variant uppercase">Creative Technologist</span>
            </div>

            <h1 className="max-w-xl font-display text-7xl font-bold leading-[0.95] tracking-tighter text-primary">
              Engineering
              <br />
              <span className="text-on-surface-variant/40">the Digital</span>
              <br />
              Future
            </h1>

            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-on-surface-variant">
              Creating high-performance web experiences with precision
              and minimalist aesthetics.
              <span className="cursor-blink" />
            </p>

            <div className="mt-10 flex gap-4">
              <a href="#work" className="rounded bg-primary px-7 py-3 font-mono text-xs tracking-widest text-surface uppercase transition-all hover:opacity-90">
                View My Work
              </a>
              <a href="#contact" className="rounded border border-primary/40 px-7 py-3 font-mono text-xs tracking-widest text-primary uppercase transition-colors hover:border-primary hover:bg-primary hover:text-surface">
                Get in Touch
              </a>
            </div>

            {/* ASCII art decoration */}
            <pre className="mt-16 font-mono text-[6px] leading-[1.1] text-on-surface-variant/20 select-none">
              {asciiArt}
            </pre>
          </div>

          {/* DARK ROTATING PANEL */}
          <div
            ref={darkPanelRef}
            className="ascii-dark-bg absolute right-0 top-0 z-20 h-full w-1/2 origin-left overflow-hidden bg-black"
          >
            {/* Corner brackets */}
            <div className="corner-brackets absolute inset-0 z-20" />

            <div ref={rightContentRef} className="relative z-10 flex h-full flex-col justify-center px-16 text-white">
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Featured Work</span>
              </div>

              <h2 className="max-w-md font-display text-4xl font-semibold leading-tight text-white">
                Every pixel tells a story.
                <br />
                Every interaction is intentional.
              </h2>

              <div className="mt-10 flex gap-12">
                <div>
                  <span className="font-display text-5xl font-bold text-white">5+</span>
                  <p className="mt-1 font-mono text-xs text-white/40">Years Exp.</p>
                </div>
                <div>
                  <span className="font-display text-5xl font-bold text-white">50+</span>
                  <p className="mt-1 font-mono text-xs text-white/40">Projects</p>
                </div>
                <div>
                  <span className="font-display text-5xl font-bold text-white">30+</span>
                  <p className="mt-1 font-mono text-xs text-white/40">Clients</p>
                </div>
              </div>

              {/* Terminal-style status bar */}
              <div className="mt-16 flex items-center gap-4 border-t border-white/10 pt-4 font-mono text-xs text-white/25">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  system ready
                </span>
                <span>|</span>
                <span>v2.4.1</span>
                <span>|</span>
                <span>connected</span>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div ref={dividerRef} className="split-divider" />
        </div>
      </div>

      {/* DARK SERVICES SECTION */}
      <section id="work" className="ascii-dark-bg relative flex min-h-screen flex-col items-center justify-center bg-black px-6">
        <div className="relative z-10 max-w-5xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Core Disciplines</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Precision in every
            <br />
            layer of the stack
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.number}
                className="corner-brackets group rounded border border-white/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.07]"
              >
                <span className="font-mono text-sm text-white/20">// {svc.number}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{svc.title}</h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-white/50">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ascii-dark-bg relative flex min-h-[30vh] items-center justify-center bg-black px-6">
        <div className="relative z-10 text-center">
          <span className="font-display text-3xl font-bold tracking-tighter text-white">vinxxo</span>
          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest text-white/30 uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Creative Technologist
          </div>
          <pre className="mt-10 font-mono text-[6px] leading-[1.1] text-white/10 select-none">
            {asciiArt}
          </pre>
        </div>
      </footer>
    </>
  );
}
