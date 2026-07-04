"use client";
import { useEffect, useState } from "react";

export type DeviceTier = "low" | "medium" | "high";

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency || 4;
    const mem = nav.deviceMemory || 8;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile || cores <= 4 || mem <= 4) return void setTier("low");
    if (cores <= 6 || mem <= 6) return void setTier("medium");
    setTier("high");
  }, []);
  return tier;
}
