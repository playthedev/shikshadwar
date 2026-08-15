"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { productCart } from "@/lib/cart-store";

const MAX_QUANTITY = 10;

/**
 * Quantity picker + Add to Cart for a Support Us product — add one or more,
 * then check out from /support-us/cart/. This is Support Us's own cart,
 * entirely separate from the Meet Our Stars sponsorship cart.
 */
export function ProductDonateForm({
  slug,
  name,
  unitPrice,
}: {
  slug: string;
  name: string;
  unitPrice: number;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function changeQuantity(next: number) {
    setQuantity(Math.min(Math.max(next, 1), MAX_QUANTITY));
    setAdded(false);
  }

  function handleAddToCart() {
    productCart.addToCart(
      {
        slug,
        name,
        href: `/support-us/${slug}/`,
        unitAmount: unitPrice,
      },
      quantity,
    );
    setAdded(true);
  }

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-semibold text-ink">Quantity</Label>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center rounded-(--radius) border border-border">
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex size-11 items-center justify-center text-lg font-medium text-ink transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
            >
              −
            </button>
            <span className="w-10 text-center font-heading text-base tabular-nums text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className="flex size-11 items-center justify-center text-lg font-medium text-ink transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
            >
              +
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            {`₹${unitPrice.toLocaleString("en-IN")} × ${quantity} = `}
            <span className="font-semibold text-ink">
              {`₹${(unitPrice * quantity).toLocaleString("en-IN")}`}
            </span>
          </p>
        </div>
      </div>

      {added ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            size="xl"
            variant="outline"
            onClick={() => router.push("/support-us/")}
            className="font-semibold"
          >
            Add another
          </Button>
          <Button
            type="button"
            size="xl"
            onClick={() => router.push("/support-us/cart/")}
            className="bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
          >
            View cart
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          size="xl"
          onClick={handleAddToCart}
          className="bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
        >
          <ShoppingCart aria-hidden="true" className="size-4" />
          Add to cart
        </Button>
      )}
    </div>
  );
}
