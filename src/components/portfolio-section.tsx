"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

interface Props { tier: DeviceTier }

const projects = [
  { title: "E-Commerce Platform", category: "Web Development", tags: ["Next.js", "Stripe", "Tailwind"], desc: "A high-performance e-commerce platform with real-time inventory and seamless checkout experience across devices." },
  { title: "Health Dashboard", category: "UI/UX Design", tags: ["React", "D3.js", "Figma"], desc: "An interactive health analytics dashboard visualizing patient data and treatment progress with real-time updates." },
  { title: "Fintech Mobile App", category: "Mobile Dev", tags: ["React Native", "Node.js", "PostgreSQL"], desc: "A secure mobile banking application with biometric auth and real-time transaction tracking for thousands of users." },
  { title: "SaaS Analytics Tool", category: "Full Stack", tags: ["Vue.js", "Python", "AWS"], desc: "A comprehensive analytics platform for SaaS businesses with custom report generation and team collaboration features." },
];

export default function PortfolioSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<typeof projects[0] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, ease: "power3.out", duration: 1,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        });
      }

      // batch staggered reveal
      const cards = gridRef.current?.querySelectorAll(".portfolio-card");
      if (cards?.length) {
        ScrollTrigger.batch(cards, {
          onEnter: (batch) => {
            gsap.fromTo(batch, { y: 80, opacity: 0, scale: 0.95 }, {
              y: 0, opacity: 1, scale: 1, stagger: isLow ? 0.05 : 0.1, duration: isLow ? 0.5 : 0.8, ease: "power3.out",
            });
          },
          start: "top 85%",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isLow]);

  // modal animation
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (modal) {
        gsap.fromTo(el, { opacity: 0, scale: 0.9, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
        gsap.fromTo(el.querySelectorAll(".modal-stagger"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power3.out", delay: 0.2 });
      }
    }, modalRef);
    return () => ctx.revert();
  }, [modal]);

  return (
    <section id="portfolio" ref={sectionRef} className="ascii-dark-bg relative min-h-screen bg-black px-16 py-32 font-mono">
      <div ref={headingRef} className="mx-auto max-w-7xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Portfolio</span>
        </div>
        <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
          Selected
          <br />
          Projects
        </h2>
      </div>

      <div ref={gridRef} className="mx-auto mt-16 grid max-w-7xl gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.title}
            className="portfolio-card group relative cursor-pointer border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.06]"
            onClick={() => setModal(p)}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] tracking-widest text-white/30 uppercase">{p.category}</span>
                <h3 className="mt-2 font-mono text-xl font-semibold text-white">{p.title}</h3>
              </div>
              <span className="text-white/20 transition-colors group-hover:text-accent material-symbols-outlined">
                arrow_outward
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/50">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded border border-white/10 px-2.5 py-1 text-[9px] tracking-wider text-white/30 uppercase">{t}</span>
              ))}
            </div>
            {/* hover overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[10px] tracking-[0.25em] text-white uppercase">View Details</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6 font-mono"
          onClick={() => setModal(null)}
        >
          <div
            ref={modalRef}
            className="relative max-w-lg border border-white/10 bg-black p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-white/30 hover:text-white transition-colors"
              onClick={() => setModal(null)}
            >
              ✕
            </button>
            <span className="modal-stagger mb-2 block text-[10px] tracking-widest text-accent uppercase">{modal.category}</span>
            <h3 className="modal-stagger font-mono text-2xl font-semibold text-white">{modal.title}</h3>
            <p className="modal-stagger mt-4 text-sm leading-relaxed text-white/50">{modal.desc}</p>
            <div className="modal-stagger mt-6 flex flex-wrap gap-2">
              {modal.tags.map((t) => (
                <span key={t} className="rounded border border-white/10 px-3 py-1 text-[9px] tracking-wider text-white/40 uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
