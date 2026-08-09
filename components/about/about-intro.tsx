import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { aboutIntro } from "@/lib/about-data";

/**
 * The organisation's long-form origin story, styled after the programme
 * pages' default intro layout — a centered heading over a single-column
 * stack of paragraphs, no sticky column. A wide photo breaks the run of
 * text at its midpoint, same placement as a programme page's section image.
 */
export function AboutIntro() {
  const [lead, ...rest] = aboutIntro.paragraphs;
  const mid = Math.ceil(rest.length / 2);
  const before = rest.slice(0, mid);
  const after = rest.slice(mid);

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
              Why Shikshadwar
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            <Reveal delay={0.05}>
              <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
            </Reveal>
            {before.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.05}>
                <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-12 aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-xl">
            <Image
              src={aboutIntro.image.src}
              alt={aboutIntro.image.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              quality={92}
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mt-12 space-y-5">
            {after.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.05}>
                <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1 + after.length * 0.05}>
            <Link
              href="/our-story/"
              className="mt-8 inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Read the story behind Shikshadwar →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
