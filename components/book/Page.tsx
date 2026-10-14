import type { ReactNode } from "react";
import { PaperTexture } from "@/components/stage/PaperTexture";
import { DeckleEdge } from "./DeckleEdge";

export interface PageProps {
  children?: ReactNode;
  className?: string;
  deckle?: boolean;
}

/** Part B.5 — a single paper surface: texture + optional deckled edge + content. */
export function Page({ children, className, deckle = true }: PageProps) {
  const surface = (
    <div className={`relative h-full w-full overflow-hidden bg-paper ${className ?? ""}`}>
      <PaperTexture />
      <div className="relative z-10 h-full w-full overflow-y-auto p-6 sm:p-10">{children}</div>
    </div>
  );

  return deckle ? <DeckleEdge className="h-full w-full">{surface}</DeckleEdge> : surface;
}
