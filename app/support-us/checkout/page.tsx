import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { ProductCheckoutClient } from "@/components/support-us/product-checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function ProductCheckoutPage() {
  return (
    <>
      <PageHero
        breadcrumb="Checkout"
        title="Checkout"
        trail={[
          { label: "Support Us", href: "/support-us/" },
          { label: "Cart", href: "/support-us/cart/" },
        ]}
      />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <ProductCheckoutClient />
        </Container>
      </section>
    </>
  );
}
