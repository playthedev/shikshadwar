import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { sponsorshipMeansIntro, sponsorshipProvides } from "@/lib/sponsorship";

/**
 * "What Does Child Sponsorship Mean?" — the brief's own heading and five
 * bullets, verbatim.
 */
export function SponsorBenefits() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="What sponsorship covers"
          title="What Does Child Sponsorship Mean?"
          description={sponsorshipMeansIntro}
          animateTitle
          layout="split"
        />

        <ul className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {sponsorshipProvides.map((item, index) => (
            <Reveal as="li" key={item} delay={(index % 2) * 0.06}>
              <div className="flex items-start gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-pine" />
                <p className="text-base leading-relaxed text-ink/85">{item}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
