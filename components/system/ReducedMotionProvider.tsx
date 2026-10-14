"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const ReducedMotionContext = createContext(false);

/**
 * Part 0.7 — single source of truth for "should this animate at all".
 * True when the OS-level prefers-reduced-motion is set. Components should
 * read this (via useReducedMotion) rather than querying matchMedia
 * themselves, so SSR and client agree and every effect has one switch.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}
