"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/container";
import { CountingNumber } from "@/components/shared/counting-number";
import { RevealText } from "@/components/shared/reveal-text";
import type { ImpactStat } from "@/lib/impact-stats";
import { cn } from "@/lib/utils";

type Tone = "surface" | "rust-tint" | "pine-tint" | "ink";

interface StatBandProps {
  stats: ImpactStat[];
  tone?: Tone;
  /** Optional single line rendered beneath the stat grid, e.g. reach facts. */
  caption?: string;
  label: string;
  className?: string;
  /** Rendered above the grid. Without them the band is a bare row of numbers
   * with no argument attached to it. */
  eyebrow?: string;
  title?: string;
}

const toneClasses: Record<
  Tone,
  { section: string; rule: string; accent: string; number: string; muted: string; eyebrow: string }
> = {
  surface: {
    section: "bg-surface",
    rule: "bg-ink/12",
    accent: "bg-rust",
    number: "text-ink",
    muted: "text-muted-foreground",
    eyebrow: "text-rust",
  },
  "rust-tint": {
    section: "bg-rust-tint",
    rule: "bg-ink/12",
    accent: "bg-rust",
    number: "text-ink",
    muted: "text-ink/65",
    eyebrow: "text-rust",
  },
  "pine-tint": {
    section: "bg-pine-tint",
    rule: "bg-ink/12",
    accent: "bg-pine",
    number: "text-ink",
    muted: "text-ink/65",
    eyebrow: "text-pine",
  },
  ink: {
    section: "bg-ink",
    rule: "bg-paper/20",
    accent: "bg-rust",
    number: "text-paper",
    muted: "text-paper/55",
    eyebrow: "text-gold",
  },
};

// Tailwind needs static class names to see them in its scan — map column
// counts to fixed classes rather than interpolating a number.
const colsClasses: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * Impact figures set as an editorial run rather than a row of cards.
 *
 * Each cell hangs off a hairline rule that draws itself in as the band
 * arrives, staggered left to right, so the section assembles in sequence
 * instead of every number appearing at once. The figures are set at heading
 * scale against small-caps labels — that contrast is doing the work the
 * borders used to do.
 */
export function StatBand({
  stats,
  tone = "surface",
  caption,
  label,
  className,
  eyebrow,
  title,
}: StatBandProps) {
  const tones = toneClasses[tone];
  const cols = colsClasses[Math.min(stats.length, 6)] ?? colsClasses[4];

  return (
    <section aria-label={label} className={cn("overflow-hidden", tones.section, className)}>
      <Container className="py-14 md:py-20">
        {eyebrow || title ? (
          <div className="mb-10 max-w-2xl md:mb-14">
            {eyebrow ? (
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className={cn("h-px w-8 shrink-0", tones.accent)} />
                <p className={cn("text-eyebrow uppercase", tones.eyebrow)}>{eyebrow}</p>
              </div>
            ) : null}
            {title ? (
              <h2 className={cn("mt-4 text-h2 font-heading", tones.number)}>
                <RevealText text={title} />
              </h2>
            ) : null}
          </div>
        ) : null}

        <div className={cn("grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3", cols)}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="group relative pt-5">
              <motion.span
                aria-hidden="true"
                className={cn("absolute inset-x-0 top-0 h-px origin-left", tones.rule)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-(--ease-out-custom) group-hover:scale-x-100",
                  tones.accent,
                )}
              />
              <p
                className={cn(
                  "font-heading text-h1 tabular-nums transition-transform duration-500 ease-(--ease-out-custom) group-hover:-translate-y-0.5",
                  tones.number,
                )}
              >
                <CountingNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className={cn("mt-2 max-w-[18ch] text-sm leading-snug", tones.muted)}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {caption ? (
          <p className={cn("mt-12 text-sm", tones.muted)}>{caption}</p>
        ) : null}
      </Container>
    </section>
  );
}
