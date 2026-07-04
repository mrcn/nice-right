/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://niceright.co',
  outDir: './dist',
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keep intentionally noindexed product-lab / landing surfaces out of XML sitemap.
  exclude: ['/landing/*', '/labs/understand', '/labs/understand/*', '/*.svg', '/*.png', '/*.ico', '/*.xml', '/*.txt'],
};
