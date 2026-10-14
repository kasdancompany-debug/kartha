"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";

/** Part B.7 — slow idle breathing (ribcage scale 1 -> 1.02), randomized per instance so a row of companions doesn't breathe in lockstep. */
export function useBreath(periodMs = 4200): CSSProperties | undefined {
  const reduced = useReducedMotion();
  const delayMs = useMemo(() => Math.round(Math.random() * periodMs), [periodMs]);

  if (reduced) return undefined;
  return {
    animation: `katha-breathe ${periodMs}ms ease-in-out ${delayMs}ms infinite`,
    transformOrigin: "center",
  };
}
