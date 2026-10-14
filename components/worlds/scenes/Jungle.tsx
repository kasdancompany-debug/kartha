import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: Mithila artist (Bihar). See ART_MANIFEST.md
export function JungleWindow({ className }: { className?: string }) {
  const kit = worlds.jungle;
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "canopy-pattern": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {Array.from({ length: 24 }, (_, i) => i).map((i) => (
              <circle key={i} cx={(i * 17) % 100} cy={(i * 29) % 100} r={0.6} fill={kit.palette.accent} opacity={0.2} />
            ))}
          </svg>
        ),
        "double-line-border": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={6} y={6} width={88} height={88} fill="none" stroke={kit.palette.accent} strokeWidth={1.2} opacity={0.6} />
            <rect x={10} y={10} width={80} height={80} fill="none" stroke={kit.palette.accent} strokeWidth={1.2} opacity={0.6} />
          </svg>
        ),
        "trees-birds": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M50,30 L50,60 M44,40 L50,45 L56,40" stroke={kit.palette.accent} strokeWidth={1.5} fill="none" />
            <path d="M26,24 L30,20 L34,24" stroke={kit.palette.ink} strokeWidth={1} fill="none" opacity={0.6} />
          </svg>
        ),
        hornbill: (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M30,70 Q50,55 70,70 Q50,80 30,70 Z" fill={kit.palette.accent2} opacity={0.6} />
          </svg>
        ),
        "hidden-eyes": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {([[20, 50], [76, 36], [60, 82]] as const).map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle
                  cx={x - 1}
                  cy={y}
                  r={0.5}
                  fill={kit.palette.ink}
                  opacity={0.7}
                  style={{ animation: "katha-blink 7s ease-in-out infinite" }}
                />
                <circle
                  cx={x + 1}
                  cy={y}
                  r={0.5}
                  fill={kit.palette.ink}
                  opacity={0.7}
                  style={{ animation: "katha-blink 7s ease-in-out infinite" }}
                />
              </g>
            ))}
          </svg>
        ),
      }}
    />
  );
}
