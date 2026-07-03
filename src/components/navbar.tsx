"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      yPercent: -100,
      opacity: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: document.body,
        start: "top -10%",
        end: "top -30%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full px-margin-desktop py-6"
    >
      <nav className="mx-auto flex max-w-container-max items-center justify-between">
        <span className="font-display text-2xl font-bold tracking-tighter text-primary">
          vinxxo
        </span>
        <div className="flex items-center gap-8">
          <a href="#work" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">
            Work
          </a>
          <a href="#about" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="rounded-full border border-primary px-6 py-2 font-mono text-xs tracking-widest text-primary uppercase transition-colors hover:bg-primary hover:text-surface">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
