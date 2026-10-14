"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";

/**
 * Part 0.5 — LazyMotion + domAnimation keeps the animation bundle small;
 * components use `m` (not `motion`) from "motion/react" so they pull the
 * lazy-loaded feature set this provider registers, instead of the full
 * engine.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
