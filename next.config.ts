import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '47.130.184.14',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '47.130.184.14',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
