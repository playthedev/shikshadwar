import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * The six-stage "How we work" pathway, straight from the brief's own
 * infographic rather than a coded recreation — swap the source image in
 * public/images/how-we-work.png to update it.
 */
export function HowToHelp() {
  return (
    <section className="border-t border-border py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="From identifying a need to measuring its impact"
          animateTitle
          layout="split"
          description="The same six-stage process runs behind every programme on this site, whichever community or focus area it's in."
        />

        <Reveal className="relative mt-14 w-full overflow-hidden rounded-(--radius) bg-muted">
          <Image
            src="/images/how-we-work.png"
            alt="Our six-step process: Identification and Registration, Finding Sponsor, Access to Quality Education / Back to School, Remedial Education Support, Vocational Education, and Scholarship Support for Continued Education."
            width={1379}
            height={689}
            sizes="100vw"
            quality={90}
            className="h-auto w-full"
          />
        </Reveal>
      </Container>
    </section>
  );
}
