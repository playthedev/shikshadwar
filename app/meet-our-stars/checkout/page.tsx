import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { SponsorshipCheckoutClient } from "@/components/sponsorship/sponsorship-checkout-client";

export const metadata: Metadata = {
  title: "Sponsorship Checkout",
  robots: { index: false, follow: false },
};

export default function SponsorshipCheckoutPage() {
  return (
    <>
      <PageHero
        breadcrumb="Checkout"
        title="Checkout"
        trail={[
          { label: "Meet Our Stars", href: "/meet-our-stars/" },
          { label: "Cart", href: "/meet-our-stars/cart/" },
        ]}
      />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <SponsorshipCheckoutClient />
        </Container>
      </section>
    </>
  );
}
