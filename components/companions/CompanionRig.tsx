import type { ComponentType } from "react";
import type { CompanionId } from "@/content/companions";
import type { CompanionRigProps } from "./types";
import { Tiger } from "./Tiger";
import { Elephant } from "./Elephant";
import { Monkey } from "./Monkey";
import { Peacock } from "./Peacock";
import { Cobra } from "./Cobra";

export type { CompanionRigProps, CompanionPose } from "./types";

const RIGS: Record<CompanionId, ComponentType<CompanionRigProps>> = {
  tiger: Tiger,
  elephant: Elephant,
  monkey: Monkey,
  peacock: Peacock,
  cobra: Cobra,
};

export function CompanionRig({ id, ...props }: { id: CompanionId } & CompanionRigProps) {
  const Rig = RIGS[id];
  return <Rig {...props} />;
}
