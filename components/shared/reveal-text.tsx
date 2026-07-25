"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Scroll-triggered (default) or mount-triggered — mount is for content that
   * remounts on its own, e.g. a carousel headline keyed by slide. */
  mode?: "scroll" | "mount";
}

export function RevealText({ text, className, delay = 0, mode = "scroll" }: RevealTextProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const play = mode === "mount" || inView;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-[0.05em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={play ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
