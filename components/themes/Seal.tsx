"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import type { ThemeId } from "@/content/themes";

export interface SealProps {
  id: ThemeId;
  /** True once this is the selected theme — plays the stamp-down animation. */
  stamped?: boolean;
  className?: string;
}

function Motif({ id }: { id: ThemeId }) {
  switch (id) {
    case "courage":
      return (
        <>
          <path d="M8,30 Q24,18 40,30" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <circle cx={24} cy={16} r={7} fill="currentColor" />
        </>
      );
    case "kindness":
      return (
        <>
          <circle cx={24} cy={19} r={5} fill="currentColor" />
          <path d="M10,30 Q17,22 24,26 Q31,22 38,30" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "patience":
      return (
        <>
          <ellipse cx={24} cy={31} rx={4} ry={6} fill="currentColor" />
          <path d="M24,25 Q24,15 30,11 M24,21 Q24,15 18,12" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      );
    case "curiosity":
      return (
        <>
          <circle cx={17} cy={17} r={6} fill="none" stroke="currentColor" strokeWidth={2.5} />
          <path d="M21,21 L34,34 M29,30 L33,26 M34,34 L38,30" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "friendship":
      return (
        <>
          <path d="M9,16 Q24,16 24,24 Q24,32 39,32" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d="M9,32 Q24,32 24,24 Q24,16 39,16" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

/** Part B.8 — a block-print seal; stamps onto the page when chosen (scale 1.15 -> 1, a slight rotation settle). */
export function Seal({ id, stamped, className }: SealProps) {
  const reduced = useReducedMotion();

  return (
    <m.svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      initial={false}
      animate={stamped && !reduced ? { scale: [1.15, 0.95, 1], rotate: [6, -2, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <circle cx={24} cy={24} r={22} fill="none" stroke="currentColor" strokeWidth={2} />
      <Motif id={id} />
    </m.svg>
  );
}
