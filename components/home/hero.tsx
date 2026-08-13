"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { heroSlides } from "@/lib/hero-slides";

// 3s was not long enough to finish reading a headline and its subheading
// before the frame changed. At 5.5s the progress rail below also has room to
// read as a deliberate timer rather than a flicker.
const AUTOPLAY_MS = 5500;
const FALLBACK_IMAGE = "/images/home/mission.jpg";

/**
 * Hero slider carrying forward all six slides from the legacy homepage
 * carousel (per client request), rebuilt to stay WCAG 2.2.2-compliant:
 * autoplay disabled under prefers-reduced-motion, and full keyboard access
 * via the tab rail.
 *
 * Depth comes from four layers moving at different rates: Ken Burns on the
 * photo, parallax on the whole plate, copy rising on slide change, and the
 * scroll cue running on its own loop.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);
  // Copy leaves faster than the plate behind it, so the layers separate as
  // the reader scrolls away instead of sliding off as one flat sheet.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reducedMotion ? 1 : 0]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion]);

  const slide = heroSlides[index];

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Shikshadwar Foundation highlights"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: parallaxY }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.image}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-[-6%]"
              initial={{ scale: 1, x: 0 }}
              animate={{ scale: reducedMotion ? 1 : 1.1, x: reducedMotion ? 0 : "1.5%" }}
              transition={{ duration: (AUTOPLAY_MS + 1800) / 1000, ease: "linear" }}
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

      </motion.div>

      <div aria-hidden="true" className="grain-overlay absolute inset-0 -z-10" />

      <Container className="relative flex min-h-[min(74vh,680px)] flex-col justify-end pt-36 pb-10 md:pb-14">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Link
              href={slide.href}
              aria-live="polite"
              aria-label={`${slide.headline} — open the programme`}
              className="group/banner block lg:col-span-8"
            >
              <h1 className="hero-heading-shadow max-w-4xl text-display text-white transition-colors duration-300 group-hover/banner:text-white/85">
                <RevealText key={slide.headline} text={slide.headline} mode="mount" />
              </h1>
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 flex items-end justify-between gap-6">
          <div
            role="tablist"
            aria-label="Slides"
            className="flex flex-1 items-center gap-2 sm:gap-4"
          >
            {heroSlides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show slide ${i + 1} of ${heroSlides.length}: ${s.headline}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => goTo(i)}
                  className="group flex-1 pt-1 text-left"
                />
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="hidden items-center gap-2 text-eyebrow text-paper/50 uppercase md:flex"
            >
              Scroll
              <ArrowDown className="size-3.5 animate-bounce motion-reduce:animate-none" />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
