"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  volunteerSchema,
  type VolunteerFormValues,
} from "@/lib/validations/volunteer-schema";
import { submitVolunteerForm } from "@/lib/actions/volunteer";

export function VolunteerForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<
    { status: "success" } | { status: "error"; message: string } | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      occupation: "",
      company: "",
    },
  });

  function onSubmit(values: VolunteerFormValues) {
    setResult(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.set(key, value ?? ""));
      const res = await submitVolunteerForm({ status: "idle" }, formData);
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
        <p className="mt-3 font-heading text-lg text-ink">Thanks for signing up</p>
        <p className="mt-1 text-sm text-muted-foreground">
          You&apos;ll typically hear back from us within eight business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="v-company">Company</Label>
        <Input id="v-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <Label htmlFor="v-name">Your name</Label>
        <Input id="v-name" className="mt-1.5" autoComplete="name" {...register("name")} />
        {errors.name ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="v-email">Email</Label>
        <Input
          id="v-email"
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
        <Label htmlFor="v-phone">Phone no.</Label>
        <Input id="v-phone" className="mt-1.5" autoComplete="tel" {...register("phone")} />
        {errors.phone ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="v-dob">Date of birth</Label>
        <Input
          id="v-dob"
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
        <Label htmlFor="v-address">Address</Label>
        <Input id="v-address" className="mt-1.5" autoComplete="street-address" {...register("address")} />
        {errors.address ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.address.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="v-occupation">Occupation</Label>
        <Input id="v-occupation" className="mt-1.5" {...register("occupation")} />
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
            Submitting…
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
