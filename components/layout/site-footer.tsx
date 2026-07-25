import type { SVGProps } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { footerAboutLinks, footerProgrammeLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

// lucide-react dropped brand marks, so these are small inline glyphs.
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.96h2.46V21h3.04Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// TODO: legacy site links these to "#" too — swap in real profile URLs once
// the client provides them.
const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ink text-paper/80">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-heading text-lg font-semibold text-paper">
            Shikshadwar Foundation
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/65">
            An initiative to bring change in society through education. Come,
            let&apos;s build a new path!
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
              >
                <social.icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">About</p>
          <ul className="mt-4 space-y-2.5">
            {footerAboutLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper/65 transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Programmes</p>
          <ul className="mt-4 space-y-2.5">
            {footerProgrammeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper/65 transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Reach us</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/65">
            <li className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>{siteConfig.contact.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone aria-hidden="true" className="size-4 shrink-0" />
              <a href={siteConfig.contact.phoneHref} className="hover:text-paper">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-paper"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Shikshadwar Foundation. {siteConfig.legalStatus}.
          </p>
          <div className="flex gap-4">
            <Link href="/contact-us/" className="hover:text-paper/80">
              Contact
            </Link>
            <Link href="/join-us/" className="hover:text-paper/80">
              Volunteer
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
