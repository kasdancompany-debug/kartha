import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: pick one real city lineage
// (its signage, architecture, street life) with the consultant; avoid
// poverty-or-chaos clichés about Indian cities. See CULTURAL_REVIEW.md.
export const monsoon: WorldStyleKit = {
  id: "monsoon",
  name: "The Monsoon City",
  region: "A contemporary Indian coastal city (specific lineage TBD with consultant)",
  tradition: "bombay-signpainting",
  palette: {
    bg: "#5a6166",
    ink: "var(--ink)",
    accent: "var(--peacock)",
    accent2: "var(--turmeric)",
    paper: "var(--paper)",
  },
  patterns: ["signpainter-lettering", "rain-streak-overlay", "puddle-ripple"],
  lineWeight: 2.5,
  misregistration: 2,
  ambient: ["rain", "ripples"],
  parallaxLayers: [
    { id: "skyline-far", depth: 0, description: "Wet-grey skyline silhouette" },
    { id: "rain-streaks", depth: 0.2, description: "Rain streaking across the whole scene" },
    { id: "signage", depth: 0.5, description: "Hand-painted shop signage lettering, signage yellow" },
    { id: "street-level", depth: 0.75, description: "Puddle ripples, a red bus passing" },
    { id: "kite-wire", depth: 0.95, description: "A kite caught on overhead wires" },
  ],
  consultantNotes: [
    "Pick one real city lineage with the consultant; avoid poverty or chaos clichés.",
    "Commission a printmaker/sign-painter familiar with that city's visual culture; credit by name.",
  ],
};
