import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { ProgrammeHeroSlideshow } from "@/components/programme/programme-hero-slideshow";
import type { Programme } from "@/lib/programmes";

/**
 * Full-bleed banner styled after Smile Foundation's programme pages
 * (smilefoundationindia.org/health/) — a photo slideshow with one giant,
 * centered, uppercase headline over it — rather than the rest of the
 * site's bottom-anchored PageHero treatment. Kept as its own
 * bespoke markup instead of extending the shared PageHero, so this look
 * stays scoped to programme pages and doesn't reskin the header on every
 * other route.
 */
export function ProgrammeHero({ programme }: { programme: Programme }) {
  const slides = programme.gallery?.length ? programme.gallery : programme.image ? [programme.image] : [];

  return (
    <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-black md:min-h-[550px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {slides.length ? (
          <ProgrammeHeroSlideshow images={slides} />
        ) : (
          <PhotoPlaceholder
            caption={programme.photoCaption}
            tag={programme.tag}
            icon={programme.icon}
            className="h-full w-full rounded-none border-0"
          />
        )}
      </div>

      <Container className="relative py-16 text-center">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span aria-current="page" className="text-white">
            {programme.title}
          </span>
        </nav>

        <h1 className="hero-heading-shadow mx-auto max-w-4xl text-display text-white uppercase">
          {programme.heroHeadline}
        </h1>
      </Container>
    </section>
  );
}
