"use client";

import { ParallaxLayers, type ParallaxLayerDef } from "./ParallaxLayers";
import type { ParallaxOffset } from "./useParallaxOffset";
import { hiddenCreatures } from "./creatureDefs";

const STARS = [
  { x: 6, y: 8, r: 0.5, delay: 0 },
  { x: 14, y: 18, r: 0.35, delay: 0.6 },
  { x: 24, y: 6, r: 0.45, delay: 1.2 },
  { x: 33, y: 14, r: 0.3, delay: 1.8 },
  { x: 41, y: 4, r: 0.5, delay: 0.3 },
  { x: 52, y: 10, r: 0.35, delay: 2.1 },
  { x: 61, y: 3, r: 0.4, delay: 0.9 },
  { x: 68, y: 16, r: 0.3, delay: 1.5 },
  { x: 77, y: 7, r: 0.5, delay: 2.4 },
  { x: 85, y: 13, r: 0.35, delay: 0.1 },
  { x: 92, y: 5, r: 0.45, delay: 1.1 },
  { x: 9, y: 24, r: 0.3, delay: 1.7 },
  { x: 48, y: 20, r: 0.3, delay: 2.6 },
  { x: 96, y: 22, r: 0.35, delay: 0.5 },
] as const;

function owl(x: number, y: number) {
  // PLACEHOLDER ART — COMMISSION FROM: landscape illustrator. See ART_MANIFEST.md
  return (
    <g transform={`translate(${x}, ${y})`} opacity={0.85}>
      <ellipse cx={0} cy={0} rx={1.6} ry={2} fill="#0b0e1c" />
      <circle cx={-0.6} cy={-0.4} r={0.45} fill="#e0a526" style={{ transformOrigin: "-0.6px -0.4px", animation: "katha-blink 6s ease-in-out infinite" }} />
      <circle cx={0.6} cy={-0.4} r={0.45} fill="#e0a526" style={{ transformOrigin: "0.6px -0.4px", animation: "katha-blink 6s ease-in-out infinite" }} />
    </g>
  );
}

function peacockTail(x: number, y: number) {
  // PLACEHOLDER ART — COMMISSION FROM: landscape illustrator. See ART_MANIFEST.md
  const feathers = [-18, -9, 0, 9, 18];
  return (
    <g transform={`translate(${x}, ${y})`} opacity={0.8}>
      {feathers.map((angle) => (
        <ellipse
          key={angle}
          cx={0}
          cy={-3}
          rx={0.7}
          ry={3.2}
          fill="#14646b"
          transform={`rotate(${angle})`}
          style={{ transformOrigin: "0px 0px" }}
        />
      ))}
      {feathers.map((angle) => (
        <circle
          key={`eye-${angle}`}
          cx={0}
          cy={-5.6}
          r={0.35}
          fill="#e0a526"
          transform={`rotate(${angle})`}
          style={{ transformOrigin: "0px 0px" }}
        />
      ))}
    </g>
  );
}

function tigerEyes(x: number, y: number) {
  // PLACEHOLDER ART — COMMISSION FROM: landscape illustrator. See ART_MANIFEST.md
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={-0.7} cy={0} rx={0.5} ry={0.3} fill="#e0a526" style={{ transformOrigin: "-0.7px 0px", animation: "katha-blink 5s ease-in-out infinite" }} />
      <ellipse cx={0.7} cy={0} rx={0.5} ry={0.3} fill="#e0a526" style={{ transformOrigin: "0.7px 0px", animation: "katha-blink 5s ease-in-out infinite" }} />
    </g>
  );
}

function hillPath(baseline: number, amplitude: number, seed: number) {
  const points = [0, 20, 40, 60, 80, 100].map((x, i) => {
    const wobble = Math.sin(seed + i * 1.7) * amplitude;
    return `${x},${baseline + wobble}`;
  });
  return `M0,100 L${points.join(" L")} L100,100 Z`;
}

export interface BackdropProps {
  offset: ParallaxOffset;
  pushProgress?: number;
}

/**
 * Part D.3 LANDING — the night scene: layered paper-cut hills, drifting
 * clouds, slowly appearing stars, and the hidden creatures woven into the
 * art itself (HiddenCreatures.tsx adds the tappable hotspot on top).
 */
export function Backdrop({ offset, pushProgress = 0 }: BackdropProps) {
  const layers: ParallaxLayerDef[] = [
    {
      id: "sky",
      depth: 0.05,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="katha-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0d1a" />
              <stop offset="100%" stopColor="#1a2340" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#katha-sky)" />
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#f3ead8"
              style={{ animation: `katha-twinkle ${3 + (i % 3)}s ease-in-out ${s.delay}s infinite` }}
            />
          ))}
        </svg>
      ),
    },
    {
      id: "clouds",
      depth: 0.12,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" style={{ opacity: 0.12 }}>
          <ellipse cx={20} cy={16} rx={14} ry={3} fill="#f3ead8" style={{ animation: "katha-drift 40s ease-in-out infinite alternate" }} />
          <ellipse cx={72} cy={10} rx={10} ry={2.4} fill="#f3ead8" style={{ animation: "katha-drift 55s ease-in-out infinite alternate-reverse" }} />
        </svg>
      ),
    },
    {
      id: "hills-far",
      depth: 0.3,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d={hillPath(46, 4, 0)} fill="#161d35" />
          {(() => {
            const owlDef = hiddenCreatures.find((c) => c.id === "owl")!;
            return owl(owlDef.xPercent, owlDef.yPercent - 4);
          })()}
        </svg>
      ),
    },
    {
      id: "hills-mid",
      depth: 0.5,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d={hillPath(56, 5, 2)} fill="#1d2748" />
          {(() => {
            const def = hiddenCreatures.find((c) => c.id === "peacock-tail")!;
            return peacockTail(def.xPercent, def.yPercent);
          })()}
        </svg>
      ),
    },
    {
      id: "hills-near",
      depth: 0.7,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d={hillPath(66, 6, 4)} fill="#141a2e" />
        </svg>
      ),
    },
    {
      id: "foreground",
      depth: 0.9,
      content: (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d={hillPath(78, 5, 6)} fill="#0c0f1c" />
          {(() => {
            const def = hiddenCreatures.find((c) => c.id === "tiger-eyes")!;
            return tigerEyes(def.xPercent, def.yPercent);
          })()}
        </svg>
      ),
    },
  ];

  return <ParallaxLayers layers={layers} offset={offset} pushProgress={pushProgress} />;
}
