"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import { InkText } from "@/components/book/InkText";
import en from "@/content/i18n/en.json";

/**
 * Part D.3 LANDING — the ink-in headline over the night scene. The CTA
 * itself lives in the Dock (Part D.2); this component is just the copy.
 */
export function Landing() {
  const reduced = useReducedMotion();
  const subhead = (
    <p className="font-serif text-[var(--fs-h2)] italic text-paper">{en.landing.subhead}</p>
  );

  return (
    <div className="flex flex-col items-center gap-5 px-6 text-center">
      <InkText
        lines={[en.landing.headlineLine1, en.landing.headlineLine2, en.landing.headlineLine3]}
        className="font-serif text-[var(--fs-display)] uppercase leading-[1.05] text-paper"
      />
      {reduced ? (
        subhead
      ) : (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}>
          {subhead}
        </m.div>
      )}
    </div>
  );
}
