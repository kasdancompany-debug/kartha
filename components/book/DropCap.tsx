import type { ReactNode } from "react";

export interface DropCapProps {
  children: ReactNode;
  className?: string;
}

/**
 * Part B.4 — drop cap on the first word of each chapter, in --kattha.
 * Styled via ::first-letter (globals.css) rather than manually splitting the
 * text, so the real sentence stays intact for screen readers — no risk of
 * the opening letter going missing or duplicated from the accessible text.
 */
export function DropCap({ children, className }: DropCapProps) {
  return <p className={`drop-cap ${className ?? ""}`}>{children}</p>;
}
