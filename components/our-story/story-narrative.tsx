import type { ReactNode } from "react";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

// Row 1's photo — the founder's own photo, paired with his story.
const founderPhoto = {
  src: "/images/gallery/education/edu-04.png",
  alt: "Manish Mandal and children at a Shikshadwar non-formal education session",
};

// Row 2's photo — a community awareness session, paired with the
// Foundation's own story. Reused from the education gallery rather than a
// new upload.
const foundationPhoto = {
  src: "/images/gallery/education/edu-14.png",
  alt: "A Shikshadwar community health-awareness session in front of the Foundation banner",
};

interface Paragraph {
  text: string;
  /** Substrings of `text` to render bold — key names, organisations, claims. */
  bold?: string[];
}

// Manish's own journey, up to the moment that led him to found the
// Foundation — paired with his photo in row 1.
const founderParagraphs: Paragraph[] = [
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
];

// The Foundation's own founding and mission — paired with the community
// photo in row 2.
const foundationParagraphs: Paragraph[] = [
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

function StoryPhoto({
  photo,
  direction,
}: {
  photo: { src: string; alt: string };
  direction: "left" | "right";
}) {
  return (
    <MaskReveal direction={direction} className="rounded-(--radius)">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          quality={90}
          className="object-cover"
        />
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-paper/90 text-rust shadow-sm">
          <HeartHandshake aria-hidden="true" className="size-4" />
        </span>
      </div>
    </MaskReveal>
  );
}

/**
 * The founding narrative — a two-row zigzag, same pattern as the About Us
 * "Why Shikshadwar" section: Manish's own story (copy left, photo right),
 * then swapped below for the Foundation's own founding (photo left, copy
 * right). Plain static columns, vertically centered against each other —
 * no sticky/pinned photo, so scrolling the page feels like scrolling one
 * normal block rather than a photo trailing behind.
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
          {/* Row 1 — copy left, photo right. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-4 lg:col-span-6">
              {founderParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.04 * index}>
                  <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                    {renderParagraph(paragraph.text, paragraph.bold)}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <StoryPhoto photo={founderPhoto} direction="right" />
            </Reveal>
          </div>

          {/* Row 2 — swapped: photo left, copy right. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal delay={0.05} className="lg:order-1 lg:col-span-6">
              <StoryPhoto photo={foundationPhoto} direction="left" />
            </Reveal>

            <div className="space-y-4 lg:order-2 lg:col-span-6">
              {foundationParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.04 * index}>
                  <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                    {renderParagraph(paragraph.text, paragraph.bold)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
