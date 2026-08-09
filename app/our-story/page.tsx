import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { StoryNarrative } from "@/components/our-story/story-narrative";
import { ApproachAndMeaning } from "@/components/our-story/approach-meaning";
import { VisionClosing } from "@/components/our-story/vision-closing";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Shikshadwar Foundation — from a chance encounter at Jahangirpuri Metro Station in 2012 to a Public Charitable Trust working across education, livelihood, healthcare, youth empowerment and environment sustainability.",
  alternates: {
    canonical: "/our-story/",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Our Story"
        title="The story behind Shikshadwar Foundation."
        image={{
          src: "/images/hero/slide-05.png",
          alt: "",
          objectPosition: "center 25%",
        }}
      />

      <StoryNarrative />
      <ApproachAndMeaning />
      <VisionClosing />
      <FinalCta />
    </>
  );
}
