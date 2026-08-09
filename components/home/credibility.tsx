import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

const partners = [
  { name: "Vidyanjali", src: "/images/partners/vidyanjali.jpg" },
  { name: "Rural Upliftment Foundation", src: "/images/partners/rural-upliftment-foundation.jpg" },
];

/**
 * Partner strip — a "Become a partner" CTA on the left, partner logos
 * enlarged and presented as photo cards on the right.
 */
export function Credibility() {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
          <p className="text-eyebrow text-rust uppercase">Our partners</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 0.06}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-(--radius) border border-border bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  quality={100}
                  className="object-contain p-2 transition-transform duration-500 ease-(--ease-out-custom) group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.12}>
            <Link
              href="/contact-us/"
              className="group flex aspect-[4/3] flex-col items-start justify-center gap-2 rounded-(--radius) bg-rust p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-heading text-lg text-balance text-paper">
                Become a partner
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-paper/85">
                Get in touch
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
