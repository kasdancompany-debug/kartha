"use client";

import { useState } from "react";
import { useOracleStore } from "@/lib/oracle/store";
import { companionList, companions } from "@/content/companions";
import { ChoiceGroup } from "@/components/oracle/ui/ChoiceGroup";
import { CompanionRig } from "@/components/companions/CompanionRig";
import en from "@/content/i18n/en.json";

/** Part D.3 STEP 2 — the left page: the hero's silhouette gains a companion once chosen. */
export function CompanionLeftPage() {
  const name = useOracleStore((s) => s.hero.name);
  const companionId = useOracleStore((s) => s.companion);
  const heroName = name.trim() || "Our hero";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      {companionId ? (
        <>
          <CompanionRig id={companionId} pose="chosen" className="h-28 w-28" />
          <p className="font-serif text-[var(--fs-body)] text-ink/80">
            {heroName} and {companions[companionId].name.toLowerCase()} — together now.
          </p>
        </>
      ) : (
        <p className="font-serif text-[var(--fs-h2)] italic text-ink/70">{en.companion.prompt}</p>
      )}
    </div>
  );
}

/** Part D.3 STEP 2 — the right page: the five companions as an accessible radiogroup. */
export function CompanionRightPage() {
  const companionId = useOracleStore((s) => s.companion);
  const selectCompanion = useOracleStore((s) => s.selectCompanion);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const captionId = hoveredId ?? companionId;
  const caption = captionId ? companions[captionId as keyof typeof companions].personalityLine : " ";

  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">{en.companion.prompt}</p>
      <ChoiceGroup
        groupLabel="Choose a companion"
        options={companionList.map((c) => ({
          value: c.id,
          label: `${c.name}. ${c.personalityLine}`,
          content: (
            <div
              className="flex flex-col items-center gap-2 p-2"
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId((h) => (h === c.id ? null : h))}
              onFocus={() => setHoveredId(c.id)}
              onBlur={() => setHoveredId((h) => (h === c.id ? null : h))}
            >
              <CompanionRig id={c.id} hovered={hoveredId === c.id} className="h-16 w-16" />
              <span aria-hidden="true" className="text-[var(--fs-label)] text-ink/70">
                {c.name}
              </span>
            </div>
          ),
        }))}
        value={companionId}
        onChange={selectCompanion}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
        optionClassName="shrink-0 snap-center border border-transparent aria-checked:border-kattha"
      />
      <p className="min-h-[1.5em] text-center text-[var(--fs-label)] text-ink/60">{caption}</p>
    </div>
  );
}
