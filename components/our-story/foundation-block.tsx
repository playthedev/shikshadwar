import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { ourStory } from "@/lib/our-story-data";

export function FoundationBlock() {
  return (
    <section className="border-t border-border bg-muted/40 py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
            <p className="text-eyebrow text-rust uppercase">{ourStory.foundation.eyebrow}</p>
          </div>
          <p className="mt-6 font-heading text-h2 text-balance text-ink">
            <RevealText text={ourStory.foundation.paragraph} />
          </p>
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {ourStory.approach.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
