/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://niceright.co',
  outDir: './public',
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keep intentionally noindexed product-lab / landing surfaces out of XML sitemap.
  // `/writing` is a legacy alias for `/notes`; don't advertise duplicate redirect shells.
  exclude: [
    // Duplicate of /notes/* — 301 redirected (see next.config.js).
    '/blog/health-is-wealth',
    '/blog/poshmark-social-commerce',
    '/scan',
    '/scan/*',
    '/systems/*',
    '/landing/*',
    '/labs/understand',
    '/labs/understand/*',
    '/new-site',
    '/writing',
    '/writing/*',
    '/*.svg',
    '/*.png',
    '/*.ico',
    '/*.xml',
    '/*.txt',
  ],
};
