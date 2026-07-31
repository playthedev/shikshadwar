import { PageHero } from "@/components/shared/page-hero";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import type { Programme } from "@/lib/programmes";

/**
 * Programme pages run through the shared PageHero so they carry the same
 * proportions, breadcrumb and entrance as every other route. Programmes
 * without photography yet swap the backdrop for the abstract placeholder
 * rather than shipping a hero with an empty frame behind it.
 */
export function ProgrammeHero({ programme }: { programme: Programme }) {
  return (
    <PageHero
      breadcrumb={programme.title}
      eyebrow={programme.cardTitle}
      title={programme.heroHeadline}
      description={programme.summary}
      image={programme.image ? { src: programme.image.src, alt: "" } : undefined}
      background={
        programme.image ? undefined : (
          <>
            <PhotoPlaceholder
              caption={programme.photoCaption}
              tag={programme.tag}
              icon={programme.icon}
              className="h-full w-full rounded-none border-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          </>
        )
      }
    />
  );
}
