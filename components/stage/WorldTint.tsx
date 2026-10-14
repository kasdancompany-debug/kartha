import { worlds, type WorldId } from "@/content/worlds";

export interface WorldTintProps {
  worldId?: WorldId;
}

/**
 * Part D.3 STEP 3 — "hover/focus -> the whole stage backdrop cross-dissolves
 * into that world." A full palette re-illustration per world is a later
 * craft pass; this cross-fades a tint over the night scene so the room
 * still visibly changes the moment a world is previewed or chosen.
 */
export function WorldTint({ worldId }: WorldTintProps) {
  const kit = worldId ? worlds[worldId] : undefined;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{
        opacity: kit ? 1 : 0,
        background: kit ? `linear-gradient(to bottom, ${kit.palette.bg}cc, ${kit.palette.accent}55)` : undefined,
      }}
    />
  );
}
