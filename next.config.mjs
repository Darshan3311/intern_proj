/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Render deployment configuration
  output: 'standalone',
  // Ensure proper port binding for Render
  env: {
    PORT: process.env.PORT || '10000',
  },
  // Allow external domains if needed
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
