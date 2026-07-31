import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ChildGrid } from "@/components/sponsorship/child-grid";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Meet Our Stars",
  description:
    "Meet the children currently enrolled in Shikshadwar Foundation's education programme who are looking for a sponsor to see the year through.",
  alternates: {
    canonical: "/meet-our-stars/",
  },
};

export default function MeetOurStarsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Meet Our Stars"
        eyebrow="Waiting for a sponsor"
        title="Meet our stars."
        description="Every child below is currently enrolled in our education programme and looking for a sponsor to see the year through."
        image={{ src: "/images/hero/slide-01.png", alt: "", objectPosition: "center 20%" }}
      />

      <ChildGrid />

      <section className="border-t border-border py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-(--radius) bg-rust-tint p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-heading text-h4 text-balance text-ink">
                  Ready to sponsor one of these children?
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">
                  Head back to the Sponsor a Child page to choose an amount and complete your
                  sponsorship — or get in touch and we&apos;ll set up an ongoing monthly or annual
                  plan with you.
                </p>
              </div>
              <Link
                href="/sponsor-a-child/"
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
              >
                Sponsor a child
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
