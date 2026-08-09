import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MaskReveal } from "@/components/shared/mask-reveal";
import { Reveal } from "@/components/shared/reveal";
import { trustees } from "@/lib/about-data";

export function Trustees() {
  return (
    <section className="border-t border-border bg-[#eef2f4] py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Governance"
          title="Trustees"
          description="The trust's governing body, accountable for how funds are raised, spent and reported. Select a trustee to read their full profile."
          animateTitle
          accent="rust"
          layout="split"
        />

        <ul className="mt-14 flex flex-wrap gap-8 sm:flex-nowrap sm:gap-10">
          {trustees.map((trustee, index) => (
            <li key={trustee.slug} className="w-[calc(50%-1rem)] sm:w-1/3">
              <Reveal delay={index * 0.06}>
                <Link href={`/about-us/trustees/${trustee.slug}/`} className="group block">
                  <MaskReveal delay={index * 0.06} className="rounded-(--radius) bg-muted">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={trustee.image}
                        alt={`Portrait of ${trustee.name}`}
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        quality={85}
                        className="object-cover object-top transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.04]"
                      />
                    </div>
                  </MaskReveal>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-8 origin-left bg-ink/20 transition-all duration-500 ease-(--ease-out-custom) group-hover:w-14 group-hover:bg-rust"
                  />
                  <p className="mt-3 font-heading text-base text-ink sm:text-h4">{trustee.name}</p>
                  <p className="mt-0.5 text-sm text-rust">{trustee.role}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
