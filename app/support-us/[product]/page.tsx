import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ProductDonateForm } from "@/components/support-us/product-donate-form";
import { FinalCta } from "@/components/home/final-cta";
import { ProductIllustrationIcon } from "@/components/support-us/product-illustrations";
import { products, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ product: product.slug }));
}

// Same reasoning as app/[programme]/page.tsx: the catalogue is a
// compile-time constant, so anything outside generateStaticParams is
// genuinely not found.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/support-us/${product.slug}/`,
    },
  };
}

export default async function ProductCheckoutPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHero
        breadcrumb={product.name}
        trail={[{ label: "Support Us", href: "/support-us/" }]}
        title={product.name}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-(--radius) border border-border bg-[linear-gradient(135deg,color-mix(in_oklch,var(--rust),white_88%),color-mix(in_oklch,var(--rust),white_78%))] p-12 text-rust">
                <ProductIllustrationIcon illustration={product.illustration} className="size-full" />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Made through our{" "}
                <span className="font-medium text-ink">{product.madeBy}</span> — every purchase
                puts income directly in the maker&apos;s hands.
              </p>

              <Link
                href="/support-us/"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-rust"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back to Support Us
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Add to cart</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {`This item is priced at ₹${product.price.toLocaleString("en-IN")} each. Choose how many you'd like, add it to your cart, and check out when you're ready.`}
                </p>
                <div className="mt-8">
                  <ProductDonateForm slug={product.slug} name={product.name} unitPrice={product.price} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
