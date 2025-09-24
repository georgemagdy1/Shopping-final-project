/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ecommerce.routemisr.com'],
    // Or use the newer remotePatterns (Next.js 12.3+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig