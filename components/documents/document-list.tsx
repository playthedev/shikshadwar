import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Magnetic } from "@/components/shared/magnetic";
import type { DocumentEntry } from "@/lib/documents";

export function DocumentList({
  title,
  description,
  documents,
}: {
  title: string;
  description: string;
  documents: DocumentEntry[];
}) {
  return (
    <section className="pt-32 pb-[clamp(3.5rem,7vw,6rem)]">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{title}</span>
        </nav>
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-heading text-ink">{title}</h1>
        <p className="mt-4 text-md leading-relaxed text-muted-foreground">{description}</p>

        <ul className="mt-10 divide-y divide-border border-t border-b border-border">
          {documents.map((doc, index) => (
            <Reveal as="li" key={doc.file} delay={index * 0.05}>
              <div className="flex items-center justify-between gap-4 py-5">
                <div className="flex items-center gap-4">
                  <FileText aria-hidden="true" className="size-5 shrink-0 text-rust" />
                  <div>
                    <p className="font-heading text-base text-ink">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">PDF · {doc.fileSizeLabel}</p>
                  </div>
                </div>
                <Magnetic>
                  <a
                    href={doc.file}
                    download
                    className="flex items-center gap-1.5 rounded-(--radius) border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-rust hover:text-rust"
                  >
                    <Download aria-hidden="true" className="size-4" />
                    Download
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
