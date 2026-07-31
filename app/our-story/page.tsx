import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { FoundingStory } from "@/components/our-story/founding-story";
import { FoundationBlock } from "@/components/our-story/foundation-block";
import { ApproachAndMeaning } from "@/components/our-story/approach-meaning";
import { VisionClosing } from "@/components/our-story/vision-closing";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Shikshadwar Foundation — from a chance encounter at Jahangirpuri Metro Station in 2012 to a Public Charitable Trust working across education, livelihood, healthcare, youth empowerment and sustainable development.",
  alternates: {
    canonical: "/our-story/",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Our Story"
        eyebrow="Our Story"
        title="The story behind Shikshadwar Foundation."
        image={{
          src: "/images/hero/slide-05.png",
          alt: "",
          objectPosition: "center 25%",
        }}
      />

      <FoundingStory />
      <FoundationBlock />
      <ApproachAndMeaning />
      <VisionClosing />
      <FinalCta />
    </>
  );
}
