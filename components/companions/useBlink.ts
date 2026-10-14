"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";

/** Part B.7 — a blink at a random 2.5-6s interval, not a fixed loop, so it reads as alive rather than mechanical. */
export function useBlink(minMs = 2500, maxMs = 6000): boolean {
  const reduced = useReducedMotion();
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let scheduleTimeout: ReturnType<typeof setTimeout>;
    let closeTimeout: ReturnType<typeof setTimeout>;

    function schedule() {
      const delay = minMs + Math.random() * (maxMs - minMs);
      scheduleTimeout = setTimeout(() => {
        setBlinking(true);
        closeTimeout = setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 160);
      }, delay);
    }
    schedule();

    return () => {
      clearTimeout(scheduleTimeout);
      clearTimeout(closeTimeout);
    };
  }, [reduced, minMs, maxMs]);

  return blinking;
}
