"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

// Animating clip-path rather than opacity means the subject is never shown
// at partial alpha — the frame opens and the image behind it is fully
// present the whole time, the way a printed panel is uncovered.
const clipFrom: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

const CLIP_TO = "inset(0% 0% 0% 0%)";

/**
 * Uncovers its children behind a moving edge, and slides the content the
 * short way in the opposite direction as it goes. The counter-movement is
 * what sells it: subject and mask travelling at different rates is how a
 * reveal reads as depth instead of as a wipe.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: MaskRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === "up"
      ? { y: "8%", x: "0%" }
      : direction === "left"
        ? { x: "8%", y: "0%" }
        : { x: "-8%", y: "0%" };

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: clipFrom[direction] }}
        whileInView={{ clipPath: CLIP_TO }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={offset}
          whileInView={{ x: "0%", y: "0%" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
