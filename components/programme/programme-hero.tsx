import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { RevealText } from "@/components/shared/reveal-text";
import type { Programme } from "@/lib/programmes";

export function ProgrammeHero({ programme }: { programme: Programme }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {programme.image ? (
          <Image
            src={programme.image.src}
            alt={programme.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <PhotoPlaceholder
            caption={programme.photoCaption}
            aspect="wide"
            tag={programme.tag}
            icon={programme.icon}
            className="h-full w-full rounded-none"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
        />
      </div>

      <Container className="relative flex min-h-[52vh] flex-col justify-end pt-32 pb-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/70">
          <Link href="/" className="hover:text-paper">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-paper/90">{programme.title}</span>
        </nav>
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-paper/80 uppercase">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
          Our Work
        </p>
        <h1 className="max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-heading text-paper">
          <RevealText text={programme.title} mode="mount" />
        </h1>
      </Container>
    </section>
  );
}
