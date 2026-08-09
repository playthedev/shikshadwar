"use client";

import { useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RAZORPAY_THEME_COLOR, siteConfig } from "@/lib/site-config";
import { createOrderSchema, type CreateOrderInput } from "@/lib/validations/donate-schema";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

type Status = "idle" | "submitting" | "verifying" | "success" | "error";

/**
 * Gift-a-tree card in the client's reference "Gift Now" style — green
 * header band, tinted inputs, pill quantity presets — standing in for the
 * generic DonateForm on this one page. Still rides the same
 * order/verify/Razorpay flow as every other donation form.
 */
export function TreeDonateForm({
  defaultPurpose = "Donate a Tree",
  unitPrice,
  unitLabel = "Tree",
  quantityPresets = [10, 25, 50, 100],
  maxQuantity = 500,
  title = "Gift Now (Donation)",
  subtitle = "Help us to increase the green cover of the country.",
  note,
  submitLabel = "Proceed",
}: {
  defaultPurpose?: string;
  unitPrice: number;
  unitLabel?: string;
  quantityPresets?: number[];
  maxQuantity?: number;
  title?: string;
  subtitle?: string;
  note?: string;
  submitLabel?: string;
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(quantityPresets[0] ?? 1);
  const [customQuantity, setCustomQuantity] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      amount: unitPrice * (quantityPresets[0] ?? 1),
      name: "",
      email: "",
      phone: "",
      pincode: "",
      purpose: `${defaultPurpose} × ${quantityPresets[0] ?? 1}`,
    },
  });

  function pickPreset(value: number) {
    setQuantity(value);
    setCustomQuantity("");
    setValue("amount", unitPrice * value, { shouldValidate: true });
    setValue("purpose", `${defaultPurpose} × ${value}`);
  }

  function onCustomQuantityChange(raw: string) {
    setCustomQuantity(raw);
    const parsed = Math.min(Math.max(Number(raw) || 0, 0), maxQuantity);
    if (parsed > 0) {
      setQuantity(parsed);
      setValue("amount", unitPrice * parsed, { shouldValidate: true });
      setValue("purpose", `${defaultPurpose} × ${parsed}`);
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

  const isBusy = status === "submitting" || status === "verifying";
  const tintFieldClass =
    "h-12 rounded-xl border-none bg-pine-tint px-4 text-base text-ink placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-pine/40";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
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

      <div className="flex flex-wrap items-start justify-between gap-3 bg-pine px-6 py-5 sm:px-8">
        <p className="font-heading text-h4 text-paper">{title}</p>
        <p className="max-w-xs text-right text-sm leading-relaxed text-paper/85">{subtitle}</p>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center px-6 py-12 text-center sm:px-8">
          <CheckCircle2 aria-hidden="true" className="size-8 text-pine" />
          <p className="mt-3 font-heading text-lg text-ink">Thank you for your gift</p>
          <p className="mt-1 text-sm text-muted-foreground">
            A confirmation has been recorded. We&apos;ll be in touch with your receipt.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 px-6 py-7 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                placeholder="Full name"
                aria-label="Full name"
                className={tintFieldClass}
                autoComplete="name"
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Pincode"
                aria-label="Pincode"
                inputMode="numeric"
                maxLength={6}
                className={tintFieldClass}
                autoComplete="postal-code"
                {...register("pincode")}
              />
              {errors.pincode ? (
                <p className="mt-1.5 text-xs text-destructive">{errors.pincode.message}</p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Phone number"
                aria-label="Phone number"
                className={tintFieldClass}
                autoComplete="tel"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                aria-label="Email"
                className={tintFieldClass}
                autoComplete="email"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {quantityPresets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => pickPreset(value)}
                className={cn(
                  "h-11 rounded-full px-5 text-sm font-semibold transition-colors",
                  quantity === value && !customQuantity
                    ? "bg-pine text-paper"
                    : "bg-muted text-ink hover:bg-pine-tint",
                )}
              >
                {`${value} ${unitLabel}${value === 1 ? "" : "s"}`}
              </button>
            ))}
            <Input
              placeholder="Enter manually"
              aria-label="Enter number of trees manually"
              inputMode="numeric"
              value={customQuantity}
              onChange={(event) => onCustomQuantityChange(event.target.value)}
              className="h-11 w-36 rounded-full border-border px-4 text-sm"
            />
          </div>
          {errors.amount ? (
            <p className="text-xs text-destructive">{errors.amount.message}</p>
          ) : null}

          {note ? <p className="text-sm leading-relaxed text-muted-foreground">{note}</p> : null}

          {errorMessage ? (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isBusy || (!scriptReady && !scriptError)}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-pine text-base font-bold text-paper transition-colors hover:bg-[color-mix(in_oklch,var(--pine),black_12%)] disabled:pointer-events-none disabled:opacity-60"
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
          </button>
        </form>
      )}
    </div>
  );
}
