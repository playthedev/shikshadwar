import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import type { ProgrammeImage } from "@/lib/programmes";

/**
 * Photographs from the programme, as a plain uniform grid — matching Smile
 * Foundation's flat photo-strip treatment rather than the site's staggered
 * mask-reveal gallery.
 */
export function ProgrammeGalleryStrip({ images }: { images: ProgrammeImage[] }) {
  return (
    <section className="bg-[#eef2f4] py-14 md:py-20">
      <Container>
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            In Pictures
          </h2>
          <Link
            href="/gallery/"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold tracking-wide text-rust uppercase shadow-sm ring-1 ring-rust/30 transition-colors hover:bg-rust hover:text-white"
          >
            View full gallery
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-4">
          {images.map((image) => (
            <li
              key={image.src}
              className="relative aspect-square w-full max-w-[260px] flex-1 basis-[220px] overflow-hidden rounded-lg bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 260px, 50vw"
                quality={85}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
