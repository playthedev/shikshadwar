import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  breadcrumb: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ breadcrumb, title, updated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero breadcrumb={breadcrumb} title={title} />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">Last updated: {updated}</p>

            <div className="mt-10 space-y-10">
              {sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.04}>
                  <h2 className="font-heading text-h4 text-balance text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-ink/85">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
