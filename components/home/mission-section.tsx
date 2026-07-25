import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { Magnetic } from "@/components/shared/magnetic";

export function MissionSection() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Photo
            src="/images/home/mission.jpg"
            alt="A young girl at a Shikshadwar community event proudly holds up her own artwork"
            aspect="portrait"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-3 text-sm font-semibold tracking-wide text-rust uppercase">
            Welcome to Shikshadwar
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-heading text-ink">
            <RevealText text="We are committed to empowering communities & bringing dignity to the most marginalised." />
          </h2>
          <p className="mt-5 text-md leading-relaxed text-muted-foreground">
            Shikshadwar Foundation is a Public Charitable Trust dedicated to
            empowering underprivileged and marginalized communities. Founded
            in 2025 by Mr. Manish Mandal, the organization began its journey
            in the slums of Delhi, working to promote awareness of education,
            healthcare, and hygiene.
          </p>
          <p className="mt-4 text-md leading-relaxed text-muted-foreground">
            Recognizing the strong link between health, education, and
            socio-economic well-being, Shikshadwar initiated non-formal
            education programs, literacy drives, and skill-building
            activities in communities like Bhalaswa and Kadipur. Over time,
            it has expanded its reach across multiple states, including
            Delhi, Bihar, Uttar Pradesh, Rajasthan, and Haryana.
          </p>
          <p className="mt-4 text-md leading-relaxed text-muted-foreground">
            With a focus on education, livelihood, skilling, healthcare,
            youth development, and the environment, Shikshadwar strives to
            create a society where individuals are empowered to lead
            dignified, sustainable, and equitable lives.
          </p>
          <Magnetic className="mt-6 inline-block">
            <Link
              href="/about-us/"
              className="inline-flex items-center gap-2 rounded-(--radius) border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-rust hover:text-rust"
            >
              Read more
            </Link>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
