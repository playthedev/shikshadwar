import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * Focus areas as a numbered index rather than a grid of cards.
 *
 * These entries are short — often two or three words — so a bordered card
 * around each one wrapped a large box around almost nothing. Hanging them
 * off oversized numerals with a hairline rule gives the list its structure
 * from typography instead, and reads as a contents page for the programme.
 */
export function FocusAreas({ areas }: { areas: string[] }) {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Focus areas"
          title="Where this work happens"
          animateTitle
          accent="pine"
        />

        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2">
          {areas.map((area, index) => (
            <Reveal as="li" key={area} delay={(index % 2) * 0.06}>
              <div className="group flex items-baseline gap-6 border-t border-ink/10 py-7">
                <span className="font-heading text-h3 tabular-nums text-ink/20 transition-colors duration-500 group-hover:text-pine">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-heading text-h4 text-balance text-ink">{area}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
