import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import type { ProgrammeImage } from "@/lib/programmes";

export function ProgrammeGalleryStrip({ images }: { images: ProgrammeImage[] }) {
  return (
    <section className="py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="In Pictures" title="On the ground" animateTitle />
          <Link
            href="/gallery/"
            className="text-sm font-semibold text-ink underline decoration-rust decoration-2 underline-offset-4 hover:text-rust"
          >
            View full gallery
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.05}>
              <Photo src={image.src} alt={image.alt} aspect="square" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
