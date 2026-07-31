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
    <Container className="flex min-h-[72vh] flex-col justify-center py-24">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
          <p className="text-eyebrow text-rust uppercase">Error</p>
        </div>
        <h1 className="mt-5 font-heading text-h1 text-balance text-ink">Something went wrong</h1>
        <p className="mt-5 max-w-md text-body-lg leading-relaxed text-muted-foreground">
          We couldn&apos;t load this page. Please try again, or head back home.
        </p>
        {error.digest ? (
          // Surfacing the digest gives the user something concrete to quote
          // when they report it — without it the error is unidentifiable in
          // the server logs.
          <p className="mt-3 font-mono text-xs text-muted-foreground/70">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap gap-4">
          <Button onClick={() => reset()} variant="outline" size="xl" className="font-semibold">
            Try again
          </Button>
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            size="xl"
            className="bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
          >
            Back to home
          </Button>
        </div>
      </div>
    </Container>
  );
}
