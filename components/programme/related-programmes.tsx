import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { programmes, type ProgrammeSlug } from "@/lib/programmes";

/**
 * The remaining programmes as a plain photo-card grid — matching Smile
 * Foundation's flat card treatment rather than the site's typographic
 * numbered list.
 */
export function RelatedProgrammes({ current }: { current: ProgrammeSlug }) {
  const others = programmes.filter((p) => p.slug !== current);

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <h2 className="text-center font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
          Our Other Programmes
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((programme) => (
            <Link
              key={programme.slug}
              href={`/${programme.slug}/`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                {programme.image ? (
                  <Image
                    src={programme.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    quality={80}
                    className="object-cover"
                  />
                ) : (
                  <PhotoPlaceholder
                    caption=""
                    tag={programme.tag}
                    icon={programme.icon}
                    className="h-full w-full rounded-none border-0 p-0"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-black">{programme.cardTitle}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-black/60">
                  {programme.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
