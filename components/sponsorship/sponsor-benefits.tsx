import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { sponsorshipProvides, sponsorshipTier } from "@/lib/sponsorship";

/**
 * What a sponsorship pays for, plus the commitment shape (₹21,000/year, or
 * ₹1,750/month, over a minimum of three years) — set as plain text rather
 * than a second checkout mode, since recurring billing isn't wired up yet.
 * The one-time donate form below this section is where the money actually
 * moves.
 */
export function SponsorBenefits() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="What sponsorship covers"
          title="₹21,000 a year changes a child's path"
          description={`A minimum commitment of ${sponsorshipTier.minimumCommitmentYears} years gives a child the continuity that makes the difference — roughly ₹${sponsorshipTier.monthly.toLocaleString("en-IN")} a month.`}
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

        <Reveal delay={0.15}>
          <p className="mt-12 border-l-2 border-rust pl-5 text-sm leading-relaxed text-ink/75">
            {sponsorshipTier.impactLine}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
