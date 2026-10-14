"use client";

import { useId } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";

export interface ThresholdMarkProps {
  /** Pixel size (square). feTurbulence displacement only kicks in >=96px (Part B.2). */
  size?: number;
  /** "story is weaving" indicator mode: loops the draw-in instead of settling once. */
  loop?: boolean;
  className?: string;
}

/**
 * Part B.2 — "The Threshold": an open book seen from above, where the
 * gutter becomes a path to a vanishing point. Reads as a book, a doorway and
 * a path at once. Also doubles as the loader / weaving indicator (loop=true).
 */
export function ThresholdMark({ size = 64, loop = false, className }: ThresholdMarkProps) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  const uid = useId();
  const filterId = `katha-ink-wobble-${uid}`;

  const pageTransition = { duration: 1.1, ease: [0.6, 0.05, 0.2, 1] as const };
  const repeatProps = loop && animate ? { repeat: Infinity, repeatDelay: 1.6 } : {};
  // Only >=96px pays for the feTurbulence/feDisplacementMap filter (Part
  // B.2): applying it at any scale, even 0, forces per-frame rasterization
  // through the filter pipeline instead of cheap GPU compositing, which is
  // wasted cost on the small icon-sized instances used everywhere else.
  const useInkWobble = size >= 96;

  return (
    <svg
      role="img"
      aria-label="Katha — the Threshold mark"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      {useInkWobble && (
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.4} />
          </filter>
        </defs>
      )}
      <g filter={useInkWobble ? `url(#${filterId})` : undefined}>
        {/* left page */}
        <m.path
          d="M50,30 C26,26 13,50 19,74 C27,86 40,87 50,92"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transformOrigin: "50px 30px" }}
          initial={animate ? { pathLength: 0, rotate: -3 } : undefined}
          animate={animate ? { pathLength: 1, rotate: 0 } : undefined}
          transition={animate ? { ...pageTransition, ...repeatProps } : undefined}
        />
        {/* right page */}
        <m.path
          d="M50,30 C75,25 89,49 81,74 C73,86 59,86 50,92"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transformOrigin: "50px 30px" }}
          initial={animate ? { pathLength: 0, rotate: 3 } : undefined}
          animate={animate ? { pathLength: 1, rotate: 0 } : undefined}
          transition={animate ? { ...pageTransition, ...repeatProps, delay: 0.08 } : undefined}
        />
        {/* the gutter / the path, narrowing toward a vanishing point */}
        <m.path
          d="M50,32 L50,90"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animate ? { duration: 0.6, ease: pageTransition.ease, delay: 0.5, ...repeatProps } : undefined}
        />
      </g>
    </svg>
  );
}
