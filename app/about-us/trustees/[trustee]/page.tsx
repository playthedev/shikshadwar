import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { trustees, getTrustee } from "@/lib/about-data";

export function generateStaticParams() {
  return trustees.map((trustee) => ({ trustee: trustee.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trustee: string }>;
}): Promise<Metadata> {
  const { trustee: slug } = await params;
  const trustee = getTrustee(slug);
  if (!trustee) return {};

  return {
    title: trustee.name,
    description: trustee.bio[0],
    alternates: {
      canonical: `/about-us/trustees/${trustee.slug}/`,
    },
  };
}

export default async function TrusteePage({
  params,
}: {
  params: Promise<{ trustee: string }>;
}) {
  const { trustee: slug } = await params;
  const trustee = getTrustee(slug);

  if (!trustee) {
    notFound();
  }

  return (
    <>
      <PageHero
        breadcrumb={trustee.name}
        trail={[{ label: "About Us", href: "/about-us/" }]}
        title={trustee.name}
        eyebrow={trustee.role}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-4">
              <MaskReveal className="rounded-(--radius)">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={trustee.image}
                    alt={`Portrait of ${trustee.name}`}
                    fill
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    quality={92}
                    className="object-cover object-top"
                  />
                </div>
              </MaskReveal>

              <Link
                href="/about-us/"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-rust"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back to About Us
              </Link>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <span aria-hidden="true" className="block h-px w-8 bg-ink/20" />
              <p className="mt-3 font-heading text-h3 text-ink">{trustee.name}</p>
              <p className="mt-0.5 text-sm font-medium text-rust">{trustee.role}</p>
              <div className="mt-6 space-y-4">
                {trustee.bio.map((paragraph, i) => (
                  <Reveal key={i} delay={0.05 + i * 0.05}>
                    <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
