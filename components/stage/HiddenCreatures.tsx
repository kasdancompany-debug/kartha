"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import { hiddenCreatures } from "./creatureDefs";

export interface HiddenCreaturesProps {
  /** Fired once per creature, the first time it's found — Landing uses this for the thread-glint reward. */
  onFound?: (id: string) => void;
}

/**
 * Part D.3 — the video-game easter-egg layer: a tiger's eyes, an owl, a
 * peacock's tail hidden in the hills (drawn by Backdrop at the same shared
 * coordinates). This layer only adds the tappable hotspot and the reward —
 * real accessible buttons, not a canvas hit-test, so keyboard/VoiceOver
 * users can find them too.
 */
export function HiddenCreatures({ onFound }: HiddenCreaturesProps) {
  const reduced = useReducedMotion();
  const [found, setFound] = useState<Set<string>>(new Set());

  function handleFind(id: string) {
    if (found.has(id)) return;
    setFound((prev) => new Set(prev).add(id));
    onFound?.(id);
  }

  return (
    <div className="absolute inset-0">
      {hiddenCreatures.map((creature) => {
        const isFound = found.has(creature.id);
        return (
          <button
            key={creature.id}
            type="button"
            onClick={() => handleFind(creature.id)}
            aria-pressed={isFound}
            className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-none bg-transparent"
            style={{ left: `${creature.xPercent}%`, top: `${creature.yPercent}%` }}
          >
            <span className="sr-only">{isFound ? `Found ${creature.label.toLowerCase()}` : `Find ${creature.label.toLowerCase()}`}</span>
            {isFound && reduced && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute h-2 w-2 rounded-full bg-turmeric opacity-70"
              />
            )}
            {!reduced && (
              <AnimatePresence>
                {isFound && (
                  <m.span
                    aria-hidden="true"
                    initial={{ scale: 0, opacity: 0.9 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="pointer-events-none absolute h-3 w-3 rounded-full"
                    style={{ background: "radial-gradient(circle, #e0a526 0%, transparent 70%)" }}
                  />
                )}
              </AnimatePresence>
            )}
          </button>
        );
      })}
    </div>
  );
}
