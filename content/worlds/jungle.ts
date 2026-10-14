import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: much Mithila (Madhubani) art is
// ritual-based. Exclude all deity and ritual motifs; keep the vocabulary to
// fish, birds, trees and double-line borders. See CULTURAL_REVIEW.md.
export const jungle: WorldStyleKit = {
  id: "jungle",
  name: "The Secret Jungle",
  region: "Mithila region, Bihar (inspiration)",
  tradition: "mithila",
  palette: {
    bg: "#f0e6c8",
    ink: "var(--ink)",
    accent: "var(--leaf)",
    accent2: "var(--turmeric)",
    paper: "var(--paper)",
  },
  patterns: ["mithila-double-line-border", "mithila-fish-motif", "mithila-filled-leaf"],
  lineWeight: 2,
  misregistration: 1.5,
  ambient: ["drifting-seeds"],
  parallaxLayers: [
    { id: "canopy-pattern", depth: 0, description: "Densely filled leaf canopy, every space patterned" },
    { id: "double-line-border", depth: 0.25, description: "Mithila double-line border framing the scene" },
    { id: "trees-birds", depth: 0.5, description: "Trees with birds, double-line trunks" },
    { id: "hornbill", depth: 0.75, description: "A hornbill crossing the scene" },
    { id: "hidden-eyes", depth: 0.95, description: "Hidden eyes blinking among the leaves" },
  ],
  consultantNotes: [
    "Exclude all deity and ritual motifs (much Mithila art is ritual-based).",
    "Commission a Mithila artist and credit them by name and village.",
  ],
  artistCredit: undefined,
};
