"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface CertificateSlide {
  title: string;
  description: string;
  image: string;
  objectPosition?: string;
}

const AUTOPLAY_MS = 3200;

/**
 * Full-bleed slideshow for certificates and recognitions — one image at a
 * time, edge to edge, with the title and description for the image on
 * screen scrimmed over its own photo rather than gridded off to the side.
 * New certificates only need an entry in `certificates` (lib/about-data.ts)
 * and a corresponding file in public/images/about — the slideshow, dots and
 * counter all size themselves to however many are supplied.
 */
export function CertificatesSlideshow({ items }: { items: CertificateSlide[] }) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setIndex([((next % items.length) + items.length) % items.length, dir]);
    },
    [items.length],
  );

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex(([current]) => [(current + 1) % items.length, 1]);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion, items.length]);

  if (items.length === 0) return null;

  const active = items[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Certificates and awards"
      className="relative isolate h-[min(80vh,38rem)] min-h-[26rem] w-full overflow-hidden bg-ink"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reducedMotion ? false : { x: direction >= 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={reducedMotion ? undefined : { x: direction >= 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image
            src={active.image}
            alt={active.title}
            fill
            preload={index === 0}
            sizes="100vw"
            quality={92}
            style={{ objectPosition: active.objectPosition ?? "center" }}
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption — swaps with the image so copy never trails the wrong photo. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pt-24 pb-16 md:px-10 md:pb-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <span aria-hidden="true" className="font-heading text-sm tabular-nums text-gold">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-h3 text-balance text-paper">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {items.length > 1 ? (
        <>
          <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2 md:right-10 md:bottom-8">
            <button
              type="button"
              onClick={() => goTo(index - 1, -1)}
              aria-label="Previous certificate"
              className="flex size-10 items-center justify-center rounded-full border border-paper/30 bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:border-paper/60 hover:bg-paper/20"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next certificate"
              className="flex size-10 items-center justify-center rounded-full border border-paper/30 bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:border-paper/60 hover:bg-paper/20"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div
            className="absolute top-6 right-6 z-10 flex items-center gap-2 md:top-8 md:right-10"
            role="tablist"
            aria-label="Choose certificate"
          >
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show certificate ${i + 1}: ${item.title}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-paper/40 hover:bg-paper/70",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
