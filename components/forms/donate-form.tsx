"use client";

import { useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RAZORPAY_THEME_COLOR, siteConfig } from "@/lib/site-config";
import {
  createOrderSchema,
  MAX_DONATION_INR,
  MIN_DONATION_INR,
  type CreateOrderInput,
} from "@/lib/validations/donate-schema";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const PRESET_AMOUNTS = [1100, 2100, 6000, 11000, 51000];

type Status = "idle" | "submitting" | "verifying" | "success" | "error";

export function DonateForm({
  defaultPurpose = "general",
  defaultAmount = 1100,
  presetAmounts = PRESET_AMOUNTS,
  mode = "amount",
  unitPrice,
  unitLabel = "item",
  quantityPresets,
  maxQuantity = 10,
  submitLabel = "Donate now",
  lockAmount = false,
  onSuccess,
}: {
  /** Tags the order so the sidebar CTAs on Sponsor a Child / Donate a Tree route to the same checkout with a distinct purpose. */
  defaultPurpose?: string;
  defaultAmount?: number;
  presetAmounts?: number[];
  /**
   * "quantity" swaps the preset-amount picker for a quantity stepper — the
   * amount becomes unitPrice × quantity, like an e-commerce checkout
   * (Support Us products) or a "gift N trees" flow (Donate a Tree), instead
   * of a freeform donation amount.
   */
  mode?: "amount" | "quantity";
  unitPrice?: number;
  /** Singular noun for the thing being counted, e.g. "Tree" — pluralised automatically for preset tiles. */
  unitLabel?: string;
  /** Quick-select quantity tiles, e.g. [10, 25, 50, 100] for "10 Trees", "25 Trees"… */
  quantityPresets?: number[];
  maxQuantity?: number;
  submitLabel?: string;
  /** Renders the amount as a fixed read-only total instead of the preset/custom picker — for checkouts (e.g. the cart) where the amount is already decided. */
  lockAmount?: boolean;
  /** Called once a payment is confirmed as paid, e.g. to clear a cart. */
  onSuccess?: () => void;
} = {}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(defaultAmount);
  const [quantity, setQuantity] = useState(quantityPresets?.[0] ?? 1);

  const initialQuantity = quantityPresets?.[0] ?? 1;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      amount: mode === "quantity" ? (unitPrice ?? defaultAmount) * initialQuantity : defaultAmount,
      name: "",
      email: "",
      phone: "",
      pan: "",
      dateOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "India",
      purpose: mode === "quantity" ? `${defaultPurpose} × ${initialQuantity}` : defaultPurpose,
    },
  });

  function pickPreset(value: number) {
    setSelectedPreset(value);
    setValue("amount", value, { shouldValidate: true });
  }

  function changeQuantity(next: number) {
    const clamped = Math.min(Math.max(next, 1), maxQuantity);
    setQuantity(clamped);
    if (unitPrice) {
      setValue("amount", unitPrice * clamped, { shouldValidate: true });
      setValue("purpose", `${defaultPurpose} × ${clamped}`);
    }
  }

  async function onSubmit(values: CreateOrderInput) {
    setErrorMessage(null);

    if (!scriptReady || typeof window === "undefined" || !window.Razorpay) {
      setStatus("error");
      setErrorMessage(
        scriptError
          ? "Couldn't load the payment gateway. Please check your connection or disable any ad blockers, then refresh the page."
          : "Payment gateway is still loading. Please try again in a moment.",
      );
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/donate/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Could not start the payment.");
      }

      const { orderId, amount, currency, keyId } = data;

      const razorpay = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount,
        currency,
        name: siteConfig.name,
        description: values.purpose ? `Donation — ${values.purpose}` : "Donation",
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone || undefined,
        },
        theme: { color: RAZORPAY_THEME_COLOR },
        handler: async (response: unknown) => {
          setStatus("verifying");
          try {
            const verifyRes = await fetch("/api/donate/verify/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === "paid") {
              setStatus("success");
              onSuccess?.();
            } else {
              setStatus("error");
              setErrorMessage(
                "We received your payment but couldn't confirm it automatically. " +
                  `Please email us at ${siteConfig.contact.email} with your payment ID.`,
              );
            }
          } catch {
            setStatus("error");
            setErrorMessage(
              `We couldn't confirm your payment automatically. Please email us at ${siteConfig.contact.email}.`,
            );
          }
        },
        modal: {
          ondismiss: () => {
            setStatus((current) => (current === "submitting" ? "idle" : current));
          },
        },
      });

      razorpay.on("payment.failed", () => {
        setStatus("error");
        setErrorMessage("Your payment could not be completed. Please try again.");
      });

      razorpay.open();
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-(--radius) border border-pine/30 bg-pine/5 p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="size-8 text-pine" />
        <p className="mt-3 font-heading text-lg text-ink">
          {mode === "quantity" ? "Thank you for your order" : "Thank you for your donation"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          A confirmation has been recorded. We&apos;ll be in touch with your receipt.
        </p>
      </div>
    );
  }

  const isBusy = status === "submitting" || status === "verifying";

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setScriptReady(true)}
        onError={() => {
          setScriptError(true);
          setErrorMessage(
            "Couldn't load the payment gateway. Please check your connection or disable any ad blockers, then refresh the page.",
          );
        }}
        strategy="afterInteractive"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {lockAmount ? (
          <div className="flex items-center justify-between rounded-(--radius) border border-border bg-muted p-4">
            <Label>Order total</Label>
            <p className="font-heading text-h4 tabular-nums text-ink">
              {`₹${defaultAmount.toLocaleString("en-IN")}`}
            </p>
          </div>
        ) : mode === "quantity" && unitPrice ? (
          <div>
            <Label>{quantityPresets ? `Choose how many ${unitLabel.toLowerCase()}s` : "Quantity"}</Label>

            {quantityPresets ? (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {quantityPresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => changeQuantity(value)}
                    className={cn(
                      "h-11 rounded-(--radius) border text-sm font-medium transition-colors",
                      quantity === value
                        ? "border-rust bg-rust text-primary-foreground"
                        : "border-border bg-background text-ink hover:border-rust/50",
                    )}
                  >
                    {`${value} ${unitLabel}${value === 1 ? "" : "s"}`}
                  </button>
                ))}
              </div>
            ) : null}

            <div className={cn("flex items-center gap-4", quantityPresets && "mt-3")}>
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
                  disabled={quantity >= maxQuantity}
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
            {errors.amount ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.amount.message}</p>
            ) : null}
          </div>
        ) : (
          <div>
            <Label>Choose an amount (₹)</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => pickPreset(value)}
                  className={cn(
                    "h-11 rounded-(--radius) border text-sm font-medium transition-colors",
                    selectedPreset === value
                      ? "border-rust bg-rust text-primary-foreground"
                      : "border-border bg-background text-ink hover:border-rust/50",
                  )}
                >
                  ₹{value.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <Input
              type="number"
              inputMode="numeric"
              min={MIN_DONATION_INR}
              max={MAX_DONATION_INR}
              className="mt-3"
              placeholder="Or enter a custom amount"
              {...register("amount", {
                valueAsNumber: true,
                onChange: () => setSelectedPreset(null),
              })}
            />
            {errors.amount ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.amount.message}</p>
            ) : null}
          </div>
        )}

        <p className="text-xs text-muted-foreground">Special characters are not allowed in the full name field.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="mt-1.5" autoComplete="name" {...register("name")} />
            {errors.name ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              className="mt-1.5"
              autoComplete="bday"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.dateOfBirth.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="phone">Mobile number</Label>
            <Input id="phone" className="mt-1.5" autoComplete="tel" {...register("phone")} />
            {errors.phone ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              className="mt-1.5"
              autoComplete="street-address"
              {...register("address")}
            />
            {errors.address ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.address.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-muted-foreground">
              Entering your pincode will help autofill your city and state.
            </p>
          </div>
          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              inputMode="numeric"
              maxLength={6}
              className="mt-1.5"
              autoComplete="postal-code"
              {...register("pincode")}
            />
            {errors.pincode ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.pincode.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" className="mt-1.5" autoComplete="address-level2" {...register("city")} />
            {errors.city ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.city.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" className="mt-1.5" autoComplete="address-level1" {...register("state")} />
            {errors.state ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.state.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              className="mt-1.5"
              autoComplete="country-name"
              {...register("country")}
            />
            {errors.country ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.country.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="pan">PAN number</Label>
            <Input
              id="pan"
              className="mt-1.5 uppercase"
              maxLength={10}
              {...register("pan")}
            />
            {errors.pan ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.pan.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2 rounded-(--radius) border border-pine/30 bg-pine/5 p-3 text-xs leading-relaxed text-pine">
            Please note that if you do not provide your PAN Number, you will not be able to claim
            50% tax exemption u/s 80G in India.
          </div>
        </div>

        {errorMessage ? (
          <div className="flex items-start gap-2 rounded-(--radius) border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={isBusy || (!scriptReady && !scriptError)}
          size="xl"
          className="w-full bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
        >
          {isBusy ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              {status === "verifying" ? "Confirming payment…" : "Starting payment…"}
            </>
          ) : !scriptReady && !scriptError ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Loading payment gateway…
            </>
          ) : (
            submitLabel
          )}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Payments are processed securely by Razorpay.
        </p>
      </form>
    </>
  );
}
