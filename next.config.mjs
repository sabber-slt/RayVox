// Dynamically import the withPWA function using ES Module syntax
const withPWA = (await import("next-pwa")).default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// Define your Next.js configuration with PWA settings
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

// Export the configuration
export default nextConfig;
