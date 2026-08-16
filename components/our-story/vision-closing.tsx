import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

// Brand accents, cycled one per sentence — turns the closing line into a
// small rhythm of color instead of one flat block of muted ink.
const closingColors = ["text-rust", "text-pine", "text-gold", "text-rust"];

// "One child. One family. One community. One opportunity at a time." →
// each "X." sentence gets its own color, split off the shared string in
// lib/our-story-data.ts rather than duplicating the copy here.
const closingSentences = ourStory.closing.match(/[^.]+\.\s*/g) ?? [ourStory.closing];

export function VisionClosing() {
  return (
    <section className="grain-overlay relative isolate overflow-hidden bg-paper py-[clamp(4rem,8vw,8rem)]">
      <div
        aria-hidden="true"
        className="animate-breathe absolute -top-32 -left-20 size-[28rem] rounded-full bg-pine opacity-15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -right-24 -bottom-28 size-[22rem] rounded-full bg-rust opacity-15 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-heading text-h2 text-balance text-ink">
              <RevealText text={ourStory.vision.lead} />
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-12 border-t border-ink/15 pt-8 font-heading text-h4 text-balance">
              {closingSentences.map((sentence, index) => (
                <span key={index} className={closingColors[index % closingColors.length]}>
                  {sentence.trim()}{" "}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
