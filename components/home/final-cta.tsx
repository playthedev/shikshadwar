import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";

const tiers = [
  { amount: "₹500", covers: "A month of learning materials for one child." },
  { amount: "₹1,000", covers: "A month of learning support for one child." },
];

/**
 * The closing ask, set over photography rather than flat ink.
 *
 * A donate CTA is the one place on the page where the reader should be
 * looking at the people the money reaches, so the section carries an image
 * under a heavy scrim instead of a colour field — and it keeps this block
 * from reading as a repeat of the dark testimonials section further up. The
 * amounts are broken out as a costed list, because "every rupee is
 * accounted for" is a claim that a specific number makes credible.
 */
export function FinalCta() {
  return (
    <section className="grain-overlay relative isolate overflow-hidden py-[clamp(5rem,10vw,9rem)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/slide-02.png"
          alt=""
          fill
          sizes="100vw"
          quality={92}
          className="scale-105 object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        <div className="animate-breathe absolute -bottom-32 left-1/4 size-[32rem] rounded-full bg-rust opacity-25 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
              <p className="text-eyebrow text-gold uppercase">Donate</p>
            </div>

            <h2 className="mt-5 max-w-2xl text-display font-heading text-balance text-paper">
              <RevealText text="Your gift funds a plan, not just a moment." />
            </h2>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-body-lg leading-relaxed text-paper/70">
                Every rupee is accounted for in our published annual reports.
              </p>

              {/* Primary donate CTA — intentionally has no hover/entrance motion. */}
              <Button
                render={<Link href="/donate/" />}
                nativeButton={false}
                size="xl"
                className="mt-9 bg-rust font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] active:translate-y-0"
              >
                Donate Now
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <dl>
              {tiers.map((tier, index) => (
                <div
                  key={tier.amount}
                  className={index > 0 ? "mt-5 border-t border-paper/15 pt-5" : ""}
                >
                  <dt className="font-heading text-h3 text-paper tabular-nums">{tier.amount}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-paper/60">{tier.covers}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/annual-reports/"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-paper/80 transition-colors hover:text-paper"
            >
              See where it goes
              <span
                aria-hidden="true"
                className="h-px w-8 bg-paper/40 transition-all duration-300 group-hover:w-12 group-hover:bg-gold"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
