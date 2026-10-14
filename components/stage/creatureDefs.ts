export type HiddenCreatureId = "owl" | "peacock-tail" | "tiger-eyes";

export interface HiddenCreatureDef {
  id: HiddenCreatureId;
  label: string;
  /** Percent coordinates within the Stage, shared by Backdrop's art and HiddenCreatures' hotspot. */
  xPercent: number;
  yPercent: number;
}

// PLACEHOLDER ART — COMMISSION FROM: a landscape/narrative illustrator (not
// tradition-specific — this is the neutral landing scene, not a World
// StyleKit). Replace with final artwork. See /content/ART_MANIFEST.md
export const hiddenCreatures: HiddenCreatureDef[] = [
  { id: "owl", label: "An owl", xPercent: 20, yPercent: 38 },
  { id: "peacock-tail", label: "A peacock's tail", xPercent: 76, yPercent: 47 },
  { id: "tiger-eyes", label: "A tiger's eyes", xPercent: 47, yPercent: 68 },
];
