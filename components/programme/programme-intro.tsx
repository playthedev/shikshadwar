import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import type { Programme } from "@/lib/programmes";

/**
 * Programme body copy.
 *
 * Most programmes still run as one flowing narrative under a bold "Why
 * {Programme}" heading — styled after Smile Foundation's programme pages
 * (smilefoundationindia.org/health/): a full-width, left-aligned uppercase
 * heading sitting directly above the paragraph, no sticky sidebar label.
 * Education's source brief names each block instead — "Why Education",
 * "What We Do" — so when `sections` is supplied the intro renders as its
 * own named blocks, each with its own heading, rather than folding
 * everything under one heading.
 */
export function ProgrammeIntro({
  paragraphs,
  sections,
  note,
  title,
  plainSections,
  image,
}: {
  paragraphs: string[];
  /** Named sub-sections, e.g. [{ heading: "Why Education", paragraphs: [...] }] — takes over from `paragraphs` when present. */
  sections?: Programme["introSections"];
  /** A current/impact callout — e.g. "Impact 2025–26" or "Current projects" — set apart from the narrative. */
  note?: string;
  /** The programme's title, e.g. "Healthcare" — drives the "Why {title}" heading on the flat (non-sectioned) layout. */
  title?: string;
  /** Renders `sections` as plain bold labels over plain copy — Livelihood's "Why Skilling? / WHAT WE DO" reference layout — instead of Education's big centered display heading per section. */
  plainSections?: boolean;
  /** A supporting photo dropped between the lead paragraph and the rest of the narrative — flat (non-sectioned) layout only, e.g. Healthcare's context image. */
  image?: Programme["introImage"];
}) {
  if (sections?.length && plainSections) {
    return (
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-center">
            {sections.map((section) => (
              <div key={section.heading}>
                <Reveal>
                  <p className="font-semibold text-ink">{section.heading}</p>
                </Reveal>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <Reveal key={index} delay={0.05 + index * 0.05}>
                      <p className="text-base leading-relaxed text-black/75">{paragraph}</p>
                    </Reveal>
                  ))}
                </div>

                {section.image ? (
                  <Reveal delay={0.15}>
                    <div className="relative mt-6 aspect-[2/1] w-full overflow-hidden rounded-xl">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        fill
                        sizes="(min-width: 1024px) 48rem, 100vw"
                        quality={90}
                        className="object-cover"
                        style={
                          section.image.objectPosition
                            ? { objectPosition: section.image.objectPosition }
                            : undefined
                        }
                      />
                    </div>
                  </Reveal>
                ) : null}
              </div>
            ))}

            {note ? (
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-black/75">{note}</p>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  if (sections?.length) {
    return (
      <>
        {sections.map((section, i) => (
          <section
            key={section.heading}
            className={cn("py-14 md:py-20", i % 2 === 1 ? "bg-[#eef2f4]" : "bg-white")}
          >
            <Container>
              <div className="text-center">
                <Reveal>
                  <h2 className="font-heading text-h3 text-balance text-ink">
                    {section.heading}
                  </h2>
                </Reveal>
                <div className="mx-auto mt-6 max-w-5xl space-y-5">
                  {section.paragraphs.map((paragraph, index) => (
                    <Reveal key={index} delay={0.05 + index * 0.05}>
                      <p className="text-base leading-relaxed text-neutral-600">{paragraph}</p>
                    </Reveal>
                  ))}
                </div>
              </div>

              {section.image ? (
                <Reveal delay={0.15}>
                  <div className="relative mx-auto mt-12 aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-xl">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(min-width: 1024px) 64rem, 100vw"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                </Reveal>
              ) : null}
            </Container>
          </section>
        ))}

        {note ? (
          <section className="bg-white py-10">
            <Container>
              <Reveal>
                <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-neutral-600">
                  {note}
                </p>
              </Reveal>
            </Container>
          </section>
        ) : null}
      </>
    );
  }

  const [lead, ...rest] = paragraphs;

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-h2 text-balance text-ink">
              {title ? `Why ${title}` : "The Context"}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            <Reveal delay={0.05}>
              <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
            </Reveal>

            {image ? (
              <Reveal delay={0.08}>
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 48rem, 100vw"
                    quality={90}
                    className="object-cover"
                    style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                  />
                </div>
              </Reveal>
            ) : null}

            {rest.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.05}>
                <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {note ? (
            <Reveal delay={0.15}>
              <p className="mt-8 text-sm leading-relaxed text-ink/75">{note}</p>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
