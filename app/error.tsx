"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-2xl text-ink">Something went wrong</h1>
      <p className="mt-3 max-w-md text-md text-muted-foreground">
        We couldn&apos;t load this page. Please try again, or head back home.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} variant="outline" className="rounded-(--radius)">
          Try again
        </Button>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="rounded-(--radius) bg-rust text-primary-foreground hover:bg-[var(--rust-strong)]"
        >
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
