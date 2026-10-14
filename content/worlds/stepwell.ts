import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: stepwells often have shrine
// niches carved into their walls. Leave niches empty or carved with
// geometric/floral patterns only — no deity figures. See CULTURAL_REVIEW.md.
export const stepwell: WorldStyleKit = {
  id: "stepwell",
  name: "The Lost Stepwell",
  region: "Rajasthan / Gujarat (inspiration)",
  tradition: "rajasthani-block-print",
  palette: {
    bg: "#d8c6a0",
    ink: "var(--ink)",
    accent: "var(--indigo)",
    accent2: "var(--laterite)",
    paper: "var(--paper)",
  },
  patterns: ["dabu-resist-geometric", "bagru-floral-border", "stepwell-stair-repeat"],
  lineWeight: 2,
  misregistration: 2,
  ambient: ["ripples"],
  parallaxLayers: [
    { id: "sky-opening", depth: 0, description: "Sky seen from the well floor, framed by stone" },
    { id: "upper-steps", depth: 0.3, description: "Geometric stepped terraces, sandstone" },
    { id: "carved-niches", depth: 0.55, description: "Empty niches carved with geometric/floral block-print motifs only" },
    { id: "water-level", depth: 0.8, description: "Still water with slow ripples, light moving down the steps" },
    { id: "pigeons", depth: 0.95, description: "Pigeons resting on the stair edges" },
  ],
  consultantNotes: [
    "Stepwells often have shrine niches; leave niches empty or carved with geometric/floral patterns only.",
    "Commission a Rajasthani/Gujarati block-print (dabu, Bagru) artisan; credit by name and village.",
  ],
};
