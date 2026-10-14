// Part B.6 — each world is a StyleKit: its own art tradition, palette,
// pattern library, line weight, texture and ambient animation. Worlds never
// share art rules. Future worlds = new StyleKits (see ROADMAP.md).

export type WorldId =
  | "banyan"
  | "himalaya"
  | "stepwell"
  | "monsoon"
  | "observatory"
  | "jungle";

export type ArtTradition =
  | "gond"
  | "pahari-miniature"
  | "rajasthani-block-print"
  | "bombay-signpainting"
  | "deccani-miniature"
  | "mithila";

export type AmbientEffect =
  | "fireflies"
  | "rain"
  | "drifting-seeds"
  | "snow"
  | "stars"
  | "mist"
  | "ripples";

export interface LayerSpec {
  id: string;
  /** 0 = furthest back, 1 = frontmost. Drives the parallax translate multiplier. */
  depth: number;
  /** What this layer depicts — doubles as the artist commission brief. */
  description: string;
}

export interface WorldStyleKit {
  id: WorldId;
  name: string;
  region: string;
  tradition: ArtTradition;
  palette: Record<"bg" | "ink" | "accent" | "accent2" | "paper", string>;
  patterns: string[];
  lineWeight: number;
  /** px offset between colour fill and line-art, faking block-print registration. */
  misregistration: number;
  ambient: AmbientEffect[];
  parallaxLayers: LayerSpec[];
  consultantNotes: string[];
  artistCredit?: { name: string; tradition: string; village?: string };
}
