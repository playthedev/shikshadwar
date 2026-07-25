import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { certificates } from "@/lib/about-data";

export function Certificates() {
  return (
    <section className="py-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <SectionHeading eyebrow="Recognition" title="Certificates & Awards" animateTitle />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {certificates.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 0.06}>
              <div className="overflow-hidden rounded-(--radius) border border-border bg-surface">
                <Photo src={cert.image} alt={cert.title} aspect="landscape" className="rounded-none border-0" />
                <p className="p-5 font-heading text-lg text-ink">{cert.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
