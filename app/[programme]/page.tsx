import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammeHero } from "@/components/programme/programme-hero";
import { ProgrammeIntro } from "@/components/programme/programme-intro";
import { FocusAreas } from "@/components/programme/focus-areas";
import { ProgrammeGalleryStrip } from "@/components/programme/programme-gallery-strip";
import { RelatedProgrammes } from "@/components/programme/related-programmes";
import { FinalCta } from "@/components/home/final-cta";
import { programmes, getProgramme, type ProgrammeSlug } from "@/lib/programmes";

export function generateStaticParams() {
  return programmes.map((p) => ({ programme: p.slug }));
}

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
      <ProgrammeIntro summary={programme.summary} paragraphs={programme.intro} />
      {programme.focusAreas ? <FocusAreas areas={programme.focusAreas} /> : null}
      {programme.gallery ? <ProgrammeGalleryStrip images={programme.gallery} /> : null}
      <RelatedProgrammes current={programme.slug as ProgrammeSlug} />
      <FinalCta />
    </>
  );
}
