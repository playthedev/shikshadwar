import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ProductIllustrationIcon } from "@/components/support-us/product-illustrations";
import { products } from "@/lib/products";

/**
 * Each card routes to that product's own checkout page
 * (app/support-us/[product]/page.tsx) — see the note on lib/products.ts for
 * why the images here are illustrations rather than photography, and why the
 * prices are placeholders.
 */
export function ProductGrid() {
  return (
    <section className="border-t border-border bg-[#eef2f4] py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="Handmade, not charity"
          title="Bought here, made by them."
          description="Every item is stitched by women trained through our Livelihood programme — buying one puts income directly in their hands."
          animateTitle
          layout="split"
        />

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.06}>
              <Link href={`/support-us/${product.slug}/`} className="group block">
                <figure>
                  <div
                    className={
                      "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-(--radius) border border-border p-8 " +
                      "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--rust),white_88%),color-mix(in_oklch,var(--rust),white_78%))] text-rust"
                    }
                  >
                    <ProductIllustrationIcon
                      illustration={product.illustration}
                      className="size-full max-h-32 max-w-32 transition-transform duration-500 ease-(--ease-out-custom) group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-heading text-base text-ink transition-colors group-hover:text-rust">
                      {product.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold tabular-nums text-rust">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                        Donate
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
