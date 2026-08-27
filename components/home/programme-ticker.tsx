import Link from "next/link";
import { VelocityMarquee } from "@/components/shared/velocity-marquee";
import { programmes } from "@/lib/programmes";

/**
 * The programme names as a running band between the hero and the body of the
 * page. Scaled up from small caps to display type and driven by scroll
 * velocity, it stops being a decorative ribbon and becomes the transition
 * itself — the reader's own scroll throws it sideways.
 */
export function ProgrammeTicker() {
  return (
    <nav aria-label="Programmes" className="relative border-y border-ink/10 bg-[color-mix(in_oklch,var(--pine),white_65%)] py-5 md:py-7">
      <VelocityMarquee repeat={3} baseVelocity={1.8} className="edge-fade-x">
        <ul className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14">
          {programmes.map((programme) => (
            <li key={programme.slug} className="flex items-center gap-8 md:gap-14">
              <Link
                href={`/${programme.slug}/`}
                className="group relative font-heading text-2xl tracking-tight whitespace-nowrap text-ink/60 transition-colors duration-300 hover:text-ink md:text-4xl"
              >
                {programme.title}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rust transition-transform duration-300 ease-(--ease-out-custom) group-hover:scale-x-100"
                />
              </Link>
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-rust/70" />
            </li>
          ))}
        </ul>
      </VelocityMarquee>
    </nav>
  );
}
