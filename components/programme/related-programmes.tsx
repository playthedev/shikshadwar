import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Photo } from "@/components/shared/photo";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { Reveal } from "@/components/shared/reveal";
import { programmes, type ProgrammeSlug } from "@/lib/programmes";

export function RelatedProgrammes({ current }: { current: ProgrammeSlug }) {
  const others = programmes.filter((p) => p.slug !== current);

  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading eyebrow="Keep Exploring" title="Our other programmes" animateTitle />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((programme, index) => (
            <Reveal as="li" key={programme.slug} delay={index * 0.04}>
              <Link
                href={`/${programme.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-(--radius) border border-border bg-surface p-4 transition-shadow hover:shadow-lg"
              >
                {programme.image ? (
                  <Photo
                    src={programme.image.src}
                    alt={programme.image.alt}
                    aspect="landscape"
                    className="border-0 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <PhotoPlaceholder
                    caption={programme.photoCaption}
                    aspect="landscape"
                    tag={programme.tag}
                    icon={programme.icon}
                    className="border-0"
                  />
                )}
                <h3 className="mt-4 flex items-center gap-1.5 font-heading text-base text-ink">
                  {programme.title}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </h3>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
