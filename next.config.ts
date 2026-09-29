import type { NextConfig } from "next";

// deploy-gh-pages.py sets these to build a static site for GitHub Pages; `next dev`/`next build` are unaffected.
const nextConfig: NextConfig =
  process.env.NEXT_EXPORT === "1" ? { output: "export", basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "" } : {};

export default nextConfig;
