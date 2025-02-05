/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/media/meals/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/ingredients/**',
      },
    ],
  },
}

module.exports = nextConfig 