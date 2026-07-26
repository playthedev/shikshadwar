import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { DonateForm } from "@/components/forms/donate-form";

export const metadata: Metadata = {
  title: "Donate Now",
  description: "Support Shikshadwar Foundation's work in education, healthcare and livelihoods.",
  alternates: {
    canonical: "/donate/",
  },
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-ink pt-32 pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/60">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-paper/90">Donate</span>
          </nav>
          <h1 className="max-w-xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-heading text-paper">
            <RevealText text="Fund a plan, not just a moment." mode="mount" />
          </h1>
          <p className="mt-4 max-w-md text-lg text-paper/75">
            ₹500 covers a month of learning materials for one child.
          </p>
        </Container>
      </section>

      <section className="py-[clamp(3.5rem,7vw,6rem)]">
        <Container className="mx-auto max-w-lg">
          <Reveal>
            <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
              <p className="mb-6 font-heading text-xl text-ink">Make your donation</p>
              <DonateForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
