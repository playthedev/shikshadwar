import Image from "next/image";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Parallax } from "@/components/shared/parallax";
import { Reveal } from "@/components/shared/reveal";
import { aboutIntro } from "@/lib/about-data";

/**
 * The organisation's long-form origin story.
 *
 * Five paragraphs at one size is a wall, and it was previously set as
 * exactly that. Here the first carries standfirst weight and the remaining
 * four run in two columns at body size — so the block has an entry point and
 * a visible shape, and the eye gets a line length it can hold. The
 * photograph stays pinned alongside while the text runs past it.
 */
export function AboutIntro() {
  const [lead, ...rest] = aboutIntro.paragraphs;

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
                      src={aboutIntro.image.src}
                      alt={aboutIntro.image.alt}
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
            <Reveal>
              <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
            </Reveal>

            <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-border pt-8 sm:grid-cols-2">
              {rest.map((paragraph, index) => (
                <Reveal key={index} delay={0.06 + index * 0.05}>
                  <p className="text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://standardbookshop.in/ss/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Read the story behind Shikshadwar →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
