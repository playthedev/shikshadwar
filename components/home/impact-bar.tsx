"use client";

import { motion } from "motion/react";
import { GraduationCap, HeartPulse, FolderOpen, TrendingUp, TreePine } from "lucide-react";
import { Container } from "@/components/shared/container";
import { CountingNumber } from "@/components/shared/counting-number";
import { beneficiaryStats } from "@/lib/impact-stats";
import type { ImpactStat } from "@/lib/impact-stats";

const iconMap: Record<NonNullable<ImpactStat["icon"]>, typeof GraduationCap> = {
  education: GraduationCap,
  health: HeartPulse,
  livelihood: FolderOpen,
  youth: TrendingUp,
  tree: TreePine,
};

/**
 * "Lives touched" band — a solid rust panel with circular icon badges,
 * one per programme area, each counting up into view.
 */
export function ImpactBar() {
  return (
    <section aria-label="Our impact so far" className="bg-rust">
      <Container className="py-14 md:py-20">
        <h2 className="text-h2 font-heading text-paper text-center md:text-left">
          Our impact so far
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:mt-14 md:grid-cols-5">
          {beneficiaryStats.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon] : GraduationCap;
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-4 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-paper md:size-20">
                  <Icon className="size-7 text-rust md:size-8" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="font-heading text-h1 tabular-nums text-paper">
                  <CountingNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-paper/85">{stat.shortLabel ?? stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
