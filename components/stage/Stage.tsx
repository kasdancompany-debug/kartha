"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import type { WorldId } from "@/content/worlds";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import { Backdrop } from "./Backdrop";
import { LanternLight } from "./LanternLight";
import { WorldTint } from "./WorldTint";
import { useParallaxOffset } from "./useParallaxOffset";

// Neither is needed for the first paint (both are decorative/interactive
// extras layered on top of the backdrop) — code-splitting them keeps their
// script evaluation off the critical path for Landing's LCP.
const HiddenCreatures = dynamic(() => import("./HiddenCreatures").then((m) => m.HiddenCreatures), { ssr: false });
const ParticleField = dynamic(() => import("./ParticleField").then((m) => m.ParticleField), { ssr: false });

export interface StageProps {
  /** The Book (or whatever occupies the centre of the stage this step). */
  children?: ReactNode;
  /** The persistent bottom dock — rendered last, above everything else. */
  dock?: ReactNode;
  /** 0 = settled, 1 = fully pushed in (the Landing CTA's camera push). */
  pushProgress?: number;
  showHiddenCreatures?: boolean;
  onFoundCreature?: (id: string) => void;
  tiltEnabled?: boolean;
  /** Part D.3 STEP 3 — tints the backdrop toward the hovered/chosen world. */
  worldTint?: WorldId;
}

/**
 * Part D.2 — the persistent stage: backdrop (parallax) -> hidden creatures
 * -> lantern light -> particles -> the Book -> dock. One instance lives for
 * the whole Oracle experience; only its backdrop/contents change per step.
 */
export function Stage({
  children,
  dock,
  pushProgress = 0,
  showHiddenCreatures = true,
  onFoundCreature,
  tiltEnabled = true,
  worldTint,
}: StageProps) {
  const reduced = useReducedMotion();
  const offset = useParallaxOffset(!reduced && tiltEnabled);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-night text-paper">
      <Backdrop offset={offset} pushProgress={pushProgress} />
      <WorldTint worldId={worldTint} />
      {showHiddenCreatures && <HiddenCreatures onFound={onFoundCreature} />}
      <LanternLight offset={offset} />
      <ParticleField />
      <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
      {dock && <div className="absolute inset-x-0 bottom-0 z-20">{dock}</div>}
    </div>
  );
}
