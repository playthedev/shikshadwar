"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface CountingNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function CountingNumber({ value, suffix = "", className }: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [inView, reducedMotion, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
