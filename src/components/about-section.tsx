"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

gsap.registerPlugin(ScrollTrigger);

interface Props { tier: DeviceTier }

function genFace(w: number, h: number, n: number) {
  const cx = w / 2, cy = h / 2, hr = Math.min(w, h) * 0.28;
  const pts: { x: number; y: number }[] = [];
  let i = 0;
  while (pts.length < n && i < n * 20) {
    i++;
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * hr;
    let tx = cx + Math.cos(a) * r;
    let ty = cy + Math.sin(a) * r * 1.35;
    if (Math.hypot(tx - (cx - hr * 0.25), ty - (cy - hr * 0.12)) < hr * 0.08) continue;
    if (Math.hypot(tx - (cx + hr * 0.25), ty - (cy - hr * 0.12)) < hr * 0.08) continue;
    if (ty > cy + hr * 0.2 && ty < cy + hr * 0.4 && Math.abs(tx - cx) < hr * 0.2) continue;
    if (ty > cy + hr * 0.65) continue;
    pts.push({ x: tx, y: ty });
  }
  return pts;
}

export default function AboutSection({ tier }: Props) {
  const sec = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tx = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLow = tier === "low";

  useEffect(() => {
    if (reduced || !sec.current) return;
    const el = sec.current;
    const ctx = gsap.context(() => {
      // Phase 1: panel expand 50vw→100vw (morph from hero right panel)
      gsap.to(panelRef.current, {
        width: "100vw",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      // Phase 2: pin + rotate vertical→horizontal + content reveal
      gsap.fromTo(panelRef.current,
        { rotationX: 0 },
        {
          rotationX: 90, ease: "power2.inOut",
          scrollTrigger: {
            trigger: el, start: "top top", end: "+=250%", scrub: 2.5, pin: true, anticipatePin: 1,
          },
        }
      );

      // Content fade in
      if (tx.current) {
        gsap.fromTo(tx.current, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top+=30% top", end: "+=150%", scrub: 2 },
        });
      }

      // Stats
      const st = tx.current?.querySelectorAll(".st");
      if (st?.length) {
        gsap.fromTo(st, { opacity: 0, y: 20, scale: 0.8 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top+=50% top", end: "+=150%", scrub: 2 },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  // Particles
  useEffect(() => {
    const ca = cv.current;
    const s = sec.current;
    if (!ca || !s || reduced) return;
    const n = isLow ? 300 : tier === "medium" ? 800 : 1500;

    const resize = () => {
      const d = isLow ? 1 : 2;
      ca.width = innerWidth * d;
      ca.height = innerHeight * d;
      ca.style.width = "100vw";
      ca.style.height = "100vh";
    };
    resize();

    const c2d = ca.getContext("2d");
    if (!c2d) return;

    const tg = genFace(ca.width, ca.height, n);
    const pts = tg.map((t) => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.max(ca.width, ca.height) * 0.7;
      return { x: ca.width / 2 + Math.cos(a) * r, y: ca.height / 2 + Math.sin(a) * r, tx: t.x, ty: t.y, sz: isLow ? 1.2 : 0.8 + Math.random() * 1.8 };
    });

    const p = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: s, start: "top+=5% top", end: "+=200%", scrub: 3,
      onUpdate: (self) => { p.v = self.progress; },
    });

    let raf = 0;
    const draw = () => {
      c2d.clearRect(0, 0, ca.width, ca.height);
      const v = p.v;
      const e = v < 0.5 ? 2 * v * v : 1 - (-2 * v + 2) ** 2 / 2;
      for (const pt of pts) {
        const cx = pt.x + (pt.tx - pt.x) * e;
        const cy = pt.y + (pt.ty - pt.y) * e;
        const a = Math.min(1, e * 5);
        c2d.beginPath();
        c2d.arc(cx, cy, pt.sz, 0, Math.PI * 2);
        c2d.fillStyle = `rgba(255,255,255,${a * 0.5})`;
        c2d.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); st.kill(); };
  }, [reduced, tier]);

  return (
    <section id="about" ref={sec} className="relative bg-black font-mono overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Dark panel — starts at 50vw (matches hero right panel) → expands → rotates */}
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-20 bg-black"
        style={{ width: "50vw", transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
      />

      {/* Particles */}
      <canvas ref={cv} className="pointer-events-none fixed inset-0 z-30" />

      {/* Content */}
      <div ref={tx} className="relative z-40 flex min-h-screen items-center px-16">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">About</span>
          </div>
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Building the
            <br />future, one
            <br />pixel at a time
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
            Creative technologist with 5+ years engineering high-performance digital experiences. My approach blends precision with minimalist design philosophy.
          </p>
          <div className="mt-8 flex gap-8">
            {[{ n: "5+", l: "Exp." }, { n: "50+", l: "Projects" }, { n: "20+", l: "Clients" }].map((s) => (
              <div key={s.l} className="st">
                <span className="font-mono text-3xl font-bold text-white">{s.n}</span>
                <p className="mt-1 text-[10px] text-white/30 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
