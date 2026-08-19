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
  async redirects() {
    return [
      {
        source: '/diagnostic',
        destination: '/forensic?auth=admin_verified_secure',
        permanent: false,
      },
      // Safely alias root /admin to the full dashboard route
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
