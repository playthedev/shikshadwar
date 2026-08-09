"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, Minus, Package, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartTotal, removeFromCart, updateQuantity, useCart } from "@/lib/cart-store";

const RESERVE_SECONDS = 60 * 60;

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function CartClient() {
  const cart = useCart();
  const total = cartTotal(cart);
  const [secondsLeft, setSecondsLeft] = useState(RESERVE_SECONDS);

  useEffect(() => {
    if (cart.length === 0) return;
    const id = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [cart.length]);

  if (cart.length === 0) {
    return (
      <div className="rounded-(--radius) border border-border bg-surface p-10 text-center">
        <p className="font-heading text-h4 text-ink">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Sponsor a child or shop Support Us to add something here.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/meet-our-stars/"
            className="inline-flex items-center justify-center rounded-(--radius) bg-rust px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--rust-strong)]"
          >
            Meet our stars
          </Link>
          <Link
            href="/support-us/"
            className="inline-flex items-center justify-center rounded-(--radius) border border-border px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-muted"
          >
            Support us
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 rounded-(--radius) bg-muted p-4 text-sm text-ink">
        <Flame aria-hidden="true" className="size-5 shrink-0 text-rust" />
        <p>
          An item of your cart is in high demand. Your cart is saved for{" "}
          <span className="font-semibold text-rust tabular-nums">{formatCountdown(secondsLeft)}</span>{" "}
          minutes!
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="hidden border-b border-border pb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:flex sm:justify-between">
            <span>Product</span>
            <span>Total</span>
          </div>

          <ul className="divide-y divide-border">
            {cart.map((item) => (
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
                          onClick={() =>
                            updateQuantity(item.slug, item.variantLabel, item.quantity - 1)
                          }
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
                          onClick={() =>
                            updateQuantity(item.slug, item.variantLabel, item.quantity + 1)
                          }
                          className="flex size-9 items-center justify-center text-ink transition-colors hover:bg-muted"
                        >
                          <Plus aria-hidden="true" className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.slug, item.variantLabel)}
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

          <Link href="/cart/checkout/" className="mt-6 block">
            <Button
              type="button"
              size="xl"
              className="w-full bg-ink font-semibold text-paper hover:bg-ink/85"
            >
              Proceed to checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
