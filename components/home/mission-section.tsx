import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Parallax } from "@/components/shared/parallax";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { siteConfig } from "@/lib/site-config";

/**
 * The organisation's own account of itself, set as a magazine spread.
 *
 * Two decisions carry it. The image column is sticky, so the photograph
 * holds the reader's eye while the text runs past it — the section reads as
 * one continuous passage instead of a photo-beside-paragraph row. And the
 * first paragraph is set noticeably larger than the two that follow, which
 * is what a standfirst does in print: it tells you where to start and gives
 * the block a shape. Three paragraphs at one size is the thing that made
 * this read as filler.
 */
export function MissionSection() {
  return (
    <section className="relative py-[clamp(5rem,10vw,10rem)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <MaskReveal className="rounded-(--radius)">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/home/mission.jpg"
                      alt="A young girl at a Shikshadwar community event proudly holds up her own artwork"
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      quality={92}
                      className="object-cover"
                    />
                  </div>
                </MaskReveal>

                {/* A second, smaller frame breaking the first one's corner.
                    Overlap is the cheapest way to get depth into a flat
                    layout, and it stops the column reading as one rectangle. */}
                <Parallax
                  distance={50}
                  className="absolute -right-4 -bottom-10 hidden w-40 sm:block lg:-right-10 lg:w-48"
                >
                  <MaskReveal
                    direction="left"
                    delay={0.25}
                    className="rounded-(--radius) border-4 border-paper shadow-xl"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src="/images/programmes/education.jpg"
                        alt="Children in a Shikshadwar non-formal education class"
                        fill
                        sizes="192px"
                        quality={85}
                        className="object-cover"
                      />
                    </div>
                  </MaskReveal>
                </Parallax>
              </div>

              <Reveal delay={0.3}>
                <p className="mt-14 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mt-16">
                  <span className="font-heading text-ink">Since {siteConfig.foundedYear}</span> —
                  from the slums of Delhi to five states.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                <p className="text-eyebrow text-rust uppercase">Welcome to Shikshadwar</p>
              </div>
            </Reveal>

            <h2 className="mt-5 text-h1 font-heading text-balance text-ink">
              <RevealText text="We are committed to empowering communities & bringing dignity to the most marginalised." />
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-8 text-body-lg leading-relaxed text-ink/80">
                Shikshadwar Foundation is a Public Charitable Trust dedicated to empowering
                underprivileged and marginalized communities. Founded in {siteConfig.foundedYear} by
                Mr. {siteConfig.founder}, the organization began its journey in the slums of Delhi,
                working to promote awareness of education, healthcare, and hygiene.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Recognizing the strong link between health, education, and socio-economic
                  well-being, Shikshadwar initiated non-formal education programs, literacy drives,
                  and skill-building activities in communities like Bhalaswa and Kadipur. Over time,
                  it has expanded its reach across multiple states, including Delhi, Bihar, Uttar
                  Pradesh, Rajasthan, and Haryana.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  With a focus on education, livelihood, skilling, healthcare, youth empowerment,
                  and the environment, Shikshadwar strives to create a society where individuals are
                  empowered to lead dignified, sustainable, and equitable lives.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <Link
                href="/about-us/"
                className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-ink"
              >
                <span className="relative">
                  Read our full story
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-primary-foreground">
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
