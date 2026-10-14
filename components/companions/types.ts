import type { WorldId } from "@/content/worlds";

export type CompanionPose = "idle" | "curious" | "chosen" | "cover";

export interface CompanionRigProps {
  pose?: CompanionPose;
  hovered?: boolean;
  className?: string;
  /** When set, recolors the rig with that world's StyleKit palette (the companion×world-styled variant). */
  worldId?: WorldId;
}
