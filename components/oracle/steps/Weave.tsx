"use client";

import { useOracleStore } from "@/lib/oracle/store";
import { companions } from "@/content/companions";
import { worlds } from "@/content/worlds";
import { themes } from "@/content/themes";
import { CompanionRig } from "@/components/companions/CompanionRig";
import { HoldToWeaveButton } from "@/components/oracle/ui/HoldToWeaveButton";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import en from "@/content/i18n/en.json";

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

/** Part D.3 STEP 5 — the static summary ("all four threads are woven"). */
export function WeaveLeftPage() {
  const name = useOracleStore((s) => s.hero.name);
  const companion = useOracleStore((s) => s.companion);
  const world = useOracleStore((s) => s.world);
  const theme = useOracleStore((s) => s.theme);
  const heroName = name.trim() || "Our hero";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      {companion && (
        <CompanionRig id={companion} worldId={world} pose="chosen" className="h-24 w-24" />
      )}
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">
        {heroName}
        {companion ? `. ${article(companions[companion].name)} ${companions[companion].name.toLowerCase()}` : ""}
        {world ? `. ${worlds[world].name}` : ""}
        {theme ? `. And a lesson about ${themes[theme].name.toLowerCase()}` : ""}.
      </p>
    </div>
  );
}

export interface WeaveRightPageProps {
  /** Called once the weaving completes — by the hold gesture, the reduced-motion fallback, or Skip. */
  onWeave: (skippedAnimation: boolean) => void;
}

/** Part D.3 STEP 5 — press-and-hold ring (or a plain button under reduced motion) that hands off to the page riffle + cover reveal. */
export function WeaveRightPage({ onWeave }: WeaveRightPageProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <p className="font-serif text-[var(--fs-h2)] italic text-ink/70">{en.weave.holdPrompt}</p>
      {reduced ? (
        <button
          type="button"
          onClick={() => onWeave(true)}
          className="min-h-11 bg-ink px-6 py-3 font-sans text-[var(--fs-label)] uppercase tracking-label text-paper"
        >
          {en.weave.buttonFallback}
        </button>
      ) : (
        <>
          <HoldToWeaveButton label={en.weave.buttonFallback} onComplete={() => onWeave(false)} />
          <button
            type="button"
            onClick={() => onWeave(true)}
            className="text-[var(--fs-label)] uppercase tracking-label text-ink/50 underline"
          >
            {en.weave.skip}
          </button>
        </>
      )}
    </div>
  );
}
