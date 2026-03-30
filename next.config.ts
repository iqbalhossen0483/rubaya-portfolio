import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rubayanasrin.com",
      },
    ],
  },
};

export default nextConfig;
