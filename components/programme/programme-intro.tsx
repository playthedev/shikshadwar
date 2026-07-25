import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function ProgrammeIntro({
  summary,
  paragraphs,
}: {
  summary: string;
  paragraphs: string[];
}) {
  return (
    <section className="py-[clamp(3.5rem,7vw,6rem)]">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-[clamp(1.25rem,2.4vw,1.625rem)] leading-snug font-heading text-ink">
            {summary}
          </p>
        </Reveal>
        <div className="mt-8 space-y-5">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="text-md leading-relaxed text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
