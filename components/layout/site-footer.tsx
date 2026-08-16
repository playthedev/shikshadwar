import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { footerAboutLinks, footerProgrammeLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

const whatsappNumber = siteConfig.contact.phoneHref.replace(/\D/g, "");

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "X (Twitter)", href: siteConfig.social.x, icon: XIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YoutubeIcon },
  { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, icon: WhatsappIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#4C4D4C] text-paper/80">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-heading text-lg text-paper">
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
                target="_blank"
                rel="noopener noreferrer"
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
        <Container className="flex flex-col gap-3 py-6 text-xs text-paper/50 sm:flex-row sm:items-start sm:justify-between">
          <p className="sm:max-w-md">
            © {year} Shikshadwar Foundation. {siteConfig.legalStatus}.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            <Link href="/privacy-policy/" className="hover:text-paper/80">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions/" className="hover:text-paper/80">
              Terms & Conditions
            </Link>
            <Link href="/refund-cancellation-policy/" className="hover:text-paper/80">
              Refund & Cancellation
            </Link>
          </div>
        </Container>
        <Container className="pb-6 text-xs text-paper/50">
          <p>
            This site is built by{" "}
            <a
              href="https://www.nexmogen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-paper/80"
            >
              Nexmogen
            </a>
            .
          </p>
        </Container>
      </div>
    </footer>
  );
}
