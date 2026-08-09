import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

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
            <p className="mt-12 border-t border-ink/15 pt-8 font-heading text-h4 text-balance text-ink/75">
              {ourStory.closing}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
