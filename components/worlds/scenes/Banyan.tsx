import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: Gond artist (Madhya Pradesh). See ART_MANIFEST.md
export function BanyanWindow({ className }: { className?: string }) {
  const kit = worlds.banyan;
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "canopy-far": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {[8, 22, 36, 50, 64, 78, 92].map((x) => (
              <circle key={x} cx={x} cy={10} r={4} fill={kit.palette.accent} opacity={0.25} />
            ))}
          </svg>
        ),
        "aerial-roots": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path
              d="M40,0 Q38,20 42,38 M60,0 Q62,22 58,40 M50,0 L50,30"
              stroke={kit.palette.accent}
              strokeWidth={1}
              opacity={0.45}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ),
        "banyan-trunk": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path
              d="M50,95 L50,55 M50,58 C32,58 26,44 36,34 M50,58 C68,58 74,44 64,34 M50,62 C41,62 39,50 46,45 M50,62 C59,62 61,50 54,45"
              stroke={kit.palette.accent}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={36} cy={32} r={7} fill={kit.palette.accent} opacity={0.5} />
            <circle cx={64} cy={32} r={7} fill={kit.palette.accent} opacity={0.5} />
            <circle cx={50} cy={26} r={9} fill={kit.palette.accent} opacity={0.5} />
          </svg>
        ),
        undergrowth: (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path
              d="M12,92 Q18,80 26,92 M74,94 Q82,82 90,94 M30,96 Q36,86 42,96"
              stroke={kit.palette.accent2}
              strokeWidth={1.5}
              fill="none"
              opacity={0.6}
              strokeLinecap="round"
            />
          </svg>
        ),
        "owl-perch": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <g transform="translate(64, 36)">
              <ellipse cx={0} cy={0} rx={2.2} ry={2.8} fill={kit.palette.ink} opacity={0.85} />
              <circle
                cx={-0.8}
                cy={-0.6}
                r={0.6}
                fill={kit.palette.accent2}
                style={{ animation: "katha-blink 6s ease-in-out infinite" }}
              />
              <circle
                cx={0.8}
                cy={-0.6}
                r={0.6}
                fill={kit.palette.accent2}
                style={{ animation: "katha-blink 6s ease-in-out infinite" }}
              />
            </g>
          </svg>
        ),
      }}
    />
  );
}
