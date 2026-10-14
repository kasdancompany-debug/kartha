import type { ReactNode } from "react";

export interface SpreadProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}

/** Part D.2 — desktop's full open spread: two pages either side of the spine shadow. */
export function Spread({ left, right, className }: SpreadProps) {
  return (
    <div className={`relative flex h-full w-full ${className ?? ""}`}>
      <div className="relative h-full w-1/2">{left}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-6 -translate-x-1/2 bg-gradient-to-r from-black/25 via-black/10 to-black/25"
      />
      <div className="relative h-full w-1/2">{right}</div>
    </div>
  );
}
