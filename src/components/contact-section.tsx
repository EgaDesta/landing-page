"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

interface Props { tier: DeviceTier }

export default function ContactSection({ tier }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // split panels slide in from sides
      if (leftRef.current) {
        gsap.fromTo(leftRef.current, { x: "-100%" }, {
          x: "0%", ease: "power3.out", duration: 1.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { x: "100%" }, {
          x: "0%", ease: "power3.out", duration: 1.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }
      if (formRef.current) {
        gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, ease: "power3.out", duration: 0.8, delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative h-screen font-mono overflow-hidden">
      {/* LEFT — black */}
      <div ref={leftRef} className="absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-center bg-black px-16">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Contact</span>
        </div>
        <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
          Let&apos;s work
          <br />
          together
        </h2>
        <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50">
          Have a project in mind? Drop a message and I&apos;ll get back within 24 hours.
        </p>
        <div className="mt-8 space-y-3 text-xs text-white/40">
          <p>egadestavianodesta@gmail.com</p>
          <p>Indonesia</p>
          <p>Available for freelance</p>
        </div>
        <div className="mt-8 flex gap-3">
          {["GitHub", "LinkedIn", "Dribbble"].map((s) => (
            <a key={s} href="#" className="rounded-none border border-white/10 px-4 py-2 text-[9px] tracking-widest text-white/30 uppercase transition-colors hover:border-white/30 hover:text-white/60">
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT — white */}
      <div ref={rightRef} className="absolute inset-y-0 right-0 z-10 flex w-1/2 flex-col justify-center bg-surface px-16">
        <form ref={formRef} onSubmit={handleSubmit} className="max-w-sm">
          {["Name", "Email", "Message"].map((label) => (
            <div key={label} className="group relative mb-6">
              <label className="mb-1 block text-[9px] tracking-[0.25em] text-black/30 uppercase">{label}</label>
              {label === "Message" ? (
                <textarea rows={3} className="w-full resize-none border-0 border-b border-black/20 bg-transparent px-0 py-2 text-sm text-black outline-none transition-all placeholder:text-black/20 focus:border-black" placeholder="Tell me about your project..." />
              ) : (
                <input type={label === "Email" ? "email" : "text"} className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-2 text-sm text-black outline-none transition-all placeholder:text-black/20 focus:border-black" placeholder={label === "Name" ? "John Doe" : "john@example.com"} />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 w-full rounded-none border-2 border-black bg-black px-6 py-3 text-[9px] tracking-[0.25em] text-white uppercase transition-all hover:bg-white hover:text-black"
          >
            {submitted ? "✓ Message Sent" : "Send Message"}
          </button>
        </form>
      </div>

      {/* center divider */}
      <div className="absolute left-1/2 top-0 z-20 h-full w-[1px] -translate-x-1/2 bg-black/20" />
    </section>
  );
}
