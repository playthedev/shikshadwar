"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact-schema";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<
    { status: "success" } | { status: "error"; message: string } | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  function onSubmit(values: ContactFormValues) {
    setResult(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.set(key, value ?? ""));
      const res = await submitContactForm({ status: "idle" }, formData);
      if (res.status === "success") {
        setResult({ status: "success" });
        reset();
      } else if (res.status === "error") {
        setResult(res);
      }
    });
  }

  if (result?.status === "success") {
    return (
      <div className="flex flex-col items-center rounded-(--radius) border border-pine/30 bg-pine/5 p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="size-8 text-pine" />
        <p className="mt-3 font-heading text-lg text-ink">Message sent</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="company">Company</Label>
        <Input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <Label htmlFor="name">Your name</Label>
        <Input id="name" className="mt-1.5" autoComplete="name" {...register("name")} />
        {errors.name ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="email">Your email</Label>
        <Input id="email" type="email" className="mt-1.5" autoComplete="email" {...register("email")} />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" className="mt-1.5" {...register("subject")} />
        {errors.subject ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.subject.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="message">Your message</Label>
        <Textarea id="message" rows={5} className="mt-1.5" {...register("message")} />
      </div>

      {result?.status === "error" ? (
        <div className="flex items-start gap-2 rounded-(--radius) border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>{result.message}</p>
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-(--radius) bg-rust text-base font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] sm:w-auto sm:px-8"
      >
        {isPending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
