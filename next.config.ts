import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Esto desactiva ESLint durante los builds de producción
  },
};

export default nextConfig;