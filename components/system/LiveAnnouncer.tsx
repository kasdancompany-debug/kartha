/** Part 0.7 — announces step changes, e.g. "Chapter two: choose a companion." */
export function LiveAnnouncer({ message }: { message: string }) {
  return (
    <div aria-live="polite" role="status" className="sr-only">
      {message}
    </div>
  );
}
