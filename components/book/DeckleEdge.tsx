import type { CSSProperties, ReactNode } from "react";

const DECKLE_PATH =
  "polygon(1% 2%, 11% 0%, 28% 2%, 46% 0%, 63% 2%, 79% 0%, 93% 2%, 100% 8%, 98% 28%, 100% 52%, 97% 76%, 100% 95%, 86% 100%, 61% 97%, 41% 100%, 19% 97%, 0% 100%, 2% 71%, 0% 44%, 2% 19%)";

export interface DeckleEdgeProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Part B.5 — torn-paper edge via clipPath. No rounded rectangles anywhere except the hold-to-weave ring. */
export function DeckleEdge({ className, style, children }: DeckleEdgeProps) {
  return (
    <div className={className} style={{ ...style, clipPath: DECKLE_PATH }}>
      {children}
    </div>
  );
}
