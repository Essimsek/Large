import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
        },
        {
          protocol: 'https',
          hostname: 'static.vecteezy.com',
        }
      ],
    },
    allowedDevOrigins: [
      "http://192.168.1.42:3000",
      "http://localhost:3000",
    ]
};

export default nextConfig;
