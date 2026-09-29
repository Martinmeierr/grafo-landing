import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.GRAFO_STATIC_EXPORT === '1' ? 'export' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
