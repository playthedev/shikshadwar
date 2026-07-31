"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /** Pixels of travel across the element's full pass through the viewport.
   * Negative rises against the scroll, positive lags behind it. */
  distance?: number;
  className?: string;
}

/**
 * Scroll-linked vertical drift for a single layer.
 *
 * Kept deliberately small in use (40–90px): parallax stops reading as depth
 * and starts reading as a bug once a layer visibly outruns its neighbours.
 * The spring smooths the trackpad's jittery deltas, which is the difference
 * between "floating" and "juddering".
 */
export function Parallax({ children, distance = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.01 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reducedMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
