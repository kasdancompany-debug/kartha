"use client";

import { useOracleStore } from "@/lib/oracle/store";
import { companions } from "@/content/companions";
import { worlds } from "@/content/worlds";
import { pickEpithet, assembleCoverTitle } from "@/lib/oracle/weave";
import { CompanionRig } from "@/components/companions/CompanionRig";
import { Seal } from "@/components/themes/Seal";
import { DeckleEdge } from "@/components/book/DeckleEdge";
import en from "@/content/i18n/en.json";

function template(str: string, values: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

/**
 * Part D.3 WEAVE -> REVEAL — the cover reveal: a full-screen takeover (like
 * Landing) rather than a book page, since this is the payoff that breaks
 * out of the page-turning metaphor. The hold-to-weave sequence and the
 * page riffle both hand off here; the Result screen (pricing, sharing,
 * commerce) is a later phase — this is as far as Phase 5 goes.
 */
export function Reveal() {
  const name = useOracleStore((s) => s.hero.name);
  const companionId = useOracleStore((s) => s.companion);
  const worldId = useOracleStore((s) => s.world);
  const themeId = useOracleStore((s) => s.theme);
  const seed = useOracleStore((s) => s.seed);

  if (!companionId || !worldId || !themeId || !seed) return null;

  const heroName = name.trim() || "Our hero";
  const kit = worlds[worldId];
  const companion = companions[companionId];
  const epithet = pickEpithet(seed, companionId);
  const title = assembleCoverTitle(seed, themeId, kit.name);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <DeckleEdge
        className="relative aspect-[3/4] w-full max-w-sm overflow-hidden"
        style={{ background: kit.palette.bg }}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between gap-4 p-6 text-center">
          <p className="font-hand text-2xl" style={{ color: kit.palette.accent2 }}>
            {template(en.reveal.caveatLine, { name: heroName })}
          </p>
          <div className="flex flex-col items-center gap-3">
            <CompanionRig id={companionId} worldId={worldId} pose="cover" className="h-28 w-28" />
            <h2 className="font-serif text-[var(--fs-h1)]" style={{ color: kit.palette.ink }}>
              {title}
            </h2>
            <p className="font-serif text-[var(--fs-body)] italic" style={{ color: kit.palette.ink }}>
              {template(en.reveal.subtitleTemplate, {
                name: heroName,
                epithet: epithet.label,
                animal: companion.name.toLowerCase(),
              })}
            </p>
          </div>
          <div style={{ color: kit.palette.accent2 }}>
            <Seal id={themeId} stamped className="h-12 w-12" />
          </div>
        </div>
      </DeckleEdge>
    </div>
  );
}
