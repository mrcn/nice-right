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
  // Keep cheerio (and transitive parsers) out of the webpack bundle so
  // Node-only syntax in deps cannot break /api/scan compilation.
  experimental: {
    serverComponentsExternalPackages: ['cheerio', 'undici'],
  },
  async redirects() {
    // P1 (seo-audit): /blog copies of these posts duplicate /notes — 301 to canonical.
    return [
      {
        source: '/blog/health-is-wealth',
        destination: '/notes/health-is-wealth/',
        permanent: true,
      },
      {
        source: '/blog/poshmark-social-commerce',
        destination: '/notes/poshmark-social-commerce/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
