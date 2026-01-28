/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/downloads/HAI-AVS-Field-Guide-Summary',
        destination: '/insights/field-guides',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
