import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Shikshadwar Foundation's education, healthcare, livelihood and youth development programmes.",
  alternates: {
    canonical: "/gallery/",
  },
};

export default function GalleryPage() {
  return (
    <section className="pt-32 pb-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Gallery</span>
        </nav>
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-heading text-ink">Gallery</h1>
        <p className="mt-4 max-w-2xl text-md leading-relaxed text-muted-foreground">
          Moments from classrooms, skilling sessions and community events
          across our programme areas.
        </p>

        <div className="mt-10">
          <GalleryGrid />
        </div>
      </Container>
    </section>
  );
}
