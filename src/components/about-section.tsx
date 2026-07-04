"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "PostgreSQL", level: 75 },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const w = bar.dataset.width || "0";
        gsap.set(bar, { width: "0%" });
        gsap.to(bar, {
          width: w + "%",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="ascii-dark-bg relative min-h-screen bg-black px-6 py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          <div ref={contentRef}>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
                About
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Building the
              <br />
              future, one
              <br />
              pixel at a time
            </h2>
            <p className="mt-6 font-mono text-sm leading-relaxed text-white/50">
              I am a creative technologist with over 5 years of experience
              crafting high-performance digital experiences. My approach blends
              engineering precision with minimalist design philosophy to create
              products that are both beautiful and functional.
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-white/40">
              Based in Indonesia, I work with startups and established
              companies to bring their digital vision to life — from concept
              to deployment.
            </p>
            <div className="mt-8 flex gap-6">
              <div>
                <span className="font-display text-3xl font-bold text-white">5+</span>
                <p className="mt-1 font-mono text-xs text-white/30">Years Exp.</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-white">50+</span>
                <p className="mt-1 font-mono text-xs text-white/30">Projects</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-white">20+</span>
                <p className="mt-1 font-mono text-xs text-white/30">Clients</p>
              </div>
            </div>
          </div>

          <div>
            <span className="mb-6 block font-mono text-xs tracking-widest text-white/30 uppercase">
              // Skills
            </span>
            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-sm text-white/70">{s.name}</span>
                    <span className="font-mono text-xs text-white/30">{s.level}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      ref={(el) => { barsRef.current[i] = el }}
                      data-width={s.level}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {["React", "Next.js", "TypeScript", "Node.js", "Figma", "Tailwind", "PostgreSQL", "AWS", "Docker", "GraphQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-white/30 uppercase"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
