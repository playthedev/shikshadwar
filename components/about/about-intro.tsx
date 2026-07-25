import { Container } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { aboutIntro } from "@/lib/about-data";

export function AboutIntro() {
  return (
    <section className="py-[clamp(3.5rem,7vw,6rem)]">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <Photo
            src={aboutIntro.image.src}
            alt={aboutIntro.image.alt}
            aspect="portrait"
            className="md:sticky md:top-24"
          />
        </Reveal>
        <div className="space-y-5">
          {aboutIntro.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p
                className={
                  index === 0
                    ? "text-md leading-relaxed text-ink"
                    : "text-md leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
