import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy WordPress URLs were all trailing-slash (/about-us/, /education/...).
  // Matching that exactly preserves existing search rankings without redirects.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 is the general content-photo tier; 92 is reserved for above-the-fold
    // hero/banner images and text-bearing assets (logo, certificates) where
    // compression artifacts are most visible.
    qualities: [75, 85, 92, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
