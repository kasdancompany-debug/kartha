import { worlds } from "@/content/worlds";
import { WorldWindow } from "../WorldWindow";

// PLACEHOLDER ART — COMMISSION FROM: Rajasthani/Gujarati block-print artisan (dabu, Bagru). See ART_MANIFEST.md
export function StepwellWindow({ className }: { className?: string }) {
  const kit = worlds.stepwell;
  const steps = [0, 1, 2, 3, 4, 5];
  return (
    <WorldWindow
      kit={kit}
      className={className}
      layers={{
        "sky-opening": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <rect x={28} y={4} width={44} height={16} fill="none" stroke={kit.palette.ink} strokeWidth={1} opacity={0.5} />
          </svg>
        ),
        "upper-steps": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {steps.slice(0, 2).map((i) => (
              <rect
                key={i}
                x={10 + i * 7}
                y={30 + i * 10}
                width={80 - i * 14}
                height={10}
                fill="none"
                stroke={kit.palette.accent}
                strokeWidth={1.5}
                opacity={0.7}
              />
            ))}
          </svg>
        ),
        "carved-niches": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {[24, 50, 76].map((x) => (
              <g key={x}>
                <rect x={x - 3} y={44} width={6} height={8} fill="none" stroke={kit.palette.accent2} strokeWidth={0.8} opacity={0.6} />
                <circle cx={x} cy={48} r={0.8} fill={kit.palette.accent2} opacity={0.6} />
              </g>
            ))}
          </svg>
        ),
        "water-level": (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {steps.slice(2).map((i) => (
              <rect
                key={i}
                x={10 + i * 7}
                y={30 + i * 10}
                width={80 - i * 14}
                height={10}
                fill="none"
                stroke={kit.palette.accent}
                strokeWidth={1.5}
                opacity={0.7}
              />
            ))}
            <rect x={38} y={88} width={24} height={8} fill={kit.palette.accent2} opacity={0.5} />
          </svg>
        ),
        pigeons: (
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M22,41 L25,38 L28,41" stroke={kit.palette.ink} strokeWidth={0.8} fill="none" opacity={0.6} />
            <path d="M70,61 L73,58 L76,61" stroke={kit.palette.ink} strokeWidth={0.8} fill="none" opacity={0.6} />
          </svg>
        ),
      }}
    />
  );
}
