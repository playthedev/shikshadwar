import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ChildGrid } from "@/components/sponsorship/child-grid";
import { SponsorshipTabs } from "@/components/sponsorship/sponsorship-tabs";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Meet Our Stars",
  description:
    "Meet the children currently enrolled in Shikshadwar Foundation's education programme who are looking for a sponsor to see the year through.",
  alternates: {
    canonical: "/meet-our-stars/",
  },
};

export default function MeetOurStarsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Meet Our Stars"
        title="Meet our stars."
        image={{ src: "/images/hero/slide-01.png", alt: "", objectPosition: "center 20%" }}
      />

      <SponsorshipTabs active="meet-our-stars" />

      <ChildGrid />

      <FinalCta />
    </>
  );
}
