/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yourdomain.com'], // Replace with actual image domains if used
  },
  typescript: {
    ignoreBuildErrors: false, // Or true if you want to allow builds to succeed despite TS errors
  },
};

export default nextConfig;
