import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { certificates } from "@/lib/about-data";

export function Certificates() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="Certificates & awards"
          description="Formal recognition of our training and community work, alongside the statutory registrations that let donors verify who we are."
          animateTitle
          layout="split"
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {certificates.map((cert, index) => (
            <li key={cert.title} className="group">
              <MaskReveal delay={index * 0.08} className="rounded-(--radius) bg-muted">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    quality={92}
                    style={{ objectPosition: cert.objectPosition }}
                    className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.03]"
                  />
                </div>
              </MaskReveal>
              <Reveal delay={0.1}>
                <div className="mt-5 flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-heading text-sm tabular-nums text-ink/30"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-heading text-h4 text-ink">{cert.title}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
