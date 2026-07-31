import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { DonateForm } from "@/components/forms/donate-form";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Donate a Tree",
  description:
    "Green earth begins with one tree. Fund a sapling with Shikshadwar Foundation's tree-plantation drives across Delhi's schools and communities.",
  alternates: {
    canonical: "/donate-a-tree/",
  },
};

const treeDonationAmounts = [251, 500, 1001, 2100];

export default function DonateATreePage() {
  return (
    <>
      <PageHero
        breadcrumb="Donate a Tree"
        eyebrow="Green earth begins with one tree"
        title="Plant a tree, grow a future."
        description="Trees produce oxygen, absorb carbon dioxide, improve air quality, conserve water, prevent soil erosion, and provide habitat for wildlife — one of the most effective, sustainable ways to restore ecological balance."
        image={{
          src: "/images/programmes/sustainable-development.jpg",
          alt: "",
          objectPosition: "center 40%",
        }}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-pine" />
                <p className="text-eyebrow text-pine uppercase">Why tree plantation?</p>
              </div>
              <p className="mt-5 text-body-lg leading-relaxed text-ink/85">
                Climate change and deforestation make tree planting one of the most effective and
                sustainable solutions we have to restore ecological balance — capturing carbon,
                enhancing biodiversity, recharging groundwater and supporting healthier
                communities.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Shikshadwar runs community tree-plantation drives across schools and welfare
                societies — distributing fruit and native saplings, running environmental
                awareness sessions, and maintaining every sapling after it&apos;s planted. In 2025–26
                alone, we distributed over 300 saplings across four locations in Delhi.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A donation here funds a sapling, its planting, and its upkeep — a small, concrete
                action with a long-term return for the community around it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Donate a tree</p>
                </div>
                <div className="mt-8">
                  <DonateForm
                    defaultPurpose="Donate a Tree"
                    defaultAmount={treeDonationAmounts[1]}
                    presetAmounts={treeDonationAmounts}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
