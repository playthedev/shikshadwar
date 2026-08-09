import { Check, HeartPulse } from "lucide-react";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import type { ImpactBullets } from "@/lib/programmes";

/**
 * The rest of an "Impact 2025–26" writeup that doesn't fit the stat band —
 * a topic checklist and closing narrative paragraphs. Each topic gets its
 * own themed icon badge (rust, matching the brand palette) instead of a
 * bare checkmark, so the list reads as illustrated rather than plain text.
 */
export function ProgrammeImpactDetail({
  bullets,
  notes,
}: {
  bullets?: ImpactBullets;
  notes?: string[];
}) {
  if (!bullets && !notes) return null;

  return (
    <section className="bg-white pb-14 md:pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          {bullets ? (
            <div>
              {bullets.label ? (
                <p className="flex items-center justify-center gap-2 text-center font-semibold text-black">
                  <HeartPulse aria-hidden="true" className="size-5 shrink-0 text-rust" />
                  {bullets.label}
                </p>
              ) : null}
              <div className="mt-5 flex justify-center">
                <ul className="grid gap-x-10 gap-y-4 text-left sm:grid-cols-2">
                  {bullets.items.map((item) => {
                    const Icon = item.icon ?? Check;
                    return (
                      <li
                        key={item.text}
                        className="flex items-start gap-3 text-base leading-relaxed text-black"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rust-tint">
                          <Icon aria-hidden="true" className="size-4 text-rust" />
                        </span>
                        <span className="pt-1">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : null}

          {notes ? (
            <div
              className={cn(
                "mx-auto space-y-4 text-center text-base leading-relaxed text-black/75",
                bullets && "mt-10",
              )}
            >
              {notes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
