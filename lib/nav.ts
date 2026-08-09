import { getProgramme, type ProgrammeSlug } from "@/lib/programmes";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

// Matches the "What We Do" order on the live site — independent of the
// order programmes are authored in lib/programmes.ts.
const workOrder: ProgrammeSlug[] = [
  "education",
  "healthcare",
  "livelihood",
  "youth-empowerment",
  "sustainable-development",
];

const workLinks: NavLink[] = workOrder.map((slug) => {
  const programme = getProgramme(slug);
  return { label: programme?.title ?? slug, href: `/${slug}/` };
});

/**
 * Top-level nav shape mirrors the live site: About and What We Do are
 * dropdowns, but Sponsor a Child, Gallery, Contact and Join Us are standalone
 * links rather than grouped under a "Get Involved" menu, and Donate a Tree /
 * Donate Now sit outside the nav entirely as header CTA buttons.
 */
export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Story Behind Shikshadwar", href: "/our-story/" },
      { label: "Annual Reports", href: "/annual-reports/" },
      { label: "Statutory Documents", href: "/statutory-documents/" },
    ],
  },
  {
    label: "What We Do",
    href: "/education/",
    children: workLinks,
  },
  { label: "Sponsor a Child", href: "/sponsor-a-child/" },
  { label: "Gallery", href: "/gallery/" },
  {
    label: "Blogs",
    href: "/blog-page/",
    children: [
      { label: "Blog", href: "/blog-page/" },
      { label: "Media Reports", href: "/media-reports/" },
    ],
  },
  { label: "Contact", href: "/contact-us/" },
  { label: "Join Us", href: "/join-us/" },
];

/** Header CTA buttons — outside the nav, matching the live site's header actions. */
export const headerCtas: NavLink[] = [
  { label: "Donate a Tree", href: "/donate-a-tree/" },
  { label: "Donate Now", href: "/donate/" },
];

export const footerProgrammeLinks: NavLink[] = workLinks;

export const footerAboutLinks: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Story Behind Shikshadwar", href: "/our-story/" },
  { label: "Annual Reports", href: "/annual-reports/" },
  { label: "Statutory Documents", href: "/statutory-documents/" },
  { label: "Sponsor a Child", href: "/sponsor-a-child/" },
  { label: "Meet Our Stars", href: "/meet-our-stars/" },
  { label: "Support Us", href: "/support-us/" },
  { label: "Donate a Tree", href: "/donate-a-tree/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Blog", href: "/blog-page/" },
  { label: "Media Reports", href: "/media-reports/" },
];
