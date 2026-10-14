const THREAD_COLORS = ["var(--kattha)", "var(--leaf)", "var(--indigo)", "var(--turmeric)", "var(--laterite)"];
const THREAD_NAMES = ["Hero", "Companion", "World", "Lesson", "Magic"];

export interface StoryThreadsProps {
  /** How many of the five threads (hero, companion, world, lesson, magic) are woven in. */
  progress?: number;
  className?: string;
}

/** Part A/D.2 — the five coloured threads that replace a game's XP counter. */
export function StoryThreads({ progress = 0, className }: StoryThreadsProps) {
  return (
    <div
      role="img"
      aria-label={`Story progress: ${progress} of ${THREAD_NAMES.length} threads woven (${THREAD_NAMES.join(", ")})`}
      className={`flex items-center justify-center gap-2 ${className ?? ""}`}
    >
      {THREAD_COLORS.map((color, i) => (
        <span
          key={THREAD_NAMES[i]}
          aria-hidden="true"
          className="h-1 w-6 rounded-full transition-colors duration-500 sm:w-8"
          style={{ background: i < progress ? color : "var(--paper-shade)" }}
        />
      ))}
    </div>
  );
}
