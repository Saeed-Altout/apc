import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "dist",

  // Bypass type checking and linting during build
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },

  images: {
    domains: ["apc-app.apcprime.com"],
    unoptimized: process.env.NODE_ENV === "production", // Required for static export
  },
};

export default nextConfig;
