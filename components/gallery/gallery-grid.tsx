"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  galleryImages,
  galleryCategoryLabels,
  type GalleryCategory,
} from "@/lib/gallery";

type FilterValue = "all" | GalleryCategory;

const filters: { value: FilterValue; label: string; count: number }[] = [
  { value: "all", label: "All Work", count: galleryImages.length },
  ...(Object.keys(galleryCategoryLabels) as GalleryCategory[]).map((cat) => ({
    value: cat,
    label: galleryCategoryLabels[cat],
    count: galleryImages.filter((img) => img.category === cat).length,
  })),
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = galleryImages.filter(
    (img) => filter === "all" || img.category === filter,
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f.value
                ? "border-rust bg-rust text-primary-foreground"
                : "border-border bg-surface text-ink/70 hover:border-ink/30 hover:text-ink",
            )}
          >
            {f.label} <span className="opacity-60">({f.count})</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      >
        {visible.map((image, index) => (
          <motion.button
            key={image.src}
            layout
            type="button"
            onClick={() => setActive(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="group relative aspect-square overflow-hidden rounded-(--radius) border border-border"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10"
            />
          </motion.button>
        ))}
      </motion.div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl bg-transparent p-0 ring-0 sm:max-w-3xl" showCloseButton>
          <DialogTitle className="sr-only">
            {active !== null ? visible[active]?.alt : "Gallery photo"}
          </DialogTitle>
          {active !== null ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius)">
              <Image
                src={visible[active].src}
                alt={visible[active].alt}
                fill
                sizes="768px"
                className="object-contain bg-ink"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
