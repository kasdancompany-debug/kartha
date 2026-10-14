"use client";

import type { CompanionRigProps } from "./types";
import { useBreath } from "./useBreath";
import { useBlink } from "./useBlink";
import { worlds } from "@/content/worlds";

// PLACEHOLDER ART — COMMISSION FROM: a neutral illustrator for this base
// rig; must not resemble Ganesha in any way (no pose, ornaments, single
// tusk). See /content/CULTURAL_REVIEW.md and ART_MANIFEST.md
export function Elephant({ hovered, className, worldId }: CompanionRigProps) {
  const breathStyle = useBreath(5000);
  const earStyle = useBreath(5000);
  const blinking = useBlink();
  const kit = worldId ? worlds[worldId] : undefined;
  const body = kit?.palette.accent ?? "#9AA3B2";
  const trim = kit?.palette.accent2 ?? "#8A93A2";
  const ink = kit?.palette.ink ?? "var(--ink)";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g id="body" style={breathStyle}>
        <ellipse cx={50} cy={68} rx={27} ry={17} fill={body} />
      </g>
      <g id="ears" style={earStyle}>
        <ellipse cx={26} cy={42} rx={13} ry={16} fill={trim} />
        <ellipse cx={74} cy={42} rx={13} ry={16} fill={trim} />
      </g>
      <g id="head">
        <circle cx={50} cy={40} r={18} fill={body} />
        <g
          id="eyes"
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "50px 38px",
            transition: "transform 0.1s",
          }}
        >
          <ellipse cx={43} cy={38} rx={2.6} ry={3} fill={ink} />
          <ellipse cx={57} cy={38} rx={2.6} ry={3} fill={ink} />
        </g>
        <path
          id="trunk"
          d={hovered ? "M50,50 Q48,66 58,66" : "M50,50 Q46,64 48,78"}
          fill="none"
          stroke={trim}
          strokeWidth={7}
          strokeLinecap="round"
          style={{ transition: "d 0.5s ease" }}
        />
      </g>
    </svg>
  );
}
