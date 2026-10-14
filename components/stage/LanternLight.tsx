"use client";

import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import type { ParallaxOffset } from "./useParallaxOffset";

export interface LanternLightProps {
  offset: ParallaxOffset;
  /** CSS color for the glow core, e.g. "var(--turmeric)". */
  color?: string;
  className?: string;
}

/**
 * Part B.5 — one warm lantern light that follows the pointer on desktop and
 * device tilt on mobile. A single radial-gradient layer, never a UI
 * decoration gradient — this is meant to read as a real light source.
 */
export function LanternLight({ offset, color = "var(--turmeric)", className }: LanternLightProps) {
  const reduced = useReducedMotion();
  const x = reduced ? 50 : 50 + offset.x * 22;
  const y = reduced ? 42 : 42 + offset.y * 18;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mix-blend-screen ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent 42%)`,
        opacity: 0.22,
        transition: reduced ? undefined : "background-position 0.2s linear",
      }}
    />
  );
}
