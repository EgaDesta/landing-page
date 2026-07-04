"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    tags: ["Next.js", "Stripe", "Tailwind"],
    desc: "A high-performance e-commerce platform with real-time inventory and seamless checkout.",
  },
  {
    title: "Health Dashboard",
    category: "UI/UX Design",
    tags: ["React", "D3.js", "Figma"],
    desc: "An interactive health analytics dashboard visualizing patient data and treatment progress.",
  },
  {
    title: "Fintech Mobile App",
    category: "Mobile Dev",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    desc: "A secure mobile banking application with biometric auth and real-time transaction tracking.",
  },
  {
    title: "SaaS Analytics Tool",
    category: "Full Stack",
    tags: ["Vue.js", "Python", "AWS"],
    desc: "A comprehensive analytics platform for SaaS businesses with custom report generation.",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          ease: "power3.out",
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
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
      id="portfolio"
      ref={sectionRef}
      className="ascii-dark-bg relative min-h-screen bg-black px-6 py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={headingRef}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Selected
            <br />
            Projects
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="corner-brackets group border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {p.title}
                  </h3>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-white/60 transition-colors">
                  arrow_outward
                </span>
              </div>
              <p className="mt-4 font-mono text-sm leading-relaxed text-white/50">
                {p.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-white/30 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
