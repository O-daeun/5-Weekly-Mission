/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: { forceSwcTransforms: true },
};

module.exports = nextConfig;
