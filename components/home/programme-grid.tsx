import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { programmes, type Programme } from "@/lib/programmes";
import { cn } from "@/lib/utils";

/*
  A plain two-column index — icon, underlined title, one line of copy —
  rather than a photo mosaic. Each programme reads the same way a contents
  page does: mark, name, what it is, in that order, so the eye can scan all
  five in one pass instead of stopping at whichever photograph is largest.
*/

const toneClasses: Record<Programme["tag"], { badge: string; icon: string; underline: string }> = {
  rust: { badge: "bg-rust-tint", icon: "text-rust", underline: "bg-rust" },
  pine: { badge: "bg-pine-tint", icon: "text-pine", underline: "bg-pine" },
};

function ProgrammeEntry({ programme, index }: { programme: Programme; index: number }) {
  const tones = toneClasses[programme.tag];
  const Icon = programme.icon;

  return (
    <Reveal delay={index * 0.06}>
      <Link href={`/${programme.slug}/`} className="group flex items-start gap-5">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105",
            tones.badge,
          )}
        >
          {Icon ? <Icon className={cn("size-7", tones.icon)} strokeWidth={1.75} /> : null}
        </span>

        <div className="min-w-0 pt-1">
          <h3 className="relative inline-block font-heading text-lg tracking-tight text-ink uppercase">
            {programme.title}
            <span
              aria-hidden="true"
              className={cn("absolute -bottom-0.5 left-0 h-[3px] w-full", tones.underline)}
            />
          </h3>
          <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            {programme.summary}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Learn more
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProgrammeGrid() {
  // Education leads the sequence — it is the founding programme and the one
  // the rest of the copy keeps referring back to.
  const ordered = [
    ...programmes.filter((p) => p.slug === "education"),
    ...programmes.filter((p) => p.slug !== "education"),
  ];

  return (
    <section className="border-t border-border bg-[#eef2f4] py-[clamp(5rem,10vw,10rem)]">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
            <p className="text-eyebrow text-rust uppercase">Our work</p>
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
          </div>
          <h2 className="mt-5 text-h1 font-heading text-balance text-ink">
            <RevealText text="Our programmes" />
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-x-12 gap-y-14 sm:grid-cols-2">
          {ordered.map((programme, index) => (
            <ProgrammeEntry key={programme.slug} programme={programme} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
