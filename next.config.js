/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',   // ← Désactivé temporairement pour build local Windows (réactiver pour Docker)
  
  // Optimisations de performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimiser les images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Optimiser les scripts et les polyfills
  swcMinify: true,
  
  // Optimiser le bundling
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  
  // Activer le mode experimental
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'gsap'],
  },
};
module.exports = nextConfig;
