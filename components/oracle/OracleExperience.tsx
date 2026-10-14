"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { Stage } from "@/components/stage/Stage";
import { requestTiltPermission } from "@/components/stage/useParallaxOffset";
import { Book, type BookHandle, type BookSpread } from "@/components/book/Book";
import { Dock } from "@/components/oracle/ui/Dock";
import { StoryThreads } from "@/components/oracle/ui/StoryThreads";
import { ChapterRibbon } from "@/components/oracle/ui/ChapterRibbon";
import { LiveAnnouncer } from "@/components/system/LiveAnnouncer";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import { Landing } from "./steps/Landing";
import { HeroLeftPage, HeroRightPage } from "./steps/Hero";
import { CompanionLeftPage, CompanionRightPage } from "./steps/Companion";
import { WorldLeftPage, WorldRightPage } from "./steps/World";
import { ThemeLeftPage, ThemeRightPage } from "./steps/Theme";
import { WeaveLeftPage, WeaveRightPage } from "./steps/Weave";
import { Reveal } from "./steps/Reveal";
import { PageRiffle } from "@/components/oracle/ui/PageRiffle";
import { useOracleStore, BOOK_STEPS, type Step } from "@/lib/oracle/store";
import { isValidHeroName } from "@/lib/oracle/validation";
import { track } from "@/lib/analytics";
import { useDeviceTier } from "@/lib/device/tier";
import type { WorldId } from "@/content/worlds";
import en from "@/content/i18n/en.json";

function tween(durationMs: number, onUpdate: (t: number) => void): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    function frame(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      onUpdate(t);
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

const CHAPTER_TITLES: Record<string, string> = {
  hero: "Chapter One",
  companion: "Chapter Two",
  world: "Chapter Three",
  theme: "Chapter Four",
  weaving: "Chapter Five",
};

const ANNOUNCEMENTS: Record<Step, string> = {
  landing: "",
  hero: "Chapter one: name your hero.",
  companion: "Chapter two: choose a companion.",
  world: "Chapter three: choose a world.",
  theme: "Chapter four: choose a lesson.",
  weaving: "Chapter five: the threads are woven.",
  reveal: en.reveal.announcement,
  result: "",
};

/**
 * Part D — the Oracle's persistent stage. Phases 3-4 wired Hero -> Companion
 * -> World -> Theme and the world/companion art. Phase 5 adds the real
 * hold-to-weave gesture, the page-riffle hand-off, and the cover reveal;
 * Result (pricing, sharing, commerce) is still a later phase.
 */
export function OracleExperience() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const store = useOracleStore();
  const [hydrated, setHydrated] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);
  const [riffleProgress, setRiffleProgress] = useState(0);
  const [worldPreview, setWorldPreview] = useState<WorldId | undefined>(undefined);
  const bookRef = useRef<BookHandle>(null);

  useEffect(() => {
    useOracleStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  async function handleBegin() {
    track({ name: "story_started" });
    await requestTiltPermission();
    if (reduced) {
      store.next();
      return;
    }
    await tween(900, (t) => setPushProgress(1 - (1 - t) ** 3));
    store.next();
  }

  function handleBackFromHero() {
    store.back();
    if (reduced) {
      setPushProgress(0);
    } else {
      void tween(500, (t) => setPushProgress(1 - t));
    }
  }

  function handleContinue() {
    if (store.step === "hero") {
      track({ name: "hero_created", props: { has_age: !!store.hero.ageBand, age_band: store.hero.ageBand } });
    } else if (store.step === "companion" && store.companion) {
      track({ name: "companion_selected", props: { companion: store.companion } });
    } else if (store.step === "world" && store.world) {
      track({ name: "world_selected", props: { world: store.world } });
    } else if (store.step === "theme" && store.theme) {
      track({ name: "theme_selected", props: { theme: store.theme } });
    }
    bookRef.current?.next();
  }

  async function handleWeaveComplete(skippedAnimation: boolean) {
    if (store.companion && store.world && store.theme) {
      track({
        name: "story_completed",
        props: { companion: store.companion, world: store.world, theme: store.theme, skipped_animation: skippedAnimation, tier },
      });
    }
    if (reduced || skippedAnimation) {
      store.next();
      return;
    }
    await tween(650, setRiffleProgress);
    setRiffleProgress(0);
    store.next();
  }

  function handleReplay() {
    store.goToStep("weaving");
  }

  function isCurrentStepValid(): boolean {
    switch (store.step) {
      case "hero":
        return isValidHeroName(store.hero.name);
      case "companion":
        return !!store.companion;
      case "world":
        return !!store.world;
      case "theme":
        return !!store.theme;
      default:
        return false;
    }
  }

  if (!hydrated) return null;

  const isLanding = store.step === "landing";
  const isReveal = store.step === "reveal";
  const bookIndex = BOOK_STEPS.indexOf(store.step);
  const threadsProgress = isReveal ? BOOK_STEPS.length : Math.max(0, bookIndex);
  const spreads: BookSpread[] = [
    { left: <HeroLeftPage />, right: <HeroRightPage /> },
    { left: <CompanionLeftPage />, right: <CompanionRightPage /> },
    { left: <WorldLeftPage />, right: <WorldRightPage onPreview={setWorldPreview} /> },
    { left: <ThemeLeftPage />, right: <ThemeRightPage /> },
    { left: <WeaveLeftPage />, right: <WeaveRightPage onWeave={handleWeaveComplete} /> },
  ];

  const primaryLabel = isLanding
    ? en.landing.cta
    : isReveal
      ? en.reveal.replay
      : store.step === "weaving"
        ? "Weave my story"
        : "Continue";
  const primaryDisabled = isLanding || isReveal ? false : store.step === "weaving" ? true : !isCurrentStepValid();
  const onPrimary = isLanding ? handleBegin : isReveal ? handleReplay : handleContinue;
  const onBack = isLanding ? undefined : isReveal ? () => store.back() : store.step === "hero" ? handleBackFromHero : () => bookRef.current?.prev();

  return (
    <>
      <Stage
        pushProgress={pushProgress}
        showHiddenCreatures={isLanding}
        worldTint={worldPreview ?? store.world}
        dock={
          <Dock
            onBack={onBack}
            primaryLabel={primaryLabel}
            onPrimary={onPrimary}
            primaryDisabled={primaryDisabled}
            threads={<StoryThreads progress={threadsProgress} />}
            trustLine={isLanding ? en.landing.trustLine : undefined}
          />
        }
      >
        <LiveAnnouncer message={ANNOUNCEMENTS[store.step]} />
        {isLanding ? (
          <Landing />
        ) : isReveal ? (
          <Reveal />
        ) : (
          <m.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.6, 0.05, 0.2, 1] }}
            className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-4"
          >
            <ChapterRibbon chapter={bookIndex + 1} title={CHAPTER_TITLES[store.step] ?? ""} />
            <Book
              ref={bookRef}
              spreads={spreads}
              index={bookIndex}
              onPositionChange={(i) => store.goToStep(BOOK_STEPS[i] ?? "hero")}
            />
          </m.div>
        )}
      </Stage>
      <PageRiffle progress={riffleProgress} />
    </>
  );
}
