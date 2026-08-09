import { Target } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { ProcessStep } from "@/lib/programmes";

/**
 * The pathway steps as a plain static icon-card grid — matching Smile
 * Foundation's flat "Our Interventions" treatment rather than the site's
 * usual scrollable numbered pathway with dashed-ring icons and arrows.
 */
export function ProgrammeProcess({
  steps,
  heading = "How We Work",
  description,
  note,
}: {
  steps: ProcessStep[];
  heading?: string;
  description?: string;
  /** A closing tagline rendered centered under the grid, e.g. "Empowering youth with skills, guidance, and opportunities for a better tomorrow." */
  note?: string;
}) {
  return (
    <section className="bg-[#eef2f4] py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            {heading}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-black/70">{description}</p>
          ) : null}
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#339933] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EFFEDC]">
                    <Icon aria-hidden="true" className="size-5 text-[#339933]" />
                  </div>
                </div>
                <p className="font-semibold text-black">{step.title}</p>
                {step.description ? (
                  <p className="text-sm leading-relaxed text-black/70">{step.description}</p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {note ? (
          <div className="mt-10 flex justify-center">
            <p className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black shadow-sm">
              <Target aria-hidden="true" className="size-5 shrink-0 text-[#339933]" />
              {note}
            </p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
