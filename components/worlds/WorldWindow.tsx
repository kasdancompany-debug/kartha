"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DeckleEdge } from "@/components/book/DeckleEdge";
import { useDeviceTier } from "@/lib/device/tier";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import type { AmbientEffect, WorldStyleKit } from "@/content/worlds";
import { ParallaxLayers, type ParallaxLayerDef } from "@/components/stage/ParallaxLayers";
import { useParallaxOffset } from "@/components/stage/useParallaxOffset";

function AmbientEffectLayer({ kit, effect }: { kit: WorldStyleKit; effect: AmbientEffect }) {
  const items = Array.from({ length: 10 }, (_, i) => i);

  if (effect === "fireflies" || effect === "stars") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {items.map((i) => (
          <circle
            key={i}
            cx={(i * 37) % 100}
            cy={(i * 53) % 100}
            r={0.8}
            fill={kit.palette.accent2}
            style={{ animation: `katha-twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </svg>
    );
  }
  if (effect === "rain") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {items.map((i) => (
          <line
            key={i}
            x1={(i * 10) % 100}
            y1={-10}
            x2={((i * 10) % 100) - 4}
            y2={110}
            stroke={kit.palette.paper}
            strokeWidth={0.6}
            opacity={0.3}
            style={{ animation: `katha-rain 1.1s linear ${i * 0.08}s infinite` }}
          />
        ))}
      </svg>
    );
  }
  if (effect === "snow" || effect === "drifting-seeds") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {items.map((i) => (
          <circle
            key={i}
            cx={(i * 23) % 100}
            cy={-5}
            r={1}
            fill={kit.palette.paper}
            style={{ animation: `katha-fall 6s linear ${i * 0.5}s infinite` }}
          />
        ))}
      </svg>
    );
  }
  if (effect === "mist") {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${kit.palette.paper}33, transparent)`,
          animation: "katha-drift 12s ease-in-out infinite alternate",
        }}
      />
    );
  }
  if (effect === "ripples") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {items.slice(0, 3).map((i) => (
          <circle
            key={i}
            cx={50}
            cy={70}
            r={4}
            fill="none"
            stroke={kit.palette.accent2}
            strokeWidth={0.5}
            opacity={0.4}
            style={{ animation: `katha-ripple 3s ease-out ${i}s infinite` }}
          />
        ))}
      </svg>
    );
  }
  return null;
}

export interface WorldWindowProps {
  kit: WorldStyleKit;
  /** Visual content for each of kit.parallaxLayers, keyed by LayerSpec.id. */
  layers: Record<string, ReactNode>;
  className?: string;
}

/**
 * Part D.3 STEP 3 — a deckle-edged plate with its own live ambient motion,
 * running only when the window is actually on screen and only on mid/high
 * tier (low tier shows a still frame — Part 0.6). The world's parallaxLayers
 * brief drives real depth here via the same ParallaxLayers engine the
 * Landing backdrop uses, so hovering/tilting a world window shifts its
 * layers at their authored depths instead of showing one flat icon.
 */
export function WorldWindow({ kit, layers, className }: WorldWindowProps) {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const offset = useParallaxOffset(!reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => setInView(!!entries[0]?.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showAmbient = inView && !reduced && tier !== "low";

  const layerDefs: ParallaxLayerDef[] = kit.parallaxLayers.map((spec) => ({
    id: spec.id,
    depth: spec.depth,
    content: layers[spec.id] ?? null,
  }));

  return (
    <div ref={ref} className={`relative aspect-[4/3] overflow-hidden ${className ?? ""}`}>
      <DeckleEdge className="absolute inset-0" style={{ background: kit.palette.bg }}>
        <ParallaxLayers layers={layerDefs} offset={offset} maxShiftPx={6} />
        {showAmbient && kit.ambient.map((effect) => <AmbientEffectLayer key={effect} kit={kit} effect={effect} />)}
      </DeckleEdge>
    </div>
  );
}
