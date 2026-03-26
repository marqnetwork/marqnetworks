// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   output: 'export',
//   images: { unoptimized: true } 
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "marqnetworks.co" },
      { protocol: "https", hostname: "www.marqnetworks.co" }
    ]
  },

  // ✅ This disables Next.js internal type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
