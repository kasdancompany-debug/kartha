"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

export interface ChoiceOption<T extends string> {
  value: T;
  /** Explicit accessible name (aria-label) — the visual content can be freely decorative. */
  label: string;
  content: ReactNode;
}

export interface ChoiceGroupProps<T extends string> {
  groupLabel: string;
  options: ChoiceOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Part 0.7 — a proper radiogroup with arrow-key navigation (the standard
 * WAI-ARIA roving-tabindex radio pattern), used by Companion/World/Theme.
 * Visuals are entirely up to the caller via `content`; this only owns the
 * accessibility and keyboard mechanics.
 */
export function ChoiceGroup<T extends string>({
  groupLabel,
  options,
  value,
  onChange,
  className,
  optionClassName,
  orientation = "horizontal",
}: ChoiceGroupProps<T>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  function focusIndex(i: number) {
    const opt = options[(i + options.length) % options.length];
    if (!opt) return;
    refs.current[opt.value]?.focus();
    onChange(opt.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const horizontal = orientation === "horizontal";
    if ((horizontal && e.key === "ArrowRight") || (!horizontal && e.key === "ArrowDown")) {
      e.preventDefault();
      focusIndex(i + 1);
    } else if ((horizontal && e.key === "ArrowLeft") || (!horizontal && e.key === "ArrowUp")) {
      e.preventDefault();
      focusIndex(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusIndex(options.length - 1);
    }
  }

  return (
    <div role="radiogroup" aria-label={groupLabel} className={className}>
      {options.map((opt, i) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[opt.value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            tabIndex={i === activeIndex ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={optionClassName}
          >
            {opt.content}
          </button>
        );
      })}
    </div>
  );
}
