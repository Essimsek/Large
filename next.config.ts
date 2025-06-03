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
      ],
    },
    allowedDevOrigins: [
      "http://192.168.1.42:3000",
      "http://localhost:3000",
    ]
};

export default nextConfig;
