"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { ProgrammeImage } from "@/lib/programmes";

const INTERVAL_MS = 5000;

/**
 * "Multiple Picture (Slide Left to Right)" banner — the format specified for
 * every programme page: photos advance automatically, each one sliding in
 * from the right as the last slides out to the left, behind the hero
 * headline. Owns its own scrims, matching PageHero's `background` contract.
 */
export function ProgrammeHeroSlideshow({ images }: { images: ProgrammeImage[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: "-100%" }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <Image
              src={images[index].src}
              alt=""
              fill
              preload={index === 0}
              sizes="100vw"
              quality={92}
              style={{ objectPosition: images[index].objectPosition ?? "center 15%" }}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((image, i) => (
            <span
              key={image.src}
              aria-hidden="true"
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
