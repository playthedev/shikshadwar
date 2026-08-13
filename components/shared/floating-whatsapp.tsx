import { WhatsappIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const whatsappNumber = siteConfig.contact.phoneHref.replace(/\D/g, "");

/**
 * Standard bottom-right floating WhatsApp support button — solid brand
 * green, always on top, visible on every breakpoint (unlike SocialRail,
 * which hides below `sm`).
 */
export function FloatingWhatsapp() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <WhatsappIcon aria-hidden="true" className="size-7" />
    </a>
  );
}
