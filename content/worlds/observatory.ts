import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: verify astronomical instrument
// depictions against real Jantar Mantar instruments, and keep the framing as
// science and wonder — avoid astrology/zodiac imagery. See CULTURAL_REVIEW.md.
export const observatory: WorldStyleKit = {
  id: "observatory",
  name: "The Star Observatory",
  region: "Deccan (inspiration); giant stone astronomical instruments (Jantar Mantar)",
  tradition: "deccani-miniature",
  palette: {
    bg: "var(--night)",
    ink: "var(--ink)",
    accent: "var(--turmeric)",
    accent2: "#3b4a8a",
    paper: "var(--paper)",
  },
  patterns: ["deccani-gold-fleck", "instrument-stone-curve", "star-field-scatter"],
  lineWeight: 1.5,
  misregistration: 1,
  ambient: ["stars"],
  parallaxLayers: [
    { id: "night-sky", depth: 0, description: "Deep night sky, stars appearing gradually" },
    { id: "horizon-instruments", depth: 0.3, description: "Silhouettes of giant stone instruments against the sky" },
    { id: "sundial-instrument", depth: 0.55, description: "A large stone sundial, shadow moves slowly" },
    { id: "steps-platform", depth: 0.8, description: "Stone steps and platforms, gold-fleck detailing" },
    { id: "comet", depth: 0.95, description: "A slow comet crossing occasionally" },
  ],
  consultantNotes: [
    "Verify instrument depictions against real Jantar Mantar instruments; avoid astrology/zodiac framing.",
    "Commission a Deccani-miniature-trained artist; credit by name and region.",
  ],
};
