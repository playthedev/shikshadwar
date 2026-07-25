import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export function FinalCta() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-ink py-[clamp(4rem,8vw,7rem)]">
      <div
        aria-hidden="true"
        className="animate-blob-drift absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust opacity-20 blur-3xl"
      />
      <Container className="relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-heading text-paper">
          Your <span className="text-gradient-warm">gift</span> funds a plan,
          not just a moment.
        </h2>
        <p className="mt-4 max-w-lg text-md text-paper/70">
          ₹500 covers a month of learning materials for one child. ₹1,000
          covers a month of learning support. Every rupee is accounted for in
          our published annual reports.
        </p>
        {/* Primary donate CTA — intentionally has no hover/entrance motion. */}
        <Button
          render={<Link href="/donate/" />}
          nativeButton={false}
          className="mt-8 h-13 rounded-(--radius) bg-rust px-8 text-base font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] active:translate-y-0"
        >
          Donate Now
        </Button>
      </Container>
    </section>
  );
}
