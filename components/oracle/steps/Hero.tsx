"use client";

import { useId, useState } from "react";
import { useOracleStore } from "@/lib/oracle/store";
import { isValidHeroName, AGE_BANDS } from "@/lib/oracle/validation";
import { HandwrittenInput } from "@/components/oracle/ui/HandwrittenInput";
import { ChoiceGroup } from "@/components/oracle/ui/ChoiceGroup";
import en from "@/content/i18n/en.json";

/** Part D.3 STEP 1 — the left page: live ink, writing the name back as it's typed. */
export function HeroLeftPage() {
  const name = useOracleStore((s) => s.hero.name);
  const sentence = name.trim() ? en.hero.liveInkTemplate.replace("{name}", name.trim()) : en.hero.leftPage;

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">{sentence}</p>
    </div>
  );
}

/** Part D.3 STEP 1 — the right page: the name input and optional age chips. */
export function HeroRightPage() {
  const inputId = useId();
  const name = useOracleStore((s) => s.hero.name);
  const ageBand = useOracleStore((s) => s.hero.ageBand);
  const setHeroName = useOracleStore((s) => s.setHeroName);
  const setHeroAge = useOracleStore((s) => s.setHeroAge);
  const [touched, setTouched] = useState(false);

  const showError = touched && name.length > 0 && !isValidHeroName(name);

  return (
    <div className="flex h-full flex-col justify-center gap-8">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">{en.hero.prompt}</p>
      <HandwrittenInput
        id={inputId}
        label={en.hero.namePlaceholder}
        placeholder={en.hero.namePlaceholder}
        value={name}
        maxLength={20}
        onChange={(e) => setHeroName(e.target.value)}
        onBlur={() => setTouched(true)}
        error={showError ? en.hero.nameError : undefined}
      />
      <div>
        <p className="mb-2 text-[var(--fs-label)] uppercase tracking-label text-ink/60">{en.hero.agePrompt}</p>
        <ChoiceGroup
          groupLabel={en.hero.agePrompt}
          options={AGE_BANDS.map((band) => ({
            value: band,
            label: band,
            content: <span>{band}</span>,
          }))}
          value={ageBand}
          onChange={setHeroAge}
          className="flex gap-2"
          optionClassName="min-h-11 min-w-11 border border-ink/20 px-3 py-1.5 text-[var(--fs-label)] text-ink/80 transition-colors aria-checked:border-kattha aria-checked:bg-ink aria-checked:text-paper"
        />
      </div>
    </div>
  );
}
