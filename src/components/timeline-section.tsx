"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

gsap.registerPlugin(ScrollTrigger);

interface Props { tier: DeviceTier }

const employment = [
  { company: "TechCorp Indonesia", role: "Senior Frontend Engineer", period: "2024 — Present", desc: "Led migration to Next.js with Turbopack, resulting in 40% faster page loads. Built internal UI library serving 3 product teams.", highlights: ["Migrated 200+ pages zero downtime", "Reduced bundle size 55%", "UI library for 3 teams"] },
  { company: "StartupLab", role: "Full Stack Developer", period: "2022 — 2024", desc: "Shipped 5 SaaS products from scratch in fast-paced agency environment. Worked directly with founders on technical strategy.", highlights: ["5 production apps in 18 months", "CI/CD cut deploy time 70%", "Mentored 3 juniors"] },
  { company: "Digital Agency Co", role: "UI Engineer", period: "2021 — 2022", desc: "Built responsive apps for Fortune 500 clients. Collaborated with design on pixel-perfect interfaces and micro-interactions.", highlights: ["10+ client projects on time", "Component library from scratch", "Won internal hackathon"] },
  { company: "Freelance", role: "Web Developer", period: "2020 — 2021", desc: "Built WordPress and custom web apps for local businesses. Transitioned into modern JS frameworks full-time.", highlights: ["20+ client websites built", "Top-rated on freelance platforms", "Self-taught React/Node/TS"] },
];

export default function TimelineSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // spine progress line
      if (spineRef.current) {
        gsap.to(spineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      // pin left side
      const leftCol = sectionRef.current?.querySelector(".timeline-left");
      if (leftCol) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftCol,
          pinSpacing: true,
          anticipatePin: 1,
        });
      }

      // dot activation
      dotsRef.current.forEach((dot, i) => {
        const panel = panelsRef.current[i];
        if (!dot || !panel) return;
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => { dot.classList.add("active-dot"); },
          onLeave: () => { dot.classList.remove("active-dot"); },
          onEnterBack: () => { dot.classList.add("active-dot"); },
          onLeaveBack: () => { dot.classList.remove("active-dot"); },
        });
      });

      // panel entry
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.fromTo(panel, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, ease: "power3.out", duration: isLow ? 0.4 : 0.8,
          scrollTrigger: { trigger: panel, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isLow]);

  return (
    <section id="timeline" ref={sectionRef} className="relative min-h-screen bg-black font-mono">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* LEFT — pinned */}
        <div className="timeline-left relative flex h-screen flex-col justify-center px-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Experience</span>
          </div>
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            The journey
            <br />
            so far
          </h2>

          {/* spine */}
          <div className="relative mt-16 pl-8">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10">
              <div ref={spineRef} className="w-full origin-top bg-accent" style={{ height: "100%", transform: "scaleY(0)" }} />
            </div>
            <div className="space-y-16">
              {employment.map((job, i) => (
                <div key={job.company} ref={(el) => { dotsRef.current[i] = el }} className="relative flex items-start gap-5">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-white/20 bg-black transition-all duration-500" />
                  <div>
                    <span className="text-[9px] tracking-widest text-accent/70 uppercase">{job.period}</span>
                    <p className="mt-0.5 font-mono text-base font-semibold text-white/50 transition-all duration-500">{job.company}</p>
                    <p className="text-[11px] text-white/30">{job.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scroll */}
        <div className="flex flex-col py-32">
          {employment.map((job, i) => (
            <div key={job.company} ref={(el) => { panelsRef.current[i] = el }} className="flex min-h-[60vh] items-center px-8 md:px-12">
              <div className="corner-brackets border border-white/10 bg-white/[0.02] p-8">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[10px] tracking-widest text-accent uppercase">{job.company}</span>
                  <span className="text-[9px] text-white/20">{job.period}</span>
                </div>
                <h3 className="font-mono text-xl font-semibold text-white">{job.role}</h3>
                <p className="mt-4 text-xs leading-relaxed text-white/50">{job.desc}</p>
                <ul className="mt-5 space-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[11px] text-white/40">
                      <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
