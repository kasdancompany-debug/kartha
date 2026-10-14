export function PaperTexture({ className }: { className?: string }) {
  return <div className={`paper-texture pointer-events-none ${className ?? ""}`} aria-hidden="true" />;
}
