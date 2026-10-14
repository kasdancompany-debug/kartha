"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CompanionId } from "@/content/companions";
import type { WorldId } from "@/content/worlds";
import type { ThemeId } from "@/content/themes";
import { cyrb53, normalizeName } from "./seed";
import type { AgeBand } from "./validation";

export type Step = "landing" | "hero" | "companion" | "world" | "theme" | "weaving" | "reveal" | "result";

/** Part D.1 — the full state machine order. Phases 3-5 implement landing..reveal (the hold-to-weave gesture and cover reveal); result (pricing, sharing, commerce) is still a later phase. */
export const STEP_ORDER: Step[] = ["landing", "hero", "companion", "world", "theme", "weaving", "reveal", "result"];

/** The subset of steps that live inside the Book (landing is the pre-book night scene). */
export const BOOK_STEPS: Step[] = ["hero", "companion", "world", "theme", "weaving"];

interface OracleState {
  step: Step;
  hero: { name: string; ageBand?: AgeBand };
  companion?: CompanionId;
  world?: WorldId;
  theme?: ThemeId;
  seed?: string;
  shareOptInName: boolean;
}

interface OracleActions {
  goToStep: (step: Step) => void;
  next: () => void;
  back: () => void;
  setHeroName: (name: string) => void;
  setHeroAge: (ageBand: AgeBand | undefined) => void;
  selectCompanion: (id: CompanionId) => void;
  selectWorld: (id: WorldId) => void;
  selectTheme: (id: ThemeId) => void;
}

const initialState: OracleState = {
  step: "landing",
  hero: { name: "" },
  shareOptInName: false,
};

function maybeComputeSeed(s: OracleState): string | undefined {
  if (s.hero.name && s.companion && s.world && s.theme) {
    return cyrb53(`${normalizeName(s.hero.name)}|${s.companion}|${s.world}|${s.theme}`);
  }
  return s.seed;
}

export const useOracleStore = create<OracleState & OracleActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      goToStep: (step) => set({ step }),
      next: () => {
        const idx = STEP_ORDER.indexOf(get().step);
        if (idx >= 0 && idx < STEP_ORDER.length - 1) set({ step: STEP_ORDER[idx + 1] });
      },
      back: () => {
        const idx = STEP_ORDER.indexOf(get().step);
        if (idx > 0) set({ step: STEP_ORDER[idx - 1] });
      },
      setHeroName: (name) => set({ hero: { ...get().hero, name } }),
      setHeroAge: (ageBand) => set({ hero: { ...get().hero, ageBand } }),
      selectCompanion: (id) => set((s) => ({ companion: id, seed: maybeComputeSeed({ ...s, companion: id }) })),
      selectWorld: (id) => set((s) => ({ world: id, seed: maybeComputeSeed({ ...s, world: id }) })),
      selectTheme: (id) => set((s) => ({ theme: id, seed: maybeComputeSeed({ ...s, theme: id }) })),
    }),
    {
      name: "katha.oracle.v1",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: ({ step, hero, companion, world, theme, seed, shareOptInName }) => ({
        step,
        hero,
        companion,
        world,
        theme,
        seed,
        shareOptInName,
      }),
    },
  ),
);
