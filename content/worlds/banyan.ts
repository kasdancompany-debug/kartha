import type { WorldStyleKit } from "./types";

// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED: banyan trees carry sacred
// associations in some Indian communities (village deities, tied threads).
// This StyleKit must keep the tree a tree — no shrines, no threads tied to
// the trunk, no ritual markers. See /content/CULTURAL_REVIEW.md.
export const banyan: WorldStyleKit = {
  id: "banyan",
  name: "The Ancient Banyan Forest",
  region: "Madhya Pradesh (inspiration)",
  tradition: "gond",
  palette: {
    bg: "var(--night)",
    ink: "var(--ink)",
    accent: "var(--leaf)",
    accent2: "var(--turmeric)",
    paper: "var(--paper)",
  },
  patterns: ["gond-dot-fill", "gond-dash-bark", "gond-leaf-vein"],
  lineWeight: 2,
  misregistration: 1.5,
  ambient: ["fireflies"],
  parallaxLayers: [
    { id: "canopy-far", depth: 0, description: "Distant tree line, dot-filled silhouettes" },
    { id: "aerial-roots", depth: 0.3, description: "Hanging aerial roots that sway gently" },
    { id: "banyan-trunk", depth: 0.55, description: "The banyan itself, Gond dot-and-dash bark pattern, drawn as a living being" },
    { id: "undergrowth", depth: 0.8, description: "Fern and leaf silhouettes, fireflies among them" },
    { id: "owl-perch", depth: 0.95, description: "A hidden owl on a low branch, blinks occasionally" },
  ],
  consultantNotes: [
    "Banyan has sacred associations in some communities; keep it a tree, no shrines or threads tied to it.",
    "Commission a Gond artist; credit by name and village once real art replaces the placeholder.",
  ],
};
