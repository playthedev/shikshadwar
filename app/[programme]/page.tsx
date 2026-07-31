import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammeHero } from "@/components/programme/programme-hero";
import { ProgrammeIntro } from "@/components/programme/programme-intro";
import { FocusAreas } from "@/components/programme/focus-areas";
import { ProgrammeGalleryStrip } from "@/components/programme/programme-gallery-strip";
import { RelatedProgrammes } from "@/components/programme/related-programmes";
import { FinalCta } from "@/components/home/final-cta";
import { StatBand } from "@/components/shared/stat-band";
import { programmes, getProgramme, type ProgrammeSlug } from "@/lib/programmes";

export function generateStaticParams() {
  return programmes.map((p) => ({ programme: p.slug }));
}

/*
  This route sits at the root, so it matches every unknown top-level path on
  the site. Left on the default (`true`), Next renders those on demand and
  caches the result — which meant /anything-at-all returned the 404 *page*
  with a 200 status, a soft 404 that search engines will happily index.
  The programme list is a compile-time constant, so there is nothing to
  generate on demand: anything outside generateStaticParams is genuinely
  not found, and this makes the response say so.
*/
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programme: string }>;
}): Promise<Metadata> {
  const { programme: slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};

  return {
    title: programme.cardTitle,
    description: programme.summary,
    alternates: {
      canonical: `/${programme.slug}/`,
    },
    openGraph: {
      title: programme.cardTitle,
      description: programme.summary,
      images: programme.image ? [{ url: programme.image.src }] : undefined,
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ programme: string }>;
}) {
  const { programme: slug } = await params;
  const programme = getProgramme(slug);

  if (!programme) {
    notFound();
  }

  return (
    <>
      <ProgrammeHero programme={programme} />
      <ProgrammeIntro
        paragraphs={programme.intro}
        note={programme.impactStats ? undefined : programme.impactCaption}
      />
      {programme.focusAreas ? <FocusAreas areas={programme.focusAreas} /> : null}
      {programme.impactStats ? (
        <StatBand
          label={`${programme.title} impact`}
          eyebrow="Impact 2025–26"
          title="Where this work has reached"
          stats={programme.impactStats}
          caption={programme.impactCaption}
          tone={programme.tag === "rust" ? "rust-tint" : "pine-tint"}
        />
      ) : null}
      {programme.gallery ? <ProgrammeGalleryStrip images={programme.gallery} /> : null}
      <RelatedProgrammes current={programme.slug as ProgrammeSlug} />
      <FinalCta />
    </>
  );
}
