import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: isProd ? '/teleparty-frontend/' : '',
  basePath: isProd ? '/teleparty-frontend' : '',
  output: 'export',
  reactStrictMode: false,
};

export default nextConfig;
