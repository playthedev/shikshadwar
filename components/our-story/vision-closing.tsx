import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

export function VisionClosing() {
  return (
    <section className="grain-overlay relative isolate overflow-hidden bg-ink py-[clamp(4rem,8vw,8rem)]">
      <div
        aria-hidden="true"
        className="animate-breathe absolute -top-32 -left-20 size-[28rem] rounded-full bg-pine opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -right-24 -bottom-28 size-[22rem] rounded-full bg-rust opacity-25 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" />
            <p className="text-eyebrow text-gold uppercase">{ourStory.vision.eyebrow}</p>
          </div>
          <p className="mt-6 font-heading text-h2 text-balance text-paper">
            <RevealText text={ourStory.vision.title} />
          </p>

          <Reveal delay={0.15}>
            <p className="mt-12 border-t border-paper/15 pt-8 font-heading text-h4 text-balance text-paper/85">
              {ourStory.closing}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
