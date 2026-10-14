"use client";

import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { m, useMotionValue, useTransform, animate, type PanInfo } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";

export interface PageTurnHandle {
  commit: () => Promise<void>;
  cancel: () => Promise<void>;
}

export interface PageTurnProps {
  /** Content showing before the turn starts. */
  front: ReactNode;
  /** Content revealed on the back of this same leaf once the turn completes. */
  back: ReactNode;
  /** 'left' = this leaf turns away forward (next); 'right' = it turns back (prev). */
  pivot: "left" | "right";
  onCommit: () => void;
  onCancel?: () => void;
  className?: string;
}

const TURN_TRANSITION = { duration: 0.7, ease: [0.6, 0.05, 0.2, 1] as const };

/**
 * Part D.2 — the physical page-turn: a single leaf with two faces (front/
 * back), rotated around the spine edge. Dragging maps finger position
 * straight to rotation (drag="x" mapped to rotation, Part A); releasing
 * past 35% commits the turn, short of that springs back.
 */
export const PageTurn = forwardRef<PageTurnHandle, PageTurnProps>(function PageTurn(
  { front, back, pivot, onCommit, onCancel, className },
  ref,
) {
  const reduced = useReducedMotion();
  const sign = pivot === "left" ? -1 : 1;
  const progress = useMotionValue(0); // 0 = flat, 1 = fully turned
  const rotateY = useTransform(progress, (p) => p * sign * 180);
  const shadowOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.5, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    async commit() {
      await animate(progress, 1, reduced ? { duration: 0.001 } : TURN_TRANSITION);
      onCommit();
    },
    async cancel() {
      await animate(progress, 0, reduced ? { duration: 0.001 } : TURN_TRANSITION);
      onCancel?.();
    },
  }));

  function handleDrag(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const width = containerRef.current?.offsetWidth ?? 320;
    const delta = (sign === -1 ? -info.offset.x : info.offset.x) / width;
    progress.set(Math.max(0, Math.min(1, delta)));
  }

  function handleDragEnd() {
    if (progress.get() > 0.35) {
      animate(progress, 1, TURN_TRANSITION).then(onCommit);
    } else {
      animate(progress, 0, TURN_TRANSITION).then(() => onCancel?.());
    }
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`} style={{ perspective: 2400 }}>
      <m.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: pivot === "left" ? "left center" : "right center",
          rotateY: reduced ? 0 : rotateY,
        }}
        drag={reduced ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
        {!reduced && (
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: shadowOpacity,
              background:
                pivot === "left"
                  ? "linear-gradient(to right, transparent 60%, rgba(0,0,0,0.5) 100%)"
                  : "linear-gradient(to left, transparent 60%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        )}
      </m.div>
    </div>
  );
});
