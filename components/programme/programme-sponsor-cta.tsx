import Link from "next/link";
import { Container } from "@/components/shared/container";

/**
 * A compact "sponsor a child" banner — flattened to Smile Foundation's
 * plain white card with a green pill button, rather than the site's
 * rust-tinted rounded panel.
 */
export function ProgrammeSponsorCta() {
  return (
    <section className="bg-[#eef2f4] py-14 md:py-16">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-lg bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-black uppercase md:text-3xl">
              Sponsor a child&apos;s education
            </p>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-black/70">
              ₹1,750 a month covers school fees, uniforms, books, and academic mentoring for
              one child through the full school year — with regular progress updates along
              the way.
            </p>
          </div>
          <Link
            href="/sponsor-a-child/"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#72BE44] to-[#7DC657] px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-[3px_3px_10px_rgba(0,0,0,0.25)] transition-colors hover:from-[#8CC63F] hover:to-[#8CC63F]"
          >
            Sponsor a Child
          </Link>
        </div>
      </Container>
    </section>
  );
}
