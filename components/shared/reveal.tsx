"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// Same safety net as MaskReveal: if `whileInView` never fires (a viewport
// edge case, a slow hydration, an observer that never sees the element),
// this forces the content visible after a beat rather than leaving it
// permanently at opacity 0 — which otherwise reads as missing content.
const FALLBACK_MS = 1200;

function useRevealFallback() {
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);
  return timedOut;
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const timedOut = useRevealFallback();
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      animate={timedOut ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function RevealGroup({ children, className, stagger = 0.06 }: RevealGroupProps) {
  const reducedMotion = useReducedMotion();
  const timedOut = useRevealFallback();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      animate={timedOut ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag className={className} variants={variants} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionTag>
  );
}
