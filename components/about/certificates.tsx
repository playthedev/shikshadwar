import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { certificates } from "@/lib/about-data";

/**
 * Recognition, as a card grid — same photo-over-copy pattern as the blog
 * grid (app/blog-page/page.tsx) and run inside the same Container as every
 * other section on the page, so it lines up edge-to-edge with the sections
 * above and below it instead of breaking full-bleed. Adding another
 * certificate is just another entry in `certificates` (lib/about-data.ts)
 * plus its image dropped into public/images/about.
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

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.title} delay={(index % 3) * 0.06}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius) bg-surface">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={92}
                    style={{ objectPosition: certificate.objectPosition ?? "center" }}
                    className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 font-heading text-h4 text-balance text-ink">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {certificate.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
