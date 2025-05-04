import { type NextConfig } from 'next';
import path from 'path';
const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    resolveAlias: {
      html2canvas: 'html2canvas-pro',
    },
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      html2canvas: path.resolve(__dirname, 'node_modules/html2canvas-pro'),
    };

    return config;
  },
} as NextConfig;

export default nextConfig;
