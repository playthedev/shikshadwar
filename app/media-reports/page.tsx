import type { Metadata } from "next";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
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
    <>
      <PageHero
        breadcrumb="Media Reports"
        eyebrow="Press"
        title="Media reports"
        description="Press mentions and media coverage of our work."
      />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <Container>
          {mediaReports.length > 0 ? (
            <ul className="border-t border-border">
              {mediaReports.map((report, index) => (
                <Reveal as="li" key={report.title} delay={index * 0.05}>
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-6 border-b border-border py-7"
                  >
                    <span className="font-heading text-sm tabular-nums text-ink/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-h4 text-balance text-ink">
                        {report.title}
                      </span>
                      <span className="mt-1 block text-xs tracking-wide text-muted-foreground uppercase">
                        {report.source} ·{" "}
                        {new Date(report.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/45 transition-all duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-primary-foreground"
                    >
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={Newspaper}
              title="No media coverage yet"
              description="We haven't been featured in the press yet — check back here as our work gets picked up by media outlets."
            />
          )}
        </Container>
      </section>
    </>
  );
}
