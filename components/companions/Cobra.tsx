"use client";

import type { CompanionRigProps } from "./types";
import { useBlink } from "./useBlink";
import { worlds } from "@/content/worlds";

// PLACEHOLDER ART — COMMISSION FROM: a neutral illustrator for this base
// rig. Snakes carry religious meaning (Nag); portray as a wise guardian,
// never a deity, never threatening. See /content/CULTURAL_REVIEW.md
export function Cobra({ hovered, className, worldId }: CompanionRigProps) {
  const blinking = useBlink();
  const kit = worldId ? worlds[worldId] : undefined;
  const body = kit?.palette.accent ?? "var(--leaf)";
  const trim = kit?.palette.accent2 ?? "var(--laterite)";
  const eyes = kit?.palette.accent2 ?? "var(--turmeric)";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g id="body" style={{ transformOrigin: "50px 80px", animation: "katha-sway 5.5s ease-in-out infinite" }}>
        <path
          d="M50,85 Q30,75 48,60 Q64,48 50,38"
          fill="none"
          stroke={body}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path
          id="tongue"
          d="M50,38 L50,32"
          stroke={trim}
          strokeWidth={1.4}
          strokeLinecap="round"
          style={{ animation: "katha-blink 3.4s ease-in-out infinite" }}
        />
      </g>
      <g
        id="head"
        style={{
          transform: hovered ? "scale(1.25) translateY(-4px)" : "scale(1)",
          transformOrigin: "50px 38px",
          transition: "transform 0.45s ease",
        }}
      >
        <path d="M38,38 Q50,22 62,38 Q56,46 50,46 Q44,46 38,38 Z" fill={body} />
        <g
          id="eyes"
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "50px 36px",
            transition: "transform 0.1s",
          }}
        >
          <circle cx={45} cy={36} r={2} fill={eyes} />
          <circle cx={55} cy={36} r={2} fill={eyes} />
        </g>
      </g>
    </svg>
  );
}
