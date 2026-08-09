import { Container } from "@/components/shared/container";
import type { ProcessStep } from "@/lib/programmes";

/**
 * The "Identify Child → … → Share Regular Impact Updates" icon grid —
 * plain icon-circle cards in the site's rust brand accent.
 */
export function SponsorshipProcess({
  steps,
  heading = "Our Sponsorship Process",
  notes,
}: {
  steps: ProcessStep[];
  heading?: string;
  /** Closing paragraphs rendered centered under the grid. */
  notes?: string[];
}) {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <h2 className="text-center font-heading text-h2 text-balance text-ink">
          {heading}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex h-full flex-col items-center gap-4 rounded-lg bg-[#eef2f4] p-8 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-rust text-primary-foreground">
                  <Icon aria-hidden="true" className="size-7" />
                </div>
                <p className="text-balance font-semibold text-ink">{step.title}</p>
              </div>
            );
          })}
        </div>

        {notes && notes.length > 0 ? (
          <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center">
            {notes.map((note, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/70">
                {note}
              </p>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
