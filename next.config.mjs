/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Handles Next.js 14+ root external packages
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  
  // Backward compatibility fallback for Next.js 14.0 - 14.1
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  },
};

export default nextConfig;
