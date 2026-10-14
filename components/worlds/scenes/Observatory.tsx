import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: Deccani-miniature-trained artist. See ART_MANIFEST.md
export function ObservatoryWindow({ className }: { className?: string }) {
  const kit = worlds.observatory;
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "night-sky": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="observatory-vignette" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={kit.palette.accent2} stopOpacity={0.15} />
                <stop offset="100%" stopColor={kit.palette.accent2} stopOpacity={0} />
              </linearGradient>
            </defs>
            <rect width={100} height={100} fill="url(#observatory-vignette)" />
          </svg>
        ),
        "horizon-instruments": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M8,92 L8,70 L14,70 L14,92 Z M88,92 L88,74 L94,74 L94,92 Z" fill={kit.palette.accent} opacity={0.35} />
          </svg>
        ),
        "sundial-instrument": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M20,90 L20,40 Q50,20 80,40 L80,90 Z" fill="none" stroke={kit.palette.accent} strokeWidth={2} opacity={0.7} />
            <line x1={50} y1={30} x2={50} y2={90} stroke={kit.palette.accent} strokeWidth={1.5} opacity={0.7} />
            <circle cx={50} cy={30} r={3} fill={kit.palette.accent} opacity={0.8} />
          </svg>
        ),
        "steps-platform": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={14} y={90} width={72} height={6} fill={kit.palette.accent} opacity={0.3} />
            {[22, 38, 62, 78].map((x) => (
              <circle key={x} cx={x} cy={93} r={0.6} fill={kit.palette.accent2} opacity={0.8} />
            ))}
          </svg>
        ),
        comet: (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M70,8 L84,18" stroke={kit.palette.paper} strokeWidth={0.6} opacity={0.5} strokeLinecap="round" />
            <circle cx={84} cy={18} r={1} fill={kit.palette.paper} opacity={0.8} />
          </svg>
        ),
      }}
    />
  );
}
