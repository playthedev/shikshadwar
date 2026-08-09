import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { siteConfig } from "@/lib/site-config";

/**
 * The organisation's own account of itself, set as a plain side-by-side
 * block: a single framed photo on one side, the copy on the other, all
 * body text at one size. No sticky column, no overlapping second frame.
 */
export function MissionSection() {
  return (
    <section className="relative py-[clamp(5rem,10vw,10rem)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <MaskReveal className="rounded-(--radius)">
              <div className="relative aspect-[4/5] w-full">
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

            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                <span className="font-heading text-ink">Since {siteConfig.foundedYear}</span> —
                from the slums of Delhi to five states.
              </p>
            </Reveal>
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
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Shikshadwar Foundation is a Public Charitable Trust dedicated to empowering
                underprivileged and marginalized communities. Founded in {siteConfig.foundedYear} by
                Mr. {siteConfig.founder}, the organization began its journey in the slums of Delhi,
                working to promote awareness of education, healthcare, and hygiene.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Recognizing the strong link between health, education, and socio-economic
                well-being, Shikshadwar initiated non-formal education programs, literacy drives,
                and skill-building activities in communities like Bhalaswa and Kadipur. Over time,
                it has expanded its reach across multiple states, including Delhi, Bihar, Uttar
                Pradesh, Rajasthan, and Haryana.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                With a focus on education, livelihood, skilling, healthcare, youth empowerment,
                and the environment, Shikshadwar strives to create a society where individuals are
                empowered to lead dignified, sustainable, and equitable lives.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
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
