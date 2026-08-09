import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const whatsappNumber = siteConfig.contact.phoneHref.replace(/\D/g, "");

const links = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "X (Twitter)", href: siteConfig.social.x, icon: XIcon },
  { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, icon: WhatsappIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
];

/**
 * Floating vertical social rail pinned to the right edge — a light paper
 * pill of rust-ringed icon circles, matching the site's primary brand
 * accent without the heavier solid-rust fill. Hidden below `sm` so it
 * doesn't compete with the WhatsApp CTA button on phones.
 */
export function SocialRail() {
  return (
    <nav
      aria-label="Social media"
      className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 sm:flex sm:right-4"
    >
      <ul className="flex flex-col gap-2.5 rounded-full bg-paper/95 p-2.5 shadow-lg ring-1 ring-rust/15 backdrop-blur-sm">
        {links.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-10 items-center justify-center rounded-full text-rust ring-1 ring-rust/20 transition-all duration-200 hover:scale-105 hover:bg-rust/10 hover:ring-rust/40"
            >
              <social.icon aria-hidden="true" className="size-4" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
