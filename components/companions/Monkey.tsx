"use client";

import type { CompanionRigProps } from "./types";
import { useBreath } from "./useBreath";
import { useBlink } from "./useBlink";
import { worlds } from "@/content/worlds";

// PLACEHOLDER ART — COMMISSION FROM: a neutral illustrator for this base
// rig; a langur/macaque, must not resemble Hanuman (no mace, crown, flying
// pose). See /content/CULTURAL_REVIEW.md and ART_MANIFEST.md
export function Monkey({ hovered, className, worldId }: CompanionRigProps) {
  const breathStyle = useBreath(3800);
  const blinking = useBlink();
  const kit = worldId ? worlds[worldId] : undefined;
  const body = kit?.palette.accent ?? "#8C6A4A";
  const tail = kit?.palette.accent2 ?? "#6B4A33";
  const face = kit?.palette.paper ?? "#D9C3AC";
  const ink = kit?.palette.ink ?? "var(--ink)";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g id="tail" style={{ transformOrigin: "68px 72px", animation: "katha-tail-flick 4.5s ease-in-out infinite" }}>
        <path d="M68,72 Q90,76 86,56 Q84,44 70,46" fill="none" stroke={tail} strokeWidth={5} strokeLinecap="round" />
      </g>
      <g id="body" style={breathStyle}>
        <ellipse cx={50} cy={66} rx={23} ry={17} fill={body} />
      </g>
      <g
        id="head"
        style={{
          transform: hovered ? "translateY(-4px) rotate(-4deg)" : "translateY(0) rotate(0deg)",
          transformOrigin: "50px 40px",
          transition: "transform 0.35s ease",
        }}
      >
        <circle cx={50} cy={40} r={16} fill={body} />
        <ellipse cx={50} cy={44} rx={9} ry={8} fill={face} />
        <g
          id="eyes"
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "50px 40px",
            transition: "transform 0.1s",
          }}
        >
          <circle cx={45} cy={40} r={2.4} fill={ink} />
          <circle cx={55} cy={40} r={2.4} fill={ink} />
        </g>
        <path d="M46,48 Q50,51 54,48" stroke={ink} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <circle cx={36} cy={36} r={5} fill={body} />
        <circle cx={64} cy={36} r={5} fill={body} />
      </g>
    </svg>
  );
}
