"use client";

import type { CompanionRigProps } from "./types";
import { useBreath } from "./useBreath";
import { useBlink } from "./useBlink";
import { worlds } from "@/content/worlds";

// PLACEHOLDER ART — COMMISSION FROM: Gond-tradition artist for the Banyan
// world variant; a neutral illustrator for this base rig. See ART_MANIFEST.md
export function Tiger({ hovered, className, worldId }: CompanionRigProps) {
  const breathStyle = useBreath(4200);
  const blinking = useBlink();
  const kit = worldId ? worlds[worldId] : undefined;
  const body = kit?.palette.accent ?? "#D98A3D";
  const tail = kit?.palette.accent2 ?? "var(--laterite)";
  const ink = kit?.palette.ink ?? "var(--ink)";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g id="tail" style={{ transformOrigin: "78px 68px", animation: "katha-tail-flick 5.5s ease-in-out infinite" }}>
        <path d="M78,68 Q96,58 90,38" fill="none" stroke={tail} strokeWidth={6} strokeLinecap="round" />
      </g>
      <g id="body" style={breathStyle}>
        <ellipse cx={50} cy={66} rx={26} ry={18} fill={body} />
        <path
          d="M30,60 L34,70 M42,58 L45,70 M58,58 L55,70 M70,60 L66,70"
          stroke={ink}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </g>
      <g
        id="head"
        style={{
          transform: hovered ? "rotate(-6deg)" : "rotate(0deg)",
          transformOrigin: "50px 38px",
          transition: "transform 0.4s ease",
        }}
      >
        <path d="M38,27 L34,15 L45,24 Z M62,27 L66,15 L55,24 Z" fill={body} />
        <circle cx={50} cy={38} r={17} fill={body} />
        <path d="M44,30 L41,21 M50,30 L50,20 M56,30 L59,21" stroke={ink} strokeWidth={2} strokeLinecap="round" />
        <g
          id="eyes"
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "50px 36px",
            transition: "transform 0.1s",
          }}
        >
          <ellipse cx={44} cy={36} rx={3} ry={3.4} fill={ink} />
          <ellipse cx={56} cy={36} rx={3} ry={3.4} fill={ink} />
        </g>
        <path d="M47,45 Q50,48 53,45" stroke={ink} strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
