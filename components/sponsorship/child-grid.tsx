import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { sponsoredChildren } from "@/lib/sponsorship";

/**
 * Sponsorship candidates, named and photographed as the client's live site
 * publishes them (standardbookshop.in/ss/sponsor-a-child/). Each card routes
 * to that child's own page — see app/meet-our-stars/[slug]/page.tsx.
 */
export function ChildGrid() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Waiting for a sponsor"
          title="Children who need you right now"
          description="Every child below is currently enrolled in our education programme and looking for a sponsor to see the year through."
          animateTitle
          layout="split"
          accent="pine"
        />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {sponsoredChildren.map((child, index) => (
            <Reveal key={child.slug} delay={(index % 4) * 0.06}>
              <Link href={`/meet-our-stars/${child.slug}/`} className="group block">
                <figure>
                  <MaskReveal className="rounded-(--radius) bg-muted">
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={child.image.src}
                        alt={child.image.alt}
                        fill
                        sizes="(min-width: 640px) 25vw, 50vw"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.03]"
                      />
                    </div>
                  </MaskReveal>
                  <figcaption className="mt-4">
                    <p className="font-heading text-base text-ink transition-colors group-hover:text-rust">
                      {child.name}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                      {child.grade} · {child.location}
                    </p>
                    <p className="mt-2 text-sm font-semibold tabular-nums text-rust">
                      {child.priceRange}
                      <span className="font-normal text-muted-foreground"> / year</span>
                    </p>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
