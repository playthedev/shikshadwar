import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { ChildDonateForm } from "@/components/sponsorship/child-donate-form";
import { FinalCta } from "@/components/home/final-cta";
import {
  sponsoredChildren,
  getSponsoredChild,
  sponsorshipTier,
  sponsoredChildTagline,
} from "@/lib/sponsorship";

/**
 * Every child's story follows the same three-beat shape in the client's
 * brief (intro → "Despite these challenges..." → "Through your support...").
 * Splitting on those markers turns the one paragraph back into the
 * intro/middle copy and the closing line the reference layout shows
 * separately, below the stat list.
 */
function splitStory(story: string) {
  const [intro, afterIntro] = story.split("Despite these challenges,");
  const [middle, afterMiddle] = (afterIntro ?? "").split("Through your support,");

  return {
    intro: intro?.trim() ?? story,
    middle: afterIntro ? `Despite these challenges,${middle}`.trim() : "",
    closing: afterMiddle ? `Through your support,${afterMiddle}`.trim() : "",
  };
}

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

  const story = splitStory(child.story);
  const gradeNumber = child.grade.replace(/^Class\s*/i, "");
  const stats = [
    { label: "Age", value: `${child.age} years` },
    { label: "Date of Birth", value: child.dob },
    { label: "Community", value: child.location },
    { label: "Studying in Class", value: gradeNumber },
    { label: "Dream", value: child.dream },
  ];

  return (
    <>
      <PageHero
        breadcrumb={child.name}
        trail={[{ label: "Meet Our Stars", href: "/meet-our-stars/" }]}
        title={`Meet ${child.name}.`}
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
                  <a
                    href={child.image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full image of ${child.name}`}
                    className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:text-rust"
                  >
                    <ZoomIn aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </MaskReveal>

              <Link
                href="/meet-our-stars/"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-rust"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back to Meet Our Stars
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <p className="font-heading text-h4 text-balance text-ink">{sponsoredChildTagline}</p>

              <ul className="mt-4 space-y-2">
                {stats.map((stat) => (
                  <li key={stat.label} className="text-base leading-relaxed text-ink/85">
                    <span className="font-semibold text-ink">{stat.label}:</span> {stat.value}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <ChildDonateForm
                  slug={child.slug}
                  name={child.name}
                  image={child.image.src}
                  monthlyAmount={sponsorshipTier.monthly}
                  yearlyAmount={sponsorshipTier.annual}
                />
              </div>

              <p className="mt-8 leading-relaxed text-ink/85">{story.intro}</p>
              {story.middle ? (
                <p className="mt-3 leading-relaxed text-ink/85">{story.middle}</p>
              ) : null}
              {story.closing ? (
                <p className="mt-3 leading-relaxed text-ink/85">{story.closing}</p>
              ) : null}
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
