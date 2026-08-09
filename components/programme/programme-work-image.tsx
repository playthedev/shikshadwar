import Image from "next/image";
import { Container } from "@/components/shared/container";
import type { ProgrammeImage } from "@/lib/programmes";

/**
 * A single full-width infographic — e.g. Youth Empowerment's "How We Work"
 * step-by-step graphic, Sustainable Development's "Tree Plantation" pathway
 * — for programmes that supply the whole pathway as pre-designed artwork
 * rather than structured step data for ProgrammeProcess. Sized from the
 * image's own pixel dimensions rather than a fixed aspect box, since each
 * infographic has its own shape.
 */
export function ProgrammeWorkImage({
  image,
}: {
  image: ProgrammeImage & { width: number; height: number };
}) {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 56rem, 100vw"
          quality={90}
          className="mx-auto h-auto w-full max-w-4xl rounded-xl"
        />
      </Container>
    </section>
  );
}
