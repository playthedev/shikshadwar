"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { programmes } from "@/lib/programmes";
import { cn } from "@/lib/utils";

const cardHover = { y: -6 };
const cardTransition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

export function ProgrammeGrid() {
  const featured = programmes.find((p) => p.slug === "education")!;
  const rest = programmes.filter((p) => p.slug !== "education");

  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Six programmes, one starting point: dignity."
          description="Every programme is designed around the same idea — build capability that outlasts our involvement, not dependency on it."
          animateTitle
        />

        <div className="mt-12 space-y-6">
          <Reveal>
            <motion.div initial={false} whileHover={cardHover} transition={cardTransition}>
              <SpotlightCard className="rounded-(--radius) overflow-hidden">
                <Link
                  href={`/${featured.slug}/`}
                  className="group grid border border-border bg-surface transition-shadow hover:shadow-xl md:grid-cols-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                    {featured.image ? (
                      <div className="h-full w-full overflow-hidden">
                        <Photo
                          src={featured.image.src}
                          alt={featured.image.alt}
                          aspect="landscape"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          quality={92}
                          className="h-full rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <PhotoPlaceholder
                        caption={featured.photoCaption}
                        aspect="landscape"
                        tag={featured.tag}
                        icon={featured.icon}
                        className="h-full rounded-none border-0"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <span className="inline-block text-xs font-semibold tracking-wide text-rust uppercase">
                      Featured Programme
                    </span>
                    <h3 className="mt-2 flex items-center gap-1.5 font-heading text-2xl text-ink">
                      {featured.cardTitle}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </h3>
                    <p className="mt-3 max-w-md text-md leading-relaxed text-muted-foreground">
                      {featured.summary}
                    </p>
                  </div>
                </Link>
              </SpotlightCard>
            </motion.div>
          </Reveal>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((programme, index) => (
              <Reveal as="li" key={programme.slug} delay={index * 0.05}>
                <motion.div initial={false} whileHover={cardHover} transition={cardTransition} className="h-full">
                  <SpotlightCard className="h-full rounded-(--radius) overflow-hidden">
                    <Link
                      href={`/${programme.slug}/`}
                      className="group flex h-full flex-col border border-border bg-surface p-5 transition-shadow hover:shadow-xl"
                    >
                      <div className="overflow-hidden rounded-(--radius)">
                        {programme.image ? (
                          <Photo
                            src={programme.image.src}
                            alt={programme.image.alt}
                            aspect="landscape"
                            className="border-0 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <PhotoPlaceholder
                            caption={programme.photoCaption}
                            aspect="landscape"
                            tag={programme.tag}
                            icon={programme.icon}
                            className="border-0"
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-4 inline-block text-xs font-semibold tracking-wide uppercase",
                          programme.tag === "rust" ? "text-rust" : "text-pine",
                        )}
                      >
                        {programme.title}
                      </span>
                      <h3 className="mt-2 flex items-center gap-1.5 font-heading text-lg text-ink">
                        {programme.cardTitle}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {programme.summary}
                      </p>
                    </Link>
                  </SpotlightCard>
                </motion.div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
