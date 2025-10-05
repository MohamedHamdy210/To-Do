import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://res.cloudinary.com/dffj9vtuh/image/**"),
    ],
  },
};

export default nextConfig;
