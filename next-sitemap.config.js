/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://niceright.co',
  outDir: './dist',
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keep intentionally noindexed product-lab / landing surfaces out of XML sitemap.
  // `/writing` is a legacy alias for `/notes`; don't advertise duplicate redirect shells.
  exclude: [
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
