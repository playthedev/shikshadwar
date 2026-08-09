import { Container } from "@/components/shared/container";
import type { ImpactStat } from "@/lib/impact-stats";

/**
 * "Impact 2025–26" figures, styled as Smile Foundation's plain static
 * numbers rather than the site's animated, hairline-ruled StatBand. Kept as
 * its own component instead of reworking the shared StatBand, so this flat
 * look stays scoped to programme pages and the shared component's other
 * callers (home, about-us, donate flows, …) keep their current treatment.
 */
export function ProgrammeImpactBand({
  stats,
  caption,
  heading = "Impact 2025–26",
}: {
  stats: ImpactStat[];
  caption?: string;
  heading?: string;
}) {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex w-full max-w-[240px] flex-1 flex-col items-center gap-1 rounded-xl bg-rust-tint px-6 py-8 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-5xl leading-none text-rust md:text-6xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-2 max-w-[20ch] text-sm leading-snug text-black/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {caption ? (
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-black/70">
            {caption}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
