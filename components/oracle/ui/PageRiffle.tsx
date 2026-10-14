export interface PageRiffleProps {
  /** 0 = hidden, 1 = fully turned. Driven externally with the same tween() helper Landing's camera push uses. */
  progress: number;
}

const PAGE_COUNT = 5;

/**
 * Part D.3 WEAVE -> REVEAL — a quick flutter of pages closing, standing in
 * for "the book shutting" between the Weaving and the cover reveal. Purely
 * presentational; OracleExperience owns the timing and only renders this
 * when motion is allowed (reduced-motion skips straight to Reveal).
 */
export function PageRiffle({ progress }: PageRiffleProps) {
  if (progress <= 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" style={{ perspective: 1600 }} aria-hidden="true">
      {Array.from({ length: PAGE_COUNT }, (_, i) => {
        const start = i / PAGE_COUNT;
        const local = Math.max(0, Math.min(1, (progress - start) * PAGE_COUNT));
        return (
          <div
            key={i}
            className="paper-texture absolute inset-0 bg-paper"
            style={{
              transformOrigin: "right center",
              transform: `rotateY(${local * -110}deg)`,
              opacity: local >= 1 ? 0 : 1,
              boxShadow: "-12px 0 30px rgba(0,0,0,0.35)",
            }}
          />
        );
      })}
    </div>
  );
}
