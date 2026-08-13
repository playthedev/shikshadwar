import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { aboutIntro } from "@/lib/about-data";

/**
 * The organisation's long-form origin story — a centered heading over a
 * two-column layout: the intro photo on one side, the full run of
 * paragraphs on the other, vertically centered against each other so the
 * block reads as one aligned unit instead of a stacked photo-in-the-middle
 * essay.
 */
export function AboutIntro() {
  const [lead, ...rest] = aboutIntro.paragraphs;

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <Reveal>
          <h2 className="text-center font-heading text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            Why Shikshadwar
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-start md:gap-14">
          <Reveal delay={0.05} className="md:sticky md:top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-[3/4]">
              <Image
                src={aboutIntro.image.src}
                alt={aboutIntro.image.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                quality={92}
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
            </Reveal>
            {rest.map((paragraph, index) => (
              <Reveal key={index} delay={0.15 + index * 0.05}>
                <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15 + rest.length * 0.05}>
              <Link
                href="/our-story/"
                className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Read the story behind Shikshadwar →
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
