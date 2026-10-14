export type AgeBand = "3-4" | "5-6" | "7-8" | "9-10";

export const AGE_BANDS: AgeBand[] = ["3-4", "5-6", "7-8", "9-10"];

// Part D.1 — 1-20 chars, Unicode letters, spaces, hyphen, apostrophe.
const NAME_PATTERN = /^[\p{L}][\p{L}\p{M}'’\- ]{0,19}$/u;

export function isValidHeroName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 20 && NAME_PATTERN.test(trimmed);
}
