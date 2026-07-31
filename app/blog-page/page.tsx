import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { blogCategoryIcons, blogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories and updates from Shikshadwar Foundation's programmes.",
  alternates: {
    canonical: "/blog-page/",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        breadcrumb="Blog"
        eyebrow="Field notes"
        title="Blog"
        description="Field notes, programme updates and stories from the communities we work with."
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          {/* The newest post runs full width before the rest fall into a
              two-up. Without a lead item every post claims equal weight and
              the page has no place to start. */}
          {featured ? (
            <Reveal>
              <article className="group grid gap-8 border-b border-border pb-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="overflow-hidden rounded-(--radius)">
                    <PhotoPlaceholder
                      caption={featured.title}
                      aspect="wide"
                      tag={featured.tag}
                      icon={blogCategoryIcons[featured.category]}
                      className="rounded-none border-0 transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5 lg:self-center">
                  <span
                    className={cn(
                      "text-eyebrow uppercase",
                      featured.tag === "rust" ? "text-rust" : "text-pine",
                    )}
                  >
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-heading text-h2 text-balance text-ink">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <time
                    dateTime={featured.date}
                    className="mt-6 block text-xs tracking-wide text-muted-foreground uppercase"
                  >
                    {new Date(featured.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </article>
            </Reveal>
          ) : null}

          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 0.06}>
                <article className="group">
                  <div className="overflow-hidden rounded-(--radius)">
                    <PhotoPlaceholder
                      caption={post.title}
                      aspect="wide"
                      tag={post.tag}
                      icon={blogCategoryIcons[post.category]}
                      className="rounded-none border-0 transition-transform duration-700 ease-(--ease-out-custom) group-hover:scale-[1.03]"
                    />
                  </div>
                  <span
                    className={cn(
                      "mt-5 block text-eyebrow uppercase",
                      post.tag === "rust" ? "text-rust" : "text-pine",
                    )}
                  >
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-heading text-h4 text-balance text-ink">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-4 block text-xs tracking-wide text-muted-foreground uppercase"
                  >
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
