import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { DonateForm } from "@/components/forms/donate-form";
import { FinalCta } from "@/components/home/final-cta";
import {
  sponsoredChildren,
  getSponsoredChild,
  childSponsorshipAmounts,
} from "@/lib/sponsorship";

export function generateStaticParams() {
  return sponsoredChildren.map((child) => ({ child: child.slug }));
}

// Same reasoning as app/[programme]/page.tsx: the child list is a compile-time
// constant, so anything outside generateStaticParams is genuinely not found.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ child: string }>;
}): Promise<Metadata> {
  const { child: slug } = await params;
  const child = getSponsoredChild(slug);
  if (!child) return {};

  return {
    title: `Meet ${child.name}`,
    description: `${child.name}, ${child.age}, is currently enrolled in Shikshadwar Foundation's education programme and looking for a sponsor. ${child.dream}.`,
    alternates: {
      canonical: `/meet-our-stars/${child.slug}/`,
    },
    openGraph: {
      title: `Meet ${child.name}`,
      images: [{ url: child.image.src }],
    },
  };
}

export default async function SponsoredChildPage({
  params,
}: {
  params: Promise<{ child: string }>;
}) {
  const { child: slug } = await params;
  const child = getSponsoredChild(slug);

  if (!child) {
    notFound();
  }

  return (
    <>
      <PageHero
        breadcrumb={child.name}
        trail={[{ label: "Meet Our Stars", href: "/meet-our-stars/" }]}
        eyebrow="Waiting for a sponsor"
        title={`Meet ${child.name}.`}
        description={child.dream}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-5">
              <MaskReveal className="rounded-(--radius)">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={child.image.src}
                    alt={child.image.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    quality={92}
                    className="object-cover"
                  />
                </div>
              </MaskReveal>

              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles aria-hidden="true" className="size-4 shrink-0 text-rust" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Age</dt>
                    <dd className="font-heading text-ink">{child.age}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap aria-hidden="true" className="size-4 shrink-0 text-rust" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Grade</dt>
                    <dd className="font-heading text-ink">{child.grade}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-rust" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Location</dt>
                    <dd className="font-heading text-ink">{child.location}</dd>
                  </div>
                </div>
              </dl>

              <Reveal delay={0.1}>
                <p className="mt-8 text-base leading-relaxed text-ink/85">{child.story}</p>
              </Reveal>

              <Link
                href="/meet-our-stars/"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-rust"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back to Meet Our Stars
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Sponsor {child.name}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {`Choose a one-time amount below to sponsor ${child.name} today. For an ongoing monthly or annual sponsorship, get in touch with us directly and we'll set it up with you.`}
                </p>
                <div className="mt-8">
                  <DonateForm
                    defaultPurpose={`Sponsor ${child.name}`}
                    defaultAmount={childSponsorshipAmounts[1]}
                    presetAmounts={childSponsorshipAmounts}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
