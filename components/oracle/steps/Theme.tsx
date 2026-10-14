"use client";

import { useOracleStore } from "@/lib/oracle/store";
import { themeList, themes } from "@/content/themes";
import { ChoiceGroup } from "@/components/oracle/ui/ChoiceGroup";
import { Seal } from "@/components/themes/Seal";
import en from "@/content/i18n/en.json";

/** Part D.3 STEP 4 — the left page recaps progress once a theme is chosen. */
export function ThemeLeftPage() {
  const name = useOracleStore((s) => s.hero.name);
  const themeId = useOracleStore((s) => s.theme);
  const heroName = name.trim() || "Our hero";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">
        {themeId ? `${heroName}'s story has a lesson now: ${themes[themeId].name.toLowerCase()}.` : en.theme.prompt}
      </p>
    </div>
  );
}

/** Part D.3 STEP 4 — five block-print seals, written for the parent reading over a shoulder. */
export function ThemeRightPage() {
  const themeId = useOracleStore((s) => s.theme);
  const selectTheme = useOracleStore((s) => s.selectTheme);

  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">{en.theme.prompt}</p>
      <ChoiceGroup
        groupLabel="Choose a theme"
        options={themeList.map((t) => ({
          value: t.id,
          label: `${t.name}. ${t.parentHint}`,
          content: (
            <div className="flex flex-col items-center gap-2">
              <Seal id={t.id} stamped={themeId === t.id} className="h-12 w-12 text-kattha" />
              <span aria-hidden="true" className="text-[var(--fs-label)] text-ink/70">
                {t.name}
              </span>
            </div>
          ),
        }))}
        value={themeId}
        onChange={selectTheme}
        className="grid grid-cols-5 gap-3"
        optionClassName="p-2 border border-transparent aria-checked:border-kattha"
      />
      <p className="min-h-[1.5em] text-center text-[var(--fs-label)] text-ink/60">
        {themeId ? themes[themeId].parentHint : " "}
      </p>
    </div>
  );
}
