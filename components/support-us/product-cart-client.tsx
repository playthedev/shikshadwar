"use client";

import Link from "next/link";
import { CartList } from "@/components/cart/cart-list";
import { CartReserveBanner } from "@/components/cart/cart-reserve-banner";
import { productCart } from "@/lib/cart-store";

/**
 * Support Us's own cart — reads only `productCart`, entirely separate from
 * Meet Our Stars' sponsorship cart (see SponsorshipCartClient). Nothing
 * here can ever show a child sponsorship.
 */
export function ProductCartClient() {
  const cart = productCart.useCart();

  if (cart.length === 0) {
    return (
      <div className="rounded-(--radius) border border-border bg-surface p-10 text-center">
        <p className="font-heading text-h4 text-ink">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">Shop Support Us to add something here.</p>
        <Link
          href="/support-us/"
          className="mt-6 inline-flex items-center justify-center rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
        >
          Support us
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CartReserveBanner active={cart.length > 0} />
      <CartList
        items={cart}
        checkoutHref="/support-us/checkout/"
        onUpdateQuantity={productCart.updateQuantity}
        onRemove={productCart.removeFromCart}
      />
    </div>
  );
}
