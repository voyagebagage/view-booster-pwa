/** @type {import('next').NextConfig} */

// next.config.cjs (CommonJS module)
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    // scope: "/",
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
});

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   // scope: "/",
//   disable: process.env.NODE_ENV === "development",
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
// });

// module.exports = nextConfig;
