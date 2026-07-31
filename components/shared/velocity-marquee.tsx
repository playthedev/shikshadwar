"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
  children: ReactNode;
  /** Copies of `children` laid end to end — needs at least 2 to loop seamlessly. */
  repeat?: number;
  /** Percent of one copy's width travelled per second while the page is still. */
  baseVelocity?: number;
  className?: string;
  trackClassName?: string;
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * A horizontal track that drifts on its own, then speeds up, slows and
 * *reverses* with the page's scroll velocity.
 *
 * This is the difference between a CSS marquee and a marquee that feels
 * authored: a plain `animation: marquee` runs at one speed forever and reads
 * as decoration, whereas coupling it to scroll velocity ties it to what the
 * reader is physically doing, so the page appears to carry momentum. The
 * spring on the velocity is what keeps that from feeling twitchy.
 */
export function VelocityMarquee({
  children,
  repeat = 2,
  baseVelocity = 3,
  className,
  trackClassName,
}: VelocityMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Unclamped so a fast flick can genuinely overdrive the track rather than
  // saturating at a ceiling the moment scrolling starts.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (value) => `${wrap(-100 / repeat, 0, value)}%`);
  // A few degrees of lean in the direction of travel. Past ~6deg it stops
  // reading as momentum and starts looking like a broken transform.
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [5, 0, -5], {
    clamp: true,
  });

  const directionRef = useRef(1);
  // Held in a ref, not state: pausing must not re-render a component that is
  // writing a motion value every frame.
  const pausedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reducedMotion || pausedRef.current) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const copies = Array.from({ length: repeat });

  if (reducedMotion) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className={cn("flex w-max", trackClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      // WCAG 2.2.2 — auto-moving content needs a way to stop it. Hover covers
      // pointer users, focus-within covers keyboard users tabbing into a link
      // inside the track, and prefers-reduced-motion stops it outright above.
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <motion.div className={cn("flex w-max", trackClassName)} style={{ x, skewX }}>
        {copies.map((_, i) => (
          // Every copy after the first is a visual duplicate. `inert` takes it
          // out of the tab order and the accessibility tree together — marking
          // it aria-hidden alone would leave focusable links inside a hidden
          // subtree, which is a violation in its own right.
          <div key={i} inert={i > 0} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
