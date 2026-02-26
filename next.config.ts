import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias["@chartts/core"] = path.resolve(
      __dirname,
      "../lib/packages/core/dist/index.js"
    );
    return config;
  },
};

export default nextConfig;
