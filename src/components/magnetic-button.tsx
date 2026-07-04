"use client";
import { useRef, useEffect, type ReactNode, type AnchorHTMLAttributes } from "react";
import gsap from "gsap";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export default function MagneticButton({ children, href, className = "", ...props }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const ctx = gsap.context(() => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.6, ease: "power3.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      });
    }, btn);
    return () => ctx.revert();
  }, []);

  return (
    <a ref={btnRef} href={href} className={`inline-block ${className}`} {...props}>
      {children}
    </a>
  );
}
