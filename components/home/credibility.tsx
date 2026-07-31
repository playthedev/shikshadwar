import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

const partners = [
  { name: "Vidyanjali", src: "/images/partners/vidyanjali.jpg" },
  { name: "Rural Upliftment Foundation", src: "/images/partners/rural-upliftment-foundation.jpg" },
];

const documents = [
  { label: "Registration certificates", href: "/statutory-documents/" },
  { label: "Audited accounts", href: "/annual-reports/" },
];

/**
 * Legal credibility — the strongest donor-trust signal on the site — merged
 * with the partner strip. Set on white against the paper stock either side
 * so it reads as an inserted panel of record, and kept quiet on purpose:
 * this section earns trust by being plainly legible, not by being loud.
 */
export function Credibility() {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-pine" />
              <p className="text-eyebrow text-pine uppercase">Registered &amp; transparent</p>
            </div>
            <p className="mt-5 font-heading text-h3 text-balance text-ink">
              A Public Charitable Trust, registered under the Indian Trust Act, 1882.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              12A &amp; 80G certified — PAN {siteConfig.tax.pan}, 80G No. {siteConfig.tax.certificate80G}
            </p>
          </div>

          <Reveal delay={0.08} className="lg:col-span-3">
            <ul>
              {documents.map((doc, index) => (
                <li key={doc.href} className={index > 0 ? "border-t border-border" : ""}>
                  <Link
                    href={doc.href}
                    className="group flex items-center justify-between gap-4 py-4 text-sm font-semibold text-ink transition-colors hover:text-rust"
                  >
                    {doc.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rust"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Our partners</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-16 w-40 items-center justify-center rounded-(--radius) border border-border bg-paper p-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      sizes="160px"
                      quality={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact-us/"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <span className="relative">
                Become a partner
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
