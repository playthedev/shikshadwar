import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { missionVision } from "@/lib/about-data";

/**
 * Mission and vision as two committed colour fields rather than two white
 * cards with tinted eyebrows. These are the organisation's two load-bearing
 * statements — giving them the page's strongest surfaces says so, and
 * matching them card-for-card in width and height keeps the pair reading as
 * equally weighted commitments rather than one being the headline and the
 * other a footnote.
 */
export function MissionVision() {
  return (
    <section className="border-t border-border bg-[#eef2f4] py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Mission & Vision"
          title="A grassroots organisation, by design."
          description={missionVision.intro}
          animateTitle
          layout="split"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="grain-overlay relative h-full overflow-hidden rounded-(--radius) bg-gradient-to-br from-pine to-[color-mix(in_oklch,var(--pine),black_35%)] p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-float-slow absolute -top-20 -right-16 size-64 rounded-full bg-gold opacity-15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-paper/70" />
                  <span className="text-eyebrow text-paper/80 uppercase">Our Mission</span>
                </div>
                <p className="mt-6 font-heading text-h3 leading-[1.3] text-balance text-paper">
                  {missionVision.mission}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grain-overlay relative flex h-full flex-col overflow-hidden rounded-(--radius) bg-gradient-to-br from-rust to-[var(--rust-strong)] p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-breathe absolute -bottom-24 -left-12 size-56 rounded-full bg-gold opacity-20 blur-3xl"
              />
              <div className="relative flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-paper/70" />
                <span className="text-eyebrow text-paper/80 uppercase">Our Vision</span>
              </div>
              {/* Vision is one short sentence against mission's two — centring it
                  in the leftover space and setting it larger reads as a
                  deliberate, weighty statement instead of a shorter card that
                  ran out of things to say. */}
              <p className="relative my-auto py-6 font-heading text-h2 leading-[1.25] text-balance text-paper">
                {missionVision.vision}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
