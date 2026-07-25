import { programmes } from "@/lib/programmes";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Annual Reports", href: "/annual-reports/" },
      { label: "Statutory Documents", href: "/statutory-documents/" },
    ],
  },
  {
    label: "Programmes",
    href: "/education/",
    children: programmes.map((p) => ({
      label: p.title,
      href: `/${p.slug}/`,
    })),
  },
  { label: "Gallery", href: "/gallery/" },
  {
    label: "Blog",
    href: "/blog-page/",
    children: [
      { label: "Blog", href: "/blog-page/" },
      { label: "Media Reports", href: "/media-reports/" },
    ],
  },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Volunteer", href: "/join-us/" },
];

export const footerProgrammeLinks: NavLink[] = programmes.map((p) => ({
  label: p.title,
  href: `/${p.slug}/`,
}));

export const footerAboutLinks: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Annual Reports", href: "/annual-reports/" },
  { label: "Statutory Documents", href: "/statutory-documents/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Blog", href: "/blog-page/" },
  { label: "Media Reports", href: "/media-reports/" },
];
