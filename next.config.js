const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img2.baidu.com',
        port: '',
        pathname: '/it/**',
      },
    ],
  },
}

module.exports = nextConfig
