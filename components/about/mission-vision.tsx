import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { missionVision } from "@/lib/about-data";

/**
 * Mission and vision as two committed colour fields rather than two white
 * cards with tinted eyebrows. These are the organisation's two load-bearing
 * statements — giving them the page's strongest surfaces says so, and the
 * deliberate imbalance (mission runs wider than vision, because it is the
 * longer and more operative of the two) keeps the pair from reading as a
 * generic two-up.
 */
export function MissionVision() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Mission & Vision"
          title="A grassroots organisation, by design."
          description={missionVision.intro}
          animateTitle
          layout="split"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="grain-overlay relative h-full overflow-hidden rounded-(--radius) bg-pine p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-float-slow absolute -top-20 -right-16 size-64 rounded-full bg-gold opacity-15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
                  <span className="text-eyebrow text-gold uppercase">Our Mission</span>
                </div>
                <p className="mt-6 font-heading text-h3 leading-[1.3] text-balance text-paper">
                  {missionVision.mission}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="grain-overlay relative flex h-full flex-col justify-between overflow-hidden rounded-(--radius) bg-rust p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-breathe absolute -bottom-24 -left-12 size-56 rounded-full bg-gold opacity-20 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-paper/70" />
                  <span className="text-eyebrow text-paper/80 uppercase">Our Vision</span>
                </div>
                <p className="mt-6 font-heading text-h3 leading-[1.3] text-balance text-paper">
                  {missionVision.vision}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
