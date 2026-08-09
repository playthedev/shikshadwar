"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addToCart } from "@/lib/cart-store";

type Frequency = "Monthly" | "Yearly";

const fieldClass =
  "h-11 w-full appearance-none rounded-(--radius) border border-input bg-transparent px-3 pr-9 text-sm text-ink outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * "Select Your Donation" frequency picker + Add to Cart, matching the
 * client's reference flow: pick Monthly/Yearly, see the amount update, add
 * the child to the shared cart, then check out from /cart.
 */
export function ChildDonateForm({
  slug,
  name,
  image,
  monthlyAmount,
  yearlyAmount,
}: {
  slug: string;
  name: string;
  image: string;
  monthlyAmount: number;
  yearlyAmount: number;
}) {
  const router = useRouter();
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [added, setAdded] = useState(false);

  const amount = frequency === "Monthly" ? monthlyAmount : yearlyAmount;

  function handleAddToCart() {
    addToCart({
      slug,
      name: `Meet ${name}`,
      image,
      href: `/meet-our-stars/${slug}/`,
      variantLabel: frequency,
      unitAmount: amount,
    });
    setAdded(true);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-(--radius) bg-muted p-4">
        <Label className="text-sm font-semibold text-ink">Select your donation</Label>
        <div className="relative w-40">
          <select
            className={fieldClass}
            value={frequency}
            onChange={(event) => {
              setFrequency(event.target.value as Frequency);
              setAdded(false);
            }}
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      <p className="font-heading text-h3 tabular-nums text-gold">
        {`₹${amount.toLocaleString("en-IN")}.00`}
      </p>

      {added ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            size="xl"
            variant="outline"
            onClick={() => router.push("/meet-our-stars/")}
            className="font-semibold"
          >
            Add another
          </Button>
          <Button
            type="button"
            size="xl"
            onClick={() => router.push("/cart/")}
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
