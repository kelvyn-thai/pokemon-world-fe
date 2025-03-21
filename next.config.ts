import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  eslint: {
    dirs: ["src"],
  },
  // experimental: {
  //   dynamicIO: true,
  //   useCache: true,
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
