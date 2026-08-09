import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { DonateForm } from "@/components/forms/donate-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Donate Now",
  description: "Support Shikshadwar Foundation's work in education, healthcare and livelihoods.",
  alternates: {
    canonical: "/donate/",
  },
};

const tiers = [
  { amount: "₹1,100", covers: "A month of learning materials and support for one child." },
  { amount: "₹2,100", covers: "A month of remedial classes and mentoring for one child." },
  { amount: "₹6,000", covers: "A term of holistic education support for one child." },
];

const proofs = [
  { label: "Registration certificates", href: "/statutory-documents/" },
  { label: "Audited accounts", href: "/annual-reports/" },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        breadcrumb="Donate"
        title="Fund a plan, not just a moment."
        image={{ src: "/images/hero/slide-02.png", alt: "", objectPosition: "center 30%" }}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            {/* The form leads on the wider column. Everything in the right-hand
                rail exists to answer "can I trust this", so it stays beside
                the form the whole way down rather than sitting under it. */}
            <Reveal className="lg:col-span-7">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Make your donation</p>
                </div>
                <div className="mt-8">
                  <DonateForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-heading text-h3 text-balance text-ink">
                  Every rupee is accounted for.
                </h2>

                <dl className="mt-8">
                  {tiers.map((tier, index) => (
                    <div
                      key={tier.amount}
                      className={index > 0 ? "mt-5 border-t border-border pt-5" : ""}
                    >
                      <dt className="font-heading text-h3 tabular-nums text-ink">{tier.amount}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {tier.covers}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 rounded-(--radius) bg-pine-tint p-6">
                  <ShieldCheck aria-hidden="true" className="size-5 text-pine" />
                  <p className="mt-3 text-sm font-semibold text-ink">Registered &amp; transparent</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {siteConfig.legalStatus}. 12A &amp; 80G certified — up to 50% tax exemption
                    under Section 80G when you share your PAN. PAN {siteConfig.tax.pan}, 80G No.{" "}
                    {siteConfig.tax.certificate80G}.
                  </p>
                  <ul className="mt-4 border-t border-ink/10">
                    {proofs.map((proof) => (
                      <li key={proof.href}>
                        <Link
                          href={proof.href}
                          className="group flex items-center justify-between gap-3 border-b border-ink/10 py-3 text-sm font-semibold text-ink transition-colors hover:text-pine"
                        >
                          {proof.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-ink/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pine"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
