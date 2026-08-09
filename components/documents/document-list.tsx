import { Download } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import type { DocumentEntry } from "@/lib/documents";

export function DocumentList({
  title,
  documents,
}: {
  title: string;
  /** No longer shown in the hero (banner copy was trimmed to just the heading) — kept so callers can still describe the page for other uses, e.g. metadata. */
  description: string;
  documents: DocumentEntry[];
  eyebrow?: string;
}) {
  return (
    <>
      <PageHero breadcrumb={title} title={title} />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <Container>
          {/*
            Each row is a whole-width target with the filename set at heading
            scale. The previous version wrapped a small "Download" button on
            the right, which meant the actual click target on a page whose
            only purpose is downloading was the smallest element in the row.
          */}
          <ul className="border-t border-border">
            {documents.map((doc, index) => (
              <Reveal as="li" key={doc.file} delay={index * 0.05}>
                <a
                  href={doc.file}
                  download
                  className="group flex items-center gap-6 border-b border-border py-7"
                >
                  <span className="font-heading text-sm tabular-nums text-ink/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-h4 text-ink">{doc.title}</span>
                    <span className="mt-1 block text-xs tracking-wide text-muted-foreground uppercase">
                      PDF · {doc.fileSizeLabel}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/45 transition-all duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-primary-foreground"
                  >
                    <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
