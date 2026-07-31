"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation at the corners, in degrees. */
  max?: number;
}

/**
 * Tilts toward the pointer in 3D, with a light sweep tracking the same
 * position.
 *
 * Pointer position is held in motion values rather than state so a move
 * never triggers a React render — the transform is written straight to the
 * compositor. The spring is intentionally loose (low stiffness, high
 * damping) so the card settles rather than snapping, which is what keeps a
 * tilt from feeling like a toy.
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // -0.5 .. 0.5 relative to the card's centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const config = { stiffness: 150, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), config);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), config);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
    ref.current?.style.setProperty("--tilt-x", `${event.clientX - rect.left}px`);
    ref.current?.style.setProperty("--tilt-y", `${event.clientY - rect.top}px`);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={reset} style={{ perspective: 1000 }}>
      <motion.div
        className={cn("group/tilt relative", className)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--tilt-x, 50%) var(--tilt-y, 50%), color-mix(in oklch, var(--gold), transparent 86%), transparent 65%)",
          }}
        />
      </motion.div>
    </div>
  );
}
