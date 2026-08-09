import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { slugifySubProgramme, type SubProgramme } from "@/lib/programmes";

/**
 * Sub-programme cards (Finding Sponsors, Holistic Education Programme, … or,
 * on Livelihood, the "Projects 2026–27" pair) — a plain white card with a
 * rust pill "Read more" tag, matching the site's brand accent.
 */
export function SubProgrammes({
  items,
  programmeSlug,
  heading,
  eyebrow = "Sub-programme",
}: {
  items: SubProgramme[];
  /** Slug of the parent programme, used to build each card's detail-page link. */
  programmeSlug: string;
  /** A shared heading rendered once above the list, e.g. "Projects 2026–27". */
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-[#eef2f4] py-14 md:py-20">
      <Container>
        {heading ? (
          <h2 className="text-center font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-wide text-black uppercase md:text-5xl">
            {heading}
          </h2>
        ) : null}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {items.map((item, index) => {
            const href = `/${programmeSlug}/${slugifySubProgramme(item.title)}`;
            const bulletPreview = item.bullets?.slice(0, 3) ?? [];
            return (
              <Link
                key={item.title}
                href={href}
                className="group flex w-full max-w-sm flex-1 basis-[300px] flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm md:p-7"
              >
                {item.icon ? (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rust-tint">
                    <item.icon aria-hidden="true" className="size-6 text-rust" />
                  </span>
                ) : null}
                <p
                  className={`text-xs font-semibold tracking-wide text-rust uppercase ${item.icon ? "mt-3" : ""}`}
                >
                  {eyebrow} {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-balance text-ink">{item.title}</h3>
                {item.paragraphs[0] ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
                    {item.paragraphs[0]}
                  </p>
                ) : null}
                {bulletPreview.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-left">
                    {bulletPreview.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm leading-snug text-ink/80"
                      >
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rust" />
                        <span className="line-clamp-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <span className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-rust/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-rust uppercase transition-colors group-hover:bg-rust group-hover:text-primary-foreground">
                  Read more
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
