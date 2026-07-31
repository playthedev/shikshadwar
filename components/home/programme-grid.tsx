import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { programmes, type Programme } from "@/lib/programmes";
import { cn } from "@/lib/utils";

/*
  A mosaic rather than a grid of equal cards.

  Identical bordered tiles told the reader that all programmes are
  interchangeable, and the repetition is the single strongest tell of a
  page assembled from a template. Here the widths alternate 7/5 across a
  12-column field, the aspect ratios change with the width, and every second
  item drops down the page — so the eye moves diagonally instead of
  scanning a table. The card chrome is gone entirely: photograph, then
  words under it, the way a printed index works.
*/

const layouts = [
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-24" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "lg:mt-24" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-24" },
];

function ProgrammeEntry({
  programme,
  index,
  layout,
}: {
  programme: Programme;
  index: number;
  layout: (typeof layouts)[number];
}) {
  return (
    <li className={cn("group", layout.span, layout.offset)}>
      <Link href={`/${programme.slug}/`} className="block">
        <MaskReveal className="relative rounded-(--radius)">
          <div className={cn("relative w-full overflow-hidden rounded-(--radius)", layout.aspect)}>
            {programme.image ? (
              <Image
                src={programme.image.src}
                alt={programme.image.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                quality={92}
                className="object-cover transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.04]"
              />
            ) : (
              <PhotoPlaceholder
                caption={programme.photoCaption}
                tag={programme.tag}
                icon={programme.icon}
                className="absolute inset-0 h-full rounded-none border-0"
              />
            )}

            {/* Sits at zero opacity until hover, so the photograph is never
                dimmed while the reader is simply looking at it. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <span
              aria-hidden="true"
              className="absolute top-4 left-4 font-heading text-xs tabular-nums text-paper/0 transition-colors duration-500 group-hover:text-paper/80"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </MaskReveal>

        <Reveal delay={0.1}>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <span
                className={cn(
                  "text-eyebrow uppercase",
                  programme.tag === "rust" ? "text-rust" : "text-pine",
                )}
              >
                {programme.title}
              </span>
              <h3 className="relative mt-2 inline-block font-heading text-h3 text-ink">
                {programme.cardTitle}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-(--ease-out-custom) group-hover:origin-left group-hover:scale-x-100"
                />
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/50 transition-all duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-primary-foreground"
            >
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {programme.summary}
          </p>
        </Reveal>
      </Link>
    </li>
  );
}

export function ProgrammeGrid() {
  // Education leads the sequence — it is the founding programme and the one
  // the rest of the copy keeps referring back to.
  const ordered = [
    ...programmes.filter((p) => p.slug === "education"),
    ...programmes.filter((p) => p.slug !== "education"),
  ];

  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(5rem,10vw,10rem)]">
      <Container>
        {/* Heading and standfirst on opposite sides of the measure, aligned to
            a shared baseline — a centred block here would flatten the page
            back out just as the mosaic starts. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Our work</p>
            </div>
            <h2 className="mt-5 text-h1 font-heading text-balance text-ink">
              <RevealText text="Five programmes, one starting point: dignity." />
            </h2>
          </div>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every programme is designed around the same idea — build capability that outlasts our
              involvement, not dependency on it.
            </p>
          </Reveal>
        </div>

        {/* items-start keeps each entry at the top of its row so the mt-24
            offsets read as a deliberate stagger rather than being absorbed by
            the default stretch. */}
        <ul className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12 lg:items-start lg:gap-y-8">
          {ordered.map((programme, index) => (
            <ProgrammeEntry
              key={programme.slug}
              programme={programme}
              index={index}
              layout={layouts[index % layouts.length]}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
