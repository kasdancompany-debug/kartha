"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

interface NavigatorConnection extends EventTarget {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
}

/**
 * Part 0.6 — picks a device tier from deviceMemory, hardwareConcurrency,
 * connection.saveData/effectiveType and prefers-reduced-motion. Every
 * particle/parallax/shader effect reads this (directly or via
 * useDeviceTier) and scales down instead of assuming a capable device.
 */
export function computeDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return "mid";

  const nav = navigator as ExtendedNavigator;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  const saveData = connection?.saveData ?? false;
  const effectiveType = connection?.effectiveType;
  const slowNetwork = saveData || effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g";

  const memory = nav.deviceMemory ?? 4; // unsupported (notably iOS Safari) -> assume mid
  const cores = nav.hardwareConcurrency ?? 4;

  if (reducedMotion) return "low";
  if (slowNetwork || memory <= 2 || cores <= 2) return "low";
  if (memory >= 8 && cores >= 8 && !slowNetwork) return "high";
  return "mid";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    setTier(computeDeviceTier());

    const nav = navigator as ExtendedNavigator;
    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
    const recompute = () => setTier(computeDeviceTier());

    connection?.addEventListener?.("change", recompute);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", recompute);

    return () => {
      connection?.removeEventListener?.("change", recompute);
      motionQuery.removeEventListener("change", recompute);
    };
  }, []);

  return tier;
}

export const PARTICLE_BUDGET: Record<DeviceTier, number> = {
  low: 0,
  mid: 60,
  high: 150,
};
