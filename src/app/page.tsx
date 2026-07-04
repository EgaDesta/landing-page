"use client";

import { useEffect, useState } from "react";
import SmoothScrollProvider from "@/lib/smooth-scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useDeviceCapability } from "@/hooks/use-device-capability";
import type { DeviceTier } from "@/hooks/use-device-capability";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import TimelineSection from "@/components/timeline-section";
import ContactSection from "@/components/contact-section";
import ScrollProgress from "@/components/scroll-progress";

export default function Home() {
  const reduced = useReducedMotion();
  const tier = useDeviceCapability();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (reduced) {
    return (
      <div className="font-mono">
        <HeroSection tier="low" />
        <AboutSection tier="low" />
        <ServicesSection tier="low" />
        <PortfolioSection tier="low" />
        <TimelineSection tier="low" />
        <ContactSection tier="low" />
      </div>
    );
  }

  return (
    <SmoothScrollProvider>
      {mounted && <ScrollProgress />}
      <HeroSection tier={tier} />
      <AboutSection tier={tier} />
      <ServicesSection tier={tier} />
      <PortfolioSection tier={tier} />
      <TimelineSection tier={tier} />
      <ContactSection tier={tier} />
    </SmoothScrollProvider>
  );
}
