/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin tracing root to this directory so an unrelated lockfile at $HOME doesn't confuse Next.
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
