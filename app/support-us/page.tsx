import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ProductGrid } from "@/components/support-us/product-grid";
import { SponsorshipTabs } from "@/components/sponsorship/sponsorship-tabs";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Shikshadwar Foundation by buying handmade products from women trained through our Livelihood programme, or by donating directly.",
  alternates: {
    canonical: "/support-us/",
  },
};

export default function SupportUsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Support Us"
        title="Buy something made with purpose."
        image={{ src: "/images/gallery/livelihood/live-03.jpeg", alt: "", objectPosition: "center 30%" }}
      />

      <SponsorshipTabs active="support-us" />

      <ProductGrid />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-(--radius) bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-heading text-h4 text-balance text-ink">
                  Prefer to support us directly?
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  A donation funds the training, materials and Enterprise Resource Centres behind
                  every product above.
                </p>
              </div>
              <Link
                href="/donate/"
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
              >
                Donate now
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
