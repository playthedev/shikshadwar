import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { programmes } from "@/lib/programmes";

// Extend this list as each page ships — only listing routes that exist today
// so we never submit a URL to search engines that 404s.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "about-us",
    "annual-reports",
    "statutory-documents",
    "gallery",
    "blog-page",
    "media-reports",
    "contact-us",
    "join-us",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}/${route}`.replace(/\/$/, "") + (route ? "/" : ""),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...programmes.map((p) => ({
      url: `${siteConfig.url}/${p.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
