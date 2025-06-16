import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
        },
      ],
    },
    allowedDevOrigins: [
      "http://192.168.1.42:3000",
      "http://localhost:3000",
    ]
};

export default nextConfig;
