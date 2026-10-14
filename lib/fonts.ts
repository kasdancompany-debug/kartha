import { Tiro_Devanagari_Hindi, Anek_Latin, Anek_Devanagari, Caveat } from "next/font/google";

// Story/display serif (Part B.4): Tiro Devanagari Hindi — Latin + Devanagari
// designed together as one family, so titles/cover/book text read as one
// typographic voice in either script.
// Normal style only: italic is rare (one descriptor line) and the browser's
// synthesized oblique is an acceptable trade for not shipping a second
// ~20KB font file on every page for it.
export const storySerif = Tiro_Devanagari_Hindi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  style: "normal",
  variable: "--font-story-serif",
  display: "swap",
});

// Supporting sans (Part B.4): Anek Latin + Anek Devanagari, an Indian type
// foundry (Ek Type) family that also covers Bangla/Tamil/Telugu/Kannada/
// Malayalam/Gujarati/Gurmukhi/Odia — the multilingual future, built in now.
export const supportingSansLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-latin",
  display: "swap",
});

// Only a fallback for :lang(hi) text set in font-sans (no Hindi UI copy
// ships yet — hi.json is still an empty scaffold) — not preloaded so it
// never competes with the critical-path fonts above for bandwidth.
export const supportingSansDevanagari = Anek_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-devanagari",
  display: "swap",
  preload: false,
});

// Handwriting accent (one use only — cover + share card "Created especially
// for ___"). Placeholder; commission a hand-lettered script later. Never
// appears above the fold, so it isn't preloaded either.
// TYPE UPGRADE: commission a hand-lettered script to replace Caveat.
export const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-handwriting",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  storySerif.variable,
  supportingSansLatin.variable,
  supportingSansDevanagari.variable,
  handwriting.variable,
].join(" ");
