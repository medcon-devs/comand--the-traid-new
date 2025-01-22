import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: {
    baseURL: process.env.BASE_URL,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },

  images: {
    domains: [
      "localhost",
      "game.medcon.ae/command-the-triad",
    ],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  // basePath: "/command-the-triad",
};

export default nextConfig;
