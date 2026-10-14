export type ThemeId = "courage" | "kindness" | "patience" | "curiosity" | "friendship";

export interface ThemeDef {
  id: ThemeId;
  name: string;
  parentHint: string;
  /** The seal's motif — kept deliberately non-religious (Part B.8). */
  sealMotif: string;
  /** Line 3/4 title forms (Part F.2), e.g. "The Secret of {World}". */
  titleForms: string[];
}

export const themes: Record<ThemeId, ThemeDef> = {
  courage: {
    id: "courage",
    name: "Courage",
    parentHint: "For the child about to try something new.",
    sealMotif: "A flame-free rising sun over hills",
    titleForms: ["The Secret of", "Beneath", "The Long Way Through"],
  },
  kindness: {
    id: "kindness",
    name: "Kindness",
    parentHint: "For the child learning that others feel things too.",
    sealMotif: "Two hands sharing a fruit",
    titleForms: ["The Gift of", "The Lantern of"],
  },
  patience: {
    id: "patience",
    name: "Patience",
    parentHint: "For the child who wants everything now.",
    sealMotif: "A seed with a sprout",
    titleForms: ["The Slow River of", "The Thousand Steps of"],
  },
  curiosity: {
    id: "curiosity",
    name: "Curiosity",
    parentHint: 'For the child who asks "but why?"',
    sealMotif: "A key",
    titleForms: ["The Riddle of", "The Hidden Door of"],
  },
  friendship: {
    id: "friendship",
    name: "Friendship",
    parentHint: "For the child making their first real friends.",
    sealMotif: "Two intertwined threads",
    titleForms: ["The Promise of", "The Two Paths of"],
  },
};

export const themeList: ThemeDef[] = Object.values(themes);
