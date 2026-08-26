"use client";

import Link from "next/link";
import { CartList } from "@/components/cart/cart-list";
import { CartReserveBanner } from "@/components/cart/cart-reserve-banner";
import { sponsorshipCart } from "@/lib/cart-store";

/**
 * Meet Our Stars' own cart — reads only `sponsorshipCart`, entirely separate
 * from Support Us's product cart (see ProductCartClient). Nothing here can
 * ever show a product.
 */
export function SponsorshipCartClient() {
  const cart = sponsorshipCart.useCart();

  if (cart.length === 0) {
    return (
      <div className="rounded-(--radius) border border-border bg-surface p-10 text-center">
        <p className="font-heading text-h4 text-ink">Your sponsorship cart is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Meet a child on Meet Our Stars to sponsor them.
        </p>
        <Link
          href="/meet-our-stars/"
          className="mt-6 inline-flex items-center justify-center rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
        >
          Meet our stars
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CartReserveBanner active={cart.length > 0} />
      <CartList
        items={cart}
        checkoutHref="/meet-our-stars/checkout/"
        onUpdateQuantity={sponsorshipCart.updateQuantity}
        onRemove={sponsorshipCart.removeFromCart}
        totalsLabel="Sponsorship total"
      />
    </div>
  );
}
