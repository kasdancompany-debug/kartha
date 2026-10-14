import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: Himalayan imagery is easily
// pulled toward monasteries, prayer flags and stupas, which are religious.
// Keep this world secular: terraced fields, slate roofs, wooden balconies,
// deodar forest. See /content/CULTURAL_REVIEW.md.
export const himalaya: WorldStyleKit = {
  id: "himalaya",
  name: "The Himalayan Kingdom",
  region: "Himachal / Pahari hills (inspiration)",
  tradition: "pahari-miniature",
  palette: {
    bg: "#dce8e2",
    ink: "var(--ink)",
    accent: "#3a5a52",
    accent2: "#5c6f9c",
    paper: "var(--paper)",
  },
  patterns: ["pahari-terrace-line", "pahari-wash-cloud", "pahari-deodar-needle"],
  lineWeight: 1,
  misregistration: 1,
  ambient: ["mist", "snow"],
  parallaxLayers: [
    { id: "peaks-far", depth: 0, description: "Snow peaks, soft wash, fine line" },
    { id: "mist-band", depth: 0.25, description: "Rolling mist between ridgelines" },
    { id: "terraced-fields", depth: 0.5, description: "Terraced fields stepping down a slope" },
    { id: "deodar-forest", depth: 0.75, description: "Deodar trees, layered hills" },
    { id: "village-roofs", depth: 0.9, description: "Slate roofs and wooden balconies, a distant bird" },
  ],
  consultantNotes: [
    "Avoid monasteries, prayer flags and stupas (religious). Use terraced fields, slate roofs, wooden balconies, deodar forest.",
    "Commission a Pahari/Kangra-trained miniaturist; credit by name and village.",
  ],
};
