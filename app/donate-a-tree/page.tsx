import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { TreeDonateForm } from "@/components/forms/tree-donate-form";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Donate a Tree",
  description:
    "Green earth begins with one tree. Fund a sapling with Shikshadwar Foundation's tree-plantation drives across Delhi's schools and communities.",
  alternates: {
    canonical: "/donate-a-tree/",
  },
};

// Illustrative — as on givemetrees.org/gift-a-tree, donors pick a number of
// trees rather than a rupee amount. Confirm the real per-tree cost with the
// client before this goes live; this is a placeholder like the tiered
// amounts it replaces.
const TREE_PRICE_INR = 300;
const TREE_QUANTITY_PRESETS = [1, 10, 25, 50, 100];

export default function DonateATreePage() {
  return (
    <>
      <PageHero
        breadcrumb="Donate a Tree"
        title="Plant a tree, grow a future."
        image={{
          src: "/images/programmes/sustainable-development.jpg",
          alt: "",
          objectPosition: "center 40%",
        }}
      />

      <section className="relative overflow-hidden py-[clamp(4rem,8vw,8rem)]">
        {/* Soft green backdrop — a couple of blurred pine blobs, same
            treatment as the page hero, so the section reads as "tree"
            without competing with the form. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--pine-tint),transparent_55%)]" />
          <div className="animate-breathe absolute -top-24 -left-32 size-[28rem] rounded-full bg-pine opacity-[0.12] blur-3xl" />
          <div className="animate-float-slow absolute -right-24 bottom-0 size-[24rem] rounded-full bg-pine opacity-[0.1] blur-3xl" />
        </div>

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-pine" />
                <p className="text-eyebrow text-pine uppercase">Why tree plantation?</p>
              </div>
              <h2 className="mt-5 font-heading text-h3 text-balance text-ink">
                A greener future starts with one sapling.
              </h2>
              <p className="mt-5 text-body-lg leading-relaxed text-ink/85">
                Climate change and deforestation make tree planting one of the most effective and
                sustainable solutions we have to restore ecological balance — capturing carbon,
                enhancing biodiversity, recharging groundwater and supporting healthier
                communities.
              </p>
              <p className="mt-6 leading-relaxed text-ink/85">
                Shikshadwar runs community tree-plantation drives across schools and welfare
                societies — distributing fruit and native saplings, running environmental
                awareness sessions, and maintaining every sapling after it&apos;s planted. In 2025–26
                alone, we distributed over 300 saplings across four locations in Delhi.
              </p>
              <p className="mt-6 leading-relaxed text-ink/85">
                A donation here funds a sapling, its planting, and its upkeep — a small, concrete
                action with a long-term return for the community around it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <TreeDonateForm
                unitPrice={TREE_PRICE_INR}
                unitLabel="Tree"
                quantityPresets={TREE_QUANTITY_PRESETS}
                maxQuantity={500}
                note={`Shikshadwar Foundation is a registered trust, and all donations made are eligible for tax exemption under Section 80G of the Income Tax Act. Each tree costs ₹${TREE_PRICE_INR.toLocaleString("en-IN")} to plant and maintain.`}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
