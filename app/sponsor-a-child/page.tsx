import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { DonateForm } from "@/components/forms/donate-form";
import { SponsorBenefits } from "@/components/sponsorship/sponsor-benefits";
import { FinalCta } from "@/components/home/final-cta";
import { oneTimeSponsorshipAmounts } from "@/lib/sponsorship";

export const metadata: Metadata = {
  title: "Sponsor a Child",
  description:
    "Give a child a chance to learn and dream. Sponsor a child's education with Shikshadwar Foundation and help break the cycle of poverty through education.",
  alternates: {
    canonical: "/sponsor-a-child/",
  },
};

export default function SponsorAChildPage() {
  return (
    <>
      <PageHero
        breadcrumb="Sponsor a Child"
        eyebrow="Give every child a chance to learn and dream"
        title="Education is every child's right."
        description="When you sponsor a child, your support pays for school supplies, uniforms, academic resources, health and nutritional assistance, and protection from child labour and early marriage."
        image={{ src: "/images/hero/slide-01.png", alt: "", objectPosition: "center 20%" }}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <Reveal className="mx-auto max-w-xl">
            <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                <p className="text-eyebrow text-rust uppercase">Sponsor now</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Choose a one-time amount below to sponsor a child today. For an ongoing monthly
                or annual sponsorship, get in touch with us directly and we&apos;ll set it up with
                you.
              </p>
              <div className="mt-8">
                <DonateForm
                  defaultPurpose="Sponsor a Child"
                  defaultAmount={oneTimeSponsorshipAmounts[3]}
                  presetAmounts={oneTimeSponsorshipAmounts}
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <SponsorBenefits />

      <section className="border-t border-border py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-(--radius) bg-pine-tint p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-heading text-h4 text-balance text-ink">
                  Meet the children waiting for a sponsor.
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">
                  Every child on our Meet Our Stars page is currently enrolled in our education
                  programme and looking for someone to see the year through with them.
                </p>
              </div>
              <Link
                href="/meet-our-stars/"
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-(--radius) bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/85"
              >
                Meet our stars
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
