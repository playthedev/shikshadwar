"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Wraps small interactive elements (icon buttons, pill links) so they drift
 * toward the cursor within their own bounds — never applied to the donate
 * CTA, which stays fixed per the brief. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * strength,
          y: (e.clientY - rect.top - rect.height / 2) * strength,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
