"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);
  const labels = ["Hero", "About", "Services", "Portfolio", "Timeline", "Contact"];

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
    }, lineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed right-6 top-0 z-[999] flex h-screen flex-col items-center justify-center gap-0 max-md:hidden">
      <div className="h-[60vh] w-[1px] overflow-hidden bg-white/10">
        <div
          ref={lineRef}
          className="w-full origin-top bg-accent"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>
      <div className="mt-4 space-y-2.5">
        {labels.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="block text-right font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-accent"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
