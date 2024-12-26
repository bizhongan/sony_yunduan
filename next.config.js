/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aweb-tlias-demon.oss-cn-hangzhou.aliyuncs.com',
      },
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig 