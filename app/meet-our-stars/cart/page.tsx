import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { SponsorshipCartClient } from "@/components/sponsorship/sponsorship-cart-client";

export const metadata: Metadata = {
  title: "Sponsorship Cart",
  robots: { index: false, follow: false },
};

export default function SponsorshipCartPage() {
  return (
    <>
      <PageHero
        breadcrumb="Cart"
        title="Your sponsorships"
        trail={[{ label: "Meet Our Stars", href: "/meet-our-stars/" }]}
      />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <SponsorshipCartClient />
        </Container>
      </section>
    </>
  );
}
