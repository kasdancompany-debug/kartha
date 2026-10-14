import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: printmaker/sign-painter familiar with the chosen city's visual culture. See ART_MANIFEST.md
export function MonsoonWindow({ className }: { className?: string }) {
  const kit = worlds.monsoon;
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "skyline-far": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={8} y={40} width={18} height={60} fill={kit.palette.accent} opacity={0.6} />
            <rect x={30} y={25} width={14} height={75} fill={kit.palette.accent} opacity={0.6} />
            <rect x={48} y={50} width={20} height={50} fill={kit.palette.accent} opacity={0.6} />
            <rect x={72} y={35} width={16} height={65} fill={kit.palette.accent} opacity={0.6} />
          </svg>
        ),
        "rain-streaks": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {[12, 34, 56, 78].map((x) => (
              <line key={x} x1={x} y1={0} x2={x - 6} y2={100} stroke={kit.palette.paper} strokeWidth={0.5} opacity={0.18} />
            ))}
          </svg>
        ),
        signage: (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={33} y={32} width={8} height={4} fill={kit.palette.accent2} opacity={0.85} />
            <rect x={53} y={58} width={10} height={4} fill={kit.palette.accent2} opacity={0.85} />
          </svg>
        ),
        "street-level": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={20} y={90} width={22} height={8} rx={1} fill={kit.palette.accent2} opacity={0.7} />
            <ellipse cx={70} cy={96} rx={10} ry={1.4} fill="none" stroke={kit.palette.paper} strokeWidth={0.5} opacity={0.4} />
          </svg>
        ),
        "kite-wire": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <line x1={0} y1={14} x2={100} y2={18} stroke={kit.palette.ink} strokeWidth={0.4} opacity={0.5} />
            <path d="M62,14 L66,10 L70,14 L66,20 Z" fill={kit.palette.accent2} opacity={0.8} />
          </svg>
        ),
      }}
    />
  );
}
