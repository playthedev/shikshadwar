"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { Magnetic } from "@/components/shared/magnetic";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { heroSlides } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3000;
const FALLBACK_IMAGE = "/images/home/mission.jpg";

/**
 * Hero slider carrying forward all six slides from the legacy homepage
 * carousel (per client request), rebuilt to stay WCAG 2.2.2-compliant:
 * a visible pause control, autoplay disabled under prefers-reduced-motion,
 * and full keyboard access via the prev/next/dot controls. Each slide gets a
 * slow Ken Burns zoom, and the whole image drifts on scroll for depth.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 90]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, reducedMotion]);

  const slide = heroSlides[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Shikshadwar Foundation highlights"
    >
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.image}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-[-4%]"
              initial={{ scale: 1 }}
              animate={{ scale: reducedMotion ? 1 : 1.08 }}
              transition={{ duration: (AUTOPLAY_MS + 1200) / 1000, ease: "linear" }}
            >
              <Image
                src={failedSlides[index] ? FALLBACK_IMAGE : slide.image}
                alt={slide.alt}
                fill
                preload={index === 0}
                sizes="100vw"
                quality={100}
                onError={() => setFailedSlides((prev) => ({ ...prev, [index]: true }))}
                style={{ objectPosition: failedSlides[index] ? "center 30%" : slide.objectPosition }}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
        />
      </motion.div>

      <Container className="relative flex min-h-[min(88vh,720px)] flex-col justify-end pt-32 pb-14 md:pb-20">
        <p className="mb-4 text-sm font-semibold tracking-wide text-paper/80 uppercase">
          Public Charitable Trust · Delhi · Bihar · Uttar Pradesh · Rajasthan · Haryana
        </p>

        <div aria-live="polite" className="min-h-[9rem] md:min-h-[8rem]">
          <h1 className="max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-paper">
            <RevealText key={slide.headline} text={slide.headline} mode="mount" />
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85">
            {slide.subheading}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          {/* Primary donate CTA — intentionally has no hover/entrance motion. */}
          <Button
            render={<Link href="/donate/" />}
            nativeButton={false}
            className="h-13 rounded-(--radius) bg-rust px-8 text-base font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] active:translate-y-0"
          >
            {slide.ctaLabel}
          </Button>

          <div className="flex items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous slide"
                className="flex size-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/10"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
            </Magnetic>

            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1} of ${heroSlides.length}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/40 hover:bg-paper/60",
                  )}
                />
              ))}
            </div>

            <Magnetic>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next slide"
                className="flex size-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/10"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={!playing}
                className="flex size-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/10"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-4" />
                ) : (
                  <Play aria-hidden="true" className="size-4" />
                )}
              </button>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}
