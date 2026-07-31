import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MaskReveal } from "@/components/shared/mask-reveal";
import type { ProgrammeImage } from "@/lib/programmes";

/**
 * Photographs from the programme, staggered rather than gridded.
 *
 * Four identical squares in a row is a contact sheet — it flattens every
 * frame to the same importance and gives the eye nothing to follow. Dropping
 * alternate frames down the page and letting the first run wider turns the
 * strip into a sequence.
 */
export function ProgrammeGalleryStrip({ images }: { images: ProgrammeImage[] }) {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="In pictures"
          title="On the ground"
          animateTitle
          action={
            <Link
              href="/gallery/"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-ink"
            >
              <span className="relative">
                View full gallery
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
          }
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {images.map((image, index) => (
            <li key={image.src} className={index % 2 === 1 ? "md:mt-12" : ""}>
              <MaskReveal delay={(index % 4) * 0.07} className="rounded-(--radius) bg-muted">
                <div
                  className={`group relative w-full overflow-hidden ${
                    index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    quality={88}
                    className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-105"
                  />
                </div>
              </MaskReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
