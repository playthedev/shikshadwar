import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PersonCard } from "@/components/about/person-card";
import { trustees } from "@/lib/about-data";

export function Trustees() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Governance"
          title="Trustees"
          description="The trust's governing body, accountable for how funds are raised, spent and reported."
          animateTitle
          accent="pine"
          layout="split"
        />
        {/* Three trustees on a six-column field, each spanning two — the grid
            stays aligned to the same 12-column measure the rest of the site
            uses instead of switching to its own thirds. */}
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {trustees.map((trustee, index) => (
            <PersonCard key={trustee.name} {...trustee} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  );
}
