import Link from "next/link";
import { ShieldCheck, FileText, BadgeCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

export function TrustStrip() {
  return (
    <section className="border-t border-border bg-muted/40 py-10">
      <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-pine" />
          <p className="text-sm text-ink">
            Public Charitable Trust · registered under the Indian Trust Act,
            1882 · 12A &amp; 80G certified
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/statutory-documents/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-pine decoration-2 underline-offset-4 hover:text-pine"
          >
            <BadgeCheck aria-hidden="true" className="size-4" />
            View registration certificates
          </Link>
          <Link
            href="/annual-reports/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-rust decoration-2 underline-offset-4 hover:text-rust"
          >
            <FileText aria-hidden="true" className="size-4" />
            View our audited accounts
          </Link>
        </div>
      </Container>
    </section>
  );
}
