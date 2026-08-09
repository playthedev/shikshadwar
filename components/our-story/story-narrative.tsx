import type { ReactNode } from "react";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { ourStory } from "@/lib/our-story-data";

// One ground photo per row of the narrative below — the row alternates
// which side the photo sits on, so the layout zigzags instead of running
// as one static image column beside one text column.
const groundPhotos = [
  { src: "/images/gallery/education/edu-04.png", alt: "Children at a Shikshadwar non-formal education session" },
  { src: "/images/gallery/education/edu-09.png", alt: "A Shikshadwar community education event" },
  { src: "/images/gallery/education/edu-14.png", alt: "Children at a Shikshadwar programme centre" },
  { src: "/images/gallery/education/edu-18.png", alt: "A Shikshadwar community gathering" },
];

interface Paragraph {
  text: string;
  /** Substrings of `text` to render bold — key names, organisations, claims. */
  bold?: string[];
}

const paragraphs: Paragraph[] = [
  { text: ourStory.founder.paragraphs[0] },
  { text: ourStory.founder.paragraphs[1], bold: ["Manish Mandal"] },
  { text: ourStory.founder.paragraphs[2], bold: ["Childline 1098"] },
  {
    text: ourStory.founder.paragraphs[3],
    bold: [
      "a child does not need sympathy alone — they need protection, education, opportunity, and someone willing to stand beside them",
    ],
  },
  { text: ourStory.founder.paragraphs[4] },
  {
    text: ourStory.founder.paragraphs[5],
    bold: ["Bachelor of Commerce (Honours)", "Shakti Vahini"],
  },
  {
    text: ourStory.founder.paragraphs[6],
    bold: [
      "Salaam Baalak Trust, TB Alert India, and Prayatna",
      "sustainable development is achieved when strong institutions empower people to transform their own lives",
    ],
  },
  { text: ourStory.founder.paragraphs[7] },
  {
    text: ourStory.foundation.paragraph,
    bold: ["Manish Mandal", "Ms. Silky Aggarwal", "Mr. Suraj Kumar Mandal", "Shikshadwar Foundation"],
  },
  {
    text: ourStory.foundation.body[0],
    bold: [
      "education is not merely a service — it is the foundation upon which dignity, opportunity, equality, and sustainable development are built",
    ],
  },
  { text: ourStory.foundation.body[1] },
  {
    text: ourStory.foundation.body[2],
    bold: ["identification to education, from education to employability, and from employability to self-reliance"],
  },
  {
    text: ourStory.foundation.body[3],
    bold: [
      "Corporate Social Responsibility is not only about funding projects; it is about creating lasting partnerships that transform lives and strengthen communities",
      "United Nations Sustainable Development Goals (SDGs)",
    ],
  },
];

// Split the run of paragraphs into one group per photo, as evenly as
// `paragraphs.length / groundPhotos.length` allows.
function chunk<T>(items: T[], groups: number): T[][] {
  const size = Math.ceil(items.length / groups);
  return Array.from({ length: groups }, (_, i) => items.slice(i * size, i * size + size)).filter(
    (group) => group.length > 0,
  );
}

const rows = chunk(paragraphs, groundPhotos.length).map((group, i) => ({
  photo: groundPhotos[i],
  paragraphs: group,
}));

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Splits `text` on `bold` substrings and wraps the matches in <strong>. */
function renderParagraph(text: string, bold: string[] = []): ReactNode {
  if (!bold.length) return text;
  const pattern = new RegExp(`(${bold.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    bold.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/**
 * The founding narrative through to the Foundation's establishment, run as
 * a zigzag sequence of photo-and-text rows — image on the right, then the
 * left, then the right again — rather than one static image column running
 * beside one long text column.
 */
export function StoryNarrative() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
            <p className="text-eyebrow text-rust uppercase">Where it began</p>
          </div>
          <h2 className="mt-4 font-heading text-h2 text-balance text-ink">
            The story behind Shikshadwar Foundation
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {rows.map((row, rowIndex) => {
            const imageOnRight = rowIndex % 2 === 1;
            return (
              <div
                key={row.photo.src}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  className={cn(
                    "lg:col-span-5",
                    imageOnRight ? "lg:order-2 lg:col-start-8" : "lg:order-1",
                  )}
                >
                  <Reveal>
                    <MaskReveal
                      direction={imageOnRight ? "right" : "left"}
                      className="rounded-(--radius)"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={row.photo.src}
                          alt={row.photo.alt}
                          fill
                          sizes="(min-width: 1024px) 38vw, 100vw"
                          quality={90}
                          className="object-cover"
                        />
                        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-paper/90 text-rust shadow-sm">
                          <HeartHandshake aria-hidden="true" className="size-4" />
                        </span>
                      </div>
                    </MaskReveal>
                  </Reveal>
                </div>

                <div
                  className={cn(
                    "lg:col-span-6 space-y-4",
                    imageOnRight ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7",
                  )}
                >
                  {row.paragraphs.map((paragraph, index) => (
                    <Reveal key={index} delay={0.05 * index}>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {renderParagraph(paragraph.text, paragraph.bold)}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
