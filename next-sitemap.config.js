/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://niceright.co',
  outDir: './dist',
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/landing/*'],
};
