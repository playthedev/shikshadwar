import { Container } from "@/components/shared/container";
import type { VisionStatement } from "@/lib/programmes";

/**
 * A short pull-quote — "Our Vision" on Youth Empowerment, the closing
 * tagline on Sustainable Development. Flattened to a plain centered block
 * in Smile Foundation's tint-and-uppercase-label style rather than the
 * site's hairline-and-eyebrow FoundationBlock treatment.
 */
export function ProgrammeStatement({ statement }: { statement: VisionStatement }) {
  return (
    <section className="bg-[#eef2f4] py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {statement.eyebrow ? (
            <p className="text-sm font-semibold tracking-wide text-rust uppercase">
              {statement.eyebrow}
            </p>
          ) : null}
          <p
            className={`font-[family-name:var(--font-display)] text-3xl text-balance text-black md:text-4xl ${
              statement.eyebrow ? "mt-4" : ""
            }`}
          >
            {statement.text}
          </p>
          {statement.note ? (
            <p className="mt-5 text-base leading-relaxed text-black/70">{statement.note}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
