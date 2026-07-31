import Image from "next/image";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Parallax } from "@/components/shared/parallax";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

/**
 * The founding narrative — Manish Mandal's 2012 encounter at Jahangirpuri
 * Metro Station through to his pre-foundation years. Mirrors the About page's
 * intro layout (pinned photo, running text) since this is the same kind of
 * long-form origin copy, just about the founder specifically rather than the
 * organisation as a whole.
 */
export function FoundingStory() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Parallax distance={40}>
                <MaskReveal className="rounded-(--radius)">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={ourStory.founder.image.src}
                      alt={ourStory.founder.image.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      quality={92}
                      className="object-cover"
                    />
                  </div>
                </MaskReveal>
              </Parallax>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Where it began</p>
            </div>

            <div className="mt-6 space-y-6">
              {ourStory.founder.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.06 + index * 0.06}>
                  <p className="text-body-lg leading-relaxed text-ink/85">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
