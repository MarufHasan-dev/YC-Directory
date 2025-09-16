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
    ppr: "incremental",
  },
  devIndicators: {
    // appIsrStatus: false,
    // buildActivity: true,
    // buildActivityPosition: 'top-right',
    // position: "top-right",
  },
};

export default nextConfig;
