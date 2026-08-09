"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { galleryImages, galleryCategoryLabels, type GalleryCategory } from "@/lib/gallery";

type FilterValue = "all" | GalleryCategory;

const filters: { value: FilterValue; label: string; count: number }[] = [
  { value: "all", label: "All work", count: galleryImages.length },
  ...(Object.keys(galleryCategoryLabels) as GalleryCategory[]).map((cat) => ({
    value: cat,
    label: galleryCategoryLabels[cat],
    count: galleryImages.filter((img) => img.category === cat).length,
  })),
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const visible = galleryImages.filter((img) => filter === "all" || img.category === filter);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  // Arrow keys move through the lightbox. The dialog already handles Escape
  // and focus trapping, so this only adds what it doesn't cover.
  useEffect(() => {
    if (active === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, step]);

  return (
    <div>
      {/*
        Filters as a typographic rail rather than a row of filled pills. Six
        solid rust capsules competed with the photographs directly beneath
        them; underlined labels with a marker that slides between them stays
        out of the way of the actual content.
      */}
      <div
        role="tablist"
        aria-label="Filter gallery by programme"
        className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-border pb-4"
      >
        {filters.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.value)}
              className={cn(
                "group relative py-1 text-sm font-semibold transition-colors duration-300",
                isActive ? "text-ink" : "text-ink/45 hover:text-ink/75",
              )}
            >
              {f.label}
              <span className="ml-1.5 text-xs tabular-nums opacity-60">{f.count}</span>
              {isActive ? (
                <motion.span
                  aria-hidden="true"
                  layoutId="gallery-filter-marker"
                  className="absolute -bottom-4 left-0 h-0.5 w-full bg-rust"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((image, index) => (
            <motion.li
              key={image.src}
              layout
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              // Every fourth frame runs tall, so the grid has a rhythm
              // instead of reading as a uniform contact sheet.
              className={index % 7 === 3 ? "row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View photo: ${image.alt}`}
                className={cn(
                  "group relative block h-full w-full overflow-hidden rounded-(--radius) bg-muted",
                  index % 7 === 3 ? "aspect-[3/4] md:aspect-auto" : "aspect-square",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20"
                />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl bg-transparent p-0 ring-0 sm:max-w-4xl" showCloseButton={false}>
          <DialogTitle className="sr-only">
            {active !== null ? visible[active]?.alt : "Gallery photo"}
          </DialogTitle>
          {active !== null ? (
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius) bg-ink">
                <Image
                  src={visible[active].src}
                  alt={visible[active].alt}
                  fill
                  sizes="1024px"
                  quality={92}
                  className="object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="max-w-xl text-sm text-paper/70">{visible[active].alt}</p>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="mr-2 font-heading text-sm tabular-nums text-paper/60">
                    {active + 1} / {visible.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="flex size-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper/60 hover:bg-paper/10"
                  >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="flex size-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper/60 hover:bg-paper/10"
                  >
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
