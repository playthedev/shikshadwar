"use client";

import { useMemo, useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RAZORPAY_THEME_COLOR, siteConfig } from "@/lib/site-config";
import { sponsorshipTier } from "@/lib/sponsorship";
import {
  createOrderSchema,
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

type Status = "idle" | "submitting" | "verifying" | "success" | "error";
type DonationType = "one-time" | "regular";
type Frequency = "monthly" | "yearly";

const CHILDREN_OPTIONS = [1, 2, 3, 4];
const TITLES = ["Mr", "Mrs", "Ms", "Dr"];
const HEAR_ABOUT_OPTIONS = [
  "Social media",
  "Friend or family",
  "Newspaper / TV",
  "Online search",
  "An event",
  "Other",
];

const fieldClass =
  "h-11 w-full appearance-none rounded-(--radius) border border-input bg-transparent px-3 pr-9 text-sm text-ink outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <Label className="text-ink/80">{`${label}${required ? "*" : ""}`}</Label>
      <div className="relative mt-1.5">
        <select
          className={fieldClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}

function TaxBenefitNote() {
  return (
    <div className="flex items-start gap-4 rounded-(--radius) border border-border bg-surface p-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
        80 G
      </span>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Please note that if you do not provide your PAN Number, you will not be able to claim
        50% tax exemption u/s 80G in India.
      </p>
    </div>
  );
}

/**
 * Two-step "Select Your Donation" → "Please provide your details" wizard,
 * matching the client-supplied reference flow (number of children + payment
 * frequency first, donor + payment details second) rather than the flat
 * single-step form used on the general donate pages.
 */
export function SponsorForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [donationType, setDonationType] = useState<DonationType>("regular");
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [title, setTitle] = useState(TITLES[0]);
  const [hearAbout, setHearAbout] = useState(HEAR_ABOUT_OPTIONS[0]);
  const [isIndianCitizen, setIsIndianCitizen] = useState(true);

  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const amount = useMemo(() => {
    const perChild =
      donationType === "regular"
        ? sponsorshipTier[frequency === "yearly" ? "annual" : "monthly"]
        : sponsorshipTier.annual;
    return perChild * numberOfChildren;
  }, [donationType, frequency, numberOfChildren]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      amount,
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
      purpose: "Sponsor a Child",
    },
  });

  function goToDetails() {
    setValue("amount", amount, { shouldValidate: true });
    setValue(
      "purpose",
      `Sponsor a Child × ${numberOfChildren} (${donationType === "regular" ? frequency : "one-time"})`,
    );
    setStep(2);
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

      const { orderId, amount: orderAmount, currency, keyId } = data;

      const razorpay = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount: orderAmount,
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

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-(--radius) border border-pine/30 bg-pine/5 p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="size-8 text-pine" />
        <p className="mt-3 font-heading text-lg text-ink">Thank you for your sponsorship</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A confirmation has been recorded. We&apos;ll be in touch with your receipt.
        </p>
      </div>
    );
  }

  const isBusy = status === "submitting" || status === "verifying";

  return (
    <div className="space-y-6">
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

      {step === 1 ? (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-(--radius) border border-border">
            <p className="bg-rust px-5 py-3 text-sm font-semibold uppercase tracking-wide text-paper">
              Select your donation
            </p>
            <div className="flex flex-wrap gap-6 bg-surface p-5">
              {(["one-time", "regular"] as DonationType[]).map((type) => (
                <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="donationType"
                    checked={donationType === type}
                    onChange={() => setDonationType(type)}
                    className="size-4 accent-[var(--rust)]"
                  />
                  {type === "one-time" ? "One time" : "Regular giving"}
                </label>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-(--radius) border border-border">
            <p className="bg-rust px-5 py-3 text-sm font-semibold uppercase tracking-wide text-paper">
              Donation / Sponsorship
            </p>
            <div className="space-y-5 bg-surface p-5">
              <p className="text-right text-xs text-muted-foreground">
                Fields marked as * are mandatory.
              </p>

              <SelectField
                label="Choose the number of children"
                required
                value={String(numberOfChildren)}
                onChange={(value) => setNumberOfChildren(Number(value))}
                options={CHILDREN_OPTIONS.map(String)}
              />

              <SelectField
                label="Choose your payment frequency"
                required
                value={donationType === "regular" ? frequency : "one-time"}
                onChange={(value) => setFrequency(value as Frequency)}
                options={donationType === "regular" ? ["monthly", "yearly"] : ["one-time"]}
              />

              <div>
                <Label className="text-ink/80">Your total sponsorship amount is ₹</Label>
                <Input
                  readOnly
                  value={amount.toLocaleString("en-IN")}
                  className="mt-1.5 bg-muted font-semibold text-ink"
                />
              </div>

              <Button
                type="button"
                onClick={goToDetails}
                size="xl"
                className="w-full bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
              >
                Next
              </Button>
            </div>
          </div>

          <TaxBenefitNote />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="overflow-hidden rounded-(--radius) border border-border">
            <p className="bg-rust px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-paper">
              Please provide your details
            </p>
            <div className="space-y-5 bg-surface p-5">
              <p className="text-center text-sm text-muted-foreground">
                Donating{" "}
                <span className="font-semibold text-ink">
                  {`₹${amount.toLocaleString("en-IN")}`}
                </span>{" "}
                {donationType === "regular" ? frequency : "one-time"}
              </p>

              <div className="grid gap-5 sm:grid-cols-[7rem_1fr]">
                <SelectField label="Title" value={title} onChange={setTitle} options={TITLES} />
                <div>
                  <Label htmlFor="name">First name*</Label>
                  <Input id="name" className="mt-1.5" autoComplete="given-name" {...register("name")} />
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address for communication</Label>
                <Input id="address" className="mt-1.5" autoComplete="street-address" {...register("address")} />
                {errors.address ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors.address.message}</p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="phone">Contact number*</Label>
                <Input id="phone" className="mt-1.5" autoComplete="tel" {...register("phone")} />
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="email">Email*</Label>
                <Input id="email" type="email" className="mt-1.5" autoComplete="email" {...register("email")} />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    className="mt-1.5"
                    autoComplete="country-name"
                    {...register("country")}
                  />
                </div>
                <div>
                  <Label htmlFor="state">Select state*</Label>
                  <Input id="state" className="mt-1.5" autoComplete="address-level1" {...register("state")} />
                  {errors.state ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.state.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="city">City name*</Label>
                  <Input id="city" className="mt-1.5" autoComplete="address-level2" {...register("city")} />
                  {errors.city ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.city.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="pincode">Pin code*</Label>
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
              </div>

              <div>
                <Label htmlFor="pan">PAN card number</Label>
                <Input id="pan" className="mt-1.5 uppercase" maxLength={10} {...register("pan")} />
                {errors.pan ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors.pan.message}</p>
                ) : null}
                <p className="mt-1.5 text-xs font-medium text-rust">
                  *For 80G tax exemption receipt
                </p>
              </div>

              <SelectField
                label="How did you find out about Shikshadwar Foundation?"
                required
                value={hearAbout}
                onChange={setHearAbout}
                options={HEAR_ABOUT_OPTIONS}
              />

              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={isIndianCitizen}
                  onChange={(event) => setIsIndianCitizen(event.target.checked)}
                  className="size-4 accent-[var(--rust)]"
                />
                I am an Indian citizen
              </label>
            </div>
          </div>

          {errorMessage ? (
            <div className="flex items-start gap-2 rounded-(--radius) border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              size="xl"
              className="flex-1 font-semibold"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isBusy || (!scriptReady && !scriptError)}
              size="xl"
              className={cn(
                "flex-[2] bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]",
              )}
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
                "Donate now"
              )}
            </Button>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Payments are processed securely by Razorpay.
          </p>

          <TaxBenefitNote />
        </form>
      )}
    </div>
  );
}
