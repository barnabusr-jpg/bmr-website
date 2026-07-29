/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Bypasses Webpack compilation for serverless Chromium native binaries
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
};

export default nextConfig;
