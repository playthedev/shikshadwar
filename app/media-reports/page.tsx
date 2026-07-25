import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Newspaper } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { EmptyState } from "@/components/shared/empty-state";
import { mediaReports } from "@/lib/media-reports";

export const metadata: Metadata = {
  title: "Media Reports",
  description: "Press and media coverage of Shikshadwar Foundation.",
  alternates: {
    canonical: "/media-reports/",
  },
};

export default function MediaReportsPage() {
  return (
    <section className="pt-32 pb-[clamp(3.5rem,7vw,6rem)]">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Media Reports</span>
        </nav>
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-heading text-ink">Media Reports</h1>
        <p className="mt-4 text-md leading-relaxed text-muted-foreground">
          Press mentions and media coverage of our work.
        </p>

        {mediaReports.length > 0 ? (
          <ul className="mt-10 divide-y divide-border border-t border-b border-border">
            {mediaReports.map((report, index) => (
              <Reveal as="li" key={report.title} delay={index * 0.05}>
                <a
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Newspaper aria-hidden="true" className="size-5 shrink-0 text-rust" />
                    <div>
                      <p className="font-heading text-base text-ink">{report.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.source} ·{" "}
                        {new Date(report.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-rust"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-10">
            <EmptyState
              icon={Newspaper}
              title="No media coverage yet"
              description="We haven't been featured in the press yet — check back here as our work gets picked up by media outlets."
            />
          </div>
        )}
      </Container>
    </section>
  );
}
