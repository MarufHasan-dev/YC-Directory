import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  experimental: {
    // ppr: "incremental",
  },
  devIndicators: {
    // appIsrStatus: false,          // ❌ remove
    // buildActivity: true,          // ❌ remove
    // buildActivityPosition: 'top-right', // ❌ rename
    position: "top-right", // ✅ new syntax
  },
};

export default nextConfig;
