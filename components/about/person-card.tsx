import Image from "next/image";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";

interface PersonCardProps {
  name: string;
  role: string;
  image?: string;
  delay?: number;
}

/**
 * A portrait, not an avatar.
 *
 * Circular crops in a centred grid are the default team-page component, and
 * they work against the photographs — a circle cuts the frame off at the
 * shoulders and throws away whatever context the picture had. A tall
 * rectangle keeps the composition, and setting the images desaturated until
 * hover lets a page of portraits read as one series even though they were
 * shot on different days by different people.
 */
export function PersonCard({ name, role, image, delay = 0 }: PersonCardProps) {
  return (
    <Reveal delay={delay}>
      <figure className="group">
        <MaskReveal delay={delay} className="rounded-(--radius) bg-muted">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={`Portrait of ${name}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                quality={88}
                className="object-cover object-top grayscale transition-all duration-700 ease-(--ease-out-custom) group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            ) : (
              // No photograph yet — an initial on the brand tint, never an
              // invented stock portrait of a real named person.
              <div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center bg-[color-mix(in_oklch,var(--pine),white_88%)] font-heading text-5xl text-pine/50"
              >
                {name.charAt(0)}
              </div>
            )}
          </div>
        </MaskReveal>

        <figcaption className="mt-4">
          <span
            aria-hidden="true"
            className="block h-px w-8 origin-left bg-ink/20 transition-all duration-500 ease-(--ease-out-custom) group-hover:w-14 group-hover:bg-rust"
          />
          <p className="mt-3 font-heading text-base text-ink">{name}</p>
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{role}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}
