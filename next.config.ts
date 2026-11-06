import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 192, 320, 480],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Videos are versioned by file name (hero-cliff-v1.mp4 ...). Never replace a file
        // under the same name: bump the version suffix instead.
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
