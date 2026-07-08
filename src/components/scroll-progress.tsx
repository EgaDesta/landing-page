"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Timeline", id: "timeline" },
  { label: "Contact", id: "contact" },
];

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Highlight active section label
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            document.querySelectorAll(".snav").forEach((n) => n.classList.remove("text-accent", "!text-white/80"));
            const navEl = document.querySelector(`.snav[data-section="${s.id}"]`);
            navEl?.classList.add("text-accent", "!text-white/80");
          },
          onEnterBack: () => {
            document.querySelectorAll(".snav").forEach((n) => n.classList.remove("text-accent", "!text-white/80"));
            const navEl = document.querySelector(`.snav[data-section="${s.id}"]`);
            navEl?.classList.add("text-accent", "!text-white/80");
          },
        });
      });
    }, lineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed right-6 top-0 z-[999] flex h-screen flex-col items-center justify-center gap-0 max-md:hidden pointer-events-none">
      <div className="h-[60vh] w-[1px] overflow-hidden bg-white/10">
        <div
          ref={lineRef}
          className="w-full origin-top bg-accent"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>
      <div className="mt-4 space-y-2.5 pointer-events-auto">
        {sections.map((s) => (
          <a
            key={s.id}
            data-section={s.id}
            href={`#${s.id}`}
            className="snav block text-right font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-accent"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
