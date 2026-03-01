import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    const coreDistDir = path.resolve(__dirname, "../lib/packages/core/dist");
    // Exact match for @chartts/core (must come after subpath aliases)
    config.resolve.alias["@chartts/core/all"] = path.resolve(coreDistDir, "all.js");
    config.resolve.alias["@chartts/core"] = path.resolve(coreDistDir, "index.js");
    config.resolve.alias["@chartts/themes"] = path.resolve(
      __dirname,
      "../lib/packages/themes/dist/index.js"
    );
    return config;
  },
};

export default nextConfig;
