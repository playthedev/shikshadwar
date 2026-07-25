import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy WordPress URLs were all trailing-slash (/about-us/, /education/...).
  // Matching that exactly preserves existing search rankings without redirects.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
