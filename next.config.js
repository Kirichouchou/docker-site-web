/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output only when explicitly requested to avoid Windows symlink issues.
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' } : {}),
};

module.exports = nextConfig;
