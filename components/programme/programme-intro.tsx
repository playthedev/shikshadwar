import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

/**
 * Programme body copy.
 *
 * The summary line used to open this section as a large standfirst, but it
 * now sits in the hero directly above — so repeating it here was showing the
 * reader the same sentence twice in one screen. The first body paragraph
 * takes that role instead, and a sticky label column on the left gives the
 * long text a left edge to run against.
 */
export function ProgrammeIntro({
  paragraphs,
  note,
}: {
  paragraphs: string[];
  /** A current/impact callout — e.g. "Impact 2025–26" or "Current projects" — set apart from the narrative. */
  note?: string;
}) {
  const [lead, ...rest] = paragraphs;

  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                <p className="text-eyebrow text-rust uppercase">The context</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="text-body-lg leading-relaxed text-ink/85">{lead}</p>
            </Reveal>
            <div className="mt-8 space-y-6">
              {rest.map((paragraph, index) => (
                <Reveal key={index} delay={0.06 + index * 0.05}>
                  <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {note ? (
              <Reveal delay={0.1}>
                <p className="mt-8 border-l-2 border-pine pl-5 text-sm leading-relaxed text-ink/75">
                  {note}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
