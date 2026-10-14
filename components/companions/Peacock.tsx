"use client";

import type { CompanionRigProps } from "./types";
import { useBreath } from "./useBreath";
import { useBlink } from "./useBlink";
import { worlds } from "@/content/worlds";

// PLACEHOLDER ART — COMMISSION FROM: a neutral illustrator for this base
// rig. National bird; respectful portrayal. See ART_MANIFEST.md
export function Peacock({ hovered, className, worldId }: CompanionRigProps) {
  const bodyStyle = useBreath(4600);
  const blinking = useBlink();
  const feathers = [-24, -12, 0, 12, 24];
  const kit = worldId ? worlds[worldId] : undefined;
  const body = kit?.palette.accent ?? "var(--peacock)";
  const trim = kit?.palette.accent2 ?? "var(--turmeric)";
  const ink = kit?.palette.ink ?? "var(--ink)";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g id="tail">
        {feathers.map((angle, i) => (
          <ellipse
            key={angle}
            cx={50}
            cy={62}
            rx={2.6}
            ry={hovered ? 24 : 10}
            fill={body}
            transform={`rotate(${angle} 50 62)`}
            style={{ transition: `ry 0.45s ease ${i * 45}ms, transform 0.45s ease ${i * 45}ms` }}
          />
        ))}
        {feathers.map((angle, i) => (
          <circle
            key={`eye-${angle}`}
            cx={50}
            cy={hovered ? 40 : 54}
            r={1.6}
            fill={trim}
            transform={`rotate(${angle} 50 62)`}
            style={{ transition: `cy 0.45s ease ${i * 45}ms` }}
          />
        ))}
      </g>
      <g id="body" style={bodyStyle}>
        <ellipse cx={50} cy={66} rx={13} ry={16} fill={body} />
      </g>
      <g id="head" style={{ animation: "katha-breathe 3.2s ease-in-out infinite" }}>
        <circle cx={50} cy={42} r={11} fill={body} />
        <path d="M50,32 L50,25" stroke={trim} strokeWidth={2} strokeLinecap="round" />
        <circle cx={50} cy={24} r={1.8} fill={trim} />
        <g
          id="eyes"
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "50px 41px",
            transition: "transform 0.1s",
          }}
        >
          <circle cx={46} cy={41} r={1.8} fill={ink} />
          <circle cx={54} cy={41} r={1.8} fill={ink} />
        </g>
      </g>
    </svg>
  );
}
