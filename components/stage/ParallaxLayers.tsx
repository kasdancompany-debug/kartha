"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import type { ParallaxOffset } from "./useParallaxOffset";

export interface ParallaxLayerDef {
  id: string;
  /** 0 = furthest back, 1 = frontmost — scales both the parallax shift and the camera-push. */
  depth: number;
  content: ReactNode;
  className?: string;
}

export interface ParallaxLayersProps {
  layers: ParallaxLayerDef[];
  /** Shared pointer/tilt offset — lifted to Stage so one listener pair serves every consumer. */
  offset: ParallaxOffset;
  /** 0 = settled, 1 = fully pushed in (Landing's "Begin your story" camera push). */
  pushProgress?: number;
  maxShiftPx?: number;
}

/**
 * Part D.3/0.6 — the mechanism behind "every scroll/tap tick is a camera
 * move": layers shift at different rates from pointer/tilt (parallax) and
 * scale at different rates on command (the push). Reduced motion collapses
 * both to a static frame.
 */
export function ParallaxLayers({ layers, offset, pushProgress = 0, maxShiftPx = 18 }: ParallaxLayersProps) {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {layers.map((layer) => {
        const shiftX = reduced ? 0 : offset.x * layer.depth * maxShiftPx;
        const shiftY = reduced ? 0 : offset.y * layer.depth * maxShiftPx * 0.6;
        const pushScale = 1 + pushProgress * (0.3 + layer.depth * 0.85);

        return (
          <div
            key={layer.id}
            className={`absolute inset-0 ${layer.className ?? ""}`}
            style={{
              transform: `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${pushScale})`,
              transition: reduced ? undefined : "transform 0.15s linear",
              willChange: "transform",
            }}
          >
            {layer.content}
          </div>
        );
      })}
    </div>
  );
}
