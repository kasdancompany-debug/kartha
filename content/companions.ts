export type CompanionId = "tiger" | "elephant" | "monkey" | "peacock" | "cobra";

export type CompanionPose = "idle" | "curious" | "chosen" | "cover";

export interface CompanionDef {
  id: CompanionId;
  name: string;
  personalityLine: string;
  idleAnimation: string;
  hoverAnimation: string;
  /** Epithets for the title system (Part F.2), weighted by rarity where noted. */
  epithets: { label: string; rare?: boolean }[];
  consultantNotes: string[];
}

export const companions: Record<CompanionId, CompanionDef> = {
  tiger: {
    id: "tiger",
    name: "Tiger",
    personalityLine: "Brave. Restless. Loyal.",
    idleAnimation: "Slow breathing (ribcage scale 1→1.02), tail flick every 4-7s",
    hoverAnimation: "Ears twitch, head turns toward pointer, a low rumble (if sound on)",
    epithets: [
      { label: "Restless" },
      { label: "Midnight" },
      { label: "Striped" },
      { label: "Silent" },
      // INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: white tigers are
      // captive-bred (a human-made colour morph, not a wild population);
      // consider avoiding this epithet entirely pending consultant guidance.
      { label: "White", rare: true },
    ],
    consultantNotes: [
      "Default colour is a normal Bengal tiger. \"White Tiger\" appears only as a rare title epithet (1 in 8).",
      "CONSULTANT: white tigers are captive-bred; consider avoiding.",
    ],
  },
  elephant: {
    id: "elephant",
    name: "Elephant",
    personalityLine: "Wise. Gentle. Impossible to hurry.",
    idleAnimation: "Ear fan, trunk sway",
    hoverAnimation: "Trunk curls up, slow blink",
    epithets: [{ label: "Unhurried" }, { label: "Old" }, { label: "Gentle" }, { label: "Moon-grey" }],
    consultantNotes: [
      "Must not resemble Ganesha in any way (no pose, no ornaments, no single tusk).",
    ],
  },
  monkey: {
    id: "monkey",
    name: "Monkey",
    personalityLine: "Clever. Curious. Usually responsible for the problem.",
    idleAnimation: "Tail curls, scratches head",
    hoverAnimation: "Steals the cursor highlight, peeks from behind its card",
    epithets: [{ label: "Mischievous" }, { label: "Clever" }, { label: "Upside-down" }, { label: "Thieving" }],
    consultantNotes: [
      "A langur or macaque. Must not resemble Hanuman (no mace, no crown, no flying pose).",
    ],
  },
  peacock: {
    id: "peacock",
    name: "Peacock",
    personalityLine: "Proud. Observant. Dramatic.",
    idleAnimation: "Head bob, feathers shimmer",
    hoverAnimation: "Tail fans open (layered SVG feathers, staggered)",
    epithets: [{ label: "Proud" }, { label: "Dancing" }, { label: "Thousand-eyed" }, { label: "Rain-calling" }],
    consultantNotes: [
      "National bird; respectful portrayal, no religious iconography attached.",
    ],
  },
  cobra: {
    id: "cobra",
    name: "Cobra",
    personalityLine: "Mysterious. Patient. Knows more than it says.",
    idleAnimation: "Slow sway, tongue flick",
    hoverAnimation: "Hood rises gently, eyes glint",
    epithets: [{ label: "Patient" }, { label: "Silent" }, { label: "Riddling" }, { label: "Ancient" }],
    consultantNotes: [
      "Snakes carry religious meaning (Nag). Portray as a wise guardian, never a deity, never threatening to children.",
    ],
  },
};

export const companionList: CompanionDef[] = Object.values(companions);
