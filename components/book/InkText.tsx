"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";

export interface InkTextProps {
  lines: string[];
  staggerMs?: number;
  className?: string;
  lineClassName?: string;
}

/**
 * Part D.3/B.5 — lines "ink in" one by one. A left-to-right clip-path
 * reveal (cheap, GPU-composited) stands in for the true noisy-circle ink
 * mask: same read ("the ink is following a pen"), without a per-letter
 * feTurbulence filter cost on every landing load.
 */
export function InkText({ lines, staggerMs = 400, className, lineClassName }: InkTextProps) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      {lines.map((line, i) =>
        reduced ? (
          <div key={line} className={lineClassName}>
            {line}
          </div>
        ) : (
          <m.div
            key={line}
            className={lineClassName}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.65, delay: (i * staggerMs) / 1000, ease: [0.6, 0.05, 0.2, 1] }}
          >
            {line}
          </m.div>
        ),
      )}
    </div>
  );
}
