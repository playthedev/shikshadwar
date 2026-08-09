"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { TiltCard } from "@/components/shared/tilt-card";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { sponsoredChildren } from "@/lib/sponsorship";
import { products } from "@/lib/products";

interface EventSlide {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const currentEventContent = {
  eyebrow: "Current events",
  title: "What's happening this week",
  description:
    "Non-formal classes, health camps and skill-training sessions run every week across our centres — see it as it happens.",
  ctaLabel: "Join Now",
  ctaHref: "/join-us/",
};

const currentEventSlides: EventSlide[] = [
  { src: "/images/gallery/education/edu-05.png", alt: "A non-formal education session at a Shikshadwar centre", ...currentEventContent },
  { src: "/images/gallery/healthcare/health-kdliver2.jpeg", alt: "A Liver Care Foundation health-awareness session for children and volunteers", ...currentEventContent },
  { src: "/images/gallery/livelihood/live-03.jpeg", alt: "A community member practising embroidery skills in a livelihood training session", ...currentEventContent },
];

// Each slide here pulls its own image, blurb and CTA straight from the
// child/product it represents — a Meet Our Stars slide links to that child's
// own page, a Support Us slide links to that product's own checkout page.
const sponsorAndSupportSlides: EventSlide[] = [
  ...sponsoredChildren.slice(0, 3).map((child) => ({
    src: child.image.src,
    alt: child.image.alt,
    eyebrow: "Meet Our Stars",
    title: `Sponsor ${child.name}'s year`,
    description: `${child.name}, ${child.age}, ${child.location.split(",")[0]} — dreams of ${child.dream.replace(/^To /i, "").toLowerCase()}. Your sponsorship covers tuition, uniforms and mentoring.`,
    ctaLabel: `Sponsor ${child.name}`,
    ctaHref: `/meet-our-stars/${child.slug}/`,
  })),
  ...products.slice(0, 2).map((product, i) => ({
    src: i === 0 ? "/images/gallery/livelihood/live-03.jpeg" : "/images/gallery/livelihood/live-05.jpeg",
    alt: `${product.name}, handmade by women trained through the Livelihood programme`,
    eyebrow: "Support Us",
    title: product.name,
    description: `${product.description} ₹${product.price.toLocaleString("en-IN")} — buying one puts income directly in her hands.`,
    ctaLabel: "Buy Now",
    ctaHref: `/support-us/${product.slug}/`,
  })),
];

const AUTOPLAY_MS = 4000;

type Accent = "pine" | "rust";

const accentText: Record<Accent, string> = {
  pine: "text-pine",
  rust: "text-rust",
};

const accentLine: Record<Accent, string> = {
  pine: "bg-pine",
  rust: "bg-rust",
};

const accentGlyph: Record<Accent, string> = {
  pine: "text-pine/15",
  rust: "text-rust/15",
};

const accentButton: Record<Accent, string> = {
  pine: "bg-pine hover:bg-[color-mix(in_oklch,var(--pine),black_12%)]",
  rust: "bg-rust hover:bg-[var(--rust-strong)]",
};

function EventCard({
  slides,
  icon: Icon,
  accent,
  delay = 0,
}: {
  slides: EventSlide[];
  icon: typeof CalendarDays;
  accent: Accent;
  delay?: number;
}) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion, slides.length]);

  function goTo(next: number) {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={3} className="h-full rounded-(--radius)">
        <div className="group/card grain-overlay relative flex h-full flex-col overflow-hidden rounded-(--radius) border border-border bg-paper shadow-lg transition-shadow duration-500 hover:shadow-2xl">
          <div className="relative aspect-[4/3] overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  quality={92}
                  className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover/card:scale-[1.04]"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous"
              className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-ink/40 text-paper opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-paper/60 hover:bg-ink/70 group-hover/card:opacity-100 group-focus-within/card:opacity-100"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next"
              className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-ink/40 text-paper opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-paper/60 hover:bg-ink/70 group-hover/card:opacity-100 group-focus-within/card:opacity-100"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>

            <div
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
              role="tablist"
              aria-label="Slides"
            >
              {slides.map((item, i) => (
                <button
                  key={item.src + i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/40 hover:bg-paper/70",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="relative flex flex-1 flex-col p-8">
            <Icon
              aria-hidden="true"
              className={cn(
                "absolute -top-2 -right-2 size-24 transition-transform duration-700 ease-(--ease-out-custom) group-hover/card:scale-110 group-hover/card:-rotate-6",
                accentGlyph[accent],
              )}
            />

            <div className="relative flex items-center gap-3">
              <span aria-hidden="true" className={cn("h-px w-8 shrink-0", accentLine[accent])} />
              <p className={cn("text-eyebrow uppercase", accentText[accent])}>{slide.eyebrow}</p>
            </div>
            <h3 className="relative mt-4 line-clamp-2 min-h-[2lh] font-heading text-h3 text-ink">
              {slide.title}
            </h3>
            <p className="relative mt-3 line-clamp-3 min-h-[4.5rem] max-w-sm text-sm leading-relaxed text-ink/65">
              {slide.description}
            </p>

            <Link
              href={slide.ctaHref}
              className={cn(
                "group/cta relative mt-7 inline-flex w-fit items-center gap-2 rounded-(--radius) px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors",
                accentButton[accent],
              )}
            >
              {slide.ctaLabel}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/**
 * The homepage's second section, right after the hero — mirrors the client
 * reference site's "Current Events" / "Sponsor a Child" pairing, rebuilt as
 * a matched pair of photo-led feature cards rather than plain boxed panels
 * so it reads as one deliberate composition with the rest of the page.
 */
export function CurrentEvents() {
  return (
    <section className="border-b border-border bg-surface py-[clamp(4rem,8vw,6.5rem)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
            <p className="text-eyebrow text-rust uppercase">Right now, on the ground</p>
          </div>
          <h2 className="mt-5 font-heading text-h2 text-balance text-ink">
            <RevealText text="Two ways to be part of it, today." />
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:items-stretch">
          <EventCard slides={currentEventSlides} icon={CalendarDays} accent="pine" />
          <EventCard slides={sponsorAndSupportSlides} icon={HeartHandshake} accent="rust" delay={0.1} />
        </div>
      </Container>
    </section>
  );
}
