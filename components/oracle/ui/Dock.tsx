import type { ReactNode } from "react";
import { DeckleEdge } from "@/components/book/DeckleEdge";

export interface DockProps {
  onBack?: () => void;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  threads?: ReactNode;
  trustLine?: string;
}

/**
 * Part A/D.2 — the persistent dock: back arrow · threads · primary action,
 * always one thumb-tap away, never blocking the art. A deckled paper bar
 * rather than a rounded pill (Part 0.2: no generic rounded-rectangle chrome).
 */
export function Dock({ onBack, primaryLabel, onPrimary, primaryDisabled, threads, trustLine }: DockProps) {
  return (
    <div className="px-4 pb-4 sm:px-8 sm:pb-6">
      <DeckleEdge className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3 bg-paper px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] sm:gap-5 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          aria-label="Back"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-ink disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
            <path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">{threads}</div>
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className="min-h-11 shrink-0 whitespace-nowrap bg-ink px-5 py-3 font-sans text-[var(--fs-label)] uppercase tracking-label text-paper disabled:opacity-40"
        >
          {primaryLabel}
        </button>
      </DeckleEdge>
      {trustLine && <p className="mt-2 text-center text-[var(--fs-label)] text-paper/70">{trustLine}</p>}
    </div>
  );
}
