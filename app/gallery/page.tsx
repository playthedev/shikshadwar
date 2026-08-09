import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Shikshadwar Foundation's education, healthcare, livelihood, youth empowerment and environment sustainability programmes.",
  alternates: {
    canonical: "/gallery/",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Gallery"
        title="Gallery"
        image={{ src: "/images/hero/slide-04.png", alt: "", objectPosition: "center 20%" }}
      />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
