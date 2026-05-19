/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export → outputs to ./out, which is what gets synced to S3/CloudFront.
  // All routes must be statically renderable (no API routes, no on-demand SSR).
  output: "export",
  reactStrictMode: true,
  // Pin tracing root to this directory so an unrelated lockfile at $HOME doesn't confuse Next.
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  images: {
    // Required for `output: "export"` — no Next image optimizer in front of S3.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // Emit trailing slashes so S3 + CloudFront serve /path/ → /path/index.html cleanly.
  trailingSlash: true,
};

export default nextConfig;
