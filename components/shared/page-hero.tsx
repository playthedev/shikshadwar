import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { RevealText } from "@/components/shared/reveal-text";
import { cn } from "@/lib/utils";

interface PageHeroImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface PageHeroProps {
  /** Current page name — used as the last breadcrumb crumb. */
  breadcrumb: string;
  title: string;
  eyebrow?: string;
  description?: string;
  /** When present the header runs over photography instead of flat ink. */
  image?: PageHeroImage;
  /**
   * Replaces the backdrop entirely — for the one case `image` can't serve,
   * a programme with no photograph yet, which needs the abstract
   * placeholder behind it instead of an empty frame. Callers supplying this
   * are responsible for their own scrim.
   */
  background?: React.ReactNode;
  /** Extra crumbs between Home and the current page. */
  trail?: { label: string; href: string }[];
  className?: string;
  children?: React.ReactNode;
}

/**
 * The single page header for every route below the homepage.
 *
 * Each inner page had previously hand-rolled its own version of this — same
 * `pt-32 pb-16` ink band, same breadcrumb, but drifting between `text-h1`
 * and a bespoke `text-[clamp(2rem,4vw,2.75rem)]`, some on ink and some on
 * paper. Six near-copies is how a site stops feeling like one thing. This
 * fixes the proportions, the type scale and the entrance in one place, and
 * carries the homepage's vocabulary — hairline rule into the eyebrow,
 * display-scale heading, ambient motion behind — across the whole site.
 */
export function PageHero({
  breadcrumb,
  title,
  eyebrow,
  description,
  image,
  background,
  trail = [],
  className,
  children,
}: PageHeroProps) {
  const hasBackdrop = Boolean(image || background);
  return (
    <section
      className={cn(
        "grain-overlay relative isolate overflow-hidden bg-ink",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {background ? (
          background
        ) : image ? (
          <>
            <Image
              src={image.src}
              alt=""
              fill
              preload
              sizes="100vw"
              quality={92}
              style={{ objectPosition: image.objectPosition ?? "center 30%" }}
              className="scale-105 object-cover"
            />
            {/* Two scrims: one lifting from the base for the headline, one
                pulling in from the left where the copy actually sits. */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-transparent" />
          </>
        ) : (
          <>
            <div className="animate-breathe absolute -top-40 -left-24 size-[32rem] rounded-full bg-pine opacity-40 blur-3xl" />
            <div className="animate-float-slow absolute -right-20 -bottom-32 size-[24rem] rounded-full bg-rust opacity-25 blur-3xl" />
          </>
        )}
      </div>

      <Container
        className={cn(
          "relative flex flex-col justify-end pt-36 pb-14 md:pb-16",
          hasBackdrop ? "min-h-[min(66vh,620px)]" : "min-h-[min(48vh,460px)]",
        )}
      >
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-paper/55">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="transition-colors hover:text-paper">
                Home
              </Link>
            </li>
            {trail.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-x-2">
                <span aria-hidden="true">/</span>
                <Link href={crumb.href} className="transition-colors hover:text-paper">
                  {crumb.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-paper/90">
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        {eyebrow ? (
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="animate-draw-x h-px w-10 shrink-0 bg-gold md:w-16" />
            <p className="text-eyebrow text-gold uppercase">{eyebrow}</p>
          </div>
        ) : null}

        <h1 className="max-w-4xl text-h1 font-heading text-balance text-paper">
          <RevealText text={title} mode="mount" />
        </h1>

        {description ? (
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-paper/75">{description}</p>
        ) : null}

        {children}
      </Container>
    </section>
  );
}
