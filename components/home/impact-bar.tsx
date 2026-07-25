"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/container";
import { CountingNumber } from "@/components/shared/counting-number";

const stats = [
  { value: 467, suffix: "+", label: "Lives touched through Education" },
  { value: 476, suffix: "+", label: "Lives touched through Healthcare" },
  { value: 5, suffix: "", label: "States we work in" },
  { value: 6, suffix: "", label: "Programme areas" },
];

export function ImpactBar() {
  return (
    <section aria-label="Our impact so far" className="border-b border-border bg-surface">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="border-l-2 border-rust/30 pl-4"
            initial={false}
            whileHover={{ y: -3, borderColor: "var(--rust)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] text-ink">
              <CountingNumber value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
