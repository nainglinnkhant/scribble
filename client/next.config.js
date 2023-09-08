/** @type {import('next').NextConfig} */
const isInDev = process.env.NODE_ENV === `development`

const nextConfig = {}

const PWAConfig = require('next-pwa')({
  dest: `public`,
  // disable: isInDev,
  register: true,
  skipWaiting: true,
})(nextConfig)

module.exports = PWAConfig
