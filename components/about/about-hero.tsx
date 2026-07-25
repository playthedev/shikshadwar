import Link from "next/link";
import { RevealText } from "@/components/shared/reveal-text";
import { Container } from "@/components/shared/container";

export function AboutHero() {
  return (
    <section className="bg-ink pt-32 pb-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/60">
          <Link href="/" className="hover:text-paper">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-paper/90">About Us</span>
        </nav>
        <h1 className="max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-heading text-paper">
          <RevealText text="We believe everyone deserves a future." mode="mount" />
        </h1>
      </Container>
    </section>
  );
}
