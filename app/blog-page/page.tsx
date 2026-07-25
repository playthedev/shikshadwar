import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
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
  return (
    <section className="pt-32 pb-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Blog</span>
        </nav>
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-heading text-ink">Blog</h1>
        <p className="mt-4 max-w-2xl text-md leading-relaxed text-muted-foreground">
          Field notes, programme updates and stories from the communities we
          work with.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-(--radius) border border-border bg-surface">
                <PhotoPlaceholder
                  caption={post.title}
                  aspect="wide"
                  tag={post.tag}
                  icon={blogCategoryIcons[post.category]}
                  className="rounded-none border-0 border-b"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={cn(
                      "text-xs font-semibold tracking-wide uppercase",
                      post.tag === "rust" ? "text-rust" : "text-pine",
                    )}
                  >
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-heading text-lg text-ink">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <time dateTime={post.date} className="mt-4 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
