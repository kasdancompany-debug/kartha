"use client";

import { useEffect, useRef, useState } from "react";

export interface ParallaxOffset {
  x: number;
  y: number;
}

interface DeviceOrientationEventConstructorIOS {
  requestPermission?: () => Promise<"granted" | "denied">;
}

/**
 * Part D.2/B.5 — normalized -1..1 pointer (desktop) or device-tilt (mobile)
 * offset, consumed by ParallaxLayers and LanternLight. Tilt only activates
 * after requestTiltPermission() resolves true (iOS requires that call to
 * happen inside a user gesture — the Landing CTA tap is that gesture).
 */
export function useParallaxOffset(enabled: boolean): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function schedule(x: number, y: number) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setOffset({ x, y }));
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      schedule((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    }

    function onOrientation(e: DeviceOrientationEvent) {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 45;
      schedule(Math.max(-1, Math.min(1, gamma / 30)), Math.max(-1, Math.min(1, (beta - 45) / 30)));
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("deviceorientation", onOrientation);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return offset;
}

/** Must be called from inside a user gesture handler on iOS Safari. */
export async function requestTiltPermission(): Promise<boolean> {
  const ctor = window.DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorIOS | undefined;
  if (typeof ctor?.requestPermission === "function") {
    try {
      return (await ctor.requestPermission()) === "granted";
    } catch {
      return false;
    }
  }
  return typeof window.DeviceOrientationEvent !== "undefined";
}
