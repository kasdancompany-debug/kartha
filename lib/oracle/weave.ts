import { cyrb53 } from "./seed";
import { companions, type CompanionId } from "@/content/companions";
import { themes, type ThemeId } from "@/content/themes";

interface Epithet {
  label: string;
  rare: boolean;
}

function seedIndex(seed: string, salt: string, modulo: number): number {
  const n = parseInt(cyrb53(`${seed}:${salt}`), 36);
  return n % modulo;
}

/**
 * Part F.2 — deterministic epithet pick. The only documented rarity ratio
 * anywhere (companions.ts: "White Tiger ... 1 in 8") generalizes to: the
 * whole `rare` pool shares a 1-in-8 chance, split evenly if there's more
 * than one; the remaining 7-in-8 splits evenly across the common pool.
 */
export function pickEpithet(seed: string, companionId: CompanionId): Epithet {
  const epithets = companions[companionId].epithets;
  const rare = epithets.filter((e) => e.rare);
  const common = epithets.filter((e) => !e.rare);

  if (rare.length === 0 || common.length === 0) {
    const i = seedIndex(seed, `epithet:${companionId}`, epithets.length);
    return { label: epithets[i]!.label, rare: !!epithets[i]!.rare };
  }

  const roll = seedIndex(seed, `epithet-roll:${companionId}`, 8);
  if (roll === 0) {
    const i = seedIndex(seed, `epithet-rare:${companionId}`, rare.length);
    return { label: rare[i]!.label, rare: true };
  }
  const i = seedIndex(seed, `epithet-common:${companionId}`, common.length);
  return { label: common[i]!.label, rare: false };
}

/** Part F.2 — deterministic pick of one of the theme's title-form prefixes. */
export function pickTitleForm(seed: string, themeId: ThemeId): string {
  const forms = themes[themeId].titleForms;
  const i = seedIndex(seed, `title:${themeId}`, forms.length);
  return forms[i]!;
}

/** "{titleForm} {World name}", e.g. "The Secret of The Ancient Banyan Forest". */
export function assembleCoverTitle(seed: string, themeId: ThemeId, worldName: string): string {
  return `${pickTitleForm(seed, themeId)} ${worldName}`;
}
