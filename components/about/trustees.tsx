import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PersonCard } from "@/components/about/person-card";
import { trustees } from "@/lib/about-data";

export function Trustees() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading eyebrow="Governance" title="Trustees" animateTitle />
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {trustees.map((trustee, index) => (
            <PersonCard key={trustee.name} {...trustee} delay={index * 0.06} />
          ))}
        </div>
      </Container>
    </section>
  );
}
