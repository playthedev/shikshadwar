import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { Reveal } from "@/components/shared/reveal";
import { programmes, type ProgrammeSlug } from "@/lib/programmes";

/**
 * The remaining programmes, as a list the reader can run down rather
 * than a second grid of picture cards. The page has already shown one
 * programme in full and, on most routes, a gallery strip above this — a
 * third block of images would compete with both. Small thumbnails hung off
 * a typographic list keep this as navigation, which is all it needs to be.
 */
export function RelatedProgrammes({ current }: { current: ProgrammeSlug }) {
  const others = programmes.filter((p) => p.slug !== current);

  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading eyebrow="Keep exploring" title="Our other programmes" animateTitle />

        <ul className="mt-12 border-t border-ink/10">
          {others.map((programme, index) => (
            <Reveal as="li" key={programme.slug} delay={index * 0.05}>
              <Link
                href={`/${programme.slug}/`}
                className="group flex items-center gap-5 border-b border-ink/10 py-5 md:gap-8"
              >
                <span className="hidden font-heading text-sm tabular-nums text-ink/30 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative size-16 shrink-0 overflow-hidden rounded-(--radius) bg-muted md:size-20">
                  {programme.image ? (
                    <Image
                      src={programme.image.src}
                      alt=""
                      fill
                      sizes="80px"
                      quality={80}
                      className="object-cover grayscale transition-all duration-500 ease-(--ease-out-custom) group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <PhotoPlaceholder
                      caption=""
                      tag={programme.tag}
                      icon={programme.icon}
                      className="h-full w-full rounded-none border-0 p-0"
                    />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-h4 text-ink">{programme.cardTitle}</span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                    {programme.summary}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/45 transition-all duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-primary-foreground"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
