import { ThresholdMark } from "./ThresholdMark";
import { Wordmark } from "./Wordmark";

export interface LockupProps {
  variant?: "full" | "wordmark" | "symbol";
  size?: number;
  className?: string;
}

/**
 * Part B.2 — the three brand variants: full lockup (symbol + KATHA + कथा),
 * wordmark only, symbol only (favicon, app icon, share-card watermark).
 */
export function Lockup({ variant = "full", size = 48, className }: LockupProps) {
  if (variant === "symbol") {
    return <ThresholdMark size={size} className={className} />;
  }

  if (variant === "wordmark") {
    return (
      <span className={`inline-flex flex-col gap-1 ${className ?? ""}`}>
        <Wordmark lang="en" className="text-[var(--fs-h2)]" />
        <Wordmark lang="hi" className="text-[var(--fs-body)] opacity-70" />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-4 ${className ?? ""}`}>
      <ThresholdMark size={size} />
      <span className="inline-flex flex-col gap-1">
        <Wordmark lang="en" className="text-[var(--fs-h2)]" />
        <Wordmark lang="hi" className="text-[var(--fs-body)] opacity-70" />
      </span>
    </span>
  );
}
