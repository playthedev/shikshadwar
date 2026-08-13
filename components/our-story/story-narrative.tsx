import type { ReactNode } from "react";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

const groundPhoto = {
  src: "/images/gallery/education/edu-04.png",
  alt: "Manish Mandal and children at a Shikshadwar non-formal education session",
};

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
 * The founding narrative through to the Foundation's establishment — one
 * sticky photo on the left, the full run of paragraphs on the right, top-
 * aligned against each other. Same two-column pattern as the About Us
 * "Why Shikshadwar" section, rather than a zigzag of photo/text rows that
 * drift out of alignment once the paragraph counts between them differ.
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

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal>
              <MaskReveal direction="left" className="rounded-(--radius)">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={groundPhoto.src}
                    alt={groundPhoto.alt}
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

          <div className="space-y-4 lg:col-span-7">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.04 * index}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {renderParagraph(paragraph.text, paragraph.bold)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
