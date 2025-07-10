/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // Enable the /app directory if you're using it
  },
  images: {
    domains: ['yourdomain.com'], // Add external image domains if needed
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
