import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { aboutIntro } from "@/lib/about-data";

// A second photo for the zigzag's first row — reused from the programme
// gallery rather than a new upload, per the brief ("images from anywhere
// on the site"). The intro photo itself (a group of community women)
// anchors the second row.
const secondImage = {
  src: "/images/programmes/education.jpg",
  alt: "Children at a Shikshadwar non-formal education session watch a lesson together",
};

/**
 * The organisation's long-form origin story — a centered heading over a
 * two-row zigzag: copy-then-photo, then photo-then-copy below it, each row
 * balanced with roughly the same amount of text so the columns land at the
 * same height instead of one trailing off with empty space.
 */
export function AboutIntro() {
  const [lead, second, third, fourth, fifth] = aboutIntro.paragraphs;

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <Reveal>
          <h2 className="text-center font-heading text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            Why Shikshadwar
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-14 md:mt-14 md:gap-20">
          {/* Row 1 — copy left, photo right. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-5 lg:col-span-6">
              <Reveal delay={0.05}>
                <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-muted-foreground">{second}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-muted-foreground">{third}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <MaskReveal direction="right" className="rounded-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={secondImage.src}
                    alt={secondImage.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    quality={92}
                    className="object-cover"
                  />
                </div>
              </MaskReveal>
            </Reveal>
          </div>

          {/* Row 2 — swapped: photo left, copy right. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal delay={0.05} className="lg:order-1 lg:col-span-6">
              <MaskReveal direction="left" className="rounded-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={aboutIntro.image.src}
                    alt={aboutIntro.image.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    quality={92}
                    className="object-cover"
                  />
                </div>
              </MaskReveal>
            </Reveal>

            <div className="space-y-5 lg:order-2 lg:col-span-6">
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-muted-foreground">{fourth}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-muted-foreground">{fifth}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/our-story/"
                  className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Read the story behind Shikshadwar →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
