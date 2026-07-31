import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ourStory } from "@/lib/our-story-data";

/**
 * Two committed colour fields, same device as the About page's Mission &
 * Vision section — here carrying the pathway statement ("identification to
 * education to employability to self-reliance") and the meaning behind the
 * organisation's name.
 */
export function ApproachAndMeaning() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="grain-overlay relative h-full overflow-hidden rounded-(--radius) bg-pine p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-float-slow absolute -top-20 -right-16 size-64 rounded-full bg-gold opacity-15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
                  <span className="text-eyebrow text-gold uppercase">{ourStory.approach.eyebrow}</span>
                </div>
                <p className="mt-6 font-heading text-h3 leading-[1.3] text-balance text-paper">
                  {ourStory.approach.title}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="grain-overlay relative flex h-full flex-col justify-between overflow-hidden rounded-(--radius) bg-rust p-8 md:p-10">
              <div
                aria-hidden="true"
                className="animate-breathe absolute -bottom-24 -left-12 size-56 rounded-full bg-gold opacity-20 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-paper/70" />
                  <span className="text-eyebrow text-paper/80 uppercase">
                    {ourStory.nameMeaning.eyebrow}
                  </span>
                </div>
                <p className="mt-6 font-heading text-h3 leading-[1.3] text-balance text-paper">
                  {ourStory.nameMeaning.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/80">
                  {ourStory.nameMeaning.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
