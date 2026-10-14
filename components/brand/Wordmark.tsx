export interface WordmarkProps {
  /** "en" renders the Latin KATHA logotype; "hi" renders कथा in the story serif. */
  lang?: "en" | "hi";
  className?: string;
}

/**
 * Part B.2/B.4 — set in the display serif, tracked +6%. The Latin wordmark's
 * final A has its crossbar replaced by a thin path line: the literal
 * character stays in the DOM (text-transparent, so screen readers/SEO still
 * see "KATHA"), a hand-drawn glyph paints over it visually.
 */
export function Wordmark({ lang = "en", className }: WordmarkProps) {
  if (lang === "hi") {
    return (
      <span lang="hi" className={`font-serif ${className ?? ""}`}>
        कथा
      </span>
    );
  }

  return (
    <span className={`font-serif tracking-wordmark inline-flex items-baseline ${className ?? ""}`}>
      KATH
      <span className="relative inline-block" style={{ lineHeight: 1 }}>
        <span className="text-transparent">A</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 70 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M5,98 L34,4 L63,98"
            fill="none"
            stroke="currentColor"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16,64 L52,64" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
