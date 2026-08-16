"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Package, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartTotal, type CartItem } from "@/lib/cart-store";

/**
 * Item list + totals card for one cart. Shared by the Meet Our Stars and
 * Support Us cart pages — each passes in its own store's `updateQuantity` /
 * `removeFromCart` so this component never has to know which flow it's
 * rendering.
 */
export function CartList({
  items,
  checkoutHref,
  onUpdateQuantity,
  onRemove,
}: {
  items: CartItem[];
  checkoutHref: string;
  onUpdateQuantity: (slug: string, variantLabel: string | undefined, quantity: number) => void;
  onRemove: (slug: string, variantLabel?: string) => void;
}) {
  const total = cartTotal(items);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="hidden border-b border-border pb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:flex sm:justify-between">
          <span>Product</span>
          <span>Total</span>
        </div>

        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li
              key={`${item.slug}-${item.variantLabel ?? ""}`}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-(--radius) bg-muted">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <Package aria-hidden="true" className="size-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Link
                    href={item.href}
                    className="font-medium text-ink underline-offset-2 hover:text-rust hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {`₹${item.unitAmount.toLocaleString("en-IN")}.00`}
                  </p>
                  {item.variantLabel ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Select your donation: {item.variantLabel}
                    </p>
                  ) : null}

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-(--radius) border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.slug, item.variantLabel, item.quantity - 1)}
                        className="flex size-9 items-center justify-center text-ink transition-colors hover:bg-muted"
                      >
                        <Minus aria-hidden="true" className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.slug, item.variantLabel, item.quantity + 1)}
                        className="flex size-9 items-center justify-center text-ink transition-colors hover:bg-muted"
                      >
                        <Plus aria-hidden="true" className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => onRemove(item.slug, item.variantLabel)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="font-heading text-lg tabular-nums text-ink sm:text-right">
                {`₹${(item.unitAmount * item.quantity).toLocaleString("en-IN")}.00`}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-fit rounded-(--radius) border border-border bg-surface p-6">
        <p className="text-eyebrow text-rust uppercase">Cart totals</p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
          <p className="font-heading text-lg text-ink">Estimated total</p>
          <p className="font-heading text-h4 tabular-nums text-ink">
            {`₹${total.toLocaleString("en-IN")}.00`}
          </p>
        </div>

        <Link href={checkoutHref} className="mt-6 block">
          <Button type="button" size="xl" className="w-full bg-ink font-semibold text-paper hover:bg-ink/85">
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
