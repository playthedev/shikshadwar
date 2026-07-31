"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/validations/newsletter-schema";
import { submitNewsletterSignup } from "@/lib/actions/newsletter";

/**
 * Email-only capture, set on ink like the closing donate band below it —
 * the pre-footer slot a larger NGO site gives to a newsletter sign-up.
 * Uses the same server-action / Resend pattern as the contact and
 * volunteer forms, just a one-field version of it.
 */
export function NewsletterSignup() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<
    { status: "success" } | { status: "error"; message: string } | null
  >(null);
  const [values, setValues] = useState({ name: "", email: "", company: "" });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse(values);
    if (!parsed.success) {
      setResult({ status: "error", message: parsed.error.issues[0]?.message ?? "Please check your email address." });
      return;
    }

    setResult(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(parsed.data as NewsletterFormValues).forEach(([key, value]) =>
        formData.set(key, value ?? ""),
      );
      const res = await submitNewsletterSignup({ status: "idle" }, formData);
      if (res.status === "success") {
        setResult({ status: "success" });
        setValues({ name: "", email: "", company: "" });
      } else if (res.status === "error") {
        setResult(res);
      }
    });
  }

  return (
    <section className="grain-overlay bg-ink py-[clamp(4rem,8vw,6rem)]">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
            <p className="text-eyebrow text-gold uppercase">Stay in touch</p>
          </div>
          <h2 className="mt-4 font-heading text-h2 text-balance text-paper">
            Get programme updates in your inbox.
          </h2>
          <p className="mt-3 text-sm text-paper/65">
            The occasional email when a programme reaches a new milestone — no spam.
          </p>

          <Reveal delay={0.08}>
            {result?.status === "success" ? (
              <div className="mt-8 flex flex-col items-center gap-2 rounded-(--radius) border border-pine/30 bg-pine/10 p-6">
                <CheckCircle2 aria-hidden="true" className="size-6 text-pine" />
                <p className="text-sm font-medium text-paper">You&apos;re on the list.</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start"
              >
                <div className="sr-only" aria-hidden="true">
                  <Label htmlFor="nl-company">Company</Label>
                  <Input
                    id="nl-company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
                  />
                </div>

                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="nl-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-12 flex-1 border-paper/25 bg-paper/5 text-paper placeholder:text-paper/40"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-12 shrink-0 rounded-(--radius) bg-rust px-6 font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
                >
                  {isPending ? (
                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send aria-hidden="true" className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {result?.status === "error" ? (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-destructive">
                <XCircle aria-hidden="true" className="size-4 shrink-0" />
                <p>{result.message}</p>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
