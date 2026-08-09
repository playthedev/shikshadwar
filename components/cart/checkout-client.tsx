"use client";

import Link from "next/link";
import { DonateForm } from "@/components/forms/donate-form";
import { cartTotal, clearCart, useCart } from "@/lib/cart-store";

export function CheckoutClient() {
  const cart = useCart();
  const total = cartTotal(cart);

  if (cart.length === 0) {
    return (
      <div className="rounded-(--radius) border border-border bg-surface p-10 text-center">
        <p className="font-heading text-h4 text-ink">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a sponsorship or a product before checking out.
        </p>
        <Link
          href="/cart/"
          className="mt-6 inline-flex items-center justify-center rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
        >
          Back to cart
        </Link>
      </div>
    );
  }

  const purpose = cart
    .map((item) =>
      item.variantLabel
        ? `${item.name} (${item.variantLabel} × ${item.quantity})`
        : `${item.name} × ${item.quantity}`,
    )
    .join(", ");

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
        <p className="text-eyebrow text-rust uppercase">Order summary</p>
        <ul className="mt-5 space-y-4">
          {cart.map((item) => (
            <li
              key={`${item.slug}-${item.variantLabel ?? ""}`}
              className="flex items-center justify-between text-sm"
            >
              <div>
                <p className="font-medium text-ink">{item.name}</p>
                <p className="text-muted-foreground">
                  {item.variantLabel ? `${item.variantLabel} × ${item.quantity}` : `Qty ${item.quantity}`}
                </p>
              </div>
              <p className="tabular-nums text-ink">
                {`₹${(item.unitAmount * item.quantity).toLocaleString("en-IN")}`}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <p className="font-heading text-lg text-ink">Total</p>
          <p className="font-heading text-h4 tabular-nums text-ink">
            {`₹${total.toLocaleString("en-IN")}`}
          </p>
        </div>
      </div>

      <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
        <DonateForm
          defaultPurpose={purpose}
          defaultAmount={total}
          lockAmount
          submitLabel="Donate now"
          onSuccess={clearCart}
        />
      </div>
    </div>
  );
}
