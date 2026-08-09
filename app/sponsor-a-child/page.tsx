import type { Metadata } from "next";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  HeartPulse,
  ShieldCheck,
  Users,
  Sparkles,
  Home,
  HandHeart,
  CalendarClock,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SponsorForm } from "@/components/sponsorship/sponsor-form";
import { SponsorshipTabs } from "@/components/sponsorship/sponsorship-tabs";
import { FinalCta } from "@/components/home/final-cta";
import {
  regularSupporterIntro,
  sponsorshipTier,
  sponsorshipDifference,
  sponsorshipMeansIntro,
  sponsorshipProvides,
  taxBenefitsNote,
  sponsorshipClosing,
} from "@/lib/sponsorship";

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
        title="Sponsor a Child – Transform a Life Through Education"
        image={{ src: "/images/hero/slide-01.png", alt: "", objectPosition: "center 20%" }}
      />

      <SponsorshipTabs active="sponsor-a-child" />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            <div>
              <Reveal>
                <p className="text-body-lg leading-relaxed text-ink/85">
                  Every child deserves the opportunity to learn, grow, and build a brighter
                  future. Yet, thousands of children from underprivileged communities are forced
                  to abandon their education due to poverty, lack of resources, and social
                  challenges.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-4 leading-relaxed text-ink/85">
                  At the Shikshadwar Foundation, we believe that education is the most powerful
                  tool to break the cycle of poverty. Through our{" "}
                  <span className="font-semibold text-ink">Sponsor a Child Programme</span>, you
                  can help provide access to quality education, learning materials, nutritional
                  support, life skills, and a safe environment for children in need.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="mt-12 font-heading text-h3 text-balance text-ink">
                  What Does Child Sponsorship Mean?
                </h2>
                <p className="mt-3 leading-relaxed text-ink/85">{sponsorshipMeansIntro}</p>
                <ul className="mt-6 space-y-3">
                  {sponsorshipProvides.map((item, index) => {
                    const Icon = [GraduationCap, BookOpen, HeartPulse, ShieldCheck, Users][index] ?? GraduationCap;
                    return (
                      <li key={item} className="flex items-start gap-3">
                        <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-rust" />
                        <p className="text-base leading-relaxed text-ink/85">{item}</p>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>

              <Reveal delay={0.14}>
                <h2 className="mt-12 font-heading text-h3 text-balance text-ink">
                  Become a Regular Supporter
                </h2>
                <p className="mt-3 leading-relaxed text-ink/85">{regularSupporterIntro}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <SponsorForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-[#eef2f4] py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-pine" />
              <p className="text-eyebrow text-rust uppercase">When you sponsor a child</p>
            </div>
            <h2 className="mt-5 font-heading text-h2 text-balance text-ink">
              Your Sponsorship Makes a Difference
            </h2>
            <ul className="mt-10 space-y-5">
              {sponsorshipDifference.map((item, index) => {
                const Icon = [GraduationCap, Sparkles, Home, HandHeart][index] ?? Sparkles;
                return (
                  <Reveal as="li" key={item} delay={index * 0.06}>
                    <div className="flex items-start gap-3">
                      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-rust" />
                      <p className="text-base leading-relaxed text-ink/85">{item}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Sponsor a Child Today</p>
            </div>
            <p className="mt-5 font-heading text-h3 text-balance text-ink">
              Join hands with Shikshadwar Foundation and become a catalyst for change.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-(--radius) border border-border bg-surface p-6">
                <HandHeart aria-hidden="true" className="mx-auto size-6 text-rust" />
                <p className="mt-3 font-heading text-h2 tabular-nums text-ink">
                  {`₹${sponsorshipTier.annual.toLocaleString("en-IN")}`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">per child, per year</p>
              </div>
              <div className="rounded-(--radius) border border-border bg-surface p-6">
                <CalendarClock aria-hidden="true" className="mx-auto size-6 text-rust" />
                <p className="mt-3 font-heading text-h2 tabular-nums text-ink">
                  {`₹${sponsorshipTier.monthly.toLocaleString("en-IN")}`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">per child, per month</p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {`We encourage a minimum commitment of ${sponsorshipTier.minimumCommitmentYears} years to ensure meaningful and sustained support for the child's educational journey.`}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-pine" />
              <p className="text-eyebrow text-rust uppercase">Together, We Can Build Futures</p>
            </div>
            <Reveal delay={0.06}>
              <p className="mt-5 font-heading text-h3 text-balance text-ink">
                {sponsorshipClosing}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Tax Benefits</p>
            </div>
            <Reveal delay={0.06}>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {taxBenefitsNote}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-[#eef2f4] py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <Reveal>
            <Image
              src="/images/money-spent.png"
              alt="How is your money spent? 80% of the donations we receive are used to strengthen these initiatives on the ground. 13% of the donations we raise are used to strengthen the support systems that help us monitor and evaluate these initiatives. 7% of the funds we raise are used for activities that help us mobilise resources and guarantee long-term support to these initiatives."
              width={752}
              height={276}
              className="mx-auto h-auto w-full max-w-4xl rounded-(--radius)"
            />
          </Reveal>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

