import type { NextConfig } from "next";

/**
 * GitHub Pages build (GITHUB_PAGES=true): fully static export served from a
 * project sub-path. The default build is unchanged and keeps the admin CMS and
 * API routes, which need a Node server.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    agentUpgrade: "security",
  },
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/image-loader.ts",
        },
      }
    : {}),
};

export default nextConfig;
