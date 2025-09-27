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
  // Allow external domains if needed
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
