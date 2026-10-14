"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { m, AnimatePresence, type PanInfo } from "motion/react";
import { useReducedMotion } from "@/components/system/ReducedMotionProvider";
import { Page } from "./Page";
import { PageTurn, type PageTurnHandle } from "./PageTurn";
import { Spread } from "./Spread";
import { useIsDesktop } from "./useIsDesktop";

export interface BookSpread {
  left: ReactNode;
  right: ReactNode;
  /** Mobile's single page for this spread; defaults to left+right stacked. */
  mobile?: ReactNode;
}

export interface BookHandle {
  next: () => void;
  prev: () => void;
}

export interface BookProps {
  spreads: BookSpread[];
  className?: string;
  /** Controlled position (e.g. driven by the oracle step machine). Omit to let Book manage its own index. */
  index?: number;
  onPositionChange?: (position: number, total: number) => void;
}

/**
 * Part D.2 — desktop shows the full open spread with a real two-sided page
 * turn (PageTurn); mobile shows one page at a time and turns by lifting it
 * away to the left (a drag-driven slide+fade). Both paths funnel through
 * the same next()/prev() so the Dock's buttons work identically to a drag.
 *
 * One index drives both layouts (mobile shows one page per spread, not per
 * side), so an external step machine can treat "turn the page" and "advance
 * the step" as the same thing.
 */
export const Book = forwardRef<BookHandle, BookProps>(function Book(
  { spreads, className, index: controlledIndex, onPositionChange },
  ref,
) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledIndex !== undefined;

  const [internalIndex, setInternalIndex] = useState(controlledIndex ?? 0);
  const index = isControlled ? controlledIndex! : internalIndex;

  const nextFlapRef = useRef<PageTurnHandle>(null);
  const prevFlapRef = useRef<PageTurnHandle>(null);
  const [mobileDirection, setMobileDirection] = useState<"next" | "prev">("next");

  const flatPages = spreads.map((s) => s.mobile ?? (
    <>
      {s.left}
      {s.right}
    </>
  ));

  function commitIndex(next: number) {
    if (!isControlled) setInternalIndex(next);
    onPositionChange?.(next, spreads.length);
  }

  function desktopNext() {
    if (index >= spreads.length - 1) return;
    nextFlapRef.current?.commit();
  }
  function desktopPrev() {
    if (index <= 0) return;
    prevFlapRef.current?.commit();
  }
  function mobileNext() {
    if (index >= flatPages.length - 1) return;
    setMobileDirection("next");
    commitIndex(index + 1);
  }
  function mobilePrev() {
    if (index <= 0) return;
    setMobileDirection("prev");
    commitIndex(index - 1);
  }

  useImperativeHandle(ref, () => ({
    next: () => (isDesktop ? desktopNext() : mobileNext()),
    prev: () => (isDesktop ? desktopPrev() : mobilePrev()),
  }));

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      if (isDesktop) desktopNext();
      else mobileNext();
    }
    if (e.key === "ArrowLeft") {
      if (isDesktop) desktopPrev();
      else mobilePrev();
    }
  }

  function handleMobileDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const width = containerRef.current?.offsetWidth ?? 320;
    if (info.offset.x < -width * 0.35) mobileNext();
    else if (info.offset.x > width * 0.35) mobilePrev();
  }

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="book"
      aria-label={`Page ${index + 1} of ${spreads.length}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative mx-auto aspect-[4/3] w-full max-w-5xl outline-none sm:aspect-[16/10] ${className ?? ""}`}
    >
      {isDesktop ? (
        <Spread
          left={
            <div className="relative h-full w-full">
              <Page>{spreads[index - 1]?.left ?? null}</Page>
              {index > 0 && (
                <PageTurn
                  key={`prev-${index}`}
                  ref={prevFlapRef}
                  pivot="right"
                  front={<Page>{spreads[index]!.left}</Page>}
                  back={<Page>{spreads[index - 1]!.right}</Page>}
                  onCommit={() => commitIndex(index - 1)}
                />
              )}
            </div>
          }
          right={
            <div className="relative h-full w-full">
              <Page>{spreads[index + 1]?.right ?? null}</Page>
              {index < spreads.length - 1 && (
                <PageTurn
                  key={`next-${index}`}
                  ref={nextFlapRef}
                  pivot="left"
                  front={<Page>{spreads[index]!.right}</Page>}
                  back={<Page>{spreads[index + 1]!.left}</Page>}
                  onCommit={() => commitIndex(index + 1)}
                />
              )}
            </div>
          }
        />
      ) : (
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence initial={false}>
            <m.div
              key={index}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleMobileDragEnd}
              initial={reduced ? { opacity: 0 } : { x: mobileDirection === "next" ? 48 : -48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { x: mobileDirection === "next" ? -48 : 48, opacity: 0, rotate: mobileDirection === "next" ? -4 : 4 }
              }
              transition={{ duration: reduced ? 0.15 : 0.5, ease: [0.6, 0.05, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Page>{flatPages[index]}</Page>
            </m.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
});
