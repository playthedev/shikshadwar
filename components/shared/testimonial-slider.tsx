"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface TestimonialSlide {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialSliderProps {
  items: TestimonialSlide[];
  className?: string;
}

const AUTOPLAY_MS = 6500;

// Ordered widest-first so the first match wins — 3 cards on desktop, 2 on
// tablet, 1 (the fallback) below that.
const BREAKPOINTS: [query: string, count: number][] = [
  ["(min-width: 1024px)", 3],
  ["(min-width: 640px)", 2],
];

function subscribeViewport(onChange: () => void) {
  const queries = BREAKPOINTS.map(([query]) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getVisibleCountSnapshot(): number {
  for (const [query, count] of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return count;
  }
  return 1;
}

/**
 * How many cards fit on screen at once — 1/2/3 by breakpoint. Read via
 * useSyncExternalStore, same as useReducedMotion, so it stays a single
 * subscription rather than a resize-listener effect.
 */
function useVisibleCount(): number {
  return useSyncExternalStore(subscribeViewport, getVisibleCountSnapshot, () => 1);
}

/**
 * A page-at-a-time carousel: up to three testimonial cards per slide,
 * advancing as a group rather than one quote at a time. Direction is tracked
 * so the exit/enter animation always travels the way the reader just
 * navigated (dots and arrows included), and autoplay pauses on hover or
 * focus so a reader mid-quote doesn't lose their place. Below three items
 * visible, the layout drops to two and then one per slide.
 */
export function TestimonialSlider({ items, className }: TestimonialSliderProps) {
  const visibleCount = useVisibleCount();
  const pageCount = Math.max(1, Math.ceil(items.length / visibleCount));
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setPage([((next % pageCount) + pageCount) % pageCount, dir]);
    },
    [pageCount],
  );

  useEffect(() => {
    if (paused || reducedMotion || pageCount <= 1) return;
    timerRef.current = setInterval(() => {
      setPage(([current]) => [(current + 1) % pageCount, 1]);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, pageCount]);

  // The visible count (and so the page count) can change on resize — the raw
  // page index isn't clamped as state, so it's derived here instead of
  // synced back with an effect.
  const safePage = ((page % pageCount) + pageCount) % pageCount;
  const start = safePage * visibleCount;
  const activeItems = items.slice(start, start + visibleCount);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        className="relative overflow-hidden"
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={safePage}
            custom={direction}
            initial={reducedMotion ? false : { opacity: 0, x: direction >= 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: direction >= 0 ? -48 : 48 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeItems.map((item) => (
              <figure
                key={`${item.name}-${item.role}`}
                className="flex h-full flex-col justify-between rounded-(--radius) border border-border bg-surface p-8"
              >
                <span
                  aria-hidden="true"
                  className="block font-heading text-4xl leading-none text-ink/15 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink/85">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <span>
                    <span className="block font-heading text-base text-ink">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial page">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safePage}
                aria-label={`Show testimonials page ${i + 1}`}
                onClick={() => goTo(i, i > safePage ? 1 : -1)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === safePage ? "w-8 bg-rust" : "w-1.5 bg-ink/15 hover:bg-ink/30",
                )}
              />
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(safePage - 1, -1)}
              aria-label="Previous testimonials"
              className="flex size-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(safePage + 1, 1)}
              aria-label="Next testimonials"
              className="flex size-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
