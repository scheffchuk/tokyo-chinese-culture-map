import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Lets the e2e fixture build live beside the real one.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default createNextIntlPlugin()(nextConfig);
