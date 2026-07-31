import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PersonCard } from "@/components/about/person-card";
import { team } from "@/lib/about-data";

export function Team() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="On the ground"
          title="The team"
          description="Volunteer teachers, community mobilisers and programme staff — most of them from the communities they work in."
          animateTitle
          layout="split"
        />
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member, index) => (
            <PersonCard key={member.name} {...member} delay={(index % 4) * 0.06} />
          ))}
        </div>
      </Container>
    </section>
  );
}
