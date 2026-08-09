import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CertificatesSlideshow } from "@/components/about/certificates-slideshow";
import { certificates } from "@/lib/about-data";

/**
 * Recognition, as a full-bleed slideshow rather than a card grid — a
 * document scan reads better full-frame with its own caption than shrunk
 * into a fixed-height thumbnail. Adding another certificate is just another
 * entry in `certificates` (lib/about-data.ts) plus its image dropped into
 * public/images/about; the slideshow doesn't need touching.
 */
export function Certificates() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="Certificates & awards"
          description="Formal recognition of our training and community work, alongside the statutory registrations that let donors verify who we are."
          animateTitle
          layout="split"
        />
      </Container>

      <div className="mt-14">
        <CertificatesSlideshow items={certificates} />
      </div>
    </section>
  );
}
