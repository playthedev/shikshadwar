import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammeHero } from "@/components/programme/programme-hero";
import { ProgrammeIntro } from "@/components/programme/programme-intro";
import { FocusAreas } from "@/components/programme/focus-areas";
import { ProgrammeProcess } from "@/components/programme/programme-process";
import { ProgrammeWorkImage } from "@/components/programme/programme-work-image";
import { ProgrammeStatement } from "@/components/programme/programme-statement";
import { SubProgrammes } from "@/components/programme/sub-programmes";
import { ProgrammeImpactDetail } from "@/components/programme/programme-impact-detail";
import { ProgrammeGalleryStrip } from "@/components/programme/programme-gallery-strip";
import { ProgrammeImpactSponsors } from "@/components/programme/programme-impact-sponsors";
import { ProgrammeSponsorCta } from "@/components/programme/programme-sponsor-cta";
import { RelatedProgrammes } from "@/components/programme/related-programmes";
import { SponsorshipProcess } from "@/components/programme/sponsorship-process";
import { ProgrammeImpactBand } from "@/components/programme/programme-impact-band";
import { ChildGrid } from "@/components/sponsorship/child-grid";
import { FinalCta } from "@/components/home/final-cta";
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

  const vision = programme.visionStatement ? (
    <ProgrammeStatement statement={programme.visionStatement} />
  ) : null;

  return (
    <>
      <ProgrammeHero programme={programme} />
      <ProgrammeIntro
        paragraphs={programme.intro}
        sections={programme.introSections}
        note={programme.impactStats ? undefined : programme.impactCaption}
        title={programme.title}
        plainSections={programme.introSectionsPlain}
        image={programme.introImage}
      />
      {!programme.subProgrammes && programme.focusAreas ? (
        <FocusAreas areas={programme.focusAreas} />
      ) : null}
      {programme.workImage ? <ProgrammeWorkImage image={programme.workImage} /> : null}
      {programme.visionPosition === "before" ? vision : null}
      {programme.process ? (
        <ProgrammeProcess
          steps={programme.process}
          heading={programme.processHeading}
          description={programme.processDescription}
          note={programme.processNote}
        />
      ) : null}
      {programme.visionPosition !== "before" ? vision : null}
      {programme.impactStats && programme.impactImage && programme.sponsorHighlight ? (
        <ProgrammeImpactSponsors
          stats={programme.impactStats}
          caption={programme.impactCaption}
          image={programme.impactImage}
          sponsor={programme.sponsorHighlight}
        />
      ) : programme.impactStats ? (
        <ProgrammeImpactBand stats={programme.impactStats} caption={programme.impactCaption} />
      ) : null}
      {programme.impactBullets || programme.impactNote ? (
        <ProgrammeImpactDetail bullets={programme.impactBullets} notes={programme.impactNote} />
      ) : null}
      {programme.showChildStories ? (
        <>
          <ChildGrid />
          <ProgrammeSponsorCta />
        </>
      ) : null}
      {programme.sponsorshipProcess ? (
        <SponsorshipProcess
          steps={programme.sponsorshipProcess}
          heading={programme.sponsorshipProcessHeading}
          notes={programme.sponsorshipProcessNotes}
        />
      ) : null}
      {programme.subProgrammes ? (
        <SubProgrammes
          items={programme.subProgrammes}
          programmeSlug={programme.slug}
          heading={programme.subProgrammesHeading}
          eyebrow={programme.subProgrammesEyebrow}
        />
      ) : null}
      {programme.gallery ? <ProgrammeGalleryStrip images={programme.gallery} /> : null}
      {!programme.hideRelatedProgrammes ? (
        <RelatedProgrammes current={programme.slug as ProgrammeSlug} />
      ) : null}
      <FinalCta />
    </>
  );
}
