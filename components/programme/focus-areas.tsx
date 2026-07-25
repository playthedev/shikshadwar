import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";

export function FocusAreas({ areas }: { areas: string[] }) {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading eyebrow="Focus Areas" title="Where this work happens" animateTitle />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal as="li" key={area} delay={index * 0.05}>
              <SpotlightCard className="h-full rounded-(--radius)">
                <div className="flex h-full flex-col justify-between gap-6 rounded-(--radius) border border-border bg-surface p-6">
                  <span className="font-heading text-2xl text-ink/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-heading text-ink">{area}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
