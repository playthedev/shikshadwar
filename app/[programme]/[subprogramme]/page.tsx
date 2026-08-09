import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/home/final-cta";
import {
  programmes,
  getSubProgramme,
  slugifySubProgramme,
} from "@/lib/programmes";

export function generateStaticParams() {
  return programmes.flatMap((p) =>
    (p.subProgrammes ?? []).map((s) => ({
      programme: p.slug,
      subprogramme: slugifySubProgramme(s.title),
    })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programme: string; subprogramme: string }>;
}): Promise<Metadata> {
  const { programme: programmeSlug, subprogramme } = await params;
  const found = getSubProgramme(programmeSlug, subprogramme);
  if (!found) return {};

  return {
    title: `${found.subProgramme.title} — ${found.programme.title}`,
    description: found.subProgramme.paragraphs[0],
  };
}

export default async function SubProgrammePage({
  params,
}: {
  params: Promise<{ programme: string; subprogramme: string }>;
}) {
  const { programme: programmeSlug, subprogramme } = await params;
  const found = getSubProgramme(programmeSlug, subprogramme);

  if (!found) {
    notFound();
  }

  const { programme, subProgramme: item } = found;

  return (
    <>
      <PageHero
        breadcrumb={item.title}
        title={item.title}
        eyebrow={programme.title}
        trail={[{ label: programme.title, href: `/${programme.slug}` }]}
      />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {item.paragraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={0.05 + i * 0.05}>
                    <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {item.flow ? (
                <Reveal delay={0.15}>
                  <div className="mt-6">
                    {item.flowLabel ? (
                      <p className="font-heading text-sm uppercase tracking-wide text-ink/60">
                        {item.flowLabel}
                      </p>
                    ) : null}
                    <p className={item.flowLabel ? "mt-2 text-sm font-semibold text-ink/80 italic" : "text-sm font-semibold text-ink/80 italic"}>
                      {item.flow.join(" → ")}
                    </p>
                  </div>
                </Reveal>
              ) : null}

              {item.closing ? (
                <Reveal delay={0.18}>
                  <p className="mt-6 border-l-2 border-pine pl-5 text-sm leading-relaxed text-ink/75">
                    {item.closing}
                  </p>
                </Reveal>
              ) : null}
            </div>

            <div className="space-y-5 lg:col-span-5">
              {item.bullets ? (
                <Reveal delay={0.08}>
                  <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
                    {item.bulletsLabel ? (
                      <p className="font-heading text-sm uppercase tracking-wide text-ink/60">
                        {item.bulletsLabel}
                      </p>
                    ) : null}
                    <ul className={item.bulletsLabel ? "mt-5 space-y-3" : "space-y-3"}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-pine" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {item.secondaryBullets ? (
                <Reveal delay={0.12}>
                  <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
                    {item.secondaryBulletsLabel ? (
                      <p className="font-heading text-sm uppercase tracking-wide text-ink/60">
                        {item.secondaryBulletsLabel}
                      </p>
                    ) : null}
                    <ul className={item.secondaryBulletsLabel ? "mt-5 space-y-3" : "space-y-3"}>
                      {item.secondaryBullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-pine" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {item.image ? (
                <Reveal delay={0.08}>
                  <MaskReveal className="rounded-(--radius) bg-muted">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 35vw, 100vw"
                        quality={85}
                        className="object-cover"
                      />
                    </div>
                  </MaskReveal>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
