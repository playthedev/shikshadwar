import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { ProductCartClient } from "@/components/support-us/product-cart-client";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
};

export default function ProductCartPage() {
  return (
    <>
      <PageHero breadcrumb="Cart" title="Cart" trail={[{ label: "Support Us", href: "/support-us/" }]} />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <ProductCartClient />
        </Container>
      </section>
    </>
  );
}
