import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    domains: ["apc-app.apcprime.com"],
  },
};

export default nextConfig;
