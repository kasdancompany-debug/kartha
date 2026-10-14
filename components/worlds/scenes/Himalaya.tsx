import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: Pahari/Kangra-trained miniaturist. See ART_MANIFEST.md
export function HimalayaWindow({ className }: { className?: string }) {
  const kit = worlds.himalaya;
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "peaks-far": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M0,70 L25,38 L40,55 L55,30 L75,58 L100,42 L100,100 L0,100 Z" fill={kit.palette.accent} opacity={0.55} />
            <path d="M55,30 L60,38 L50,38 Z" fill={kit.palette.paper} opacity={0.8} />
            <path d="M25,38 L29,45 L21,45 Z" fill={kit.palette.paper} opacity={0.8} />
          </svg>
        ),
        "mist-band": (
          <div
            aria-hidden="true"
            className="absolute inset-x-0"
            style={{
              top: "48%",
              height: "14%",
              background: `linear-gradient(to bottom, transparent, ${kit.palette.paper}55, transparent)`,
            }}
          />
        ),
        "terraced-fields": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {[62, 70, 78, 86].map((y, i) => (
              <path
                key={y}
                d={`M0,${y} L${30 + i * 15},${y - 4} L100,${y - 10}`}
                stroke={kit.palette.accent}
                strokeWidth={0.8}
                fill="none"
                opacity={0.4}
              />
            ))}
          </svg>
        ),
        "deodar-forest": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {[12, 24, 70, 84].map((x) => (
              <path key={x} d={`M${x},92 L${x - 4},80 L${x + 4},80 Z`} fill={kit.palette.accent} opacity={0.7} />
            ))}
          </svg>
        ),
        "village-roofs": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M42,96 L48,88 L54,96 Z M58,97 L63,91 L68,97 Z" fill={kit.palette.accent2} opacity={0.8} />
            <path d="M80,20 L86,22 L80,24" stroke={kit.palette.ink} strokeWidth={0.8} fill="none" opacity={0.6} />
          </svg>
        ),
      }}
    />
  );
}
