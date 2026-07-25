import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { missionVision } from "@/lib/about-data";

export function MissionVision() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading
          eyebrow="Mission & Vision"
          title="A grassroots organisation, by design."
          description={missionVision.intro}
          animateTitle
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-(--radius) border border-border bg-surface p-8">
              <span className="text-xs font-semibold tracking-wide text-rust uppercase">
                Our Mission
              </span>
              <p className="mt-3 text-md leading-relaxed text-ink">{missionVision.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-(--radius) border border-border bg-surface p-8">
              <span className="text-xs font-semibold tracking-wide text-pine uppercase">
                Our Vision
              </span>
              <p className="mt-3 text-md leading-relaxed text-ink">{missionVision.vision}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
