"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const cards = [
  {
    label: "01",
    title: "Become Volunteer",
    description:
      "We encourage people to be part of social and economic development in substantial and evolved ways.",
    href: "/join-us/",
    accent: "rust" as const,
  },
  {
    label: "02",
    title: "Quick Fundraise",
    description:
      "Shikshadwar is a flag bearer of extensive social work that is for the benefit of the marginalized population of the country.",
    href: "/donate/",
    accent: "pine" as const,
  },
  {
    label: "03",
    title: "Give Donation",
    description:
      "Are you concerned about the future of our country's people, and ready to do what you can to help?",
    href: "/donate/",
    accent: "gold" as const,
  },
];

const accentClass: Record<(typeof cards)[number]["accent"], string> = {
  rust: "bg-rust",
  pine: "bg-pine",
  gold: "bg-gold",
};

const accentTintClass: Record<(typeof cards)[number]["accent"], string> = {
  rust: "group-hover:bg-rust/[0.04]",
  pine: "group-hover:bg-pine/[0.04]",
  gold: "group-hover:bg-gold/[0.06]",
};

export function CtaCards() {
  return (
    <section className="border-t border-border py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <ul className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={index * 0.06}>
              <motion.div
                initial={false}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-(--radius) border border-border bg-surface p-7 transition-all duration-300 hover:shadow-xl",
                    accentTintClass[card.accent],
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-x-0 top-0 h-1", accentClass[card.accent])}
                  />
                  <span className="font-heading text-3xl text-ink/15">{card.label}</span>
                  <h3 className="mt-4 flex items-center gap-1.5 font-heading text-xl text-ink">
                    {card.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
