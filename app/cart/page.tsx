import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <PageHero breadcrumb="Cart" title="Cart" />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <CartClient />
        </Container>
      </section>
    </>
  );
}
