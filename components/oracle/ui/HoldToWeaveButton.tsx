"use client";

import { useCallback, useRef, useState } from "react";

export interface HoldToWeaveButtonProps {
  onComplete: () => void;
  label: string;
  durationMs?: number;
}

const SIZE = 88;
const STROKE = 3;
const RADIUS = SIZE / 2 - STROKE * 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Part D.3 WEAVE — the one circular element the design system allows
 * (`--ring-hold-to-weave` in tokens.css is this button's reserved exception
 * to "no rounded rectangles anywhere"). Holding fills the ring over
 * `durationMs`; releasing early cancels and snaps back to empty.
 */
export function HoldToWeaveButton({ onComplete, label, durationMs = 1600 }: HoldToWeaveButtonProps) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startRef.current = null;
    setProgress(0);
  }, []);

  const start = useCallback(() => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now);
      const t = Math.min(1, elapsed / durationMs);
      setProgress(t);
      if (t >= 1) {
        frameRef.current = null;
        onComplete();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [durationMs, onComplete]);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      className="relative flex h-24 w-24 shrink-0 touch-none items-center justify-center bg-ink/5 text-ink [border-radius:var(--ring-hold-to-weave)]"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="currentColor" strokeWidth={STROKE} opacity={0.15} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--kattha)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className="font-sans text-[var(--fs-label)] uppercase tracking-label">Hold</span>
    </button>
  );
}
