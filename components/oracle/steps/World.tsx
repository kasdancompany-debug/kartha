"use client";

import { useOracleStore } from "@/lib/oracle/store";
import { worldList, type WorldId } from "@/content/worlds";
import { ChoiceGroup } from "@/components/oracle/ui/ChoiceGroup";
import { BanyanWindow } from "@/components/worlds/scenes/Banyan";
import { HimalayaWindow } from "@/components/worlds/scenes/Himalaya";
import { StepwellWindow } from "@/components/worlds/scenes/Stepwell";
import { MonsoonWindow } from "@/components/worlds/scenes/Monsoon";
import { ObservatoryWindow } from "@/components/worlds/scenes/Observatory";
import { JungleWindow } from "@/components/worlds/scenes/Jungle";
import en from "@/content/i18n/en.json";

const WINDOWS: Record<WorldId, React.ComponentType<{ className?: string }>> = {
  banyan: BanyanWindow,
  himalaya: HimalayaWindow,
  stepwell: StepwellWindow,
  monsoon: MonsoonWindow,
  observatory: ObservatoryWindow,
  jungle: JungleWindow,
};

/** Part D.3 STEP 3 — the left page just recaps progress so far. */
export function WorldLeftPage() {
  const name = useOracleStore((s) => s.hero.name);
  const worldId = useOracleStore((s) => s.world);
  const heroName = name.trim() || "Our hero";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">
        {worldId ? `${heroName} has found a world.` : en.world.prompt}
      </p>
    </div>
  );
}

export interface WorldRightPageProps {
  onPreview?: (id: WorldId | undefined) => void;
}

/** Part D.3 STEP 3 — six windows; hovering/choosing one changes the stage behind the book. */
export function WorldRightPage({ onPreview }: WorldRightPageProps) {
  const worldId = useOracleStore((s) => s.world);
  const selectWorld = useOracleStore((s) => s.selectWorld);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <p className="font-serif text-[var(--fs-h2)] text-ink/90">{en.world.prompt}</p>
      <ChoiceGroup
        groupLabel="Choose a world"
        options={worldList.map((kit) => {
          const Window = WINDOWS[kit.id];
          return {
            value: kit.id,
            label: kit.name,
            content: (
              <div
                onMouseEnter={() => onPreview?.(kit.id)}
                onMouseLeave={() => onPreview?.(undefined)}
                onFocus={() => onPreview?.(kit.id)}
                onBlur={() => onPreview?.(undefined)}
                className="flex flex-col items-center gap-1"
              >
                <Window className="w-full" />
                <span aria-hidden="true" className="text-[var(--fs-label)] text-ink/70">
                  {kit.name}
                </span>
              </div>
            ),
          };
        })}
        value={worldId}
        onChange={selectWorld}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        optionClassName="border border-transparent p-1 aria-checked:border-kattha"
      />
    </div>
  );
}
