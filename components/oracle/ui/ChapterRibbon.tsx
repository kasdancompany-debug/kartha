const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toDevanagariNumeral(n: number): string {
  return String(n)
    .split("")
    .map((d) => DEVANAGARI_DIGITS[Number(d)] ?? d)
    .join("");
}

export interface ChapterRibbonProps {
  chapter: number;
  title: string;
  className?: string;
}

/** Part A — the chapter ribbon: Devanagari numerals beside Latin, replacing Zero's "-100 BZ" timeline ruler. */
export function ChapterRibbon({ chapter, title, className }: ChapterRibbonProps) {
  return (
    <p
      className={`text-center text-[var(--fs-label)] uppercase tracking-label text-paper/80 ${className ?? ""}`}
    >
      <span lang="hi" className="mr-2 font-serif text-[1.05em] normal-case tracking-normal">
        अध्याय {toDevanagariNumeral(chapter)}
      </span>
      <span aria-hidden="true">·</span> {title}
    </p>
  );
}
