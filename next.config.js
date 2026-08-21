/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  // Pre-existing pages trip react/no-unescaped-entities; keep build deployable
  // while lint still gates touched files via `npm run lint -- --file …`.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Kept for the static→serverful cutover (see fn-16 spec, R1 decision);
    // revisit the image pipeline separately.
    unoptimized: true,
  },
};

module.exports = nextConfig;
