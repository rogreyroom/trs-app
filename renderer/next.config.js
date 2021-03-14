module.exports = {
  // pageExtensions: ['page.js'],
  // basePath: '/renderer',
  webpack: (config) =>
    Object.assign(config, {
      target: 'electron-renderer',
    }),
  // trailingSlash: true,
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     '/dashboard': { page: '/dashboard.js' },
  //     // '/ees': { page: '/ees' },
  //     // '/ees-edit': { page: '/ees-edit' },
  //     // '/reports': { page: '/reports' },
  //   }
  // },
};
