import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { CheckoutClient } from "@/components/cart/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero breadcrumb="Checkout" title="Checkout" trail={[{ label: "Cart", href: "/cart/" }]} />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <CheckoutClient />
        </Container>
      </section>
    </>
  );
}
