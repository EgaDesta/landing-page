"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

      gsap.from(formRef.current, {
        y: 80,
        opacity: 0,
        ease: "power3.out",
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="ascii-dark-bg relative min-h-screen bg-black px-6 py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={contentRef}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
              Contact
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Let&apos;s work
            <br />
            together
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-sm leading-relaxed text-white/50">
              Have a project in mind or just want to say hello? Drop me a
              message and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/30">mail</span>
                <span className="font-mono text-sm text-white/60">
                  egadestavianodesta@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/30">location_on</span>
                <span className="font-mono text-sm text-white/60">
                  Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/30">schedule</span>
                <span className="font-mono text-sm text-white/60">
                  Available for freelance
                </span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              {["GitHub", "LinkedIn", "Dribbble", "Instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded border border-white/10 px-4 py-2 font-mono text-xs tracking-widest text-white/40 uppercase transition-all hover:border-white/30 hover:text-white/70"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-white/40 uppercase">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-white/40 uppercase">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/30"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-white/40 uppercase">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full resize-none border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/30"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded border border-accent/50 bg-accent/10 px-6 py-3 font-mono text-xs tracking-widest text-accent uppercase transition-all hover:bg-accent/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
