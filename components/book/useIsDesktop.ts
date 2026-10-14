"use client";

import { useEffect, useState } from "react";

/** Part D.2 — desktop shows the full open spread; mobile shows one page at a time. */
export function useIsDesktop(breakpoint = "(min-width: 1024px)"): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(breakpoint);
    setIsDesktop(query.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isDesktop;
}
