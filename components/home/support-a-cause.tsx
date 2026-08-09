import Link from "next/link";
import { ArrowUpRight, HeartHandshake, TreePine, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { TiltCard } from "@/components/shared/tilt-card";
import { cn } from "@/lib/utils";

const causes = [
  {
    icon: HeartHandshake,
    title: "Sponsor a Child",
    description:
      "Fund one child's education for a year — tuition, uniforms, books and mentoring, start to finish.",
    href: "/sponsor-a-child/",
    accent: "rust" as const,
  },
  {
    icon: TreePine,
    title: "Donate a Tree",
    description:
      "Fund a sapling, its planting and its upkeep in one of our community tree-plantation drives.",
    href: "/donate-a-tree/",
    accent: "pine" as const,
  },
  {
    icon: Users,
    title: "Become a Volunteer",
    description:
      "Teach, mentor or mobilise a community directly — long-term and short-term both welcome.",
    href: "/join-us/",
    accent: "gold" as const,
  },
];

type Accent = (typeof causes)[number]["accent"];

const accentPanel: Record<Accent, string> = {
  rust: "bg-rust text-paper",
  pine: "bg-pine text-paper",
  gold: "bg-gold text-ink",
};

const accentGlyph: Record<Accent, string> = {
  rust: "text-paper/15",
  pine: "text-paper/15",
  gold: "text-ink/15",
};

const accentBody: Record<Accent, string> = {
  rust: "text-paper/75",
  pine: "text-paper/75",
  gold: "text-ink/70",
};

const accentIndex: Record<Accent, string> = {
  rust: "text-paper/50",
  pine: "text-paper/50",
  gold: "text-ink/50",
};

/**
 * Three real, named causes rather than a generic "get involved" trio —
 * the homepage slot a campaign carousel would occupy on a larger NGO site,
 * scaled down to the causes Shikshadwar actually runs today. Shares the
 * solid-panel visual language cta-cards.tsx established.
 */
export function SupportACause() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Support a cause</p>
            </div>
            <h2 className="mt-5 text-h1 font-heading text-balance text-ink">
              <RevealText text="Contribute to a cause that matters." />
            </h2>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {causes.map((cause, index) => (
            <Reveal as="li" key={cause.title} delay={index * 0.08} className="h-full">
              <TiltCard max={4} className="h-full rounded-(--radius)">
                <Link
                  href={cause.href}
                  className={cn(
                    "group/panel relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-(--radius) p-7 transition-shadow duration-500 hover:shadow-2xl",
                    accentPanel[cause.accent],
                  )}
                >
                  <cause.icon
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-3 -right-3 size-32 transition-transform duration-700 ease-(--ease-out-custom) group-hover/panel:scale-110 group-hover/panel:-rotate-6",
                      accentGlyph[cause.accent],
                    )}
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[200%] skew-x-[-18deg] bg-white/12 transition-transform duration-[900ms] ease-out group-hover/panel:translate-x-[420%] motion-reduce:hidden"
                  />

                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative font-heading text-sm tabular-nums",
                      accentIndex[cause.accent],
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <h3 className="flex items-start gap-2 font-heading text-h3">
                      {cause.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0 opacity-60 transition-transform duration-300 group-hover/panel:translate-x-0.5 group-hover/panel:-translate-y-0.5"
                      />
                    </h3>
                    <p className={cn("mt-3 text-sm leading-relaxed", accentBody[cause.accent])}>
                      {cause.description}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
