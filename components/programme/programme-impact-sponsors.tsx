import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { ImpactStat } from "@/lib/impact-stats";
import type { Programme } from "@/lib/programmes";

/**
 * Magazine-style "Impact 2025–26 / Finding Sponsors" pair, alternating a
 * pure text column against a pure image column: text-left/image-right on
 * the impact row, then image-left/text-right on the sponsorship row below
 * it. A one-off layout matched to a client-supplied reference, not the
 * site's usual stat-band + sub-programme-row treatment.
 */
export function ProgrammeImpactSponsors({
  stats,
  caption,
  image,
  sponsor,
}: {
  stats: ImpactStat[];
  caption?: string;
  image: NonNullable<Programme["impactImage"]>;
  sponsor: NonNullable<Programme["sponsorHighlight"]>;
}) {
  const [total, siteA, siteB, enrolled] = stats;

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-h2 text-balance text-ink">
              Impact 2025–26
            </h2>
            <div className="mt-5 space-y-4 text-justify text-base leading-relaxed text-neutral-600">
              <p>
                During the 2025–26 academic year, <strong className="text-ink">Shikshadwar Foundation</strong>{" "}
                identified and registered <strong className="text-ink">{total.value}{total.suffix} out-of-school and vulnerable children</strong> across
                underserved communities in Delhi, including{" "}
                <strong className="text-ink">{siteA.value} children from Bhalaswa JJ Colony</strong> and{" "}
                <strong className="text-ink">{siteB.value} children from Kadipur Village</strong>.
              </p>
              <p>
                These children received <strong className="text-ink">elementary and foundational education support</strong> to
                bridge learning gaps, improve literacy and numeracy skills, and prepare them for
                successful enrollment into formal schools.
              </p>
              <p>
                As a result of our interventions, <strong className="text-ink">{enrolled.value} children were successfully
                enrolled in government schools</strong> in Bhalaswa and Kadipur, marking the beginning of
                their formal education journey. We are now actively mobilizing sponsors and partners
                to provide these children with continued educational support, including school
                supplies, scholarships, mentoring, and academic assistance, ensuring they remain in
                school and progress toward a brighter future.
              </p>
              {caption ? <p>{caption}</p> : null}
            </div>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg lg:order-1">
            <Image
              src={sponsor.image.src}
              alt={sponsor.image.alt}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              quality={88}
              className="object-cover"
            />
          </div>

          <div className="lg:order-2">
            <h2 className="font-heading text-h2 text-balance text-ink">
              {sponsor.title}
            </h2>
            <div className="mt-5 space-y-4 text-justify text-base leading-relaxed text-neutral-600">
              {sponsor.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {sponsor.bullets ? (
              <div className="mt-6">
                {sponsor.bulletsLabel ? (
                  <p className="font-semibold text-ink">{sponsor.bulletsLabel}</p>
                ) : null}
                <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {sponsor.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rust" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
