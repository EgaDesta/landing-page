"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-capability";

interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
  reduced: boolean;
  tier: DeviceTier;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
}

function generateTargets(width: number, height: number, count: number): { tx: number; ty: number }[] {
  const cx = width / 2;
  const cy = height / 2;
  const targets: { tx: number; ty: number }[] = [];

  // simple face silhouette using ellipses
  const headR = Math.min(width, height) * 0.3;
  const faceR = headR * 0.85;

  for (let i = 0; i < count; i++) {
    let tx = cx + (Math.random() - 0.5) * headR * 2;
    let ty = cy + (Math.random() - 0.5) * headR * 2.4;

    const dx = (tx - cx) / headR;
    const dy = (ty - cy) / (headR * 1.2);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      const ratio = 1 / dist;
      tx = cx + dx * ratio * headR;
      ty = cy + dy * ratio * headR * 1.2;
    }

    // eye holes
    const ex1 = cx - headR * 0.25;
    const ey1 = cy - headR * 0.15;
    const eyeDist1 = Math.sqrt((tx - ex1) ** 2 + (ty - ey1) ** 2);
    const ex2 = cx + headR * 0.25;
    const ey2 = cy - headR * 0.15;
    const eyeDist2 = Math.sqrt((tx - ex2) ** 2 + (ty - ey2) ** 2);
    const eyeR = headR * 0.08;

    if (eyeDist1 < eyeR || eyeDist2 < eyeR) {
      i--;
      continue;
    }

    // mouth gap
    if (ty > cy + headR * 0.2 && ty < cy + headR * 0.4 && Math.abs(tx - cx) < headR * 0.2) {
      i--;
      continue;
    }

    targets.push({ tx, ty });
  }

  return targets;
}

export default function ParticleCanvas({ sectionRef, reduced, tier }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current || reduced) return;

    const isLow = tier === "low";
    const particleCount = isLow ? 400 : tier === "medium" ? 1200 : 2500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      canvas!.width = rect.width * (isLow ? 1 : 2);
      canvas!.height = rect.height * (isLow ? 1 : 2);
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
    };
    resize();

    const targets = generateTargets(canvas.width, canvas.height, particleCount);
    const particles: Particle[] = targets.map((t, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(canvas.width, canvas.height) * 0.6;
      return {
        x: canvas!.width / 2 + Math.cos(angle) * radius,
        y: canvas!.height / 2 + Math.sin(angle) * radius,
        tx: t.tx,
        ty: t.ty,
        size: isLow ? 1.5 : 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
      };
    });

    const progress = { value: 0 };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      scrub: 2,
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });

    const draw = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const p = progress.value;
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      particles.forEach((pt) => {
        const cx = pt.x + (pt.tx - pt.x) * eased;
        const cy = pt.y + (pt.ty - pt.y) * eased;
        const alpha = pt.alpha * Math.min(1, eased * 2);
        ctx!.beginPath();
        ctx!.arc(cx, cy, pt.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, [reduced, tier]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
    />
  );
}
