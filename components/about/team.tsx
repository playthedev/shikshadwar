import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PersonCard } from "@/components/about/person-card";
import { team } from "@/lib/about-data";

export function Team() {
  return (
    <section className="py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading eyebrow="On the Ground" title="Team" animateTitle />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {team.map((member, index) => (
            <PersonCard key={member.name} {...member} delay={index * 0.04} />
          ))}
        </div>
      </Container>
    </section>
  );
}
