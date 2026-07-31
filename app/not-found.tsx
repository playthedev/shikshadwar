import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[72vh] flex-col justify-center py-24">
      <div className="max-w-2xl">
        <span aria-hidden="true" className="font-heading text-mega text-rust/20">
          404
        </span>
        <h1 className="mt-6 font-heading text-h1 text-balance text-ink">Page not found</h1>
        <p className="mt-5 max-w-md text-body-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            size="xl"
            className="bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
          >
            Back to home
          </Button>
          <Link
            href="/contact-us/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <span className="relative">
              Tell us what broke
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
}
