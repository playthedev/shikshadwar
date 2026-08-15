import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const links = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "X (Twitter)", href: siteConfig.social.x, icon: XIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YoutubeIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
];

/**
 * Floating vertical social rail pinned to the right edge — each icon sits
 * on its own white circle so it stays legible over photo/image backgrounds,
 * without a single pill container behind the whole stack. WhatsApp lives
 * separately as the green floating support button (see FloatingWhatsapp),
 * not in this rail. Hidden below `sm` so it doesn't compete with that
 * button on phones.
 */
export function SocialRail() {
  return (
    <nav
      aria-label="Social media"
      className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 sm:flex sm:right-4"
    >
      <ul className="flex flex-col gap-3">
        {links.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-10 items-center justify-center rounded-full bg-white text-rust shadow-md transition-transform duration-200 hover:scale-110"
            >
              <social.icon aria-hidden="true" className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
