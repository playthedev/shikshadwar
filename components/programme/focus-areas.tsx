import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { Programme } from "@/lib/programmes";

/**
 * Focus areas as a plain icon-list — matching Smile Foundation's flat
 * "WHY / WHAT WE DO" bullet treatment rather than the numbered-index card
 * layout the rest of the site uses elsewhere. Each area gets its own themed
 * icon badge instead of a bare dot, so the list reads as illustrated.
 */
export function FocusAreas({ areas }: { areas: NonNullable<Programme["focusAreas"]> }) {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            Our Focus Areas
          </h2>

          <div className="mt-8 flex justify-center">
            <ul className="grid gap-x-10 gap-y-5 text-left sm:grid-cols-2">
              {areas.map((area) => {
                const Icon = area.icon ?? Check;
                return (
                  <li key={area.text} className="flex items-center gap-3 text-base leading-relaxed text-black">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rust-tint">
                      <Icon aria-hidden="true" className="size-5 text-rust" />
                    </span>
                    {area.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
