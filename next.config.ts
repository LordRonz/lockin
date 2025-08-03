import { type NextConfig } from 'next';
import path from 'path';

import 'dotenv/config';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async rewrites() {
    return [
      {
        source: '/upload-tmp',
        destination: `${process.env.FILE_UPLOAD_URL}`,
      },
    ];
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
