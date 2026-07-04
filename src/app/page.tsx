"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PortfolioSection from "@/components/portfolio-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

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

const employment = [
  {
    company: "TechCorp Indonesia",
    role: "Senior Frontend Engineer",
    period: "2024 — Present",
    desc: "Leading the frontend architecture for a high-traffic e-commerce platform serving millions of users monthly. Spearheaded the migration from legacy codebase to Next.js 14 with Turbopack, resulting in 40% faster page loads.",
    highlights: [
      "Migrated 200+ pages to Next.js with zero downtime",
      "Reduced bundle size by 55% through code splitting",
      "Built internal UI library used by 3 product teams",
    ],
  },
  {
    company: "StartupLab",
    role: "Full Stack Developer",
    period: "2022 — 2024",
    desc: "Built and shipped 5 SaaS products from scratch in a fast-paced agency environment. Worked directly with founders to translate business requirements into technical solutions with rapid iteration cycles.",
    highlights: [
      "Delivered 5 production apps in under 18 months",
      "Implemented CI/CD pipelines reducing deploy time by 70%",
      "Mentored 3 junior developers through onboarding",
    ],
  },
  {
    company: "Digital Agency Co",
    role: "UI Engineer",
    period: "2021 — 2022",
    desc: "Developed responsive web applications for Fortune 500 clients. Collaborated closely with design teams to implement pixel-perfect interfaces with smooth micro-interactions and animations.",
    highlights: [
      "Shipped 10+ client projects on time and under budget",
      "Designed and implemented a reusable component library",
      "Won internal hackathon with an AI-powered prototype",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2020 — 2021",
    desc: "Started as a freelance web developer building WordPress sites and custom web applications for local businesses. Transitioned into modern JavaScript frameworks and never looked back.",
    highlights: [
      "Built 20+ client websites from the ground up",
      "Achieved top-rated status on freelance platforms",
      "Self-taught React, Node.js, and TypeScript",
    ],
  },
];

export default function Home() {
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const darkPanelRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const timelineSectionRef = useRef<HTMLElement>(null);
  const timelineLeftRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const timelineDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // --- Hero pin animation ---
      if (pinRef.current && darkPanelRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(darkPanelRef.current, { width: "100%", ease: "power2.inOut" }, 0);
        if (leftContentRef.current) tl.to(leftContentRef.current, { opacity: 0, x: -40, ease: "power2.in" }, 0);
        if (rightContentRef.current) tl.fromTo(rightContentRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, ease: "power2.out" }, 0.2);
        if (navRef.current) tl.to(navRef.current, { opacity: 0, y: -30, ease: "power2.inOut" }, 0);
        if (dividerRef.current) tl.to(dividerRef.current, { opacity: 0, ease: "power2.inOut" }, 0);
      }

      // --- Services cards ---
      if (servicesHeadingRef.current) {
        gsap.from(servicesHeadingRef.current, {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: servicesHeadingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      servicesCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          ease: "power3.out",
          duration: 0.9,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // --- Timeline ---
      if (timelineLeftRef.current && timelineSectionRef.current) {
        ScrollTrigger.create({
          trigger: timelineSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: timelineLeftRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });

        if (timelineProgressRef.current) {
          gsap.to(timelineProgressRef.current, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineSectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
        }

        timelineDotsRef.current.forEach((dot, i) => {
          const panel = rightPanelsRef.current[i];
          if (!dot || !panel) return;
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              dot.classList.add("active-dot");
              dot.querySelector(".timeline-company")?.classList.add("active-company");
            },
            onLeave: () => {
              dot.classList.remove("active-dot");
              dot.querySelector(".timeline-company")?.classList.remove("active-company");
            },
            onEnterBack: () => {
              dot.classList.add("active-dot");
              dot.querySelector(".timeline-company")?.classList.add("active-company");
            },
            onLeaveBack: () => {
              dot.classList.remove("active-dot");
              dot.querySelector(".timeline-company")?.classList.remove("active-company");
            },
          });
        });

        rightPanelsRef.current.forEach((panel) => {
          if (!panel) return;
          gsap.from(panel, {
            y: 100,
            opacity: 0,
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      ScrollTrigger.refresh();

    }, heroRef); // scope to heroRef (but animations target other elements too)

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
            <a href="#work" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">Services</a>
            <a href="#timeline" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">Experience</a>
            <a href="#portfolio" className="font-mono text-xs tracking-widest text-on-surface-variant uppercase hover:text-primary transition-colors">Work</a>
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
              <a href="#timeline" className="rounded bg-primary px-7 py-3 font-mono text-xs tracking-widest text-surface uppercase transition-all hover:opacity-90">
                View My Work
              </a>
              <a href="#contact" className="rounded border border-primary/40 px-7 py-3 font-mono text-xs tracking-widest text-primary uppercase transition-colors hover:border-primary hover:bg-primary hover:text-surface">
                Get in Touch
              </a>
            </div>

            <pre className="mt-16 font-mono text-[6px] leading-[1.1] text-on-surface-variant/20 select-none">
              {asciiArt}
            </pre>
          </div>

          {/* DARK PANEL */}
          <div
            ref={darkPanelRef}
            className="ascii-dark-bg absolute right-0 top-0 z-20 h-full w-1/2 origin-left overflow-hidden bg-black"
          >
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

      {/* SERVICES SECTION */}
      <section className="ascii-dark-bg relative flex min-h-screen flex-col items-center justify-center bg-black px-6 py-32">
        <div className="relative z-10 max-w-5xl">
          <div ref={servicesHeadingRef}>
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Core Disciplines</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Precision in every
              <br />
              layer of the stack
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {services.map((svc, i) => (
              <div
                key={svc.number}
                ref={(el) => { servicesCardsRef.current[i] = el }}
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

      {/* EMPLOYMENT TIMELINE */}
      <section id="timeline" ref={timelineSectionRef} className="ascii-dark-bg relative bg-black">
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
          {/* LEFT - sticky column with timeline */}
          <div
            ref={timelineLeftRef}
            className="relative z-10 flex flex-col justify-center px-8 py-32 md:px-16"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Experience</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              The journey
              <br />
              so far
            </h2>

            {/* Timeline vertical line */}
            <div className="relative mt-16 pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-white/10">
                <div
                  ref={timelineProgressRef}
                  className="w-full origin-top bg-accent"
                  style={{ height: "0%" }}
                />
              </div>

              <div className="space-y-24">
                {employment.map((job, i) => (
                  <div
                    key={job.company}
                    ref={(el) => { timelineDotsRef.current[i] = el }}
                    className="relative"
                  >
                    <div className="absolute -left-[25px] top-0 h-3 w-3 rounded-full border border-white/20 bg-black transition-all" />
                    <div className="ml-8">
                      <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                        {job.period}
                      </span>
                      <p className="timeline-company mt-1 font-display text-lg font-semibold text-white/50 transition-colors">
                        {job.company}
                      </p>
                      <p className="font-mono text-xs text-white/30">
                        {job.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - scrollable content panels */}
          <div className="flex flex-col py-32">
            {employment.map((job, i) => (
              <div
                key={job.company}
                ref={(el) => { rightPanelsRef.current[i] = el }}
                className="flex min-h-[70vh] items-center px-8 md:px-12"
              >
                <div className="corner-brackets rounded border border-white/10 bg-white/[0.02] p-8">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-accent uppercase">
                      {job.company}
                    </span>
                    <span className="font-mono text-[10px] text-white/20">{job.period}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {job.role}
                  </h3>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/50">
                    {job.desc}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 font-mono text-xs text-white/40">
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

      <PortfolioSection />
      <AboutSection />
      <ContactSection />

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
